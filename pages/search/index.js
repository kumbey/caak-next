import { useState } from "react";
import { useRouter } from "next/router";
import FeedSortButtons from "../../src/components/navigation/FeedSortButtons";
import { searchResultType } from "../../src/components/navigation/sortButtonTypes";
import useFeedLayout from "../../src/hooks/useFeedLayout";
import { API } from "aws-amplify";
import useUpdateEffect from "../../src/hooks/useUpdateEffect";
import { searchApi } from "../../src/apis/search";
import SearchCard from "../../src/components/card/SearchCard";
import SearchCardGroup from "../../src/components/card/SearchCardGroup";
import Head from "next/head";
import Consts from "../../src/utility/Consts";
import { searchPosts } from "../../src/graphql-custom/post/queries";
import InfinitScroller from "../../src/components/layouts/extra/InfinitScroller";
import { useListPager } from "../../src/utility/ApiHelper";
import { useUser } from "../../src/context/userContext";
import useWindowSize from "../../src/hooks/useWindowSize";

const Search = () => {
  const router = useRouter();
  const SearchLayout = useFeedLayout();
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const { width } = useWindowSize();
  const [posts, setPosts] = useState({
    items: [],
    nextToken: "",
  });
  const [loading, setLoading] = useState(false);
  const { isLogged } = useUser();
  const [sortType, setSortType] = useState("DEFAULT");
  const doSearch = async () =>
    await searchApi({ API, searchQuery: router.query.q });
  const [nextPosts] = useListPager({
    query: searchPosts,
    variables: {
      filter: {
        title: { wildcard: `*${router.query.q}*` },
      },
    },
    nextToken: posts.nextToken,
    authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const fetchPosts = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextPosts();
        if (resp) {
          setPosts((nextPosts) => {
            return {
              ...nextPosts,
              items: [...nextPosts.items, ...resp],
            };
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
    setLoading(true);
    doSearch().then((item) => {
      setGroups(item.groups);
      setUsers(item.users);
      setPosts(item.posts);
      setLoading(false);
    });
  }, [router.query]);
  return (
    <>
      <Head>
        <title>
          {`"${router.query.q ? router.query.q : ""}"`} Хайлтын илэрц - {Consts.siteMainTitle}
        </title>
      </Head>
      <div className={"pt-[54px]"}>
        <div
          className={
            "flex flex-col items-center justify-center h-[110px] bg-white"
          }
        >
          <h1 className={"text-22px font-medium text-caak-generalblack"}>
            {router.query.q}
          </h1>
          <p
            className={
              "text-14px tracking-[0.21px] leading-[16px] text-caak-aleutian"
            }
          >
            Хайлтын илэрц
          </p>
        </div>
        <div className={"max-w-[966px] mx-auto"}>
          <SearchLayout
            search
            buttonType={searchResultType}
            hideAura
            columns={2}
          >
            <FeedSortButtons
              iconSize={"text-[16px]"}
              containerClassname={"flex-wrap justify-start"}
              items={searchResultType}
              direction={"row"}
              textClassname={"font-medium text-15px"}
              initialSort={"DEFAULT"}
              setSortType={setSortType}
            />
            <div className={"pt-[20px] pb-[40px] w-full"}>
              <div
                style={{
                  ...(sortType === "GROUP" ? { gridGap: "16px" } : {}),
                  gridTemplateColumns: `repeat(auto-fill, minmax(${
                    width > 1248 ? "295px" : "280px"
                  }, 1fr))`,
                }}
                className={`${
                  sortType === "GROUP"
                    ? "groupCardsGrid"
                    : "flex w-full flex-col justify-center"
                }`}
              >
                {groups.map((group, index) => {
                  if (sortType === "GROUP") {
                    return (
                      <SearchCardGroup
                        key={index}
                        type={"GROUP"}
                        result={group}
                      />
                    );
                  } else if (group.type === "GROUP" && sortType === "DEFAULT") {
                    return (
                      <SearchCard type={"GROUP"} key={index} result={group} />
                    );
                  }
                  // else {
                  //   return <SearchCard type={"POST"} key={index} result={group} />
                  // }
                })}

                {users.map((user, index) => {
                  if (sortType === "DEFAULT")
                    return (
                      <SearchCard type={"USER"} key={index} result={user} />
                    );
                })}

                <InfinitScroller onNext={fetchPosts} loading={loading}>
                  {posts.items?.map((post, index) => {
                    if (sortType === "DEFAULT" || sortType === "POST")
                      return (
                        <SearchCard type={"POST"} key={index} result={post} />
                      );
                  })}
                </InfinitScroller>
              </div>
            </div>
          </SearchLayout>
        </div>
      </div>
    </>
  );
};

export default Search;
