import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import StatsItem from "../../../src/components/stats";
import Image from "next/image";

import { withSSRContext } from "aws-amplify";
import {
  getFileUrl,
  getGenderImage,
  getReturnData,
} from "../../../src/utility/Util";
import { useListPager } from "../../../src/utility/ApiHelper";
import useInfiniteScroll from "../../../src/hooks/useFetch";
import { getPostByGroup } from "../../../src/graphql-custom/post/queries";
import DashList from "../../../src/components/list/DashList";
import API from "@aws-amplify/api";

import { listCommentByUser } from "../../../src/graphql-custom/comment/queries";
import {
  getGroupTotal,
  getGroupView,
} from "../../../src/graphql-custom/group/queries";

import { getGroupUsersByGroup } from "../../../src/graphql-custom/group/queries";
import FollowerList from "../../../src/components/list/FollowerList";
import Loader from "../../../src/components/loader";
import GroupPostItem from "../../../src/components/group/GroupPostItem";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });

  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  let userId = user.attributes.sub;

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
  console.log(archivedPosts);

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

const Dashboard = ({ ssrData, ...props }) => {
  const router = useRouter();
  const feedRef = useRef();

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [groupTotals] = useState(ssrData.groupTotals);
  const [followedUsers] = useState(ssrData.userFollower.items);
  const [posts, setPosts] = useState(ssrData.posts.items);
  const [pendingPosts] = useState(ssrData.pendingPosts.items);
  const [archivedPosts] = useState(ssrData.archivedPosts.items);
  const [groupData] = useState(ssrData.groupView);
  let totalMember =
    groupTotals?.member + groupTotals?.moderator + groupTotals?.admin;

  let totalPost = groupTotals?.confirmed;

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
    },
    {
      id: 1,
      name: "Группын гишүүд",
      icon: "icon-fi-rs-friends-o",
    },
    // {
    //   id: 2,
    //   name: "Сэтгэгдэл",
    //   icon: "icon-fi-rs-comment-o",
    // },
    {
      id: 2,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending",
    },
    {
      id: 3,
      name: "Архивлагдсан постууд",
      icon: "icon-fi-rs-archive",
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

  const [setPostScroll] = useInfiniteScroll(posts, setPosts, feedRef);

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

  useEffect(() => {
    setLoaded(true);
    setPostScroll(fetchPosts);
    return () => {
      setPostScroll(null);
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
              "flex flex-col rounded-lg  bg-caak-emptiness mt-[15px] pl-[30px] pr-[30px] pt-[30px]"
            }
          >
            {activeIndex === 0
              ? posts.length > 0 &&
                posts.map((post, index) => {
                  return (
                    <DashList
                      key={index}
                      imageSrc={post?.items?.items[0]?.file}
                      post={post}
                      className="ph:mb-4 sm:mb-4"
                    />
                  );
                })
              : null}
            {activeIndex === 1 ? (
              <div className=" flex flex-row flex-wrap ">
                {followedUsers.map((data, index) => {
                  return (
                    <FollowerList
                      key={index}
                      type={"group"}
                      imageSrc={data?.user?.pic}
                      followedUser={data?.user}
                      groupData={groupData}
                    />
                  );
                })}
              </div>
            ) : null}

            {/* {activeIndex === 2
              ? userComments.length > 0 &&
                userComments.map((comment, index) => {
                  return (
                    <CommentList
                      key={index}
                      imageSrc={comment?.post?.items?.items[0]?.file}
                      comment={comment}
                      className="ph:mb-4 sm:mb-4"
                    />
                  );
                })
              : null} */}
            <div className=" flex flex-col items-center max-w-[877px] justify-center">
              {activeIndex === 2
                ? pendingPosts.length > 0 &&
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
                  })
                : null}
            </div>
            <div className=" flex flex-col items-center max-w-[877px] justify-center">
              {activeIndex === 3
                ? archivedPosts.length > 0 &&
                  archivedPosts.map((archivedPost, index) => {
                    return (
                      <GroupPostItem
                        key={index}
                        // imageSrc={archivedPost?.items?.items[0]?.file}
                        // video={archivedPost?.items?.items[0]?.file?.type?.startsWith(
                        //   "video"
                        // )}
                        post={archivedPost}
                        className="ph:mb-4 sm:mb-4"
                      />
                    );
                  })
                : null}
            </div>
          </div>
          <div ref={feedRef} className={"flex justify-center items-center"}>
            <Loader
              containerClassName={"self-center"}
              className={`bg-caak-primary ${
                loading ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
