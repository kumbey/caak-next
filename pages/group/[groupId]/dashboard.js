import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import StatsItem from "../../../src/components/stats";
import Image from "next/image";
import { API, withSSRContext } from "aws-amplify";
import {
  getFileUrl,
  getGenderImage,
  getReturnData,
} from "../../../src/utility/Util";
import { useListPager } from "../../../src/utility/ApiHelper";
import useInfiniteScroll from "../../../src/hooks/useFetch";
import { getPostByGroup } from "../../../src/graphql-custom/post/queries";
import DashList from "../../../src/components/list/DashList";

import { listCommentByUser } from "../../../src/graphql-custom/comment/queries";
import {
  getGroupTotal,
  getGroupUsersByGroup,
  getGroupView,
} from "../../../src/graphql-custom/group/queries";
import Loader from "../../../src/components/loader";
import GroupPostItem from "../../../src/components/group/GroupPostItem";
import GroupFollowerList from "../../../src/components/list/GroupFollowerList";
import { useUser } from "../../../src/context/userContext";
import { onPostByGroup } from "../../../src/graphql-custom/post/subscription";
import InfiniteScroll from "react-infinite-scroll-component";
import Divider from "../../../src/components/divider";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });

  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  if (!user) return { notFound: true };
  const userId = user?.attributes?.sub;

  const groupView = await API.graphql({
    query: getGroupView,
    variables: {
      id: query.groupId,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const resp = await API.graphql({
    query: getPostByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 6,
    },
  });

  const pendingPosts = await API.graphql({
    query: getPostByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "PENDING" } },
      limit: 6,
    },
  });
  const archivedPosts = await API.graphql({
    query: getPostByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "ARCHIVED" } },
      limit: 6,
    },
  });

  const userList = await API.graphql({
    query: getGroupUsersByGroup,
    variables: {
      group_id: query.groupId,
      limit: 6,
    },
  });

  const userComments = await API.graphql({
    query: listCommentByUser,
    variables: {
      user_id: userId,
      sortDirection: "DESC",
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
        pendingPosts: getReturnData(pendingPosts),
        archivedPosts: getReturnData(archivedPosts),
        groupView: getReturnData(groupView),
        userFollower: getReturnData(userList),
        userComment: getReturnData(userComments),
        groupTotals: getReturnData(groupTotals),
      },
    },
  };
}

const Dashboard = ({ ssrData }) => {
  const router = useRouter();
  const postRef = useRef();
  const followerRef = useRef();
  const pendingRef = useRef();
  const archivedRef = useRef();

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [activeIndex, setActiveIndex] = useState(
    router.query.activeIndex ? parseInt(router.query.activeIndex) : 0
  );
  const [groupTotals] = useState(ssrData.groupTotals);
  const [followedUsers, setFollowedUsers] = useState(
    ssrData.userFollower.items
  );
  const [posts, setPosts] = useState(ssrData.posts.items);
  const [pendingPosts, setPendingPosts] = useState(ssrData.pendingPosts.items);
  const [archivedPosts, setArchivedPosts] = useState(
    ssrData.archivedPosts.items
  );
  const [groupData] = useState(ssrData.groupView);
  const [subscriptionPosts, setSubscriptionPosts] = useState(null);
  const subscriptions = {};
  const { isLogged } = useUser();
  const totalMember =
    groupTotals?.member + groupTotals?.moderator + groupTotals?.admin;

  const totalPost = groupTotals?.confirmed;

  const stats = [
    {
      id: 0,
      icon: "icon-fi-rs-aura",
      number: groupData?.aura ? groupData.aura : 2300,
      text: "Нийт аура",
      bgcolor: "",
      color: "",
    },
    {
      id: 1,
      icon: "icon-fi-rs-rock-f",
      number: totalMember,
      text: "Гишүүдийн тоо",
      bgcolor: "bg-caak-sweetfrosting",
      color: "text-caak-cookiedough",
    },
    {
      id: 2,
      icon: "icon-fi-rs-comment-f",
      number: totalPost,
      text: "Постын тоо",
      bgcolor: "bg-caak-placeboblue",
      color: "text-caak-buttonblue",
    },
    {
      id: 3,
      icon: "icon-fi-rs-rock-f",
      number: 1500,
      text: "Саакын тоо",
      bgcolor: "bg-caak-sweetfrosting",
      color: "text-caak-cookiedough",
    },
  ];

  const dashMenu = [
    {
      id: 0,
      name: "Бүх постууд",
      icon: "icon-fi-rs-list-grid-o",
      length: posts.length,
    },
    {
      id: 1,
      name: "Группын гишүүд",
      icon: "icon-fi-rs-friends-o",
      length: followedUsers.length,
    },
    {
      id: 2,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending",
      length: pendingPosts.length,
    },
    {
      id: 3,
      name: "Архивлагдсан постууд",
      icon: "icon-fi-rs-archive",
      length: archivedPosts.length,
    },
  ];
  const [nextPosts] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 6,
    },
    nextToken: ssrData.posts.nextToken,
  });
  const [nextFollowers] = useListPager({
    query: getGroupUsersByGroup,
    variables: {
      group_id: router.query.groupId,
      limit: 6,
    },
    // nextToken: ssrData.followedUsers.nextToken,
  });
  const [nextPending] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "PENDING" } },
      limit: 6,
    },
    nextToken: ssrData.pendingPosts.nextToken,
  });
  const [nextArchived] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "ARCHIVED" } },
      limit: 6,
    },
    nextToken: ssrData.archivedPosts.nextToken,
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
  const fetchArchived = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextArchived();
        if (resp) {
          setArchivedPosts((nextArchived) => [...nextArchived, ...resp]);
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

  useEffect(() => {
    if (subscriptionPosts) {
      if (subscriptionPosts.status === "CONFIRMED") {
        const filteredPending = pendingPosts.filter(
          (item) => item.id !== subscriptionPosts.id
        );
        const filteredArchived = archivedPosts.filter(
          (item) => item.id !== subscriptionPosts.id
        );

        setPosts((prev) => [subscriptionPosts, ...prev]);
        setPendingPosts(filteredPending);
        setArchivedPosts(filteredArchived);
      } else if (subscriptionPosts.status === "PENDING") {
        const filtered = pendingPosts.filter(
          (item) => item.id !== subscriptionPosts.id
        );
        const filteredConfirmed = posts.filter(
          (item) => item.id !== subscriptionPosts.id
        );

        setPosts(filteredConfirmed);
        setPendingPosts([subscriptionPosts, ...filtered]);
      } else if (subscriptionPosts.status === "ARCHIVED") {
        const filtered = pendingPosts.filter(
          (item) => item.id !== subscriptionPosts.id
        );
        setPendingPosts(filtered);
        setArchivedPosts((prev) => [subscriptionPosts, ...prev]);
      }
    }
    // eslint-disable-next-line
  }, [subscriptionPosts]);

  useEffect(() => {
    subscrib();
    setLoaded(true);
    fetchPosts();
    fetchFollowers();
    fetchPending();
    fetchArchived();
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-[1240px] mx-auto flex flex-col justify-center   mt-[50px]">
      <div className="flex items-center mb-[40px]">
        <span
          onClick={() => router.back()}
          className="icon-fi-rs-back bg-caak-titaniumwhite flex items-center justify-center rounded-full cursor-pointer mr-5"
          style={{ height: "48px", width: "48px" }}
        />
        <div className={"w-[52px] h-[52px] mr-[8px] relative"}>
          <Image
            className=" bg-white rounded-[10px]"
            src={
              groupData?.cover
                ? getFileUrl(groupData?.cover)
                : getGenderImage(groupData?.gender)
            }
            width={52}
            height={52}
            layout="fixed"
            //   objectFit={"cover"}
            alt="#"
          />
        </div>
        <div className="text-2xl font-semibold text-caak-generalblack mr-1">
          @{groupData.name}
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
          <div className="flex justify-between items-center">
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
            <div className="flex items-center">
              <p className="text-14px font-normal  text-caak-generalblack font-inter mr-[13px]">
                Шүүлтүүр
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
          <div
            className={
              "flex flex-col rounded-lg  bg-caak-emptiness mt-[15px] pl-[30px] pr-[30px] pt-[30px] mb-[50px]"
            }
          >
            {activeIndex === 0 ? (
              <div className="flex flex-col">
                <div className="flex ">
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
                  {posts.length > 0 &&
                    posts.map((post, index) => {
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
              </div>
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
                <div className=" flex flex-row flex-wrap justify-between">
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
              </InfiniteScroll>
            ) : null}

            {activeIndex === 2 ? (
              <div className="flex flex-col">
                <div className="flex">
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
                <InfiniteScroll
                  dataLength={pendingPosts.length}
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
                  <Divider className={"mt-[16px]"} />

                  {pendingPosts.length > 0 &&
                    pendingPosts.map((pendingPost, index) => {
                      return (
                        <>
                          <GroupPostItem
                            key={index}
                            imageSrc={pendingPost?.items?.items[0]?.file}
                            video={pendingPost?.items?.items[0]?.file?.type?.startsWith(
                              "video"
                            )}
                            post={pendingPost}
                            className="ph:mb-4 sm:mb-4"
                          />
                        </>
                      );
                    })}
                </InfiniteScroll>
              </div>
            ) : null}

            {activeIndex === 3 ? (
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
                  dataLength={archivedPosts.length}
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
                  {archivedPosts.length > 0 &&
                    archivedPosts.map((archivedPost, index) => {
                      return (
                        <GroupPostItem
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
