import React, { useState, useEffect } from "react";
import { listGroups, listGroupByFeatured } from "../../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import Cover from "../../public/assets/images/groups.jpeg";
import SearchCardGroup from "../../src/components/card/SearchCardGroup";
import Loader from "../../src/components/loader";
import { listCategorys } from "../../src/graphql/queries";
import { useUser } from "../../src/context/userContext";
import useWindowSize from "../../src/hooks/useWindowSize";
import { useWrapper } from "../../src/context/wrapperContext";
import Head from "next/head";
import Consts from "../../src/utility/Consts";

const button = [
  {
    title: "Зөвхөн таньд",
    icon: "icon-fi-rs-love-f",
    icon1: "icon-fi-rs-love-o",
    id: 1,
  },
  {
    title: "Трэнд болж буй",
    icon: "icon-fi-rs-flash-f",
    icon1: "icon-fi-rs-flash-o",
    id: 2,
  },
  {
    title: "Бидний санал болгосон",
    icon: "icon-fi-rs-new-f",
    icon1: "icon-fi-rs-new-o",
    id: 3,
  },
];

export default function AllGroups() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [groups, setGroups] = useState([]);
  const [id, setId] = useState(null);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLogged } = useUser();
  const { width } = useWindowSize();
  const { setNavBarTransparent } = useWrapper();
  console.log(groups)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const resp = await API.graphql({
          query: listGroups,
          variables: {
            filter: id === null ? null : { category_id: { eq: id } },
          },
          authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        });

        const respFeatured = await API.graphql({
          query: listGroupByFeatured,
          variables: {
            featured: "true",
          },
          authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        });

        activeIndex === 3
        ?
        setGroups(respFeatured.data.listGroupByFeatured.items)
        :
        setGroups(resp.data.listGroups.items)

        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchGroups();
  }, [isLogged, id, groups, activeIndex]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const resp = await API.graphql({
          query: listCategorys,
          authMode: "AWS_IAM",
        });
        setCategory(resp.data.listCategorys.items);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchCategory();
  }, [])

  useEffect(() => {
    setNavBarTransparent(true);
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
              Өөрийн дуртай грүппээ олоорой
            </p>
            <p className="text-[12px] text-center">
              Инээдэм, Видео тоглоом гэх мэт төрлийн грүддүүдийг танд хүргэж
              байна.
            </p>
            <input
              disabled
              className="w-[300px] hidden sm:block sm:w-[400px] xl:w-[550px] h-[44px] bg-white rounded-[4px] mt-[10px] md:mt-[20px] xl:mt-[30px] text-[#6C7392] px-[25px] "
              placeholder="Хайлт хийх"
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
                      setId(null);
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
                <Loader className={`bg-caak-primary self-center`} />
              ) : (
                <div
                  style={{
                    gridGap: "24px",
                    gridTemplateColumns: `repeat(auto-fill, minmax(${
                      width > 1248 ? "280px" : "260px"
                    }, 1fr))`,
                  }}
                  className={"groupCardsGrid"}
                >
                  {groups.map((data, index) => {
                    return <SearchCardGroup key={index} result={data} />;
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
                        setId(data.id);
                        setActiveIndex(0);
                      }}
                      key={index}
                      className={`py-[9.5px] pl-[18px] font-inter text-[15px] text-[#0D1026] flex flex-row cursor-pointer bg-[${
                        data.id === id ? "#6C7392" : "transparent"
                      }]`}
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
