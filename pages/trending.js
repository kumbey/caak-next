import useFeedLayout from "../src/hooks/useFeedLayout";
import { withSSRContext } from "aws-amplify";
import { listPostOrderByReactions } from "../src/graphql-custom/post/queries";
import { getReturnData } from "../src/utility/Util";
import { useEffect, useState } from "react";
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
  const { isLogged } = useUser();
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const { setFeedSortType } = useWrapper();

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

  useEffect(() => {
    setFeedSortType("TREND");
  }, [setFeedSortType]);

  return (
    <>
      <Head>
        <title>Саак постууд - {Consts.siteMainTitle}</title>
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
                <Card
                  key={index}
                  video={data.post?.items?.items[0]?.file?.type?.startsWith(
                    "video"
                  )}
                  post={data.post}
                  className="ph:mb-4 sm:mb-4"
                />
              );
            })}
          </InfinitScroller>
        </TrendingLayout>
      </div>

    </>
  );
};

export default Trending;
