import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GroupType,
  GroupViewType,
} from "../../../src/components/navigation/sortButtonTypes";
import useGroupLayout from "../../../src/hooks/useGroupLayout";
import { withSSRContext } from "aws-amplify";

import { getPostByGroup } from "../../../src/graphql-custom/post/queries";
import { getReturnData } from "../../../src/utility/Util";
import Loader from "../../../src/components/loader";
import GroupSortButtons from "../../../src/components/group/GroupSortButtons";
import { useListPager } from "../../../src/utility/ApiHelper";

import Card from "../../../src/components/card/FeedCard";
import { useUser } from "../../../src/context/userContext";
import { getGroupView } from "../../../src/graphql-custom/group/queries";
import List from "../../../src/components/list";
import InfiniteScroll from "react-infinite-scroll-component";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user = null;

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeView, setActiveView] = useState(0);

  const [posts, setPosts] = useState(ssrData.posts.items);
  const [groupData, setGroupData] = useState(ssrData.groupData);

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

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <GroupLayout groupData={groupData} totalMember={totalMember} columns={2}>
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
        />
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={true}
          loader={
            <Loader
              containerClassName={"self-center w-full"}
              className={`bg-caak-primary ${
                loading ? "opacity-100" : "opacity-0"
              }`}
            />
          }
          endMessage={<h4>Nothing more to show</h4>}
        >
          {posts.map((data, index) => {
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
          })}
        </InfiniteScroll>
      </GroupLayout>
    )
  );
};

export default Group;
