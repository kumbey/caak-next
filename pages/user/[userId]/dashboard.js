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
import Divider from "../../../src/components/divider";
import GroupPostItem from "../../../src/components/group/GroupPostItem";
import useUpdateEffect from "../../../src/hooks/useUpdateEffect";

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
      limit: 20,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const pendingPosts = await API.graphql({
    query: getPostByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "PENDING" } },
      limit: 20,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const archivedPosts = await API.graphql({
    query: getPostByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "ARCHIVED" } },
      limit: 20,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const followedUsers = await API.graphql({
    query: listUsersbyFollowed,
    variables: {
      user_id: query.userId,
      limit: 20,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const userComments = await API.graphql({
    query: listCommentByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
      limit: 20,
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
        pendingPosts: getReturnData(pendingPosts),
        archivedPosts: getReturnData(archivedPosts),
        followedUsers: getReturnData(followedUsers),
        userComments: getReturnData(userComments),
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
  const [activeIndex, setActiveIndex] = useState(
    router.query.activeIndex ? parseInt(router.query.activeIndex) : 0
  );
  const [userTotals] = useState(ssrData.userTotals);
  const [followedUsers, setFollowedUsers] = useState(ssrData.followedUsers);
  const [userComments, setUserComments] = useState(ssrData.userComments);
  const [posts, setPosts] = useState(ssrData.posts);
  const [pendingPosts, setPendingPosts] = useState(
    ssrData.pendingPosts ? ssrData.pendingPosts : []
  );
  const [render, setRender] = useState(0);

  const [archivedPosts, setArchivedPosts] = useState(ssrData.archivedPosts);
  const [subscripedPost, setSubscripedPost] = useState(0);
  const subscriptions = {};
  const totalReaction =
    userTotals?.comment_reactions +
    userTotals?.post_reactions +
    userTotals?.post_items_reactions;

  const totalPost = userTotals?.confirmed;
  const totalMember = userTotals?.followers;
  const totalComment = userTotals?.comments;
  const totalArchived = userTotals?.archived;
  const totalPending = userTotals?.pending;

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
      number: totalComment,
      text: "Нийт сэтгэгдэл",
      bgcolor: "bg-caak-placeboblue",
      color: "text-caak-buttonblue",
    },
    {
      id: 3,
      icon: "icon-fi-rs-view",
      number: userTotals?.post_views,
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
      length: totalPost,
    },
    {
      id: 1,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending",
      length: totalPending,
    },
    {
      id: 2,
      name: "Архивлагдсан постууд",
      icon: "icon-fi-rs-archive",
      length: totalArchived,
    },
    {
      id: 3,
      name: "Дагагчид",
      icon: "icon-fi-rs-friends-o",
      length: totalMember,
    },
    {
      id: 4,
      name: "Сэтгэгдэл",
      icon: "icon-fi-rs-comment-o",
      length: totalComment,
    },
  ];

  const [nextPosts] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 20,
    },
    nextToken: posts.nextToken,
  });
  const [nextPending] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "PENDING" } },
      limit: 20,
    },
    nextToken: pendingPosts.nextToken,
  });
  const [nextArchived] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "ARCHIVED" } },
      limit: 20,
    },
    nextToken: archivedPosts.nextToken,
  });
  const [nextComments] = useListPager({
    query: listCommentByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      limit: 20,
    },
    nextToken: userComments.nextToken,

    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const [nextFollowers] = useListPager({
    query: listUsersbyFollowed,
    variables: {
      user_id: router.query.userId,
      limit: 20,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    nextToken: followedUsers.nextToken,
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

  const fetchPending = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextPending();
        if (resp) {
          setPendingPosts((nextPending) => ({
            ...nextPending,
            items: [...nextPending.items, ...resp],
          }));
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
  const fetchArchived = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextArchived();
        if (resp) {
          setArchivedPosts((nextArchived) => ({
            ...nextArchived,
            items: [...nextArchived.items, ...resp],
          }));
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
          setUserComments((nextComments) => ({
            ...nextComments,
            items: [...nextComments.items, ...resp],
          }));
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
          setFollowedUsers((nextFollowers) => ({
            ...nextFollowers,
            items: [...nextFollowers.items, ...resp],
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

  useUpdateEffect(() => {
    if (subscripedPost) {
      const pendingIndex = pendingPosts.items.findIndex(
        (post) => post.id === subscripedPost.post.id
      );
      const postIndex = posts.items.findIndex(
        (post) => post.id === subscripedPost.post.id
      );
      const archivedIndex = archivedPosts.items.findIndex(
        (post) => post.id === subscripedPost.post.id
      );
      if (subscripedPost.post.status === "CONFIRMED") {
        if (subscripedPost.type === "add") {
          if (postIndex <= -1) {
            setPosts({
              ...posts,
              items: [subscripedPost.post, ...posts.items],
            });
            pendingPosts.items.splice(pendingIndex, 1);
            archivedPosts.items.splice(archivedIndex, 1);
            setRender(render + 1);
          }
        } else {
          if (postIndex > -1) {
            posts.splice(postIndex, 1);
            setRender(render + 1);
          }
        }
      }
      if (subscripedPost.post.status === "PENDING") {
        if (pendingIndex === -1) {
          setPendingPosts({
            ...pendingPosts,
            items: [subscripedPost.post, ...pendingPosts.items],
          });
        }
        if (archivedIndex > -1) {
          archivedPosts.items.splice(archivedIndex, 1);
        }
        if (postIndex > -1) {
          posts.items.splice(postIndex, 1);
          setRender(render + 1);
        }
      }
      if (subscripedPost.post.status === "ARCHIVED") {
        if (archivedIndex === -1) {
          setArchivedPosts({
            ...archivedPosts,
            items: [subscripedPost.post, ...archivedPosts.items],
          });
        }
        if (pendingIndex > -1) {
          pendingPosts.items.splice(pendingIndex, 1);
          setRender(render + 1);
        }
      }
    }
    // eslint-disable-next-line
  }, [subscripedPost]);

  useEffect(() => {
    subscrip();

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
    <div className=" max-w-[1240px] mx-auto flex flex-col justify-center   mt-[50px]">
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
            <div className="flex items-center">
              <div className="font-inter font-normal text-16px text-caak-generalblack mr-[10px]">
                {dashMenu[activeIndex].name}
              </div>
              <div className="text-13px h-[16px] w-[35px] bg-opacity-20 bg-caak-bleudefrance  font-inter font-medium rounded-lg ">
                <p className="text-caak-bleudefrance text-opacity-100 mx-2 ">
                  {dashMenu[activeIndex].length}
                </p>
              </div>
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
              <div className="flex flex-col">
                <div className="flex mb-[16px]">
                  <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[289px]">
                    Пост
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack mr-[192px]">
                    Групп
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack mr-[161px]">
                    Хандалт
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack">
                    Үйлдэл
                  </p>
                </div>
                <Divider className={"mb-[16px]"} />
                <InfiniteScroll
                  dataLength={posts.items.length}
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
                  {posts.items.map((post, index) => {
                    return (
                      <DashList
                        key={index}
                        type={"user"}
                        imageSrc={post?.items?.items[0]?.file}
                        post={post}
                        className="ph:mb-4 sm:mb-4"
                      />
                    );
                  })}
                </InfiniteScroll>
              </div>
            ) : null}

            {activeIndex === 1 ? (
              <div className="flex flex-col">
                <div className="flex mb-[16px]">
                  <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[320px]">
                    Пост
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack mr-[148px]">
                    Гишүүн
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack mr-[46px]">
                    Огноо
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack">
                    Үйлдэл
                  </p>
                </div>
                <Divider className={"mb-[16px]"} />
                <InfiniteScroll
                  dataLength={pendingPosts.items.length}
                  next={fetchPending}
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
                  {pendingPosts.items.length > 0 &&
                    pendingPosts.items.map((pendingPost, index) => {
                      return (
                        <GroupPostItem
                          type={"user"}
                          key={index}
                          imageSrc={pendingPost?.items?.items[0]?.file}
                          video={pendingPost?.items?.items[0]?.file?.type?.startsWith(
                            "video"
                          )}
                          post={pendingPost}
                          className="ph:mb-4 sm:mb-4"
                        />
                      );
                    })}
                </InfiniteScroll>
              </div>
            ) : null}
            {activeIndex === 2 ? (
              <div className="flex flex-col">
                <div className="flex mb-[16px]">
                  <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[320px]">
                    Пост
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack mr-[148px]">
                    Гишүүн
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack mr-[46px]">
                    Огноо
                  </p>
                  <p className="font-inter font-normal text-14px text-caak-generalblack">
                    Үйлдэл
                  </p>
                </div>
                <Divider className={"mb-[16px]"} />
                <InfiniteScroll
                  dataLength={archivedPosts.items.length}
                  next={fetchArchived}
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
                  {archivedPosts.items.length > 0 &&
                    archivedPosts.items.map((archivedPost, index) => {
                      return (
                        <GroupPostItem
                          type={"user"}
                          key={index}
                          imageSrc={archivedPost?.items?.items[0]?.file}
                          video={archivedPost?.items?.items[0]?.file?.type?.startsWith(
                            "video"
                          )}
                          post={archivedPost}
                          className="ph:mb-4 sm:mb-4"
                        />
                      );
                    })}
                </InfiniteScroll>
              </div>
            ) : null}
            {activeIndex === 3 ? (
              <InfiniteScroll
                dataLength={followedUsers.items.length}
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
                <div className=" flex flex-row flex-wrap justify-between">
                  {followedUsers.items.map((data, index) => {
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

            {activeIndex === 4
              ? userComments.items.length > 0 && (
                  <InfiniteScroll
                    dataLength={userComments.items.length}
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
                    {userComments.items.map((comment, index) => {
                      return (
                        <CommentList
                          key={index}
                          index={index}
                          imageSrc={comment?.post?.items?.items[0]?.file}
                          comment={comment}
                          userComments={userComments.items}
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
