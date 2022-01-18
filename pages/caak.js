import useFeedLayout from "../src/hooks/useFeedLayout";
import { withSSRContext } from "aws-amplify";
import { listPostByOwned } from "../src/graphql-custom/post/queries";
import { getReturnData } from "../src/utility/Util";
import { useEffect, useState } from "react";
import { useUser } from "../src/context/userContext";
import Card from "../src/components/card/FeedCard";
import { useListPager } from "../src/utility/ApiHelper";
import FeedSortButtons from "../src/components/navigation/FeedSortButtons";
import { feedType } from "../src/components/navigation/sortButtonTypes";
import useMediaQuery from "../src/components/navigation/useMeduaQuery";
import Consts from "../src/utility/Consts";
import Head from "next/head";
import { useWrapper } from "../src/context/wrapperContext";
import InfinitScroller from "../src/components/layouts/extra/InfinitScroller";
import { usePreserveScroll } from "../src/hooks/useScroll";

export async function getServerSideProps({ req }) {
  const { API, Auth } = withSSRContext({ req });
  let user;

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }

  const fetchCaakPosts = async () => {
    try {
      const resp = await API.graphql({
        query: listPostByOwned,
        variables: {
          owned: "CAAK",
          filter: { status: { eq: "CONFIRMED" } },
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
        caakPosts: await fetchCaakPosts(),
      },
    },
  };
}

const Trending = ({ ssrData }) => {
  usePreserveScroll();
  const CaakLayout = useFeedLayout("default");
  const [caakPosts, setCaakPosts] = useState(ssrData.caakPosts);
  const [loading, setLoading] = useState(false);
  const { isLogged } = useUser();
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const { setFeedSortType } = useWrapper();

  const [nextCaakPosts] = useListPager({
    query: listPostByOwned,
    variables: {
      owned: "CAAK",
      filter: { status: { eq: "CONFIRMED" } },
      sortDirection: "DESC",
      limit: 20,
    },
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    nextToken: ssrData.caakPosts.nextToken,
    ssr: true,
  });

  const fetchCaakPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextCaakPosts();
        if (resp) {
          setCaakPosts((prev) => ({
            ...prev,
            items: [...prev.items, ...resp],
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
    setFeedSortType("CAAK");
  }, [setFeedSortType]);
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
        <CaakLayout {...(isLogged ? { columns: 3 } : { columns: 2 })}>
          <FeedSortButtons
            feed
            items={feedType}
            initialSort={"CAAK"}
            hide={isLogged && !isTablet}
            containerClassname={"mb-[19px] justify-center"}
            direction={"row"}
          />
          <InfinitScroller onNext={fetchCaakPosts} loading={loading}>
            {caakPosts.items.map((data, index) => {
              return (
                <Card
                  key={index}
                  video={data?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={data}
                  className="ph:mb-4 sm:mb-4"
                />
              );
            })}
          </InfinitScroller>
        </CaakLayout>
      </div>
    </>
  );
};

export default Trending;
