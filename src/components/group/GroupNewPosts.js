import { useEffect, useState } from "react";
import Card from "../card/FeedCard";
import List from "../list";
import InfinitScroller from "../layouts/extra/InfinitScroller";
import { useListPager } from "../../utility/ApiHelper";
import { getPostByGroup } from "../../graphql-custom/post/queries";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { getReturnData } from "../../utility/Util";
import useUpdateEffect from "../../hooks/useUpdateEffect";

const GroupNewPosts = ({ sortType, activeView, handleToast }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLogged } = useUser();
  const [posts, setPosts] = useState({
    items: [],
    nextToken: ""
  });

  const [nextPosts] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" } },
      limit: 20,
    },
    nextToken: posts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    ssr: true,
  });

  const fetchPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const resp = await nextPosts();
        if (resp) {
          setPosts({
            ...posts,
            items: [...posts.items, ...resp],
          });
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const fetchNewPosts = async () => {
    try {
      let resp = await API.graphql({
        query: getPostByGroup,
        variables: {
          group_id: router.query.groupId,
          sortDirection: "DESC",
          filter: { status: { eq: "CONFIRMED" } },
          limit: 10,
          // ...(posts.nextToken ? {nextToken: posts.nextToken} : {}),
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setPosts({...resp });
    } catch (ex) {
      console.log(ex);
    }
  };

  useUpdateEffect(() => {
    if (sortType === "DEFAULT" && posts.items.length === 0) fetchNewPosts();
  }, [sortType]);

  useEffect(() => {
    fetchNewPosts();
    // fetchPosts()
    //eslint-disable-next-line
  }, [router.query.groupId]);
  return (
    <InfinitScroller
      onNext={fetchPosts}
      className={"pb-[20px]"}
      loading={loading}
    >
      {posts.items.map((data, index) => {
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
      })}
    </InfinitScroller>
  );
};

export default GroupNewPosts;
