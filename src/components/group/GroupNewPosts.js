import { Fragment, useEffect, useState } from "react";
import Card from "../card/FeedCard";
import List from "../list";
import InfinitScroller from "../layouts/extra/InfinitScroller";
import { useListPager } from "../../utility/ApiHelper";
import {
  getPostByGroup,
  listBoostedPostByStatusOrderByEndDate,
} from "../../graphql-custom/post/queries";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { getReturnData, shuffleArray } from "../../utility/Util";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { useWrapper } from "../../context/wrapperContext";
import FeedCardSkeleton from "../skeleton/FeedCardSkeleton";

const GroupNewPosts = ({ sortType, activeView, handleToast, noAds }) => {
  const [loading, setLoading] = useState(false);
  const { boostedPostsArr, setBoostedPostsArr } = useWrapper();
  const [isCardLoading, setIsCardLoading] = useState(true);

  const router = useRouter();
  const { isLogged } = useUser();
  const [posts, setPosts] = useState({
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
        !noAds && (await fetchBoostedPosts(false));
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
      setPosts({ ...resp });
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
          <Fragment key={index}>
            {noAds ? (
              <Card
                key={index}
                notBoosted={true}
                post={data}
                className="ph:mb-4 sm:mb-4"
                handleToast={handleToast}
              />
            ) : (
              <Fragment key={index}>
                {renderElement(index)}
                {!isCardLoading ? (
                  !boostedPostsArr.find((item) => item.post.id === data.id) && (
                    <Card
                      key={index}
                      notBoosted={true}
                      post={data}
                      className="ph:mb-4 sm:mb-4"
                      handleToast={handleToast}
                    />
                  )
                ) : (
                  <FeedCardSkeleton />
                )}
              </Fragment>
            )}
          </Fragment>
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
