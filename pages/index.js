import { useEffect, useState } from "react";
import Card from "../src/components/card/FeedCard";
import { useUser } from "../src/context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { checkUser, getReturnData } from "../src/utility/Util";
import { getPostByStatus } from "../src/graphql-custom/post/queries";
import Loader from "../src/components/loader";
import { useListPager } from "../src/utility/ApiHelper";
import { onPostUpdateByStatus } from "../src/graphql-custom/post/subscription";
import { withSSRContext } from "aws-amplify";
import useFeedLayout from "../src/hooks/useFeedLayout";
import { listGroupByUserAndRole } from "../src/graphql-custom/GroupUsers/queries";
import FeedSortButtons from "../src/components/navigation/FeedSortButtons";
import { feedType } from "../src/components/navigation/sortButtonTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import { listGroups } from "../src/graphql/queries";

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
  const [sortType, setSortType] = useState("DEFAULT");
  const [posts, setPosts] = useState(ssrData.posts.items);
  const [nextPosts] = useListPager({
    query: getPostByStatus,
    variables: {
      sortDirection: "DESC",
      status: "CONFIRMED",
      limit: 6,
    },
    nextToken: ssrData.posts.nextToken,
  });

  const [loading, setLoading] = useState(false);
  const [subscripedPost, setSubscripedPost] = useState(0);
  const subscriptions = {};

  //FORCE RENDER STATE
  const [render, setRender] = useState(0);

  const fetchPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextPosts();
        if (resp) {
          setPosts((nextPosts) => [...nextPosts, ...resp]);
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

    if (checkUser(user)) {
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

  return (
    <div id={"feed"} className={"site-container"}>
      <div className={`px-0 w-full relative`}>
        <div
          className={`h-full flex ${
            isLogged ? "flex-row items-start" : "flex-col items-center"
          } sm:justify-between md:justify-between lg:justify-between 2xl:justify-start 3xl:justify-center`}
        >
          <FeedLayout
            adminModeratorGroups={ssrData.adminModerator}
            myGroups={ssrData.myGroups}
            allGroups={ssrData.allGroups}
            buttonType={feedType}
            {...(isLogged ? { columns: 3 } : { columns: 2 })}
          >
            <FeedSortButtons
              setSortType={setSortType}
              sortType={sortType}
              items={feedType}
              hide={isLogged}
              containerClassname={"mb-[19px] justify-center"}
              direction={"row"}
            />
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchPosts}
              hasMore={true}
              loader={
                <Loader
                  containerClassName={"self-center w-full"}
                  className={`bg-caak-primary ${
                    loading ? "opacity-100" : "opacity-0"
                  }`}
                />
              }
              endMessage={<h4>Nothing more to show</h4>}
            >
              {posts.map((data, index) => {
                return (
                  <Card
                    key={index}
                    video={data?.items?.items[0]?.file?.type?.startsWith(
                      "video"
                    )}
                    post={data}
                    className="ph:mb-4 sm:mb-4"
                  />
                );
              })}
            </InfiniteScroll>
          </FeedLayout>
        </div>
      </div>
    </div>
  );
};
export default Feed;
