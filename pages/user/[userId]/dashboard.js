import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StatsItem from "../../../src/components/stats";

import { withSSRContext } from "aws-amplify";
import {
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
import GroupPostItem from "../../../src/components/group/GroupPostItem";
import useUpdateEffect from "../../../src/hooks/useUpdateEffect";
import Consts from "../../../src/utility/Consts";
import Head from "next/head";
import InfinitScroller from "../../../src/components/layouts/extra/InfinitScroller";
import userVerifiedSvg from "../../../public/assets/images/fi-rs-awarded.svg";
import { useWrapper } from "../../../src/context/wrapperContext";
import ReportedPostItem from "../../../src/components/group/ReportedPostItem";
import BoostedPostItem from "../../../src/components/group/BoostedPostItem";
import { listBoostedPostByStatus } from "../../../src/graphql-custom/boost/queries";
import Link from "next/link";

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
  const [reportedPosts, setReportedPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [boostedPosts, setBoostedPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [draftedPosts, setDraftedPosts] = useState({
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
      name: "Ноорог",
      icon: "icon-fi-rs-edit",
      length: draftedPosts.items.length,
    },
    {
      id: 3,
      name: "Архивлагдсан постууд",
      icon: "icon-fi-rs-folder-o",
      length: userTotals.archived,
    },
    {
      id: 4,
      name: "Бүүстэлсэн постууд",
      icon: "icon-fi-rs-rocket-o",
      length: boostedPosts.items.length,
    },
    {
      id: 5,
      name: "Дагагчид",
      icon: "icon-fi-rs-friends-o",
      length: userTotals.followers,
    },
    {
      id: 6,
      name: "Сэтгэгдэл",
      icon: "icon-fi-rs-comment-o",
      length: userTotals.comments,
    },
    {
      id: 7,
      name: "Репортлогдсон постууд",
      icon: "icon-fi-rs-flag",
      length: userTotals.reported,
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
  const [nextDrafted] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "DRAFT" } },
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
  const [nextReported] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "REPORTED" } },
      limit: 20,
    },
    nextToken: pendingPosts.nextToken,
    // ssr: true,
  });
  const [nextBoosted] = useListPager({
    query: listBoostedPostByStatus,
    variables: {
      status: "ACTIVE",
      sortDirection: "DESC",
      filter: { user_id: { eq: router.query.userId } },
    },
    nextToken: boostedPosts.nextToken,
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
  const fetchDrafted = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextDrafted();
        if (resp) {
          setDraftedPosts((nextDrafted) => ({
            ...nextDrafted,
            items: [...nextDrafted.items, ...resp],
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
  const fetchReported = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextReported();
        if (resp) {
          setReportedPosts((nextReported) => ({
            ...nextReported,
            items: [...nextReported.items, ...resp],
          }));
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
  const fetchBoosted = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextBoosted();
        if (resp) {
          setBoostedPosts((nextBoosted) => ({
            ...nextBoosted,
            items: [...nextBoosted.items, ...resp],
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

  useEffect(() => {
    if (window) {
      if (window.scrollY < 300) {
        window.scrollTo({
          left: 0,
          top: 400,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

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
          <img
            className="bg-white w-[52px] h-[52px] mr-[8px] rounded-full object-cover"
            src={
              user?.pic
                ? generateFileUrl(user?.pic)
                : getGenderImage(user?.gender).src
            }
            alt="#"
          />
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
            </div>
            <div
              className={
                "flex flex-col rounded-lg  bg-caak-emptiness mt-[15px] px-[10px] md:px-[30px] pt-[6px] md:pt-[16px] mb-[20px] overflow-x-auto"
              }
            >
              {activeIndex === 0 ? (
                <div className="flex flex-col">
                  <div className="mb-[13px] hidden md:flex ">
                    <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[230px]">
                      Пост
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[250px]">
                      Групп
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[175px]">
                      Хандалт
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack">
                      Үйлдэл
                    </p>
                  </div>

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
                  {pendingPosts.items.length > 0 ? (
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
                  ) : null}
                  <InfinitScroller onNext={fetchPending} loading={loading}>
                    {pendingPosts.items.length > 0 ? (
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
                      })
                    ) : (
                      <div className="flex items-center justify-center h-80">
                        <p className="text-sm">
                          Уучлаарай та пост илгээгээгүй байна.&nbsp;
                          <strong
                            onClick={() =>
                              router.push("/post/add", undefined, {
                                shallow: false,
                              })
                            }
                            className="text-[#0000EE] cursor-pointer"
                          >
                            ЭНД &nbsp;
                          </strong>
                          дарж пост оруулна уу!
                        </p>
                      </div>
                    )}
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
                  <InfinitScroller onNext={fetchDrafted} loading={loading}>
                    {draftedPosts.items.length > 0 &&
                    draftedPosts.items.map((draftedPost, index) => {
                      return (
                        <GroupPostItem
                          type={"user"}
                          key={index}
                          imageSrc={draftedPost?.items?.items[0]?.file}
                          video={draftedPost?.items?.items[0]?.file?.type?.startsWith(
                            "video"
                          )}
                          post={draftedPost}
                          className="ph:mb-4 sm:mb-4"
                        />
                      );
                    })}
                  </InfinitScroller>
                </div>
              ) : null}
              {activeIndex === 3 ? (
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
              {activeIndex === 4 ? (
                <div className="flex flex-col">
                  <InfinitScroller onNext={fetchBoosted} loading={loading}>
                    {boostedPosts.items.length > 0 ? (
                      <table className="w-full table">
                        <thead className="">
                          <tr className="">
                            <th className="w-[250px] max-w-[250px] text-left font-inter font-normal text-14px text-caak-generalblack">
                              Пост
                            </th>
                            <th className="text-left w-16  font-inter font-normal text-14px text-caak-generalblack">
                              Хоног
                            </th>
                            <th className="text-left w-36  font-inter font-normal text-14px text-caak-generalblack">
                              Эхлэсэн огноо
                            </th>
                            <th className="text-left w-36  font-inter font-normal text-14px text-caak-generalblack">
                              Дуусах огноо
                            </th>
                            <th className="text-left font-inter font-normal text-14px text-caak-generalblack">
                              Хандалт
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {boostedPosts.items.length > 0 &&
                            boostedPosts.items.map((boostedPost, index) => {
                              return (
                                <tr
                                  key={index}
                                  className="border-t border-b mb-2"
                                >
                                  <BoostedPostItem
                                    type={"user"}
                                    key={index}
                                    imageSrc={
                                      boostedPost?.post?.items?.items[0]?.file
                                    }
                                    video={boostedPost?.post?.items?.items[0]?.file?.type?.startsWith(
                                      "video"
                                    )}
                                    post={boostedPost}
                                    className="ph:mb-4 sm:mb-4"
                                  />
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="flex items-center justify-center h-80">
                        <p className="text-sm">
                          Уучлаарай та одоогоор пост бүүстлээгүй байна.&nbsp;
                          <strong
                            onClick={() =>
                              router.push("/help/ads", undefined, {
                                shallow: false,
                              })
                            }
                            className="text-[#0000EE] cursor-pointer"
                          >
                            ЭНД &nbsp;
                          </strong>
                          дарж дэлгэрэнгүй мэдээлэл авна уу!
                        </p>
                      </div>
                    )}
                  </InfinitScroller>
                </div>
              ) : null}
              {activeIndex === 5 ? (
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

              {activeIndex === 6 ? (
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
              {activeIndex === 7 ? (
                <div className="flex flex-col">
                  <InfinitScroller onNext={fetchReported} loading={loading}>
                    <table className="w-full table">
                      <thead className="">
                        <tr className="">
                          <th className="min-w-[200px] text-left w-1/3 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                            Пост
                          </th>
                          <th className="text-left w-1/6 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                            Групп
                          </th>
                          <th className="text-left w-1/6 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                            Репорт
                          </th>
                          <th className="text-left w-1/12 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                            Огноо
                          </th>
                          <th className="text-left w-1/12 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                            Үйлдэл
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportedPosts.items.length > 0 &&
                          reportedPosts.items.map((reportedPost, index) => {
                            return (
                              <tr
                                key={index}
                                className="border-t border-b mb-2"
                              >
                                <ReportedPostItem
                                  type={"user"}
                                  key={index}
                                  imageSrc={reportedPost?.items?.items[0]?.file}
                                  video={reportedPost?.items?.items[0]?.file?.type?.startsWith(
                                    "video"
                                  )}
                                  post={reportedPost}
                                  className="ph:mb-4 sm:mb-4"
                                />
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
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
