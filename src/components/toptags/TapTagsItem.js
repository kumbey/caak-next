import { useEffect, useRef, useState } from "react";
import { API } from "aws-amplify";
import { listPostByCategoryOrderByReactions } from "../../graphql-custom/post/queries";
import { listCategorys } from "../../graphql-custom/category/queries";
import { getReturnData } from "../../utility/Util";
import { listUserCategoryByUser } from "../../graphql/queries";
import { useUser } from "../../context/userContext";
import TopTags from ".";

const TopTagsItem = () => {
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

  const getTrendPosts = async () => {
    try {
      let resp = await API.graphql({
        query: listCategorys,
        variables: {
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

  useEffect(() => {
    getTrendPosts()
  },[])
  
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

  return trendingPostsByCategory.items?.length > 0 ? (
    <div
      className={
        "flex flex-col w-full relative"
      }
    >
      {(activeIndex + 1 < trendingPostsByCategory.items.length - 1) && (
        <div
          onClick={() => {
            trendPostsRef.current.scrollTo({
              left: (1 + activeIndex) * 350,
              behavior: "smooth",
            });
            nextItem();
          }}
          className={
            "cursor-pointer z-[3] w-[40px] h-[40px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute right-[-20px] top-1/2"
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
              left: (activeIndex - 1) * 350,
              behavior: "smooth",
            });
            prevItem();
          }}
          className={
            "cursor-pointer z-[3] w-[40px] h-[40px] flex items-center justify-center bg-white border-[#D4D8D8] drop-shadow-md rounded-full absolute left-[-20px] top-1/2 rotate-180"
          }
        >
          <span
            className={"icon-fi-rs-next text-[#555555] text-[18px]"}
          />
        </div>
      )}

      <p
        className={
          "font-bold text-[#000000] text-[24px] leading-[28px]"
        }
      >
        ШИЛДЭГ ТАГУУД
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
                return <TopTags data={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default TopTagsItem;
