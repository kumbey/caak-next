import TrendPostsByCategoryItem from "./TrendPostsByCategoryItem";
import { useEffect, useRef, useState } from "react";
import { API } from "aws-amplify";
import { listPostByCategoryOrderByReactions } from "../../graphql-custom/post/queries";
import { getReturnData } from "../../utility/Util";
import { listUserCategoryByUser } from "../../graphql/queries";
import { useUser } from "../../context/userContext";

const TrendPostsByCategory = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trendingPostsByCategory, setTrendingPostsByCategory] = useState({});
  const [userCategories, setUserCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const trendPostsRef = useRef(null);
  const { user, isLogged } = useUser();

  const getUserCategories = async () => {
    let resp = await API.graphql({
      query: listUserCategoryByUser,
      variables: { user_id: user.id },
      authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });
    resp = getReturnData(resp);
    return resp;
  };

  const getTrendPosts = async (randomCategory) => {
    try {
      let resp = await API.graphql({
        query: listPostByCategoryOrderByReactions,
        variables: {
          categoryAndStatus: `${randomCategory}#CONFIRMED`,
          limit: 10,
          sortDirection: "DESC",
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setTrendingPostsByCategory(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getTrendPostsByCategory = async () => {
    try {
      const categories = await getUserCategories();
      const randomCategory =
        categories.items[Math.floor(Math.random() * categories.items.length)];
      setSelectedCategory(randomCategory);
      setUserCategories(categories.items);
      await getTrendPosts(randomCategory.category_id);
    } catch (ex) {
      console.log(ex);
    }
  };

  const nextItem = () => {
    if (activeIndex < trendingPostsByCategory.items.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    // getUserCategories();
    getTrendPostsByCategory();

    // eslint-disable-next-line
  }, []);

  return trendingPostsByCategory.items?.length > 0 ? (
    <div
      className={
        "flex flex-col w-full p-[18px] bg-white rounded-[8px] mb-[24px] relative"
      }
    >
      {activeIndex + 1 < trendingPostsByCategory.items.length - 1 && (
        <div
          onClick={() => {
            trendPostsRef.current.scrollTo({
              left: (1 + activeIndex) * 252,
              behavior: "smooth",
            });
            nextItem();
          }}
          className={
            "cursor-pointer z-[3] w-[40px] h-[40px] flex items-center justify-center bg-[#000000B3] rounded-full absolute right-[11px] top-1/2"
          }
        >
          <span
            className={"ml-[2px] icon-fi-rs-next text-white text-[16.5px]"}
          />
        </div>
      )}

      {activeIndex > 0 && (
        <div
          onClick={() => {
            trendPostsRef.current.scrollTo({
              left: (activeIndex - 1) * 252,
              behavior: "smooth",
            });
            prevItem();
          }}
          className={
            "cursor-pointer z-[3] w-[40px] h-[40px] flex items-center justify-center bg-[#000000B3] rounded-full absolute left-[11px] top-1/2 rotate-180"
          }
        >
          <span
            className={"ml-[2px] icon-fi-rs-next text-white text-[16.5px]"}
          />
        </div>
      )}

      <p
        className={
          "font-medium text-caak-extraBlack text-[20px] tracking-[0.3px] leading-[24px]"
        }
      >
        {selectedCategory.category.name}
      </p>
      <div
        ref={trendPostsRef}
        className={"trendPostsCardWrapper relative overflow-x-scroll"}
      >
        <div
          className={
            " flex flex-row flex-nowrap w-full h-full mt-[14px] transition-all duration-300"
          }
        >
          {trendingPostsByCategory.items.map((item, index) => {
            return <TrendPostsByCategoryItem item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default TrendPostsByCategory;
