import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StatsItem from "../../../src/components/stats";
import Image from "next/image";

import { withSSRContext } from "aws-amplify";
import {
  checkUser,
  generateFileUrl,
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
import API from "@aws-amplify/api";
import { onPostByUser } from "../../../src/graphql-custom/post/subscription";
import Divider from "../../../src/components/divider";
import GroupPostItem from "../../../src/components/group/GroupPostItem";
import useUpdateEffect from "../../../src/hooks/useUpdateEffect";
import Consts from "../../../src/utility/Consts";
import Head from "next/head";
import InfinitScroller from "../../../src/components/layouts/extra/InfinitScroller";
import userVerifiedSvg from "../../../public/assets/images/fi-rs-awarded.svg";
import { useWrapper } from "../../../src/context/wrapperContext";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  if (!user) return { notFound: true };
  if (user.attributes.sub !== query.userId) return { notFound: true };
  const resp = await API.graphql({
    query: getPostByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 3,
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
  
  const [userTotals, setUserTotals] = useState(ssrData.userTotals);
  const [followedUsers, setFollowedUsers] = useState({
    items: [],
    nextToken: "",
  });
  const [userComments, setUserComments] = useState({
    items: [],
    nextToken: "",
  });
  const [posts, setPosts] = useState(ssrData.posts);
  const [pendingPosts, setPendingPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [render, setRender] = useState(0);

  const [archivedPosts, setArchivedPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [subscripedPost, setSubscripedPost] = useState(0);
  const subscriptions = {};
  const [totalReaction] = useState(
    userTotals?.comment_reactions +
      userTotals?.post_reactions +
      userTotals?.post_items_reactions
  );
  const { setNavBarTransparent } = useWrapper();
  const stats = [
    {
      id: 0,
      icon: "icon-fi-rs-aura-f",
      number: user?.aura,
      text: "Аура",
      bgcolor: "",
      gradient: "auraBgGradient",
      color: "auraGradient",
    },
    {
      id: 1,
      icon: "icon-fi-rs-post-f",
      number: userTotals?.confirmed,
      text: "Нийт пост",
      bgcolor: "bg-caak-errigalwhite",
      color: "text-caak-darkBlue",
    },
    {
      id: 2,
      icon: "icon-fi-rs-rock-f",
      number: totalReaction,
      text: "Саак",
      bgcolor: "bg-caak-sweetfrosting",
      color: "text-caak-uclagold",
    },
    {
      id: 3,
      icon: "icon-fi-rs-comment-f",
      number: userTotals.comments,
      text: "Сэтгэгдэл",
      bgcolor: "bg-caak-placeboblue",
      color: "text-caak-buttonblue",
    },
  ];

  const dashMenu = [
    {
      id: 0,
      name: "Бүх постууд",
      icon: "icon-fi-rs-list-grid-o",
      length: userTotals.confirmed,
    },
    {
      id: 1,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending-posts",
      length: userTotals.pending,
    },
    {
      id: 2,
      name: "Архивлагдсан постууд",
      icon: "icon-fi-rs-folder-o",
      length: userTotals.archived,
    },
    {
      id: 3,
      name: "Дагагчид",
      icon: "icon-fi-rs-friends-o",
      length: userTotals.followers,
    },
    {
      id: 4,
      name: "Сэтгэгдэл",
      icon: "icon-fi-rs-comment-o",
      length: userTotals.comments,
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
    nextToken: ssrData.posts.nextToken,
    ssr: true,
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
    // ssr: true,
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
    // ssr: true,
  });
  const [nextFollowers] = useListPager({
    query: listUsersbyFollowed,
    variables: {
      user_id: router.query.userId,
      limit: 20,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    nextToken: followedUsers.nextToken,
    // ssr: true,
  });
  const fetchPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const resp = await nextPosts();
        if (resp) {
          setPosts((nextPost) => ({
            ...nextPost,
            items: [...nextPost.items, ...resp],
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
      query: onPostByUser,
      variables: {
        status: "CONFIRMED",
        user_id: user.id,
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
        user_id: user.id,
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

    subscriptions.onPostByUserDeleted = API.graphql({
      query: onPostByUser,
      variables: {
        status: "PENDING",
        user_id: user.id,
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
        if (postIndex === -1) {
          setPosts({
            ...posts,
            items: [subscripedPost.post, ...posts.items],
          });
          // pendingPosts.items.splice(pendingIndex, 1);
          // archivedPosts.items.splice(archivedIndex, 1);
          setUserTotals({
            ...userTotals,
            confirmed: userTotals.confirmed + 1,
            // pending: userTotals.pending !== 0 && userTotals.pending - 1,
            // archived: userTotals.archived !== 0 && userTotals.archived - 1,
          });
          setRender(render + 1);
        }
        if (pendingIndex > -1) {
          pendingPosts.splice(pendingIndex, 1);
          setRender(render + 1);
          if (userTotals.pending !== 0) {
            setUserTotals({
              ...userTotals,
              pending: userTotals.pending - 1,
            });
          }
        }
        if (archivedIndex > -1) {
          archivedPosts.splice(archivedIndex, 1);
          setRender(render + 1);
          if (userTotals.archived !== 0) {
            setUserTotals({
              ...userTotals,
              archived: userTotals.archived - 1,
            });
          }
        }
      }
      if (subscripedPost.post.status === "PENDING") {
        if (pendingIndex === -1) {
          setPendingPosts({
            ...pendingPosts,
            items: [subscripedPost.post, ...pendingPosts.items],
          });
          // userTotals.pending + 1;
          setRender(render + 1);

          setUserTotals({
            ...userTotals,
            pending: userTotals.pending + 1,
          });
        }
        if (archivedIndex > -1) {
          archivedPosts.items.splice(archivedIndex, 1);
          // userTotals.archived - 1;
          setRender(render + 1);
          if (userTotals.archived !== 0) {
            setUserTotals({
              ...userTotals,
              archived: userTotals.archived - 1,
            });
          }
        }
        if (postIndex > -1) {
          posts.items.splice(postIndex, 1);
          // userTotals.confirmed - 1;
          setRender(render + 1);
          if (userTotals.confirmed !== 0) {
            setUserTotals({
              ...userTotals,
              confirmed: userTotals.confirmed - 1,
            });
          }
        }
      }
      if (subscripedPost.post.status === "ARCHIVED") {
        if (archivedIndex === -1) {
          setArchivedPosts({
            ...archivedPosts,
            items: [subscripedPost.post, ...archivedPosts.items],
          });
          // userTotals.archived + 1;
          setUserTotals({
            ...userTotals,
            archived: userTotals.archived + 1,
          });
          setRender(render + 1);
        }
        if (postIndex > -1) {
          posts.items.splice(postIndex, 1);
          // userTotals.pending - 1;
          if (userTotals.confirmed !== 0) {
            setUserTotals({
              ...userTotals,
              confirmed: userTotals.confirmed - 1,
            });
          }
          setRender(render + 1);
        }
        if (pendingIndex > -1) {
          pendingPosts.items.splice(pendingIndex, 1);
          // userTotals.pending - 1;
          if (userTotals.pending !== 0) {
            setUserTotals({
              ...userTotals,
              pending: userTotals.pending - 1,
            });
          }
          setRender(render + 1);
        }
      }
    }
    // eslint-disable-next-line
  }, [subscripedPost]);

  useEffect(() => {
    setNavBarTransparent(false);
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
    <>
      <Head>
        <title>
          {user.nickname} / дашбоард - {Consts.siteMainTitle}
        </title>
      </Head>
      <div className="px-[8px] lg:px-0 max-w-[1240px] mx-auto flex flex-col justify-center pb-[200px]  mt-[50px] pt-[54px]">
        <div className="flex items-center mb-[40px]">
          <span
            onClick={() => router.back()}
            className="icon-fi-rs-back bg-caak-titaniumwhite flex items-center justify-center rounded-full cursor-pointer mr-5"
            style={{ height: "48px", width: "48px" }}
          />
          <div className={"w-[52px] h-[52px] mr-[8px] relative"}>
            <img
              className=" bg-white rounded-full object-cover"
              src={
                user?.pic
                  ? generateFileUrl(user?.pic)
                  : getGenderImage(user?.gender).src
              }
              width={52}
              height={52}
              // objectFit={"cover"}
              alt="#"
            />
          </div>
          <div className="text-2xl font-semibold text-caak-generalblack mr-1">
            @{user?.nickname}
          </div>
          {user.verified && (
            <img alt={""} className={"h-[22px]"} src={userVerifiedSvg.src} />
          )}
        </div>
        <div className="mb-[14px] font-inter font-semibold text-18px text-caak-generalblack">
          Дашбоард
        </div>
        <div className="flex">
          {stats.map((stat, index) => {
            return <StatsItem key={index} id={index} stat={stat} />;
          })}
        </div>
        <div className="flex flex-col xl:flex-row mt-[25px] ">
          <div
            className={
              "flex  rounded-lg border border-caak-titaniumwhite bg-caak-emptiness  min-w-[290px] h-full mr-0 lg:mr-[20px] "
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
            <div className="flex flex-wrap justify-between mt-[10px]">
              <div className="flex items-center my-[10px] md:my-0">
                <p
                  className={` text-[14px] font-inter tracking-[0.21px] leading-[16px] font-medium mr-[10px] `}
                >
                  {dashMenu[activeIndex].name}
                </p>
                <div className="flex justify-center items-center text-13px h-[16px] w-[35px] bg-opacity-20 bg-caak-bleudefrance  font-inter font-medium rounded-lg ">
                  <p className="text-caak-bleudefrance text-opacity-100 ">
                    {dashMenu[activeIndex].length}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap md:mb-0 mb-[10px]">
                <div className={"flex flex-row items-center"}>
                  <p className="mr-[15px] text-14px font-normal  text-caak-generalblack font-inter">
                    Хандалт
                  </p>

                  <div className="flex rounded-lg border border-caak-titaniumwhite mr-[20px] bg-white h-[36px] items-center">
                    <div className="flex items-center  mx-[12px] my-[10px]">
                      <p className="text-14px font-normal  text-caak-generalblack font-inter mr-[13px]">
                        Бүгд
                      </p>
                      <span className="icon-fi-rs-triangle text-14px" />
                    </div>
                  </div>
                </div>
                <div className={"flex flex-row items-center"}>
                  <p className="mr-[15px] text-14px font-normal  text-caak-generalblack font-inter">
                    Огноо
                  </p>

                  <div className="flex rounded-lg border border-caak-titaniumwhite mr-[20px] bg-white h-[36px] items-center">
                    <div className="flex items-center  mx-[12px] my-[10px]">
                      <p className="text-14px font-normal  text-caak-generalblack font-inter mr-[13px]">
                        Сүүлд нэмэгдсэн
                      </p>
                      <span className="icon-fi-rs-triangle text-14px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                "flex flex-col rounded-lg  bg-caak-emptiness mt-[15px] px-[10px] md:px-[30px] pt-[6px] md:pt-[16px] mb-[20px] overflow-x-scroll"
              }
            >
              {activeIndex === 0 ? (
                <div className="flex flex-col">
                  <div className="mb-[13px] hidden md:flex ">
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
                  <Divider
                    className={"mb-[20px] bg-caak-titaniumwhite hidden md:flex"}
                  />
                  <InfinitScroller onNext={fetchPosts} loading={loading}>
                    {posts.items.length > 0 &&
                      posts.items.map((post, index) => {
                        return (
                          <DashList
                            key={index}
                            type={"user"}
                            imageSrc={post?.items?.items[0]?.file}
                            video={post?.items?.items[0]?.file?.type?.startsWith(
                              "video"
                            )}
                            post={post}
                            className="ph:mb-4 sm:mb-4"
                          />
                        );
                      })}
                  </InfinitScroller>
                </div>
              ) : null}

              {activeIndex === 1 ? (
                <div className="flex flex-col">
                  <div className="hidden md:flex mb-[13px]">
                    <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[355px]">
                      Пост
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[195px]">
                      Гишүүн
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[93px]">
                      Огноо
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack">
                      Үйлдэл
                    </p>
                  </div>
                  <Divider className={"hidden md:flex mb-[20px]"} />
                  <InfinitScroller onNext={fetchPending} loading={loading}>
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
                  </InfinitScroller>
                </div>
              ) : null}
              {activeIndex === 2 ? (
                <div className="flex flex-col">
                  <div className="hidden md:flex mb-[13px]">
                    <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[355px]">
                      Пост
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[195px]">
                      Гишүүн
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[93px]">
                      Огноо
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack">
                      Үйлдэл
                    </p>
                  </div>
                  <Divider className={"hidden md:flex mb-[20px]"} />
                  <InfinitScroller onNext={fetchArchived} loading={loading}>
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
                  </InfinitScroller>
                </div>
              ) : null}
              {activeIndex === 3 ? (
                <InfinitScroller onNext={fetchFollowers} loading={loading}>
                  <div className="mt-[14px] flex flex-row flex-wrap justify-between">
                    {followedUsers.items.map((data, index) => {
                      return (
                        <FollowerList
                          key={index}
                          imageSrc={data?.pic}
                          followedUser={data}
                          followedUsers={followedUsers}
                          setFollowedUsers={setFollowedUsers}
                        />
                      );
                    })}
                  </div>
                </InfinitScroller>
              ) : null}

              {activeIndex === 4 ? (
                <div className="flex flex-col">
                  <div className="hidden md:flex mb-[13px] ">
                    <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[266px]">
                      Пост
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[240px]">
                      Сэтгэгдэл
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[80px]">
                      Огноо
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack">
                      Үйлдэл
                    </p>
                  </div>
                  <Divider
                    className={"hidden md:flex mb-[20px] bg-caak-titaniumwhite"}
                  />
                  <InfinitScroller onNext={fetchComments} loading={loading}>
                    {userComments.items.map((comment, index) => {
                      return (
                        <CommentList
                          key={index}
                          index={index}
                          imageSrc={comment?.post?.items?.items[0]?.file}
                          video={comment?.post?.items.items[0]?.file?.type?.startsWith(
                            "video"
                          )}
                          comment={comment}
                          userComments={userComments.items}
                          setUserComments={setUserComments}
                          className="ph:mb-4 sm:mb-4"
                        />
                      );
                    })}
                  </InfinitScroller>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Dashboard;
