import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StatsItem from "../../../src/components/stats";
import Image from "next/image";

import { withSSRContext } from "aws-amplify";
import {
  checkUser,
  getFileUrl,
  getGenderImage,
  getReturnData,
} from "../../../src/utility/Util";
import { useListPager } from "../../../src/utility/ApiHelper";
import { getPostByUser } from "../../../src/graphql-custom/post/queries";
import DashList from "../../../src/components/list/DashList";

import { listCommentByUser } from "../../../src/graphql-custom/comment/queries";
import {
  getUserTotal,
  listUsersbyFollowed,
} from "../../../src/graphql-custom/user/queries";
import FollowerList from "../../../src/components/list/FollowerList";
import CommentList from "../../../src/components/list/CommentList";
import { useUser } from "../../../src/context/userContext";
import Loader from "../../../src/components/loader";
import API from "@aws-amplify/api";
import { onPostUpdateByStatus } from "../../../src/graphql-custom/post/subscription";
import InfiniteScroll from "react-infinite-scroll-component";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  if (!user) return { notFound: true };
  const resp = await API.graphql({
    query: getPostByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 6,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const userList = await API.graphql({
    query: listUsersbyFollowed,
    variables: {
      user_id: query.userId,
      limit: 6,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const userComments = await API.graphql({
    query: listCommentByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
      limit: 10,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const userTotals = await API.graphql({
    query: getUserTotal,
    variables: {
      user_id: query.userId,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  return {
    props: {
      ssrData: {
        posts: getReturnData(resp),
        userFollower: getReturnData(userList),
        userComment: getReturnData(userComments),
        userTotals: getReturnData(userTotals),
      },
    },
  };
}

const Dashboard = ({ ssrData }) => {
  const router = useRouter();
  const { isLogged, user } = useUser();

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInfo] = useState(ssrData.userTotals);

  const [followedUsers, setFollowedUsers] = useState(
    ssrData.userFollower.items
  );
  const [userComments, setUserComments] = useState(ssrData.userComment.items);
  const [posts, setPosts] = useState(ssrData.posts.items);
  const [subscripedPost, setSubscripedPost] = useState(0);
  const subscriptions = {};
  const totalReaction =
    userInfo?.comment_reactions +
    userInfo?.post_reactions +
    userInfo?.post_items_reactions;

  const stats = [
    {
      id: 0,
      icon: "icon-fi-rs-aura",
      number: user?.aura,
      text: "Нийт аура",
      bgcolor: "",
      color: "",
    },
    {
      id: 1,
      icon: "icon-fi-rs-rock-f",
      number: totalReaction,
      text: "Нийт саак",
      bgcolor: "bg-caak-sweetfrosting",
      color: "text-caak-cookiedough",
    },
    {
      id: 2,
      icon: "icon-fi-rs-comment-f",
      number: userComments?.length,
      text: "Нийт сэтгэгдэл",
      bgcolor: "bg-caak-placeboblue",
      color: "text-caak-buttonblue",
    },
    {
      id: 3,
      icon: "icon-fi-rs-view",
      number: userInfo?.post_views,
      text: "Нийт пост үзсэн",
      bgcolor: "bg-caak-errigalwhite",
      color: "text-caak-darkBlue",
    },
  ];

  const dashMenu = [
    {
      id: 0,
      name: "Бүх постууд",
      icon: "icon-fi-rs-list-grid-o",
    },
    {
      id: 1,
      name: "Дагагчид",
      icon: "icon-fi-rs-friends-o",
    },
    {
      id: 2,
      name: "Сэтгэгдэл",
      icon: "icon-fi-rs-comment-o",
    },
  ];

  const [nextPosts] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 5,
    },
    nextToken: ssrData.posts.nextToken,
  });
  const [nextComments] = useListPager({
    query: listCommentByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      limit: 10,
    },
    nextToken: ssrData.userComment.nextToken,

    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const [nextFollowers] = useListPager({
    query: listUsersbyFollowed,
    variables: {
      user_id: router.query.userId,
      limit: 6,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    nextToken: ssrData.userFollower.nextToken,
  });

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
  const fetchComments = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextComments();
        if (resp) {
          setUserComments((nextComments) => [...nextComments, ...resp]);
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
  const fetchFollowers = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextFollowers();
        if (resp) {
          setUserComments((nextComments) => [...nextComments, ...resp]);
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
          // setRender(render + 1);
        }
      }
    }
    // eslint-disable-next-line
  }, [subscripedPost]);

  useEffect(() => {
    subscrip();
    fetchPosts();
    setLoaded(true);
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };

    // eslint-disable-next-line
  }, []);

  return isLogged && loaded ? (
    <div className="max-w-[1240px] mx-auto flex flex-col justify-center   mt-[50px]">
      <div className="flex items-center mb-[40px]">
        <span
          onClick={() => router.back()}
          className="icon-fi-rs-back bg-caak-titaniumwhite flex items-center justify-center rounded-full cursor-pointer mr-5"
          style={{ height: "48px", width: "48px" }}
        />
        <div className={"w-[52px] h-[52px] mr-[8px] relative"}>
          <Image
            className=" bg-white rounded-full"
            src={
              user?.pic ? getFileUrl(user?.pic) : getGenderImage(user?.gender)
            }
            width={52}
            height={52}
            layout="fixed"
            //   objectFit={"cover"}
            alt="#"
          />
        </div>
        <div className="text-2xl font-semibold text-caak-generalblack mr-1">
          @{user?.nickname}
        </div>
        <span className="icon-fi-rs-verified" />
      </div>
      <div className="mb-[14px] font-inter font-semibold text-18px text-caak-generalblack">
        Дашбоард
      </div>
      <div className="flex">
        {stats.map((stat, index) => {
          return (
            <StatsItem
              key={index}
              id={index}
              icon={stat.icon}
              number={stat.number}
              text={stat.text}
              color={stat.color}
              bgcolor={stat.bgcolor}
            />
          );
        })}
      </div>
      <div className="flex mt-[25px] ">
        <div
          className={
            "flex  rounded-lg border border-caak-titaniumwhite bg-caak-emptiness  min-w-[290px] h-full mr-[20px] "
          }
        >
          <div className="flex flex-col mt-[28px] ml-[32px]">
            {dashMenu.map((menu, index) => {
              return (
                <div
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center mb-[28px] cursor-pointer`}
                  key={index}
                >
                  <span
                    className={` ${menu.icon} ${
                      activeIndex === index
                        ? "text-caak-primary"
                        : "text-caak-generalblack"
                    } text-xl `}
                  />
                  <p
                    className={`ml-3 text-base font-inter font-medium text-caak-generalblack ${
                      activeIndex === index
                        ? "text-caak-primary"
                        : "text-caak-generalblack"
                    }`}
                  >
                    {menu.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="font-inter font-semibold text-20px text-caak-generalblack">
              {dashMenu[activeIndex].name}
            </div>
            <div className="flex rounded-lg border border-caak-titaniumwhite mr-[20px] bg-white h-[36px] items-center">
              <div className="flex items-center  mx-[12px] my-[10px]">
                <p className="text-14px font-normal  text-caak-generalblack font-inter mr-[13px]">
                  Сүүлд нэмэгдсэн
                </p>
                <span className="icon-fi-rs-triangle text-14px" />
              </div>
            </div>
          </div>
          <div
            className={
              "flex flex-col rounded-lg  bg-caak-emptiness mt-[15px] pl-[30px] pr-[30px] pt-[30px] mb-[20px]"
            }
          >
            {activeIndex === 0 ? (
              <InfiniteScroll
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={true}
                loader={
                  <Loader
                    containerClassName={`self-center w-full ${
                      loading ? "" : "hidden"
                    }`}
                    className={`bg-caak-primary`}
                  />
                }
                endMessage={<h4>Nothing more to show</h4>}
              >
                {posts.map((post, index) => {
                  return (
                    <DashList
                      key={index}
                      imageSrc={post?.items?.items[0]?.file}
                      post={post}
                      className="ph:mb-4 sm:mb-4"
                    />
                  );
                })}
              </InfiniteScroll>
            ) : null}
            {activeIndex === 1 ? (
              <InfiniteScroll
                dataLength={followedUsers.length}
                next={fetchFollowers}
                hasMore={true}
                loader={
                  <Loader
                    containerClassName={`self-center w-full ${
                      loading ? "" : "hidden"
                    }`}
                    className={`bg-caak-primary`}
                  />
                }
                endMessage={<h4>Nothing more to show</h4>}
              >
                <div className=" flex flex-row flex-wrap ">
                  {followedUsers.map((data, index) => {
                    return (
                      <FollowerList
                        key={index}
                        imageSrc={data?.cover_pic}
                        followedUser={data}
                        followedUsers={followedUsers}
                        setFollowedUsers={setFollowedUsers}
                      />
                    );
                  })}
                </div>
              </InfiniteScroll>
            ) : null}

            {activeIndex === 2
              ? userComments.length > 0 && (
                  <InfiniteScroll
                    dataLength={userComments.length}
                    next={fetchComments}
                    hasMore={true}
                    loader={
                      <Loader
                        containerClassName={`self-center w-full ${
                          loading ? "" : "hidden"
                        }`}
                        className={`bg-caak-primary`}
                      />
                    }
                    endMessage={<h4>Nothing more to show</h4>}
                  >
                    {userComments.map((comment, index) => {
                      return (
                        <CommentList
                          key={index}
                          index={index}
                          imageSrc={comment?.post?.items?.items[0]?.file}
                          comment={comment}
                          userComments={userComments}
                          setUserComments={setUserComments}
                          className="ph:mb-4 sm:mb-4"
                        />
                      );
                    })}
                  </InfiniteScroll>
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Dashboard;
