import TrendPostsByCategoryItem from "./TrendPostsByCategoryItem";
import { useEffect, useRef, useState } from "react";
import { API } from "aws-amplify";
import { listPostByCategoryOrderByReactions } from "../../graphql-custom/post/queries";
import { getReturnData } from "../../utility/Util";
import { listUserCategoryByUser } from "../../graphql/queries";
import { useUser } from "../../context/userContext";
import Story from "../story";

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
          // categoryAndStatus: `46adc96c-aef9-498a-a8f6-fc05cf264cd1#CONFIRMED`,
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
        "flex flex-col w-full bg-white relative"
      }
    >
      {activeIndex + 1 < trendingPostsByCategory.items.length - 1 && (
        <div
          onClick={() => {
            trendPostsRef.current.scrollTo({
              left: (1 + activeIndex) * 310,
              behavior: "smooth",
            });
            nextItem();
          }}
          className={
            "cursor-pointer z-[3] w-[52px] h-[52px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-26px] top-1/2"
          }
        >
          <span
            className={"icon-fi-rs-next text-[#555555] text-[18px]"}
          />
        </div>
      )}

      {activeIndex > 0 && (
        <div
          onClick={() => {
            trendPostsRef.current.scrollTo({
              left: (activeIndex - 1) * 310,
              behavior: "smooth",
            });
            prevItem();
          }}
          className={
            "cursor-pointer z-[3] w-[52px] h-[52px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-26px] top-1/2 rotate-180"
          }
        >
          <span
            className={"icon-fi-rs-next text-[#555555] text-[18px]"}
          />
        </div>
      )}

      <p
        className={
          "font-bold text-[#111111] text-[38px] text-center leading-[42px]"
        }
      >
        СТОРИ МЭДЭЭ
      </p>
      <div
        ref={trendPostsRef}
        className={"trendPostsCardWrapper relative mt-[39px] overflow-x-scroll"}
      >
        <div
          className={
            " flex flex-row flex-nowrap w-full h-full transition-all duration-300"
          }
        >
          {trendingPostsByCategory.items.map((item, index) => {
            return <Story story={item.post} key={index} />;
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default TrendPostsByCategory;
