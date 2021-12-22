import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GroupType,
  GroupViewType,
} from "../../../src/components/navigation/sortButtonTypes";
import useGroupLayout from "../../../src/hooks/useGroupLayout";
import { API, withSSRContext } from "aws-amplify";

import {
  getPostByGroup,
  listPostOrderByReactions,
} from "../../../src/graphql-custom/post/queries";
import { getReturnData } from "../../../src/utility/Util";
import Loader from "../../../src/components/loader";
import GroupSortButtons from "../../../src/components/group/GroupSortButtons";
import { useListPager } from "../../../src/utility/ApiHelper";

import Card from "../../../src/components/card/FeedCard";
import { useUser } from "../../../src/context/userContext";
import {getGroupView, listPostByGroupOrderByReactions} from "../../../src/graphql-custom/group/queries";
import List from "../../../src/components/list";
import InfiniteScroll from "react-infinite-scroll-component";
import { onPostByGroup } from "../../../src/graphql-custom/post/subscription";
import Head from "next/head";
import Consts from "../../../src/utility/Consts";
import GroupAdminPanel from "../../../src/components/group/GroupAdminPanel";
import useDeviceDetect from "../../../src/hooks/useDeviceDetect";
import useMediaQuery from "../../../src/components/navigation/useMeduaQuery";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    console.log(ex);
    user = null;
  }

  const resp = await API.graphql({
    query: getPostByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 6,
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
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [groupData] = useState(ssrData.groupData);
  const isTablet = useMediaQuery("screen and (max-device-width: 1100px)");

  const totalMember =
    groupData.totals.member +
    groupData.totals.admin +
    groupData.totals.moderator;

  const [nextPosts] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 6,
    },
    nextToken: ssrData.posts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const fetchPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        if (posts.nextToken) {
          const resp = await nextPosts();
          if (resp) {
            setPosts((nextPosts) => [...nextPosts, ...resp]);
          }
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
      let resp = await API.graphql({
        query: listPostByGroupOrderByReactions,
        variables: {
          groupAndStatus: `${groupData.id}#CONFIRMED`,
          limit: 6,
          sortDirection: "DESC",
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setTrendingPosts(resp);
    } catch (ex) {
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
      if (typeof trendingPosts.items === "undefined") {
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

  return loaded ? (
    <>
      <Head>
        <title>
          {groupData.name} - {Consts.siteMainTitle}
        </title>
      </Head>
      <GroupLayout
        hideSuggestedGroups
        groupData={groupData}
        totalMember={totalMember}
        columns={2}
      >
        {isTablet && <GroupAdminPanel groupData={groupData} />}
        <GroupSortButtons
          activeIndex={activeIndex}
          activeView={activeView}
          setActiveIndex={setActiveIndex}
          setActiveView={setActiveView}
          iconSize={"text-[16px]"}
          containerClassname={"flex-wrap justify-start"}
          items={GroupType}
          items2={GroupViewType}
          direction={"row"}
          textClassname={"font-medium text-15px"}
          setSortType={setSortType}
        />

        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          className={"pb-[20px]"}
          // pullDownToRefresh={true}
          hasMore={true}
          loader={
            <Loader
              containerClassName={"self-center w-full"}
              className={`bg-caak-primary ${loading ? "" : "hidden"}`}
            />
          }
          endMessage={<h4>Nothing more to show</h4>}
        >
          {posts.map((data, index) => {
            if (sortType === "CAAK" && data.owned === "CAAK") {
              return activeView === 0 ? (
                <Card
                  key={index}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data}
                  className="ph:mb-4 sm:mb-4"
                />
              ) : activeView === 1 ? (
                <List
                  key={index}
                  imageSrc={data?.items?.items[0]?.file}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data}
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
                />
              ) : activeView === 1 ? (
                <List
                  key={index}
                  imageSrc={data?.items?.items[0]?.file}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data}
                  className="ph:mb-4 sm:mb-4"
                />
              ) : null;
            }
          })}
        </InfiniteScroll>
        {sortType === "TREND" && trendingPosts.items?.length > 0 ? (
          <InfiniteScroll
            className={"pb-[20px]"}
            dataLength={trendingPosts.items?.length}
            next={fetchTrendPosts}
            hasMore={true}
            loader={
              <Loader
                containerClassName={"self-center w-full"}
                className={`bg-caak-primary ${loading ? "" : "hidden"}`}
              />
            }
            endMessage={<h4>Nothing more to show</h4>}
          >
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
          </InfiniteScroll>
        ) : null}
      </GroupLayout>
    </>
  ) : null;
};

export default Group;
