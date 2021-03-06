import { withSSRContext } from "aws-amplify";
import { getUser } from "../../../src/graphql-custom/user/queries";
import { getReturnData } from "../../../src/utility/Util";
import { useEffect, useState } from "react";
import useModalLayout from "../../../src/hooks/useModalLayout";
import FeedSortButtons from "../../../src/components/navigation/FeedSortButtons";
import {
  userProfileType,
  FeedViewType,
} from "../../../src/components/navigation/sortButtonTypes";
import UserPostsCard from "../../../src/components/card/UserProfile/UserPostsCard";
import {
  getPostByUser,
  listSavedPostByUser,
} from "../../../src/graphql-custom/post/queries";
import { useListPager } from "../../../src/utility/ApiHelper";
import API from "@aws-amplify/api";
import { onPostByUser } from "../../../src/graphql-custom/post/subscription";
import { useUser } from "../../../src/context/userContext";
import { useRouter } from "next/router";
import Head from "next/head";
import Consts from "../../../src/utility/Consts";
import InfinitScroller from "../../../src/components/layouts/extra/InfinitScroller";
import Card from "../../../src/components/card/FeedCard";
import toast from "react-hot-toast";
import { useWrapper } from "../../../src/context/wrapperContext";
import useUpdateEffect from "../../../src/hooks/useUpdateEffect";
import { usePreserveScroll } from "../../../src/hooks/useScroll";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  const userId = query.userId;

  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }

  const getPostByUserId = async () => {
    const resp = await API.graphql({
      query: getPostByUser,
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      variables: {
        user_id: userId,
        sortDirection: "DESC",
        filter: { status: { eq: "CONFIRMED" } },
        limit: 2,
      },
    });
    return getReturnData(resp);
  };

  const getUserById = async () => {
    try {
      const resp = await API.graphql({
        query: getUser,
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        variables: { id: userId },
      });
      return getReturnData(resp);
    } catch (ex) {
      console.log(ex);
    }
  };
  const fetchedUser = await getUserById()
  if(!fetchedUser){
    return {notFound: true}
  }
  try {
    return {
      props: {
        ssrData: {
          user: fetchedUser,
          posts: await getPostByUserId(),
        },
      },
    };
  } catch (ex) {
    console.log(ex);
  }
}

const Profile = ({ ssrData }) => {
  usePreserveScroll();
  const router = useRouter();
  const { userId } = router.query;
  const [fetchedUser, setFetchedUser] = useState(ssrData.user);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(ssrData.posts);
  const [savedPosts, setSavedPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [activeIndex, setActiveIndex] = useState(
    router.query.sortType === "SAVED" ? 2 : 0
  );
  const [activeView, setActiveView] = useState(0);
  const [sortType, setSortType] = useState(
    router.query.sortType ? router.query.sortType : "POST"
  );
  const [subscripedPost, setSubscripedPost] = useState(0);
  const { isLogged } = useUser();
  const subscriptions = {};
  const [render, setRender] = useState(0);
  const { setNavBarTransparent } = useWrapper();
  const [nextPosts] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: userId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 20,
    },
    nextToken: ssrData.posts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    ssr: true,
  });

  const [nextSavedPosts] = useListPager({
    query: listSavedPostByUser,
    variables: {
      user_id: userId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 20,
    },
    nextToken: savedPosts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const fetchPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const resp = await nextPosts();
        if (resp) {
          setPosts((nextPosts) => ({
            ...nextPosts,
            items: [...nextPosts.items, ...resp],
          }));
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const resp = await nextSavedPosts();
        if (resp) {
          setSavedPosts((nextSavedPosts) => ({
            ...nextSavedPosts,
            items: [...nextSavedPosts.items, ...resp],
          }));
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const subscrip = () => {
    let authMode = "AWS_IAM";

    if (isLogged) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }

    subscriptions.onPostUpdateByStatus = API.graphql({
      query: onPostByUser,
      variables: {
        status: "CONFIRMED",
        user_id: userId,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscripedPost({
          post: getReturnData(data, true),
          type: "add",
        });
      },
    });

    subscriptions.onPostByUserDeleted = API.graphql({
      query: onPostByUser,
      variables: {
        status: "ARCHIVED",
        user_id: userId,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscripedPost({
          post: getReturnData(data, true),
          type: "remove",
        });
      },
    });

    subscriptions.onPostByUserPending = API.graphql({
      query: onPostByUser,
      variables: {
        status: "PENDING",
        user_id: userId,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscripedPost({
          post: getReturnData(data, true),
          type: "remove",
        });
      },
    });
  };

  useEffect(() => {
    if (subscripedPost) {
      const postIndex = posts.items.findIndex(
        (post) => post.id === subscripedPost.post.id
      );
      if (subscripedPost.type === "add") {
        if (postIndex <= -1) {
          setPosts({ ...posts, items: [subscripedPost.post, ...posts.items] });
        }
      } else {
        if (postIndex > -1) {
          posts.items.splice(postIndex, 1);
          setRender(render + 1);
        }
      }
    }
    // eslint-disable-next-line
  }, [subscripedPost]);

  useEffect(() => {
    subscrip();

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };

    // eslint-disable-next-line
  }, []);

  useUpdateEffect(() => {
    setFetchedUser(ssrData.user);
    setPosts(ssrData.posts);
    fetchPosts();
  }, [ssrData.user]);

  useEffect(() => {
    const listener = () => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 54) {
        setNavBarTransparent(false);
      } else {
        setNavBarTransparent(true);
      }
    };
    document.addEventListener("scroll", listener);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  });

  const ProfileLayout = useModalLayout({ layoutName: "userProfile" });

  const handleToast = ({ param }) => {
    if (param === "follow") toast.success("???????????? ?????????????????? ??????????????!");
    if (param === "unfollow") toast.success("???????????????? ?????????????????? ????????????.");
    if (param === "copy") toast.success("?????????????? ?????????????????? ????????????????????.");
    if (param === "saved") toast.success("???????? ?????????????????? ????????????????????????.");
    if (param === "unSaved") toast.success("???????? ?????????????????? ??????????????????.");
  };

  return (
    <>
      <Head>
        <title>
          @{fetchedUser.nickname} - {Consts.siteMainTitle}
        </title>
      </Head>
      <ProfileLayout user={fetchedUser}>
        <div className={"pt-0 md:pt-[42px]"}>
          {/* <FeedSortButtons
            rootContainerClassname={"items-start"}
            initialSort={router.query.sortType ? router.query.sortType : "POST"}
            iconSize={"text-[17px]"}
            iconContainerSize={"w-[20px] h-[20px]"}
            textClassname={"text-[15px] font-medium"}
            containerClassname={"mb-[20px]"}
            items={userProfileType}
            items2={FeedViewType}
            activeIndex={activeIndex}
            activeView={activeView}
            setActiveIndex={setActiveIndex}
            setActiveView={setActiveView}
            setSortType={setSortType}
            sortType={sortType}
            userId={userId}
          /> */}

          <div className="flex flex-row items-center mb-[20px] max-w-[480px] w-full cursor-pointer">
            {
              userProfileType.map((data, index) =>{
                return(
                  <div onClick={()=> {
                    setActiveIndex(index)
                    setSortType(data.type)
                  }} key={index} className={`flex flex-row items-center justify-center h-9 w-full rounded-lg ${activeIndex === index ? "bg-white text-caak-primary" : "text-caak-generalblack"}`}>
                    <span className={`${activeIndex === index ? `${data.icon}-f` : `${data.icon}-o`} text-[17px] mr-2`}/>
                    <p className="text-[15px] font-medium h-[20px]">{data.title}</p>
                  </div>
                )
              })
            }
            {FeedViewType ? (
          <div className="hidden md:flex w-[80px] ml-[5px] h-[36px] px-[5px] py-[4px] items-center justify-center bg-white rounded-lg">
            <div
              className={`flex flex-nowrap items-center w-full justify-between flex-row`}
            >
              {FeedViewType.map(({ icon, id }) => {
                return (
                  <div
                    className={`flex items-center justify-center w-[32px] h-[28px] rounded-[5px] ${
                      id === activeView ? "bg-caak-titaniumwhite" : ""
                    }`}
                    key={id}
                  >
                    <div
                      className={`w-[20px] h-[20px] flex items-center justify-center cursor-pointer`}
                      onClick={() => setActiveView(id)}
                    >
                      <span
                        className={`${
                          id === activeView ? `${icon}-f` : `${icon}-o`
                        } ${
                          "text-[16.67px]"
                        } ph:text-15px`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
          </div>

          {sortType === "SAVED" ? (
            <InfinitScroller onNext={fetchSavedPosts} loading={loading}>
              <div
                className={`${
                  activeView === 0
                    ? "userPostsContainer"
                    : activeView === 1
                    ? "profileCardView"
                    : ""
                } `}
              >
                {savedPosts.items.map((item, index) => {
                  return activeView === 0 ? (
                    <UserPostsCard key={index} post={item.post} />
                  ) : activeView === 1 ? (
                    <Card
                      key={index}
                      video={item.post?.items?.items[0]?.file?.type?.startsWith(
                        "video"
                      )}
                      post={item.post}
                      className="ph:mb-4 sm:mb-4"
                      handleToast={handleToast}
                    />
                  ) : null;
                })}
              </div>
            </InfinitScroller>
          ) : (
            <InfinitScroller onNext={fetchPosts} loading={loading}>
              <div
                className={`${
                  activeView === 0
                    ? "userPostsContainer"
                    : activeView === 1
                    ? "profileCardView"
                    : ""
                } `}
              >
                {posts.items.map((item, index) => {
                  if (
                    item.items.items[0] && item.items.items[0].file.type.startsWith("video") &&
                    sortType === "VIDEO"
                  ) {
                    return activeView === 0 ? (
                      <UserPostsCard key={index} post={item} />
                    ) : activeView === 1 ? (
                      <Card
                        key={index}
                        video={item.items?.items[0]?.file?.type?.startsWith(
                          "video"
                        )}
                        post={item}
                        className="ph:mb-4 sm:mb-4"
                        handleToast={handleToast}
                      />
                    ) : null;
                  } else if (sortType === "POST") {
                    return activeView === 0 ? (
                      <UserPostsCard key={index} post={item} />
                    ) : activeView === 1 ? (
                      <Card
                        key={index}
                        video={item.items?.items[0]?.file?.type?.startsWith(
                          "video"
                        )}
                        post={item}
                        className="ph:mb-4 sm:mb-4"
                        handleToast={handleToast}
                      />
                    ) : null;
                  }
                })}
              </div>
            </InfinitScroller>
          )}
        </div>
      </ProfileLayout>
    </>
  );
};

export default Profile;
