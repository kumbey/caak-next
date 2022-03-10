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

import {
  getUserTotal,
  listUsersbyFollowed,
} from "../../../src/graphql-custom/user/queries";
import { useUser } from "../../../src/context/userContext";
import Consts from "../../../src/utility/Consts";
import Head from "next/head";
import userVerifiedSvg from "../../../public/assets/images/fi-rs-awarded.svg";
import { useWrapper } from "../../../src/context/wrapperContext";
import useMediaQuery from "../../../src/components/navigation/useMeduaQuery";
import AccountHistoryInfinite from "../../../src/components/infiniteScrollers/accountHistoryInfinite";
import ReportedPostsInfinite from "../../../src/components/infiniteScrollers/reportedPostsInfinite";
import CommentsInfinite from "../../../src/components/infiniteScrollers/commentsInfinite";
import FollowersInfinite from "../../../src/components/infiniteScrollers/followersInfinite";
import BoostedPostsInfinite from "../../../src/components/infiniteScrollers/boostedPostsInfinite";
import ArchivedPostsInfinite from "../../../src/components/infiniteScrollers/archivedPostsInfinite";
import DraftedPostsInfinite from "../../../src/components/infiniteScrollers/draftedPostsInfinite";
import PendingPostsInfinite from "../../../src/components/infiniteScrollers/pendingPostsInfinite";
import ConfirmedPostsInfinite from "../../../src/components/infiniteScrollers/confirmedPostsInfinite";
import { listBoostedPostByStatus } from "../../../src/graphql-custom/boost/queries";
import { listCommentByUser } from "../../../src/graphql-custom/comment/queries";

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
  const isScreenXl = useMediaQuery("screen and (max-device-width: 1279px)");

  const { isLogged, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [archivedLoading, setArchivedLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [boostedLoading, setBoostedLoading] = useState(false);
  const [followedLoading, setFollowedLoading] = useState(false);
  const [reportedLoading, setReportedLoading] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    router.query.activeIndex ? parseInt(router.query.activeIndex) : 0
  );
  const [userTotals, setUserTotals] = useState(ssrData.userTotals);
  const [posts, setPosts] = useState(ssrData.posts);
  const [pendingPosts, setPendingPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [draftedPosts, setDraftedPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [archivedPosts, setArchivedPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [boostedPosts, setBoostedPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [userComments, setUserComments] = useState({
    items: [],
    nextToken: "",
  });
  const [followedUsers, setFollowedUsers] = useState({
    items: [],
    nextToken: "",
  });
  const [reportedPosts, setReportedPosts] = useState({
    items: [],
    nextToken: "",
  });
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
      text: "Нийт аура",
      bgcolor: "",
      gradient: "auraBgGradient",
      color: "auraGradient",
    },
    {
      id: 1,
      icon: "icon-fi-rs-megaphone",
      number: user?.balance?.balance ? user.balance.balance : 0,
      type: "money",
      text: "Caak Ads данс",
      bgcolor: "bg-caak-cottonboll",
      color: "text-caak-clearblue",
    },
    {
      id: 2,
      icon: "icon-fi-rs-post-f",
      number: localUserTotals?.confirmed,
      text: "Нийт пост",
      bgcolor: "bg-caak-errigalwhite",
      color: "text-caak-darkBlue",
    },
    {
      id: 3,
      icon: "icon-fi-rs-rock-f",
      number: totalReaction,
      text: "Нийт саак",
      bgcolor: "bg-caak-sweetfrosting",
      color: "text-caak-uclagold",
    },
  ];

  const dashMenu = [
    {
      id: 0,
      name: "Бүх постууд",
      icon: "icon-fi-rs-list-grid-o",
      length: localUserTotals.confirmed,
    },
    {
      id: 1,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending-posts",
      length: localUserTotals.pending,
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
      length: localUserTotals.archived,
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
      length: localUserTotals.followers,
    },
    {
      id: 6,
      name: "Сэтгэгдэл",
      icon: "icon-fi-rs-comment-o",
      length: localUserTotals.comments,
    },
    {
      id: 7,
      name: "Репортлогдсон постууд",
      icon: "icon-fi-rs-flag",
      length: localUserTotals.reported,
    },
    {
      id: 8,
      name: "Дансны хуулга",
      icon: "icon-fi-rs-invoice",
      length: 0,
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

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const resp = await nextPosts();
      if (resp) {
        setPosts((nextPost) => ({
          ...nextPost,
          items: [...nextPost.items, ...resp],
        }));
      }

      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
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
  const fetchPending = async () => {
    try {
      if (!pendingLoading) {
        setPendingLoading(true);
        const resp = await nextPending();
        if (resp) {
          setPendingPosts((nextPending) => ({
            ...nextPending,
            items: [...nextPending.items, ...resp],
          }));
        }

        setPendingLoading(false);
      }
    } catch (ex) {
      setPendingLoading(false);
      console.log(ex);
    }
  };

  const [nextDrafted] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "DRAFT" } },
      limit: 20,
    },
    nextToken: draftedPosts.nextToken,
  });
  const fetchDrafted = async () => {
    try {
      if (!draftLoading) {
        setDraftLoading(true);

        const resp = await nextDrafted();
        if (resp) {
          setDraftedPosts((nextDrafted) => ({
            ...nextDrafted,
            items: [...nextDrafted.items, ...resp],
          }));
        }

        setDraftLoading(false);
      }
    } catch (ex) {
      setDraftLoading(false);
      console.log(ex);
    }
  };
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
  const fetchArchived = async () => {
    try {
      if (!archivedLoading) {
        setArchivedLoading(true);
        const resp = await nextArchived();
        if (resp) {
          setArchivedPosts((nextArchived) => ({
            ...nextArchived,
            items: [...nextArchived.items, ...resp],
          }));
        }
        setArchivedLoading(false);
      }
    } catch (ex) {
      setArchivedLoading(false);
      console.log(ex);
    }
  };

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
  const fetchBoosted = async () => {
    try {
      if (!boostedLoading) {
        setBoostedLoading(true);
        const resp = await nextBoosted();
        if (resp) {
          setBoostedPosts((nextBoosted) => ({
            ...nextBoosted,
            items: [...nextBoosted.items, ...resp],
          }));
        }
        setBoostedLoading(false);
      }
    } catch (ex) {
      setBoostedLoading(false);
      console.log(ex);
    }
  };

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
  const fetchFollowers = async () => {
    try {
      if (!followedLoading) {
        setFollowedLoading(true);

        const resp = await nextFollowers();
        if (resp) {
          setFollowedUsers((nextFollowers) => ({
            ...nextFollowers,
            items: [...nextFollowers.items, ...resp],
          }));
        }

        setFollowedLoading(false);
      }
    } catch (ex) {
      setFollowedLoading(false);
      console.log(ex);
    }
  };

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
  const fetchComments = async () => {
    try {
      if (!commentsLoading) {
        setCommentsLoading(true);
        const resp = await nextComments();
        if (resp) {
          setUserComments((nextComments) => ({
            ...nextComments,
            items: [...nextComments.items, ...resp],
          }));
        }
        setCommentsLoading(false);
      }
    } catch (ex) {
      setCommentsLoading(false);
      console.log(ex);
    }
  };

  const [nextReported] = useListPager({
    query: getPostByUser,
    variables: {
      user_id: router.query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "REPORTED" } },
      limit: 20,
    },
    nextToken: reportedPosts.nextToken,
    // ssr: true,
  });
  const fetchReported = async () => {
    try {
      if (!reportedLoading) {
        setReportedLoading(true);

        const resp = await nextReported();
        if (resp) {
          setReportedPosts((nextReported) => ({
            ...nextReported,
            items: [...nextReported.items, ...resp],
          }));
        }

        setReportedLoading(false);
      }
    } catch (ex) {
      setReportedLoading(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    setNavBarTransparent(false);
    setLoaded(true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isScreenXl)
      if (window) {
        if (window.scrollY < 300) {
          window.scrollTo({
            left: 0,
            top: 400,
            behavior: "smooth",
          });
        }
      }
    //eslint-disable-next-line
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
                    onClick={() => {
                      setActiveIndex(index);
                      setLoading(false);
                    }}
                    className={`flex items-center mb-[12px] cursor-pointer`}
                    key={index}
                  >
                    <span
                      className={` ${menu.icon} ${
                        activeIndex === index
                          ? "text-caak-primary"
                          : "text-caak-generalblack"
                      } text-2xl `}
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
                  className={`text-[14px] font-inter tracking-[0.21px] leading-[16px] font-medium mr-[10px] `}
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
                "flex flex-col rounded-lg  bg-caak-emptiness mt-[15px] px-[10px] md:px-[20px] pt-[6px] md:pt-[16px] mb-[20px] overflow-x-auto"
              }
            >
              {activeIndex === 0 ? (
                <ConfirmedPostsInfinite
                  posts={posts}
                  setPosts={setPosts}
                  fetcher={fetchPosts}
                  loading={loading}
                  totals={userTotals}
                />
              ) : null}
              {activeIndex === 1 ? (
                <PendingPostsInfinite
                  posts={pendingPosts}
                  setPosts={setPendingPosts}
                  fetcher={fetchPending}
                  loading={pendingLoading}
                  totals={userTotals}
                />
              ) : null}
              {activeIndex === 2 ? (
                <DraftedPostsInfinite
                  posts={draftedPosts}
                  setPosts={setDraftedPosts}
                  fetcher={fetchDrafted}
                  loading={draftLoading}
                  totals={userTotals}
                />
              ) : null}
              {activeIndex === 3 ? (
                <ArchivedPostsInfinite
                  posts={archivedPosts}
                  setPosts={setArchivedPosts}
                  fetcher={fetchArchived}
                  loading={archivedLoading}
                  totals={userTotals}
                />
              ) : null}
              {activeIndex === 4 ? (
                <BoostedPostsInfinite
                  posts={boostedPosts}
                  setPosts={setBoostedPosts}
                  fetcher={fetchBoosted}
                  loading={boostedLoading}
                />
              ) : null}
              {activeIndex === 5 ? (
                <FollowersInfinite
                  fetcher={fetchFollowers}
                  loading={followedLoading}
                  followedUsers={followedUsers}
                  setFollowedUsers={setFollowedUsers}
                  totals={userTotals}
                />
              ) : null}
              {activeIndex === 6 ? (
                <CommentsInfinite
                  loading={commentsLoading}
                  fetcher={fetchComments}
                  comments={userComments}
                  setComments={setUserComments}
                  totals={userTotals}
                />
              ) : null}
              {activeIndex === 7 ? (
                <ReportedPostsInfinite
                  setPosts={setReportedPosts}
                  posts={reportedPosts}
                  loading={reportedLoading}
                  fetcher={fetchReported}
                  totals={userTotals}
                />
              ) : null}
              {activeIndex === 8 ? <AccountHistoryInfinite /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Dashboard;
