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

import { useUser } from "../../../src/context/userContext";
import { getGroupView } from "../../../src/graphql-custom/group/queries";
import { onPostByGroup } from "../../../src/graphql-custom/post/subscription";
import Head from "next/head";
import Consts from "../../../src/utility/Consts";
import GroupAdminPanel from "../../../src/components/group/GroupAdminPanel";
import toast from "react-hot-toast";
import useMediaQuery from "../../../src/components/navigation/useMeduaQuery";
import AddPostHandler from "../../../src/components/addposthandler";
import { useWrapper } from "../../../src/context/wrapperContext";
import GroupNewPosts from "../../../src/components/group/GroupNewPosts";
import GroupTrendingPosts from "../../../src/components/group/GroupTrendingPosts";

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
    if (!getReturnData(groupView)) {
      return { notFound: true };
    }
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
  const [loaded, setLoaded] = useState(false);
  const { isLogged } = useUser();
  const [subscriptionPosts, setSubscriptionPosts] = useState(null);
  const subscriptions = {};
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeView, setActiveView] = useState(0);
  const [render, setRender] = useState(0);
  const [sortType, setSortType] = useState("DEFAULT");
  const [posts, setPosts] = useState(ssrData.posts.items);

  const { setNavBarTransparent } = useWrapper();
  const [groupData, setGroupData] = useState(ssrData.groupData);
  const isTablet = useMediaQuery("screen and (max-device-width: 1100px)");
  const [totalMember, setTotalMember] = useState(0);

  const handleToast = ({ param }) => {
    if (param === "copy") toast.success("Холбоос амжилттай хуулагдлаа.");
    if (param === "follow") toast.success("Группт амжилттай нэгдлээ!");
    if (param === "unfollow") toast.success("Группээс амжилттай гарлаа.");
    if (param === "saved") toast.success("Пост амжилттай хадгалагдлаа.");
    if (param === "unSaved") toast.success("Пост амжилттай хасагдлаа.");
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

  // useEffect(() => {
  //   if (sortType === "TREND") {
  //     if (trendingPosts.items.length >= 0) {
  //       fetchTrendPosts();
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [sortType]);

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
    setPosts(ssrData.posts.items);
    //eslint-disable-next-line
  }, [router.query]);

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
        {isTablet &&
          isLogged &&
          (groupData.role_on_group === "ADMIN" ?
            <GroupAdminPanel groupId={groupData.id} />
            :
            null
          )}
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
        <div className={`${sortType === "DEFAULT" ? "block" : "hidden"}`}>
          <GroupNewPosts
            noAds={groupData.meta ? JSON.parse(groupData.meta).noAds : false}
            handleToast={handleToast}
            initialPosts={ssrData.posts}
            sortType={sortType}
            activeView={activeView}
          />
        </div>
        <div className={`${sortType === "TREND" ? "block" : "hidden"}`}>
          <GroupTrendingPosts
            noAds={groupData.meta ? JSON.parse(groupData.meta).noAds : false}
            handleToast={handleToast}
            sortType={sortType}
            groupId={groupData.id}
            activeView={activeView}
          />
        </div>
      </GroupLayout>
    </>
  ) : null;
};

export default Group;
