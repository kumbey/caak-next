import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GroupType,
  GroupViewType,
} from "../../../src/components/navigation/sortButtonTypes";
import useGroupLayout from "../../../src/hooks/useGroupLayout";
import { API, withSSRContext } from "aws-amplify";

import { getPostByGroup } from "../../../src/graphql-custom/post/queries";
import { getReturnData } from "../../../src/utility/Util";
import GroupSortButtons from "../../../src/components/group/GroupSortButtons";
import { useListPager } from "../../../src/utility/ApiHelper";

import Card from "../../../src/components/card/FeedCard";
import { useUser } from "../../../src/context/userContext";
import {
  getGroupView,
  listPostByGroupOrderByReactions,
} from "../../../src/graphql-custom/group/queries";
import List from "../../../src/components/list";
import { onPostByGroup } from "../../../src/graphql-custom/post/subscription";
import Head from "next/head";
import Consts from "../../../src/utility/Consts";
import GroupAdminPanel from "../../../src/components/group/GroupAdminPanel";
import toast, { Toaster } from "react-hot-toast";
import useMediaQuery from "../../../src/components/navigation/useMeduaQuery";
import AddPostHandler from "../../../src/components/addposthandler";
import InfinitScroller from "../../../src/components/layouts/extra/InfinitScroller";
import { useWrapper } from "../../../src/context/wrapperContext";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    console.log(ex);
    user = null;
  }
  try {
    const resp = await API.graphql({
      query: getPostByGroup,
      variables: {
        group_id: query.groupId,
        sortDirection: "DESC",
        filter: { status: { eq: "CONFIRMED" } },
        limit: 2,
      },
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });

    const groupView = await API.graphql({
      query: getGroupView,
      variables: {
        id: query.groupId,
      },
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });

    return {
      props: {
        ssrData: {
          posts: getReturnData(resp),
          groupData: getReturnData(groupView),
        },
      },
    };
  } catch (ex) {
    console.log(ex);
  }
}

const Group = ({ ssrData }) => {
  const router = useRouter();
  const GroupLayout = useGroupLayout();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { isLogged } = useUser();
  const [subscriptionPosts, setSubscriptionPosts] = useState(null);
  const subscriptions = {};
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeView, setActiveView] = useState(0);
  const [render, setRender] = useState(0);
  const [sortType, setSortType] = useState("DEFAULT");
  const [posts, setPosts] = useState(ssrData.posts.items);
  const [trendingPosts, setTrendingPosts] = useState({
    items: [],
    nextToken: ""
  });
  const { setNavBarTransparent } = useWrapper();
  const [groupData, setGroupData] = useState(ssrData.groupData);
  const isTablet = useMediaQuery("screen and (max-device-width: 1100px)");
  const [totalMember, setTotalMember] = useState(0);


  const [nextPosts] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 20,
    },
    nextToken: ssrData.posts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    ssr: true,
  });

  const [nextTrendPosts] = useListPager({
    query: listPostByGroupOrderByReactions,
    variables: {
      groupAndStatus: `${groupData.id}#CONFIRMED`,
      limit: 20,
      sortDirection: "DESC",
    },
    nextToken: trendingPosts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
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

  const fetchTrendPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const resp = await nextTrendPosts();
        if (resp) {
          setTrendingPosts((prev) => ({
            ...prev,
            items: [...prev.items, ...resp],
          }));
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
  };

  useEffect(() => {
    if (sortType === "TREND") {
      if (trendingPosts.items.length >= 0) {
        fetchTrendPosts();
      }
    }
    // eslint-disable-next-line
  }, [sortType]);

  useEffect(() => {
    if (subscriptionPosts) {
      const postIndex = posts.findIndex(
        (post) => post.id === subscriptionPosts.id
      );
      if (subscriptionPosts.status === "CONFIRMED") {
        if (postIndex <= -1) {
          setPosts([subscriptionPosts, ...posts]);
        }
      } else {
        posts.splice(postIndex, 1);
        setRender(render + 1);
      }
    }
    // eslint-disable-next-line
  }, [subscriptionPosts]);

  useEffect(() => {
      setTotalMember(
        groupData.totals.member +
        groupData.totals.admin +
        groupData.totals.moderator
      );
    setNavBarTransparent(true);
    subscrib();
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
    const listener = () => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 54) {
        setNavBarTransparent(false);
      } else {
        setNavBarTransparent(true);
      }
    };
    document.addEventListener("scroll", listener);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  });
  useEffect(() => {
    setGroupData(ssrData.groupData);
  }, [ssrData]);

  const handleToast = ({ param }) => {
    if (param === "copy") toast.success("Холбоос амжилттай хуулагдлаа.");
    if (param === "follow") toast.success("Группт амжилттай элслээ.");
    if (param === "unfollow") toast.success("Группээс амжилттай гарлаа.");
    if (param === "saved") toast.success("Пост амжилттай хадгалагдлаа.");
    if (param === "unSaved") toast.success("Пост амжилттай хасагдлаа.");
  };

  return loaded ? (
    <>
      <Head>
        <title>
          {groupData.name} - {Consts.siteMainTitle}
        </title>
      </Head>
      <Toaster
        toastOptions={{
          className: "toastOptions",
          duration: 5000,
        }}
      />
      <GroupLayout
        hideSuggestedGroups
        groupData={groupData}
        totalMember={totalMember}
        columns={2}
      >
        {isTablet && isLogged && <GroupAdminPanel groupData={groupData} />}
        <AddPostHandler groupId={groupData.id} />
        <GroupSortButtons
          activeIndex={activeIndex}
          activeView={activeView}
          setActiveIndex={setActiveIndex}
          setActiveView={setActiveView}
          iconSize={"text-[22px]"}
          containerClassname={"flex-wrap justify-start"}
          items={GroupType}
          items2={GroupViewType}
          direction={"row"}
          textClassname={"font-medium text-15px"}
          setSortType={setSortType}
        />

        <InfinitScroller
          onNext={fetchPosts}
          className={"pb-[20px]"}
          loading={loading}
        >
          {posts.map((data, index) => {
            if (sortType === "CAAK" && data.owned === "CAAK") {
              return activeView === 0 ? (
                <Card
                  key={index}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data}
                  className="ph:mb-4 sm:mb-4"
                  handleToast={handleToast}
                />
              ) : activeView === 1 ? (
                <List
                  key={index}
                  imageSrc={data?.items?.items[0]?.file}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data}
                  handleToast={handleToast}
                  className="ph:mb-4 sm:mb-4"
                />
              ) : null;
            } else if (sortType === "DEFAULT") {
              return activeView === 0 ? (
                <Card
                  key={index}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data}
                  className="ph:mb-4 sm:mb-4"
                  handleToast={handleToast}
                />
              ) : activeView === 1 ? (
                <List
                  key={index}
                  imageSrc={data?.items?.items[0]?.file}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data}
                  handleToast={handleToast}
                  className="ph:mb-4 sm:mb-4"
                />
              ) : null;
            }
          })}
        </InfinitScroller>
        {sortType === "TREND" && trendingPosts.items?.length > 0 ? (
          <InfinitScroller className={"pb-[20px]"} onNext={fetchTrendPosts}>
            {trendingPosts.items.map((data, index) => {
              return activeView === 0 ? (
                <Card
                  key={index}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data.post}
                  className="ph:mb-4 sm:mb-4"
                />
              ) : activeView === 1 ? (
                <List
                  handleToast={handleToast}
                  key={index}
                  imageSrc={data.post?.items?.items[0]?.file}
                  video={data.post?.items?.items[0]?.file?.type?.startsWith(
                    "video"
                  )}
                  post={data.post}
                  className="ph:mb-4 sm:mb-4"
                />
              ) : null;
            })}
          </InfinitScroller>
        ) : null}
      </GroupLayout>
    </>
  ) : null;
};

export default Group;
