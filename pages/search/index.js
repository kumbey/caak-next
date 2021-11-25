import React, { useState } from "react";
import { useRouter } from "next/router";
import FeedSortButtons from "../../src/components/navigation/FeedSortButtons";
import { searchResultType } from "../../src/components/navigation/sortButtonTypes";
import useFeedLayout from "../../src/hooks/useFeedLayout";
import SearchCard from "../../src/components/card/SearchCard";
import { API, withSSRContext } from "aws-amplify";
import useUpdateEffect from "../../src/hooks/useUpdateEffect";
import { searchApi } from "../../src/apis/search";
import Loader from "../../src/components/loader";

export async function getServerSideProps({ req, query }) {
  const { API } = withSSRContext({ req });
  const data = await searchApi({ API, searchQuery: query.q, limit: 4 });

  return {
    props: {
      ssrData: data,
    },
  };
}

const Search = ({ ssrData }) => {
  const router = useRouter();
  const SearchLayout = useFeedLayout();
  const [searchResult, setSearchResult] = useState(ssrData);
  const [loading, setLoading] = useState(false);

  const doSearch = async () =>
    await searchApi({ API, searchQuery: router.query.q, limit: 10 });

  useUpdateEffect(() => {
    setLoading(true);
    doSearch().then((item) => {
      setSearchResult(item);
      setLoading(false);
    });
  }, [router.query]);

  return (
    <div>
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
      <div className={"site-container"}>
        <SearchLayout search buttonType={searchResultType} hideAura columns={2}>
          <FeedSortButtons
            iconSize={"text-[16px]"}
            containerClassname={"flex-wrap justify-start"}
            items={searchResultType}
            direction={"row"}
            textClassname={"font-medium text-15px"}
          />
          <div className={"pt-[20px]"}>
            {!loading ? (
              searchResult.map((item, index) => {
                if (item.title) {
                  return <SearchCard key={index} result={item} type={"post"} />;
                } else if (item.nickname) {
                  return <SearchCard key={index} result={item} type={"user"} />;
                } else {
                  return (
                    <SearchCard key={index} result={item} type={"group"} />
                  );
                }
              })
            ) : (
              <div className={"flex justify-center items-center"}>
                <Loader
                  containerClassName={"self-center"}
                  className={`bg-caak-primary`}
                />
              </div>
            )}
          </div>
        </SearchLayout>
      </div>
    </div>
  );
};

export default Search;
