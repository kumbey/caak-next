import TrendPostsByCategoryItem from "./TrendPostsByCategoryItem";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listPostByCategoryOrderByReactions } from "../../graphql-custom/post/queries";
import { getReturnData } from "../../utility/Util";
import { listUserCategoryByUser } from "../../graphql/queries";
import { useUser } from "../../context/userContext";

const TrendPostsByCategory = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trendingPostsByCategory, setTrendingPostsByCategory] = useState({});
  const [userCategories, setUserCategories] = useState([
    "46adc96c-aef9-498a-a8f6-fc05cf264cd1",
    "33d2e2c7-807c-4a8f-b959-7f5f93e2d54d",
  ]);
  const { user } = useUser();

  // const getUserCategories = async () => {
  //   let resp = API.graphql({
  //     query: listUserCategoryByUser,
  //     variables: { user_id: user.id },
  //   });
  //   // resp = getReturnData(resp)
  //   setUserCategories(resp);
  // };

  const getTrendPostsByCategory = async () => {
    try {
      let resp = await API.graphql({
        query: listPostByCategoryOrderByReactions,
        variables: {
          category_id:
            userCategories[Math.floor(Math.random() * userCategories.length)],
        },
      });
      resp = getReturnData(resp);
      setTrendingPostsByCategory(resp);
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
    // getUserCategories()
    getTrendPostsByCategory();

    // eslint-disable-next-line
  }, []);

  return trendingPostsByCategory.items?.length > 0 ? (
    <div
      className={
        "flex flex-col w-full p-[18px] bg-white rounded-[8px] mb-[24px] relative"
      }
    >
      {activeIndex < trendingPostsByCategory.items.length - 1 && (
        <div
          style={{
            transform: `translateY(calc(-50% - "20px"))`,
          }}
          onClick={() => {
            nextItem();
          }}
          className={
            "cursor-pointer z-[2] w-[40px] h-[40px] flex items-center justify-center bg-[#000000B3] rounded-full absolute right-[11px] top-1/2"
          }
        >
          <span
            className={"ml-[2px] icon-fi-rs-next text-white text-[16.5px]"}
          />
        </div>
      )}

      {activeIndex > 0 && (
        <div
          style={{
            transform: `translateY(calc(-50% - "20px"))`,
          }}
          onClick={() => {
            prevItem();
          }}
          className={
            "cursor-pointer z-[2] w-[40px] h-[40px] flex items-center justify-center bg-[#000000B3] rounded-full absolute left-[11px] top-1/2 rotate-180"
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
        Хоол
      </p>
      <div className={"relative overflow-hidden"}>
        <div
          style={{
            transform: `translateX(calc(${activeIndex} * -252px))`,
          }}
          className={
            "trendPostsCardWrapper flex flex-row flex-nowrap w-full h-full mt-[14px] transition-all duration-300"
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
