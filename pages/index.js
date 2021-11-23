import { useEffect, useRef, useState } from "react";
import Card from "../src/components/card/FeedCard";
import { useUser } from "../src/context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { checkUser, getReturnData } from "../src/utility/Util";
import { getPostByStatus } from "../src/graphql-custom/post/queries";
import useInfiniteScroll from "../src/hooks/useFetch";
import Loader from "../src/components/loader";
import { useListPager } from "../src/utility/ApiHelper";
import { onPostUpdateByStatus } from "../src/graphql-custom/post/subscription";
import { withSSRContext } from "aws-amplify";
import useFeedLayout from "../src/hooks/useFeedLayout";
import { listGroupByUserAndRole } from "../src/graphql-custom/GroupUsers/queries";
import FeedSortButtons from "../src/components/navigation/FeedSortButtons";
import {feedType} from "../src/components/navigation/sortButtonTypes";

export async function getServerSideProps({ req, res }) {
  const { API, Auth } = withSSRContext({ req });
  const resp = await API.graphql({
    query: getPostByStatus,
    variables: {
      sortDirection: "DESC",
      status: "CONFIRMED",
      limit: 6,
    },
    authMode: "AWS_IAM",
  });

  const fetchGroups = async (user) => {
    try {
      let myGroups = await API.graphql(
        graphqlOperation(listGroupByUserAndRole, {
          user_id: user.attributes.sub,
          role: { eq: "MEMBER" },
        })
      );
      myGroups = getReturnData(myGroups);

      let adminGroups = await API.graphql(
        graphqlOperation(listGroupByUserAndRole, {
          user_id: user.attributes.sub,
          role: { eq: "ADMIN" },
        })
      );
      adminGroups = getReturnData(adminGroups);

      let moderatorGroups = await API.graphql(
        graphqlOperation(listGroupByUserAndRole, {
          user_id: user.attributes.sub,
          role: { eq: "MODERATOR" },
        })
      );
      moderatorGroups = getReturnData(moderatorGroups);

      const adminModeratorGroups = adminGroups.items.concat(
        moderatorGroups.items
      );
      return {
        props: {
          ssrData: {
            posts: getReturnData(resp),
            myGroups: myGroups.items,
            adminModeratorGroups: adminModeratorGroups,
          },
        },
      };
    } catch (ex) {
      console.log(ex);
    }
  };
  try {
    const user = await Auth.currentAuthenticatedUser();
    return fetchGroups(user);
  } catch (ex) {
    console.log(ex);
    return {
      props: {
        ssrData: {
          posts: getReturnData(resp),
        },
      },
    };
  }
}

const Feed = ({ ssrData, ...props }) => {
  const FeedLayout = useFeedLayout();
  const feedRef = useRef();
  const { user, isLogged } = useUser();

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
  const [setPostScroll] = useInfiniteScroll(posts, setPosts, feedRef);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const [subscripedPost, setSubscripedPost] = useState(0);
  const subscriptions = {};

  //FORCE RENDER STATE
  const [render, setRender] = useState(0);

  const fetchPosts = async (data, setData) => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextPosts();
        if (resp) {
          setData([...data, ...resp]);
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
    // fetchPosts(posts, setPosts);
    setLoaded(true)
    setPostScroll(fetchPosts);

    return () => {
      setPostScroll(null);
    };

    // eslint-disable-next-line
  }, []);

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

  return loaded && (
    <div id={"feed"} className={"site-container"}>
      <div className={`px-0 w-full relative`}>
        <div
          className={`h-full flex ${
            isLogged ? "flex-row items-start" : "flex-col items-center"
          } sm:justify-between md:justify-between lg:justify-between 2xl:justify-start 3xl:justify-center`}
        >
          <FeedLayout
            adminModeratorGroups={ssrData.adminModeratorGroups}
            myGroups={ssrData.myGroups}
            buttonType={feedType}
            {...(isLogged ? { columns: 3 } : { columns: 2 })}
          >
            <FeedSortButtons
                items={feedType}
                hide={isLogged}
                containerClassname={"mb-[19px] justify-center"}
                direction={"row"}
            />
            {posts.length > 0 &&
              posts.map((data, index) => {
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
            <div ref={feedRef} className={"flex justify-center items-center"}>
              <Loader
                containerClassName={"self-center"}
                className={`bg-caak-primary ${
                  loading ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </FeedLayout>
        </div>
      </div>
    </div>
  );
};
export default Feed;
