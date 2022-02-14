import useFeedLayout from "../src/hooks/useFeedLayout";
import {API, withSSRContext} from "aws-amplify";
import {listBoostedPostByStatusOrderByEndDate, listPostOrderByReactions} from "../src/graphql-custom/post/queries";
import {getReturnData, shuffleArray} from "../src/utility/Util";
import { useEffect, useState, Fragment } from "react";
import { useUser } from "../src/context/userContext";
import Card from "../src/components/card/FeedCard";
import { useListPager } from "../src/utility/ApiHelper";
import { useWrapper } from "../src/context/wrapperContext";
import { feedType } from "../src/components/navigation/sortButtonTypes";
import FeedSortButtons from "../src/components/navigation/FeedSortButtons";
import useMediaQuery from "../src/components/navigation/useMeduaQuery";
import Consts from "../src/utility/Consts";
import Head from "next/head";
import InfinitScroller from "../src/components/layouts/extra/InfinitScroller";
import TrendPostsByCategory from "../src/components/TrendPostsByCategory";
import { usePreserveScroll } from "../src/hooks/useScroll";
import {onCreateReactions, onDeleteReactions} from "../src/graphql/subscriptions";
import FeedCardSkeleton from "../src/components/skeleton/FeedCardSkeleton";

export async function getServerSideProps({ req }) {
  const { API, Auth } = withSSRContext({ req });
  let user;

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }

  const fetchTrendingPosts = async () => {
    try {
      const resp = await API.graphql({
        query: listPostOrderByReactions,
        variables: {
          status: "CONFIRMED",
          sortDirection: "DESC",
          limit: 2,
        },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      return getReturnData(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    props: {
      ssrData: {
        trendingPosts: await fetchTrendingPosts(),
      },
    },
  };
}

const Trending = ({ ssrData }) => {
  usePreserveScroll();
  const TrendingLayout = useFeedLayout("default");
  const [trendingPosts, setTrendingPosts] = useState(ssrData.trendingPosts);
  const [loading, setLoading] = useState(false);
  const [subscribedReactionPost, setSubscribedReactionPost] = useState(null);
  const [render, setRender] = useState(0);
  const subscriptions = {};
  const { isLogged } = useUser();
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const { setFeedSortType } = useWrapper();
  const [boostedPosts, setBoostedPosts] = useState({
    items: [],
  });
  const [isCardLoading, setIsCardLoading] = useState(true);


  const [nextTrendingPosts] = useListPager({
    query: listPostOrderByReactions,
    variables: {
      status: "CONFIRMED",
      limit: 20,
      sortDirection: "DESC",
    },
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    nextToken: ssrData.trendingPosts.nextToken,
    ssr: true,
  });

  const fetchBoostedPosts = async () => {
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
      shuffleArray(resp.items);
      setBoostedPosts(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  let frequency = 5;
  let boostedIdx = 0;
  const renderElement = (index) => {
    if (boostedPosts.items.length > 0) {
      if (index === (frequency + boostedPosts.items.length)) {
        if (boostedPosts.items.length - 1 > boostedIdx) {
          frequency = frequency + 10;
          boostedIdx++;
          return (
            <Card
              sponsored={true}
              post={boostedPosts.items[boostedIdx].post}
              className="ph:mb-4 sm:mb-4"
            />
          );
        } else {
          boostedIdx = 0;
          frequency = frequency + 1
        }
      }
    } else return null;
  };

  const fetchTrendingPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextTrendingPosts();
        if (resp) {
          setTrendingPosts((nextTrendingPosts) => ({
            ...nextTrendingPosts,
            items: [...nextTrendingPosts.items, ...resp],
          }));
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const subscribeOnReaction = ()=> {
    try {
      subscriptions.onCreateReactions = API.graphql({
        query: onCreateReactions,
      }).subscribe({
        next: (data) => {
          const onData = getReturnData(data, true);
          setSubscribedReactionPost({ ...onData, type: "CREATE" });
        },
      });
      subscriptions.onDeleteReactions = API.graphql({
        query: onDeleteReactions,
      }).subscribe({
        next: (data) => {
          const onData = getReturnData(data, true);
          setSubscribedReactionPost({ ...onData, type: "DELETE" });
        },
      });
    }catch (ex){
      console.log(ex)
    }
  }

  useEffect(() => {
    setFeedSortType("TREND");
  }, [setFeedSortType]);

  useEffect(()=> {
    if(subscribedReactionPost){
      const postIndex = trendingPosts.items.findIndex((item) => {
        if (item.post) {
          return item.post.id === subscribedReactionPost.item_id;
        } else {
          return item.id === subscribedReactionPost.item_id;
        }
      });
      if (postIndex !== -1) {
        const post = trendingPosts.items[postIndex];
        if (post.post) {
          trendingFs.items[postIndex].post.reacted = subscribedReactionPost.type === "CREATE";
        } else {
          trendingPosts.items[postIndex].reacted = subscribedReactionPost.type === "CREATE";
        }
        setRender(render + 1)
      }
    }
    //eslint-disable-next-line
  },[subscribedReactionPost])

  useEffect(()=> {
    fetchBoostedPosts().then(() => setIsCardLoading(false));
    if(isLogged){
      subscribeOnReaction()
    }
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    //eslint-disable-next-line
  },[])

  return (
    <>
      <Head>
        <title>Тренд постууд - {Consts.siteMainTitle}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <div className={"pt-[54px]"}>
        <TrendingLayout {...(isLogged ? { columns: 3 } : { columns: 2 })}>
          <FeedSortButtons
            feed
            items={feedType}
            initialSort={"TREND"}
            hide={isLogged && !isTablet}
            containerClassname={"mb-[19px] justify-center"}
            direction={"row"}
          />
          {isLogged && <TrendPostsByCategory />}

          <InfinitScroller onNext={fetchTrendingPosts} loading={loading}>
            {trendingPosts.items.map((data, index) => {
              return (
                <Fragment key={index}>
                  {renderElement(index)}
                  {!isCardLoading ? !boostedPosts.items.find(
                    (item) => item.post.id === data.post.id
                  ) && (
                    <Card
                      post={data.post}
                      className="ph:mb-4 sm:mb-4"
                    />
                  ) : <FeedCardSkeleton/>}
                </Fragment>
              );
            })}
          </InfinitScroller>
        </TrendingLayout>
      </div>

    </>
  );
};

export default Trending;
