import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StatsItem from "../../../src/components/stats";
import Image from "next/image";
import { API, withSSRContext } from "aws-amplify";
import {
  checkAdminModerator,
  getFileUrl,
  getGenderImage,
  getReturnData,
} from "../../../src/utility/Util";
import { useListPager } from "../../../src/utility/ApiHelper";
import { getPostByGroup } from "../../../src/graphql-custom/post/queries";
import DashList from "../../../src/components/list/DashList";

import {
  getGroupTotal,
  getGroupUsersByGroup,
  getGroupView,
} from "../../../src/graphql-custom/group/queries";
import GroupPostItem from "../../../src/components/group/GroupPostItem";
import GroupFollowerList from "../../../src/components/list/GroupFollowerList";
import { useUser } from "../../../src/context/userContext";
import { onPostByGroup } from "../../../src/graphql-custom/post/subscription";
import Divider from "../../../src/components/divider";
import useUpdateEffect from "../../../src/hooks/useUpdateEffect";
import Consts from "../../../src/utility/Consts";
import Head from "next/head";
import InfinitScroller from "../../../src/components/layouts/extra/InfinitScroller";
import { useWrapper } from "../../../src/context/wrapperContext";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });

  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  if (!user) return { notFound: true };

  const groupView = await API.graphql({
    query: getGroupView,
    variables: {
      id: query.groupId,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const grpData = getReturnData(groupView);

  if (!checkAdminModerator(grpData?.role_on_group)) return { notFound: true };

  const resp = await API.graphql({
    query: getPostByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 1,
    },
  });

  const groupTotals = await API.graphql({
    query: getGroupTotal,
    variables: {
      group_id: query.groupId,
    },
  });

  return {
    props: {
      ssrData: {
        posts: getReturnData(resp),
        groupView: grpData,
        groupTotals: getReturnData(groupTotals),
      },
    },
  };
}

const Dashboard = ({ ssrData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [render, setRender] = useState(0);
  const [activeIndex, setActiveIndex] = useState(
    router.query.activeIndex ? parseInt(router.query.activeIndex) : 0
  );
  const [groupTotals, setGroupTotals] = useState(ssrData.groupTotals);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [posts, setPosts] = useState(ssrData.posts.items);
  const [pendingPosts, setPendingPosts] = useState([]);
  // const [archivedPosts, setArchivedPosts] = useState(
  //   ssrData.archivedPosts.items
  // );
  const [groupData] = useState(ssrData.groupView);
  const [subscriptionPosts, setSubscriptionPosts] = useState(null);
  const subscriptions = {};
  const { setNavBarTransparent } = useWrapper();
  const { isLogged } = useUser();
  const [totalMember] = useState(
    groupTotals?.member + groupTotals?.moderator + groupTotals?.admin
  );



  useEffect(() => {
    setNavBarTransparent(false);
    // eslint-disable-next-line
  }, []);

  const stats = [
    {
      id: 0,
      icon: "icon-fi-rs-aura-f",
      number: groupData?.aura ? groupData.aura : 0,
      text: "Аура",
      bgcolor: "",
      gradient: "auraBgGradient",
      color: "auraGradient",
    },
    {
      id: 1,
      icon: "icon-fi-rs-rock-f",
      number: totalMember,
      text: "Гишүүд",
      bgcolor: "bg-caak-sweetfrosting",
      color: "text-caak-uclagold",
    },
    {
      id: 2,
      icon: "icon-fi-rs-comment-f",
      number: groupTotals?.confirmed,
      text: "Пост",
      bgcolor: "bg-caak-placeboblue",
      color: "text-caak-buttonblue",
    },
  ];

  const dashMenu = [
    {
      id: 0,
      name: "Бүх постууд",
      icon: "icon-fi-rs-list-grid-o",
      length: groupTotals?.confirmed,
    },
    {
      id: 1,
      name: "Группын гишүүд",
      icon: "icon-fi-rs-friends-o",
      length: totalMember,
    },
    {
      id: 2,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending-posts",
      length: groupTotals?.pending,
    },
  ];
  const [nextPosts] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 20,
    },
    nextToken: ssrData.posts.nextToken,
    ssr: true,
  });
  const [nextFollowers] = useListPager({
    query: getGroupUsersByGroup,
    variables: {
      group_id: router.query.groupId,
      limit: 20,
    },
    nextToken: followedUsers.nextToken,
  });
  const [nextPending] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "PENDING" } },
      limit: 20,
    },
    nextToken: pendingPosts.nextToken,
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
  const fetchFollowers = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextFollowers();
        if (resp) {
          setFollowedUsers((nextFollowers) => [...nextFollowers, ...resp]);
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
          setPendingPosts((nextPending) => [...nextPending, ...resp]);
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
  const subscrib = () => {
    let authMode = "AWS_IAM";
    if (isLogged) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }
    subscriptions.onPostByGroupConfirmed = API.graphql({
      query: onPostByGroup,
      variables: {
        group_id: groupData.id,
        status: "CONFIRMED",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionPosts(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });

    subscriptions.onPostByGroupPending = API.graphql({
      query: onPostByGroup,
      variables: {
        group_id: groupData.id,
        status: "PENDING",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionPosts(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
    subscriptions.onPostByGroupArchived = API.graphql({
      query: onPostByGroup,
      variables: {
        group_id: groupData.id,
        status: "ARCHIVED",
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionPosts(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useUpdateEffect(() => {
    if (subscriptionPosts) {
      const pendingIndex = pendingPosts.findIndex(
        (post) => post.id === subscriptionPosts.id
      );
      const postIndex = posts.findIndex(
        (post) => post.id === subscriptionPosts.id
      );
      if (subscriptionPosts.status === "CONFIRMED") {
        if (postIndex <= -1) {
          setPosts([subscriptionPosts, ...posts]);
          pendingPosts.splice(pendingIndex, 1);
          setGroupTotals({
            ...groupTotals,
            confirmed: groupTotals.confirmed + 1,
          });
          setRender(render + 1);
        }
      } else {
        if (postIndex > -1) {
          posts.splice(postIndex, 1);
          setGroupTotals({
            ...groupTotals,
            confirmed: groupTotals.confirmed !== 0 && groupTotals.confirmed - 1,
          });

          setRender(render + 1);
        }
      }

      if (subscriptionPosts.status === "PENDING") {
        if (pendingIndex === -1) {
          setPendingPosts([subscriptionPosts, ...pendingPosts]);
          setGroupTotals({
            ...groupTotals,
            pending: groupTotals.pending + 1,
          });
          setRender(render + 1);
        }
        //
        if (postIndex > -1) {
          posts.splice(postIndex, 1);
          setGroupTotals({
            ...groupTotals,
            confirmed: groupTotals.confirmed !== 0 && groupTotals.confirmed - 1,
          });
          setRender(render + 1);
        }
      }
      if (subscriptionPosts.status === "ARCHIVED") {
        if (pendingIndex > -1) {
          pendingPosts.splice(pendingIndex, 1);
          if (groupTotals.pending !== 0) {
            setGroupTotals({
              ...groupTotals,
              pending: groupTotals.pending - 1,
            });
          }
          setRender(render + 1);
        }
      }
    }
    // eslint-disable-next-line
  }, [subscriptionPosts]);

  useEffect(() => {
    subscrib();
    setLoaded(true);

    // fetchArchived();
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>
          {groupData.name} / дашбоард - {Consts.siteMainTitle}
        </title>
      </Head>
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center px-[10px] lg:px-0 mt-[50px] pb-[250px] pt-[54px]">
        <div className="flex items-center mb-[40px]">
          <span
            onClick={() => router.back()}
            className="icon-fi-rs-back bg-caak-titaniumwhite flex items-center justify-center rounded-full cursor-pointer mr-5"
            style={{ height: "48px", width: "48px" }}
          />
          <div className={"w-[52px] h-[52px] mr-[8px] relative"}>
            <img
              className="bg-white rounded-[10px] object-cover w-full h-full"
              src={
                groupData?.profile
                  ? getFileUrl(groupData?.profile)
                  : getGenderImage(groupData?.gender).src
              }
              width={52}
              height={52}
              // layout="fixed"
              // objectFit={"cover"}
              alt="#"
            />
          </div>
          <div className="text-[18px] md:text-[22px] font-semibold text-caak-generalblack mr-1">
            @{groupData.name}
          </div>
          {groupData.verified && <span className="icon-fi-rs-verified" />}
        </div>
        <div className="mb-[14px] font-inter font-semibold text-18px text-caak-generalblack">
          Дашбоард
        </div>
        <div className="flex w-full md:flex-row">
          {stats.map((stat, index) => {
            return <StatsItem key={index} id={index} stat={stat} />;
          })}
        </div>
        <div className="flex flex-col xl:flex-row mt-[25px] ">
          <div
            className={
              "flex  rounded-lg border border-caak-titaniumwhite bg-caak-emptiness  min-w-[290px] h-full mb-[20px] mr-0 md:mr-[20px] "
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
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center mb-[10px] sm:mb-0">
                <p
                  className={`text-[14px] font-inter tracking-[0.21px] leading-[16px] font-medium mr-[10px]`}
                >
                  {dashMenu[activeIndex].name}
                </p>
                <div className="flex justify-center items-center text-13px h-[16px] w-[35px] bg-opacity-20 bg-caak-bleudefrance  font-inter font-medium rounded-lg ">
                  <p className="text-caak-bleudefrance text-opacity-100 ">
                    {dashMenu[activeIndex].length}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <div className={"flex flex-row items-center mb-[10px] sm:mb-0"}>
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
                "flex flex-col rounded-lg bg-caak-emptiness mt-[15px] px-[8px] lg:px-[30px] pt-[16px] overflow-x-scroll"
              }
            >
              {activeIndex === 0 ? (
                <div className="flex flex-col">
                  <div className="hidden md:flex">
                    <p className="font-inter font-normal text-14px text-caak-generalblack md:mr-[180px] lg:mr-[290px]">
                      Пост
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[182px]">
                      Гишүүн
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[158px]">
                      Хандалт
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack">
                      Үйлдэл
                    </p>
                  </div>
                  <Divider className={"my-[16px]"} />

                  <InfinitScroller onNext={fetchPosts} loading={loading}>
                    {posts.length > 0 &&
                      posts.map((post, index) => {
                        return (
                          <DashList
                            key={index}
                            type={"group"}
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
                <InfinitScroller onNext={fetchFollowers} loading={loading}>
                  <div className=" flex flex-row flex-wrap justify-between mt-[14px]">
                    {followedUsers.map((data, index) => {
                      return (
                        <GroupFollowerList
                          key={index}
                          imageSrc={data?.user?.pic}
                          followedUser={data}
                          followedUsers={followedUsers}
                          setFollowedUsers={setFollowedUsers}
                          groupData={groupData}
                        />
                      );
                    })}
                  </div>
                </InfinitScroller>
              ) : null}

              {activeIndex === 2 ? (
                <div className="flex flex-col">
                  <div className="hidden md:flex pb-[16px] mb-[16px] border-b-[1px]">
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[150px] md:mr-[320px]">
                      Пост
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[100px] md:mr-[148px]">
                      Гишүүн
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack mr-[46px]">
                      Огноо
                    </p>
                    <p className="font-inter font-normal text-14px text-caak-generalblack">
                      Үйлдэл
                    </p>
                  </div>
                  <InfinitScroller onNext={fetchPending} loading={loading}>
                    {/*<Divider className={"hidden md:flex mt-[16px]"} />*/}

                    {pendingPosts.length > 0 &&
                      pendingPosts.map((pendingPost, index) => {
                        return (
                          <GroupPostItem
                            type={"group"}
                            key={index}
                            index={index}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
