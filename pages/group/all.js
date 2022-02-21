import React, { useEffect, useState } from "react";
import {
  listCategorys,
  listGroupByFeatured,
  listGroups,
} from "../../src/graphql/queries";
import { API } from "aws-amplify";
import Cover from "../../public/assets/images/groups.jpeg";
import SearchCardGroup from "../../src/components/card/SearchCardGroup";
import Loader from "../../src/components/loader";
import { useUser } from "../../src/context/userContext";
import { useWrapper } from "../../src/context/wrapperContext";
import Head from "next/head";
import Consts from "../../src/utility/Consts";
import { getReturnData } from "../../src/utility/Util";

const button = [
  {
    title: "Зөвхөн таньд",
    icon: "icon-fi-rs-love-f",
    icon1: "icon-fi-rs-love-o",
    id: 0,
  },
  {
    title: "Трэнд болж буй",
    icon: "icon-fi-rs-flash-f",
    icon1: "icon-fi-rs-flash-o",
    id: 1,
  },
  {
    title: "Бидний санал болгосон",
    icon: "icon-fi-rs-new-f",
    icon1: "icon-fi-rs-new-o",
    id: 2,
  },
];

export default function AllGroups() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [groups, setGroups] = useState([]);
  const [render, setRender] = useState(0);
  const [filteredByCat, setFilteredByCat] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const { isLogged } = useUser();
  const { setNavBarTransparent, setGroupIcon } = useWrapper();

  const fetchCategory = async () => {
    try {
      let resp = await API.graphql({
        query: listCategorys,
        authMode: "AWS_IAM",
      });
      resp = getReturnData(resp);
      const sorted = sortByName(resp.items);
      setCategory(sorted);
    } catch (ex) {
      console.log(ex);
    }
  };

  const sortByName = (arr) => {
    arr.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return arr;
  };

  const fetchFeaturedGroups = async () => {
    try {
      setLoading(true);
      let resp = await API.graphql({
        query: listGroupByFeatured,
        variables: {
          featured: "true",
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setGroups(resp.items);
      setRender(render + 1);
      setLoading(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchGroups = async () => {
    try {
      setLoading(true);
      let resp = await API.graphql({
        query: listGroups,
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      const sorted = sortByName(resp.items);
      setGroups(sorted);
      setLoading(false);
      return resp.items;
    } catch (ex) {
      console.log(ex);
    }
  };

  const selectHandler = (id) => {
    if (selectedCategoryId.length === 0)
      setSelectedCategoryId([...selectedCategoryId, id]);
    if (selectedCategoryId.includes(id)) {
      setSelectedCategoryId(selectedCategoryId.filter((item) => item !== id));
    } else {
      setSelectedCategoryId([...selectedCategoryId, id]);
    }
  };

  useEffect(() => {
    if (selectedCategoryId.length > 0) {
      const duplicates = groups.filter(function (val) {
        return selectedCategoryId.indexOf(val.category_id) !== -1;
      });
      const sorted = sortByName(duplicates)
      setFilteredByCat(sorted);
    }
    //eslint-disable-next-line
  }, [selectedCategoryId]);

  useEffect(() => {
    setSelectedCategoryId([])
    if (activeIndex === 0) {
      fetchGroups();
    } else if (activeIndex === 1) {
      setLoading(true);
      fetchGroups().then((e) => {
        const grps = e.sort(function (a, b) {
          return b.aura - a.aura;
        });
        setGroups(grps);
        setRender(render + 1);
        setLoading(false);
      });
    } else if (activeIndex === 2) {
      fetchFeaturedGroups();
    }
    //eslint-disable-next-line
  }, [activeIndex]);

  useEffect(() => {
    fetchCategory();
    setNavBarTransparent(true);
    setGroupIcon(true);
    return () => {
      setGroupIcon(false);
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const listener = () => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 54) {
        setNavBarTransparent(false);
      } else {
        setNavBarTransparent(true);
      }
    };
    document.addEventListener("scroll", listener);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [setNavBarTransparent]);

  return (
    <>
      <Head>
        <title>Группүүд - {Consts.siteMainTitle}</title>
      </Head>
      <div className="flex flex-col items-center pb-[74px]">
        <div className="relative flex w-full justify-center h-[200px] md:h-[340px]">
          <img src={Cover.src} alt="" className={"object-cover w-full"} />
          <div className="absolute text-white top-1/2 -translate-y-1/2">
            <p className="xl:text-[30px] font-medium text-center">
              Өөрийн дуртай группүүддээ нэгдээрэй!
            </p>
            <input
              style={{ color: "#6C7392" }}
              className="w-[300px] hidden sm:block sm:w-[400px] xl:w-[550px] h-[44px] bg-white rounded-[4px] mt-[10px] md:mt-[20px] xl:mt-[30px] text-[#6C7392] px-[25px] "
              placeholder="Хайлт хийх"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col max-w-[1248px] mx-auto w-full px-[10px] xl:px-0">
          <div className="mt-[10px] sm:mt-[40px]">
            <div className="flex flex-row flex-wrap items-center justify-center sm:justify-start">
              {button.map(({ title, icon, icon1, id }) => {
                return (
                  <div
                    key={title}
                    onClick={() => {
                      setActiveIndex(id);
                    }}
                    className={`px-[20px] py-[7px] lg:px-[20px] rounded-[8px] cursor-pointer mr-[8px] bg-${
                      activeIndex === id && "white"
                    } h-[36px] flex flex-row justify-center items-center justify-center`}
                  >
                    <span
                      className={`${activeIndex === id ? icon : icon1} text-[${
                        activeIndex === id && "#FF6600"
                      }]`}
                    />
                    <p
                      className={`ml-[6px] font-inter font-medium text-[15px] text-[${
                        activeIndex === id && "#FF6600"
                      }]`}
                    >
                      {title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full mt-[20px]">
              {loading ? (
                <div className={"w-full flex justify-center"}>
                  <Loader className={`bg-caak-primary self-center`} />
                </div>
              ) : (
                <div
                  style={{
                    gridGap: "24px",
                    gridTemplateColumns: `repeat(auto-fill, minmax(280px, 1fr))`,
                  }}
                  className={"groupCardsGrid"}
                >
                  {selectedCategoryId.length > 0
                    ? filteredByCat
                        .filter((item) =>
                          item.name.toLowerCase().includes(value.toLowerCase())
                        )
                        .map((data, index) => {
                          return (
                            <SearchCardGroup all key={index} result={data} />
                          );
                        })
                    : groups
                        .filter((item) =>
                          item.name.toLowerCase().includes(value.toLowerCase())
                        )
                        .map((data, index) => {
                          return (
                            <SearchCardGroup all key={index} result={data} />
                          );
                        })}
                </div>
              )}
            </div>
            <div className="flex flex-col hidden sm:block mt-[20px] ml-[32px]">
              <div className="bg-white pb-[10px] mb-[20px] w-[320px] rounded-[8px]">
                <p className="h-[45px] flex items-center border-b pl-[18px] font-semibold font-inter text-[15px]">
                  Группын төрлүүд
                </p>
                {category.map((data, index) => {
                  return (
                    <div
                      onClick={() => {
                        selectHandler(data.id);
                        // if (selectedCategoryId === data.id) {
                        //   setSelectedCategoryId(null);
                        // } else {
                        //   setSelectedCategoryId(data.id);
                        // }
                      }}
                      key={index}
                      className={`py-[9.5px] pl-[18px] font-inter text-[15px] text-[#0D1026] flex flex-row cursor-pointer ${
                        selectedCategoryId.some((cat) => cat === data.id)
                          ? "bg-[#E4E4E5] text-[#21293C]"
                          : "transparent"
                      }`}
                    >
                      <span>{data.icon}</span>
                      <p className="ml-[8px]">{data.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
