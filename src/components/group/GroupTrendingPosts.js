import InfinitScroller from "../layouts/extra/InfinitScroller";
import Card from "../card/FeedCard";
import List from "../list";
import { useListPager } from "../../utility/ApiHelper";
import { listPostByGroupOrderByReactions } from "../../graphql-custom/group/queries";
import { useState } from "react";
import { useUser } from "../../context/userContext";
import { API } from "aws-amplify";
import { getReturnData } from "../../utility/Util";
import { useRouter } from "next/router";
import useUpdateEffect from "../../hooks/useUpdateEffect";

const GroupTrendingPosts = ({ sortType, activeView, groupId, handleToast }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isLogged } = useUser();
  const [trendingPosts, setTrendingPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [nextTrendPosts] = useListPager({
    query: listPostByGroupOrderByReactions,
    variables: {
      groupAndStatus: `${groupId}#CONFIRMED`,
      limit: 20,
      sortDirection: "DESC",
    },
    nextToken: trendingPosts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const fetchTrendPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const resp = await nextTrendPosts();
        if (resp) {
          setTrendingPosts({
            ...trendingPosts,
            items: [...resp],
          });
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const fetchTrendPostsClient = async () => {
    try {
      let resp = await API.graphql({
        query: listPostByGroupOrderByReactions,
        variables: {
          groupAndStatus: `${router.query.groupId}#CONFIRMED`,
          limit: 2,
          sortDirection: "DESC",
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setTrendingPosts({...resp});
    } catch (ex) {
      console.log(ex);
    }
  };

  useUpdateEffect(() => {
    if (sortType === "TREND" && trendingPosts.items.length === 0)
      fetchTrendPostsClient();
    // fetchPosts()
  }, [sortType]);

  useUpdateEffect(() => {
    fetchTrendPostsClient();
  }, [router.query.groupId]);

  return (
    <InfinitScroller className={"pb-[20px]"} onNext={fetchTrendPosts}>
      {trendingPosts.items.map((data, index) => {
        return activeView === 0 ? (
          <Card key={index} post={data.post} className="ph:mb-4 sm:mb-4" />
        ) : activeView === 1 ? (
          <List
            handleToast={handleToast}
            key={index}
            imageSrc={data.post?.items?.items[0]?.file}
            post={data.post}
            className="ph:mb-4 sm:mb-4"
          />
        ) : null;
      })}
    </InfinitScroller>
  );
};

export default GroupTrendingPosts;
