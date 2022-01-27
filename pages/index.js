import {useEffect, useRef, useState} from "react";
import Card from "../src/components/card/FeedCard";
import { useUser } from "../src/context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getReturnData } from "../src/utility/Util";
import { getPostByStatus } from "../src/graphql-custom/post/queries";
import { useListPager } from "../src/utility/ApiHelper";
import { onPostUpdateByStatus } from "../src/graphql-custom/post/subscription";
import { withSSRContext } from "aws-amplify";
import useFeedLayout from "../src/hooks/useFeedLayout";
import { listGroupByUserAndRole } from "../src/graphql-custom/GroupUsers/queries";
import FeedSortButtons from "../src/components/navigation/FeedSortButtons";
import { feedType } from "../src/components/navigation/sortButtonTypes";
import { listGroups } from "../src/graphql/queries";
import { useWrapper } from "../src/context/wrapperContext";
import Head from "next/head";
import useMediaQuery from "../src/components/navigation/useMeduaQuery";
import Consts from "../src/utility/Consts";
import AddPostCaakCard from "../src/components/card/AddPostCaakCard";
import toast from "react-hot-toast";
import InfinitScroller from "../src/components/layouts/extra/InfinitScroller";
import FeedBack from "../src/components/feedback";
import { useRouter } from "next/router";
import { usePreserveScroll } from "../src/hooks/useScroll";
import ModalBanner from "../src/components/modalBanner";
import {onCreateReactions, onDeleteReactions} from "../src/graphql/subscriptions";

export async function getServerSideProps({ req }) {
  const { API, Auth } = withSSRContext({ req });
  let user;

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }

  const resp = await API.graphql({
    query: getPostByStatus,
    variables: {
      sortDirection: "DESC",
      status: "CONFIRMED",
      limit: 2,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const fetchGroups = async (user, role) => {
    try {
      if (!user) {
        return null;
      }

      let retData = [];
      for (let i = 0; i < role.length; i++) {
        if (role[i] === "NOT_MEMBER") {
          const resp = await API.graphql(graphqlOperation(listGroups));
          const followed = getReturnData(resp).items.filter(
            (item) => !item.followed
          );
          retData = [...retData, ...followed];
        } else {
          const resp = await API.graphql(
            graphqlOperation(listGroupByUserAndRole, {
              user_id: user.attributes.sub,
              role: { eq: role[i] },
            })
          );
          retData = [...retData, ...getReturnData(resp).items];
        }
      }
      return retData;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  };

  return {
    props: {
      ssrData: {
        posts: getReturnData(resp),
        // allGroups: await fetchGroups(user, ["NOT_MEMBER"]),
        myGroups: await fetchGroups(user, ["MEMBER"]),
        adminModerator: await fetchGroups(user, ["ADMIN", "MODERATOR"]),
      },
    },
  };
}

const Feed = ({ ssrData }) => {
  usePreserveScroll();
  
  const router = useRouter();
  const FeedLayout = useFeedLayout();
  const { user, isLogged } = useUser();
  const [posts, setPosts] = useState(ssrData.posts);
  const { setFeedSortType } = useWrapper();
  const [loading, setLoading] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [subscripedPost, setSubscripedPost] = useState(0);
  const [bannerOpen, setBannerOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const currentBannerScrollPosition = useRef(1200)
  const [subscribedReactionPost, setSubscribedReactionPost] = useState(null);

  const subscriptions = {};
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  //FORCE RENDER STATE
  const [render, setRender] = useState(0);
  const [nextPosts] = useListPager({
    query: getPostByStatus,
    variables: {
      sortDirection: "DESC",
      status: "CONFIRMED",
      limit: 20,
    },
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    nextToken: ssrData.posts.nextToken,
    ssr: true,
  });

  const fetchPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const resp = await nextPosts();
        if (resp) {
          setPosts((nextPosts) => ({...nextPosts, items: [...nextPosts.items, ...resp]}));
        }
      }
      setLoading(false);
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
      query: onPostUpdateByStatus,
      variables: {
        status: "CONFIRMED",
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

    subscriptions.onPostUpdateByStatusPending = API.graphql({
      query: onPostUpdateByStatus,
      variables: {
        status: "PENDING",
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
    subscriptions.onPostUpdateByStatusArchived = API.graphql({
      query: onPostUpdateByStatus,
      variables: {
        status: "ARCHIVED",
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

  const subscribeOnReaction = ()=> {
    try {
      subscriptions.onCreateReactions = API.graphql({
        query: onCreateReactions,
      }).subscribe({
        next: (data) => {
          const onData = getReturnData(data, true);
          setSubscribedReactionPost({ ...onData, type: "CREATE" });
        },
      });
      subscriptions.onDeleteReactions = API.graphql({
        query: onDeleteReactions,
      }).subscribe({
        next: (data) => {
          const onData = getReturnData(data, true);
          setSubscribedReactionPost({ ...onData, type: "DELETE" });
        },
      });
    }catch (ex){
      console.log(ex)
    }
  }

  useEffect(() => {
    if (subscripedPost) {
      const postIndex = posts.items.findIndex(
        (post) => post.id === subscripedPost.post.id
      );

      if (subscripedPost.type === "add") {
        if (postIndex <= -1) {
          setPosts({...posts, items: [subscripedPost.post, ...posts.items]})
          // setPosts([subscripedPost.post, ...posts]);
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

  useEffect(()=> {
    if(subscribedReactionPost){
      const postIndex = posts.items.findIndex((item) => {
        if (item.post) {
          return item.post.id === subscribedReactionPost.item_id;
        } else {
          return item.id === subscribedReactionPost.item_id;
        }
      });
      if (postIndex !== -1) {
        const post = posts.items[postIndex];
        if (post.post) {
          posts.items[postIndex].post.reacted = subscribedReactionPost.type === "CREATE";
        } else {
          posts.items[postIndex].reacted = subscribedReactionPost.type === "CREATE";
        }
        setRender(render + 1)
      }
    }
    //eslint-disable-next-line
  },[subscribedReactionPost])

  useEffect(() => {
    isLogged && subscribeOnReaction();
    subscrip();

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };

    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    setFeedSortType("DEFAULT");
  }, [setFeedSortType]);


  const handleScroll = () => {
    if(window){
      if(!bannerDismissed && (window.scrollY > currentBannerScrollPosition.current)){
        setBannerOpen(true)
        setBannerDismissed(true)
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleToast = ({ param }) => {
    if (param === "copy") toast.success("Холбоос амжилттай хуулагдлаа.");
    if (param === "follow") toast.success("Группт амжилттай нэгдлээ!");
    if (param === "unfollow") toast.success("Группээс амжилттай гарлаа.");
    if (param === "saved") toast.success("Пост амжилттай хадгалагдлаа.");
    if (param === "unSaved") toast.success("Пост амжилттай хасагдлаа.");
  };
  return (
    <>
      <Head>
        <title>{Consts.siteMainTitle} - Сайхан мэдрэмжээ хуваалцъя!</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      {router.asPath === "/" && !isFeedbackOpen && (
        <div
          onClick={() => {
            setIsFeedbackOpen(!isFeedbackOpen);
          }}
          className={
            "feedbackIconBackground cursor-pointer flex items-center justify-center shadow-card z-[10] w-[54px] h-[54px] fixed bottom-[78px] md:bottom-[24px] right-[8px] md:right-[27px] rounded-full"
          }
        >
          <div className={"flex items-center justify-center w-[28px] h-[28px]"}>
            <span
              className={`${
                isFeedbackOpen
                  ? "icon-fi-rs-close text-[15.98px] w-[16px]"
                  : "icon-fi-rs-survey text-[25.67px] h-[20px]"
              } text-white`}
            />
          </div>
        </div>
      )}

      {isFeedbackOpen && <FeedBack setIsOpen={setIsFeedbackOpen} />}

      <div className={"relative pt-[54px]"}>
        <div className={`px-0 w-full relative`}>
          <div
            className={`h-full flex ${
              !isLogged ? "flex-col items-center" : "flex-row items-start"
            }`}
          >
            <FeedLayout
              adminModeratorGroups={ssrData.adminModerator}
              myGroups={ssrData.myGroups}
              allGroups={ssrData.allGroups}
              buttonType={feedType}
              {...(isLogged ? { columns: 3 } : { columns: 2 })}
            >
              <FeedSortButtons
                feed
                items={feedType}
                initialSort={"DEFAULT"}
                hide={isLogged && !isTablet}
                containerClassname={"mb-[19px] justify-center"}
                direction={"row"}
              />
              <AddPostCaakCard />
              <InfinitScroller onNext={fetchPosts} loading={loading}>
                {posts.items.map((data, index) => {
                  return (
                    <Card
                      key={index}
                      video={data?.items?.items[0]?.file?.type?.startsWith(
                        "video"
                      )}
                      post={data}
                      className="ph:mb-4 sm:mb-4"
                      handleToast={handleToast}
                    />
                  );
                })}
              </InfinitScroller>
            </FeedLayout>
          </div>
        </div>

        <ModalBanner setBannerOpen={setBannerOpen} bannerOpen={bannerOpen}/>
      </div>
    </>
  );
};
export default Feed;
