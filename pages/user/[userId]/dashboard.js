import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import StatsItem from "../../../src/components/stats";
import { withSSRContext } from "aws-amplify";
import { getReturnData } from "../../../src/utility/Util";
import { useListPager } from "../../../src/utility/ApiHelper";
import useInfiniteScroll from "../../../src/hooks/useFetch";
import { getPostByUser } from "../../../src/graphql-custom/post/queries";
import DashList from "../../../src/components/list/DashList";
import API from "@aws-amplify/api";

import { listCommentByUser } from "../../../src/graphql-custom/comment/queries";
import {
  listUsersbyFollowing,
  getUserTotal,
} from "../../../src/graphql-custom/user/queries";
import FollowerList from "../../../src/components/list/FollowerList";
import CommentList from "../../../src/components/list/CommentList";
import { useUser } from "../../../src/context/userContext";
import PendingPost from "../../../src/components/PendingPost/PendingPost";

export async function getServerSideProps({ req, query }) {
  const { API } = withSSRContext({ req });

  const resp = await API.graphql({
    query: getPostByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 5,
    },
  });

  const pendingPosts = await API.graphql({
    query: getPostByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
      filter: { status: { eq: "PENDING" } },
      limit: 5,
    },
  });

  const userList = await API.graphql({
    query: listUsersbyFollowing,
    variables: {
      followed_user_id: query.userId,
      limit: 6,
    },
  });
  console.log(userList);

  const userComments = await API.graphql({
    query: listCommentByUser,
    variables: {
      user_id: query.userId,
      sortDirection: "DESC",
    },
  });

  const userTotals = await API.graphql({
    query: getUserTotal,
    variables: {
      user_id: query.userId,
    },
  });

  return {
    props: {
      ssrData: {
        posts: getReturnData(resp),
        pendingPosts: getReturnData(pendingPosts),
        userFollower: getReturnData(userList),
        userComment: getReturnData(userComments),
        userTotals: getReturnData(userTotals),
      },
    },
  };
}

const Dashboard = ({ ssrData, ...props }) => {
  const router = useRouter();
  const { isLogged, user } = useUser();
  const feedRef = useRef();

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(ssrData.userTotals);
  const [followedUsers, setFollowedUsers] = useState(
    ssrData.userFollower.items
  );
  const [userComments, setUserComments] = useState(ssrData.userComment.items);
  const [posts, setPosts] = useState(ssrData.posts.items);
  const [pendingPosts, setPendingPosts] = useState(ssrData.pendingPosts.items);
  console.log(pendingPosts);
  let totalReaction =
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
    {
      id: 3,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending",
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
        <div className="text-2xl font-semibold text-caak-generalblack">
          Дашбоард
        </div>
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
                      imageSrc={data.cover_pic}
                      followedUser={data.user}
                    />
                  );
                })}
              </div>
            ) : null}

            {activeIndex === 2
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
              : null}
            <div className=" flex flex-col items-center max-w-[877px] justify-center">
              {activeIndex === 3
                ? pendingPosts.length > 0 &&
                  pendingPosts.map((pendingPost, index) => {
                    return (
                      <>
                        <PendingPost
                          key={index}
                          imageSrc={pendingPost?.items?.items[0]?.file}
                          pendingPost={pendingPost}
                        />
                      </>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
