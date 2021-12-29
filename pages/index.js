import { useEffect, useState } from "react";
import Card from "../src/components/card/FeedCard";
import { useUser } from "../src/context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { generateFileUrl, getReturnData } from "../src/utility/Util";
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
import toast, { Toaster } from "react-hot-toast";
import InfinitScroller from "../src/components/layouts/extra/InfinitScroller";

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
      limit: 6,
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
          retData = [...retData, ...getReturnData(resp).items];
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
        allGroups: await fetchGroups(user, ["NOT_MEMBER"]),
        myGroups: await fetchGroups(user, ["MEMBER"]),
        adminModerator: await fetchGroups(user, ["ADMIN", "MODERATOR"]),
      },
    },
  };
}

const Feed = ({ ssrData }) => {
  const FeedLayout = useFeedLayout();
  const { user, isLogged } = useUser();
  const [posts, setPosts] = useState(ssrData.posts.items);
  const [addPostCardIsOpen, setAddPostCardIsOpen] = useState(true);
  const { setFeedSortType } = useWrapper();
  const [loading, setLoading] = useState(false);
  const [subscripedPost, setSubscripedPost] = useState(0);
  const subscriptions = {};
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  //FORCE RENDER STATE
  const [render, setRender] = useState(0);

  const [nextPosts] = useListPager({
    query: getPostByStatus,
    variables: {
      sortDirection: "DESC",
      status: "CONFIRMED",
      limit: 6,
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
          setPosts((nextPosts) => [...nextPosts, ...resp]);
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

    subscriptions.onPostUpdateByStatusDeleted = API.graphql({
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
  };

  useEffect(() => {
    if (subscripedPost) {
      const postIndex = posts.findIndex(
        (post) => post.id === subscripedPost.post.id
      );

      if (subscripedPost.type === "add") {
        if (postIndex <= -1) {
          setPosts([subscripedPost.post, ...posts]);
        }
      } else {
        if (postIndex > -1) {
          posts.splice(postIndex, 1);
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
  }, [user]);

  useEffect(() => {
    setFeedSortType("DEFAULT");
  }, [setFeedSortType]);

  const handleToast = ({ param }) => {
    if (param === "copy") toast.success("Холбоос амжилттай хуулагдлаа.");
    if (param === "follow") toast.success("Группт амжилттай элслээ.");
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
      {/*<FeedBack/>*/}
      <div className={"relative"}>
        <Toaster
          toastOptions={{
            className: "toastOptions",
            duration: 5000,
          }}
        />
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
              <AddPostCaakCard
                isOpen={addPostCardIsOpen}
                setIsOpen={setAddPostCardIsOpen}
              />
              <InfinitScroller onNext={fetchPosts} loading={loading}>
                {posts.map((data, index) => {
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
      </div>
    </>
  );
};
export default Feed;
