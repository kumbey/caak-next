import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  GroupType,
  GroupViewType,
} from "../../../src/components/navigation/sortButtonTypes";
import useGroupLayout from "../../../src/hooks/useGroupLayout";
import { withSSRContext } from "aws-amplify";
import useInfiniteScroll from "../../../src/hooks/useFetch";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { getPostByGroup } from "../../../src/graphql-custom/post/queries";
import { getReturnData } from "../../../src/utility/Util";
import Loader from "../../../src/components/loader";
import GroupSortButtons from "../../../src/components/group/GroupSortButtons";
import GroupHeader from "../../../src/components/group/GroupHeader";
import { useListPager } from "../../../src/utility/ApiHelper";
import API from "@aws-amplify/api";

import Card from "../../../src/components/card/FeedCard";
import { useUser } from "../../../src/context/userContext";
import { getGroupView } from "../../../src/graphql-custom/group/queries";
import List from "../../../src/components/list";

export async function getServerSideProps({ req, query }) {
  const { API } = withSSRContext({ req });
  const resp = await API.graphql({
    query: getPostByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 2,
    },
  });
  const groupView = await API.graphql({
    query: getGroupView,
    variables: {
      id: query.groupId,
    },
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

const Group = ({ ssrData, ...props }) => {
  const router = useRouter();
  const GroupLayout = useGroupLayout();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { isLogged } = useUser();

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeView, setActiveView] = useState(0);

  const feedRef = useRef();

  const [posts, setPosts] = useState(ssrData.posts.items);
  const [groupData, setGroupData] = useState(ssrData.groupData);

  const [nextPosts] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 2,
    },
    nextToken: ssrData.posts.nextToken,
  });
  const [setPostScroll] = useInfiniteScroll(posts, setPosts, feedRef);

  const getGroupDataById = async () => {
    try {
      if (isLogged) {
        let resp = await API.graphql(
          graphqlOperation(getGroupView, { id: router.query.groupId })
        );
        setGroupData(resp.data.getGroup);
      } else {
        const resp = await API.graphql({
          query: getGroupView,
          authMode: "AWS_IAM",
          variables: { id: router.query.groupId },
        });
        setGroupData(resp.data.getGroup);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

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

  useEffect(() => {
    getGroupDataById();

    console.log(groupData);
    console.log(posts);
  }, []);

  return (
    loaded && (
      <div>
        <GroupHeader groupData={groupData} />
        <div className={" mt-[32px]"}>
          <GroupLayout groupData={groupData} columns={2}>
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
            {posts.length > 0 &&
              posts.map((data, index) => {
                return activeView === 0 ? (
                  <Card
                    key={index}
                    video={data?.items?.items[0]?.file?.type?.startsWith(
                      "video"
                    )}
                    post={data}
                    className="ph:mb-4 sm:mb-4"
                  />
                ) : activeView === 1 ? (
                  <List
                    key={index}
                    imageSrc={data?.items?.items[0]?.file}
                    post={data}
                    className="ph:mb-4 sm:mb-4"
                  />
                ) : null;
              })}
            <div ref={feedRef} className={"flex justify-center items-center"}>
              <Loader
                containerClassName={"self-center"}
                className={`bg-caak-primary ${
                  loading ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </GroupLayout>
        </div>
      </div>
    )
  );
};

export default Group;
