import { withSSRContext } from "aws-amplify";
import { getUser } from "../../../src/graphql-custom/user/queries";
import { getReturnData } from "../../../src/utility/Util";
import { useEffect, useState } from "react";
import useModalLayout from "../../../src/hooks/useModalLayout";
import FeedSortButtons from "../../../src/components/navigation/FeedSortButtons";
import { userProfileType } from "../../../src/components/navigation/sortButtonTypes";
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
        limit: 20,
      },
    });
    return getReturnData(resp);
  };

  const getSavedPostByUserId = async () => {
    const resp = await API.graphql({
      query: listSavedPostByUser,
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      variables: {
        user_id: userId,
        sortDirection: "DESC",
        filter: { status: { eq: "CONFIRMED" } },
        limit: 20,
      },
    });
    return getReturnData(resp);
  };

  const getUserById = async () => {
    const resp = await API.graphql({
      query: getUser,
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      variables: { id: userId },
    });
    return getReturnData(resp);
  };
  try {
    return {
      props: {
        ssrData: {
          user: await getUserById(),
          posts: await getPostByUserId(),
          savedPosts: await getSavedPostByUserId(),
        },
      },
    };
  } catch (ex) {
    console.log(ex);
  }
}

const Profile = ({ ssrData }) => {
  const [fetchedUser, setFetchedUser] = useState(ssrData.user);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(ssrData.posts);
  const [savedPosts, setSavedPosts] = useState(ssrData.savedPosts);
  const [sortType, setSortType] = useState("POST");
  const [subscripedPost, setSubscripedPost] = useState(0);
  const { isLogged } = useUser();
  const subscriptions = {};
  const [render, setRender] = useState(0);
  const router = useRouter();
  const { userId } = router.query;

  const [nextPosts] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: userId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 3,
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
    nextToken: ssrData.savedPosts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    ssr: true,
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
    setPosts(ssrData.posts);
  }, [ssrData.posts]);

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

  useEffect(() => {
    setFetchedUser(ssrData.user);
  }, [ssrData.user]);

  useEffect(() => {
    setSavedPosts(ssrData.savedPosts);
  }, [ssrData.savedPosts]);

  useEffect(() => {
    console.log(savedPosts);
  }, []);

  const ProfileLayout = useModalLayout({ layoutName: "userProfile" });
  return (
    <>
      <Head>
        <title>
          @{fetchedUser.nickname} - {Consts.siteMainTitle}
        </title>
      </Head>
      <ProfileLayout user={fetchedUser}>
        <div className={"pt-0 md:pt-[42px]"}>
          <FeedSortButtons
            initialSort={"POST"}
            iconSize={"text-[17px]"}
            iconContainerSize={"w-[20px] h-[20px]"}
            textClassname={"text-[15px] font-medium"}
            containerClassname={"mb-[20px] flex-wrap"}
            items={userProfileType}
            setSortType={setSortType}
            sortType={sortType}
            direction={"col"}
          />

          {sortType === "SAVED" ? (
            <InfinitScroller onNext={fetchSavedPosts} loading={loading}>
              <div className={"userPostsContainer"}>
                {savedPosts.items.map((item, index) => {
                  return <UserPostsCard key={index} post={item.post} />;
                })}
              </div>
            </InfinitScroller>
          ) : (
            <InfinitScroller onNext={fetchPosts} loading={loading}>
              <div className={"userPostsContainer"}>
                {posts.items.map((items, index) => {
                  if (
                    items.items.items[0].file.type.startsWith("video") &&
                    sortType === "VIDEO"
                  ) {
                    return <UserPostsCard key={index} post={items} />;
                  } else if (sortType === "POST") {
                    return <UserPostsCard key={index} post={items} />;
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
