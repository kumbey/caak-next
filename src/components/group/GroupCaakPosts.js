import { useRouter } from "next/router";
import { useUser } from "../../context/userContext";
import { useState } from "react";
import { useListPager } from "../../utility/ApiHelper";
import { getPostByGroup } from "../../graphql-custom/post/queries";
import Card from "../card/FeedCard";
import List from "../list";
import InfinitScroller from "../layouts/extra/InfinitScroller";
import { API } from "aws-amplify";
import { getReturnData } from "../../utility/Util";
import useUpdateEffect from "../../hooks/useUpdateEffect";

const GroupCaakPosts = ({ sortType, activeView, handleToast }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLogged } = useUser();
  const [caakPosts, setCaakPosts] = useState({
    items: [],
    nextToken: "",
  });

  const [nextPosts] = useListPager({
    query: getPostByGroup,
    variables: {
      group_id: router.query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "CONFIRMED" }, owned: { eq: "CAAK" } },
      limit: 20,
    },
    nextToken: caakPosts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const fetchCaakPostsClient = async () => {
    try {
      let resp = await API.graphql({
        query: getPostByGroup,
        variables: {
          group_id: router.query.groupId,
          sortDirection: "DESC",
          filter: { status: { eq: "CONFIRMED" }, owned: { eq: "CAAK" } },
          limit: 2,
          // ...(caakPosts.nextToken ? {nextToken: caakPosts.nextToken} : {}),
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setCaakPosts({...resp });
    } catch (ex) {
      console.log(ex);
    }
  };
  const fetchCaakPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const resp = await nextPosts();
        if (resp) {
          setCaakPosts({
            ...caakPosts,
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

  useUpdateEffect(() => {
    if (sortType === "CAAK" && caakPosts.items.length === 0) fetchCaakPostsClient();
    // fetchPosts()
  }, [sortType]);

  useUpdateEffect(() => {
    fetchCaakPostsClient();
  }, [router.query.groupId]);

  return (
    <InfinitScroller
      onNext={fetchCaakPosts}
      className={"pb-[20px]"}
      loading={loading}
    >
      {caakPosts.items.map((data, index) => {
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

export default GroupCaakPosts;
