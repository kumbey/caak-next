import InfinitScroller from "../layouts/extra/InfinitScroller";
import Card from "../card/FeedCard";
import List from "../list";
import { useListPager } from "../../utility/ApiHelper";
import { listPostByGroupOrderByReactions } from "../../graphql-custom/group/queries";
import {Fragment, useEffect, useState} from "react";
import { useUser } from "../../context/userContext";
import { API } from "aws-amplify";
import {getReturnData, shuffleArray} from "../../utility/Util";
import { useRouter } from "next/router";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import {listBoostedPostByStatusOrderByEndDate} from "../../graphql-custom/post/queries";
import {useWrapper} from "../../context/wrapperContext";
import FeedCardSkeleton from "../skeleton/FeedCardSkeleton";

const GroupTrendingPosts = ({ sortType, activeView, groupId, handleToast, noAds }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { boostedPostsArr, setBoostedPostsArr } = useWrapper();
  const [isCardLoading, setIsCardLoading] = useState(true);
  const { isLogged } = useUser();
  const [trendingPosts, setTrendingPosts] = useState({
    items: [],
    nextToken: "",
  });
  let frequency = 5;
  let boostedIdx = 0;
  const renderElement = (index) => {
    if (boostedPostsArr.length > 0) {
      if (index === frequency) {
        if (boostedPostsArr.length > boostedIdx) {
          frequency = frequency + 10;
          const idx = boostedIdx;
          boostedIdx++;
          return (
            <Card
              sponsored={true}
              post={boostedPostsArr[idx].post}
              className="ph:mb-4 sm:mb-4"
              handleToast={handleToast}
            />
          );
        } else {
          boostedIdx = 0;
          frequency = frequency + 1;
        }
      }
    } else return null;
  };
  const fetchBoostedPosts = async (init) => {
    const date = new Date();
    const now = date.toISOString();
    try {
      let resp = await API.graphql({
        query: listBoostedPostByStatusOrderByEndDate,
        variables: {
          status: "ACTIVE",
          sortDirection: "DESC",
          end_date: { gt: now },
        },
        authMode: "AWS_IAM",
      });
      resp = getReturnData(resp);

      if (!init) {
        const diffBy = (pred) => (a, b) =>
          a.filter((x) => !b.some((y) => pred(x, y)));
        const makeSymmDiffFunc = (pred) => (a, b) =>
          diffBy(pred)(a, b).concat(diffBy(pred)(b, a));

        const myDiff = makeSymmDiffFunc((x, y) => x.post.id === y.post.id);

        const result = myDiff(boostedPostsArr, resp.items);

        setBoostedPostsArr((prev) => [...prev, ...result]);
      }

      return resp;
    } catch (ex) {
      console.log(ex);
    }
  };


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
        !noAds && (await fetchBoostedPosts(false));
        if (resp) {
          setTrendingPosts({
            ...trendingPosts,
            items: [...trendingPosts.items, ...resp],
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
    console.log("fetch client")
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

  useEffect(() => {
    if (!noAds) {
      //Shuffling boosted posts array on first fetch
      fetchBoostedPosts(true).then((e) => {
        const shuffledArr = shuffleArray(e.items);
        setBoostedPostsArr(shuffledArr);
        setIsCardLoading(false);
      });
    }
    //eslint-disable-next-line
  }, []);

  useUpdateEffect(() => {
    if (sortType === "TREND" && trendingPosts.items.length === 0)
      fetchTrendPostsClient();
    // fetchPosts()
  }, [sortType]);

  useUpdateEffect(() => {
    fetchTrendPostsClient();
  }, [router.query.groupId]);

  return (
    <InfinitScroller loading={loading} className={"pb-[20px]"} onNext={fetchTrendPosts}>
      {trendingPosts.items.map((data, index) => {
        return activeView === 0 ? (
          <Fragment key={index}>
            {noAds ? (
              <Card
                key={index}
                notBoosted={true}
                post={data.post}
                className="ph:mb-4 sm:mb-4"
              />
            ) : (
              <Fragment key={index}>
                {renderElement(index)}
                {!isCardLoading ? (
                  !boostedPostsArr.find((item) => item.post.id === data.post.id) && (
                    <Card
                      key={index}
                      notBoosted={true}
                      post={data.post}
                      className="ph:mb-4 sm:mb-4"
                    />
                  )
                ) : (
                  <FeedCardSkeleton />
                )}
              </Fragment>
            )}
          </Fragment>
          // <Card key={index} post={data.post} className="ph:mb-4 sm:mb-4" />
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
