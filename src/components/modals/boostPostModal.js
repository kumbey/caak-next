import useScrollBlock from "../../hooks/useScrollBlock";
import { useEffect, useState } from "react";
import Button from "../button";
import Link from "next/link";
import DatePicker from "react-datepicker";
import Input from "../../components/input";
import {
  addDays,
  differenceDate,
  getFileUrl,
  getReturnData,
} from "../../utility/Util";
import FeedCardSkeleton from "../skeleton/FeedCardSkeleton";
import Card from "../card/FeedCard";
import { getPostView } from "../../graphql-custom/post/queries";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import { createBoostedPost } from "../../graphql-custom/boost/mutation";
import { useUser } from "../../context/userContext";
import useModalLayout from "../../hooks/useModalLayout";

const BoostPostModal = ({ setIsBoostModalOpen, postId }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [day, setDay] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState();
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const BoostPostModalLayout = useModalLayout({ layoutName: "boostModal" });
  const getPostById = async () => {
    let resp = await API.graphql({
      query: getPostView,
      variables: {
        id: postId,
      },
    });
    resp = getReturnData(resp);
    setPost(resp);
  };

  const updateBoostData = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const postData = {
        post_id: post.id,
        user_id: post.user_id,
        start_date: startDate ? startDate.toISOString() : null,
        end_date: endDate ? endDate.toISOString() : null,
        status: "ACTIVE",
      };
      const resp = await API.graphql(
        graphqlOperation(createBoostedPost, {
          input: postData,
        })
      );
      toast.success(
        `${getReturnData(resp).post.title} 
        амжилттай бүүстлэгдлээ.`
      );
      setLoading(false);
      setIsBoostModalOpen(false);
      setData(initData);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    getPostById();
    // eslint-disable-next-line
  }, [postId]);

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  useEffect(() => {
    setEndDate(addDays(startDate, day));
    // eslint-disable-next-line
  }, [day]);

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    } else {
      setDay(differenceDate(endDate, startDate));
    }
    // eslint-disable-next-line
  }, [startDate]);

  useEffect(() => {
    setDay(differenceDate(endDate, startDate));
    // eslint-disable-next-line
  }, [endDate]);

  useEffect(() => {
    if (day > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line
  }, [day]);

  return (
    <BoostPostModalLayout setIsOpen={setIsBoostModalOpen} headerTitle={"Пост бүүстлэх"}>
      {/*Main content*/}
      <div
        className={"flex flex-col lg:flex-row py-[40px] px-[5px] sm:px-[40px]"}
      >
        {/*Left*/}
        <div className={"flex flex-col"}>
          <div
            className={
              "max-w-[590px] w-[fit-content] min-h-[146px] bg-white rounded-[8px] px-[24px] py-[22px] shadow-card "
            }
          >
            <p
              className={
                "inline-block text-caak-generalblack text-[18px] font-semibold tracking-[0.27px] leading-[21px] mb-5"
              }
            >
              Бүүстлэх хугацаа
            </p>
            <div className="flex flex-col items-start md:flex-row">
              <div className="relative flex flex-col mr-[18px] w-full">
                <p className="font-inter font-medium text-14px ">Хоног</p>
                <Input
                  type="text"
                  value={day}
                  onChange={(e) =>
                    setDay(
                      e.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*?)\..*/g, "$1")
                    )
                  }
                  className={
                    "border h-[37px] w-full min-w-[168px] mt-1  block  rounded-md text-base  border-gray-200 placeholder-gray-400 focus:outline-none focus:text-gray-900 focus:placeholder-gray-500 hover:placeholder-caak-generalblack                        focus:ring-1 focus:ring-caak-primary focus:border-caak-primary sm:text-sm hover:border-caak-primary                        hover:bg-white transition ease-in duration-100"
                  }
                />
                <div className="flex flex-col items-center justify-center">
                  <span
                    onClick={() => setDay(day + 1)}
                    className="absolute cursor-pointer text-[10px]  rotate-180 top-[33px] right-[9px] icon-fi-rs-triangle"
                  />
                  <span
                    onClick={() => {
                      if (day > 0) {
                        setDay(day - 1);
                      }
                    }}
                    className="absolute cursor-pointer text-[10px] top-[44px] right-[8.4px] icon-fi-rs-triangle"
                  />
                </div>
              </div>
              <div className="flex flex-col mr-[18px] w-full relative">
                <p className="font-inter font-medium text-14px  ">Эхлэх өдөр</p>
                <DatePicker
                  className=" h-[37px] min-w-[168px] w-full mt-1  px-10 py-3 block  rounded-md text-base border border-gray-200 placeholder-gray-400
                    focus:outline-none focus:text-gray-900 focus:placeholder-gray-500 hover:placeholder-caak-generalblack
                    focus:ring-1 focus:ring-caak-primary focus:border-caak-primary sm:text-sm hover:border-caak-primary
                    hover:bg-white transition ease-in duration-100"
                  minDate={new Date()}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat={"yyyy/MM/dd"}
                  calendarStartDay={1}
                />
                <span
                  className="absolute top-[33px] left-3
                    text-20px text-caak-nocturnal icon-fi-rs-date-checked"
                />
              </div>
              <div className="relative flex flex-col w-full mr-[18px]">
                <p className="font-inter font-medium text-14px">Дуусах өдөр</p>
                <DatePicker
                  className=" h-[37px] min-w-[168px] w-full mt-1  px-10   py-3 block  rounded-md text-base border border-gray-200 placeholder-gray-400
                      focus:outline-none focus:text-gray-900 focus:placeholder-gray-500 hover:placeholder-caak-generalblack
                      focus:ring-1 focus:ring-caak-primary focus:border-caak-primary sm:text-sm hover:border-caak-primary
                      hover:bg-white transition ease-in duration-100"
                  minDate={startDate}
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat={"yyyy/MM/dd"}
                  calendarStartDay={1}
                />
                <span className="absolute top-[33px] left-3 text-20px text-caak-nocturnal icon-fi-rs-date-over" />
              </div>
            </div>
          </div>
          <div
            className={
              "max-w-[590px] h-[307px] bg-white mt-[20px]  rounded-[8px] shadow-card px-[24px] py-[22px]"
            }
          >
            <p
              className={
                "text-caak-generalblack text-[18px] font-semibold tracking-[0.27px] leading-[21px]"
              }
            >
              Нийт төлөх дүн
            </p>
            <div
              className={"flex flex-col justify-center items-center mt-[20px]"}
            >
              <div
                className={
                  "flex flex-col justify-center items-center rounded-[8px] border-[1px] border-[#E4E4E5] w-full h-full max-w-[400px] min-h-[112px] bg-white px-[16px] py-[14px]"
                }
              >
                <div className={"flex flex-row justify-center items-center"}>
                  <p
                    className={
                      "font-bold text-[38px] text-[#257CEE] leading-[28px] tracking-[0px]"
                    }
                  >
                    100.000
                  </p>
                  <p
                    className={
                      "self-end text-[24px] font-semibold tracking-[0.36px] leading-[20px] text-[#257CEE] ml-[4px]"
                    }
                  >
                    ₮
                  </p>
                </div>
                <p
                  className={
                    "text-[13px] text-[#9A9FB4] tracking-[0.2px] leading-[24px] mt-[6px]"
                  }
                >
                  Таны бүүстлэх хоногууд дээр үндэслэн бодогдов.
                </p>
              </div>
              <div
                className={
                  "flex flex-col rounded-[8px] bg-[#F3F3F4] px-[16px] py-[14px] max-w-[400px] h-full w-full min-h-[89px] mt-[20px]"
                }
              >
                <p
                  className={
                    "text-caak-generalblack text-[15px] font-medium tracking-[0.23px]"
                  }
                >
                  Таны дансны үлдэгдэл
                </p>
                <div className={"flex flex-row justify-between mt-[10px]"}>
                  <div className={"flex flex-row items-center"}>
                    <img
                      width={28}
                      height={28}
                      className={"w-[28px] h-[28px] rounded-full"}
                      alt={user.nickname}
                      src={getFileUrl(user.pic)}
                    />
                    <p
                      className={
                        "text-caak-generalblack text-[14px] leading-[17px] ml-[8px]"
                      }
                    >
                      @{user.nickname}
                    </p>
                  </div>
                  <div className={"flex flex-row items-center"}>
                    <p
                      className={"text-caak-generalblack font-bold text-[18px]"}
                    >
                      300.000₮
                    </p>
                    <div
                      className={
                        "cursor-pointer w-[21px] h-[21px] flex justify-center items-center bg-[#CDCFD9] rounded-full ml-[8px]"
                      }
                    >
                      <span
                        className={
                          "icon-fi-rs-add-l text-[16px] w-[16.2px] h-[16.2px]"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Right*/}
        <div
          className={
            "flex flex-col mt-[20px] lg:mt-0 lg:ml-[22px] rounded-[8px] w-full max-w-[400px] h-[519px] "
          }
        >
          <div
            className={
              "p-[16px] h-[50px] bg-white flex flex-row justify-between items-center rounded-t-[8px] border-b-[1px]"
            }
          >
            <p
              className={
                "text-caak-generalblack text-[18px] tracking-[0.27px] leading-[21px] font-semibold"
              }
            >
              Постны харагдац
            </p>
            <Link href={`/post/edit/${postId}`}>
              <a target={"_blank"} rel={"noreferrer"}>
                <Button
                  iconPosition={"left"}
                  icon={
                    <div
                      className={
                        "w-[16px] h-[16px] flex items-center justify-center mr-[6px]"
                      }
                    >
                      <span
                        className={
                          "icon-fi-rs-edit-f text-caak-generalblack text-[16px]"
                        }
                      />
                    </div>
                  }
                  className={
                    "text-[14px] h-[28px] px-[10px] py-[5px] font-medium tracking-[0.21px] leading-[17px] text-caak-generalblack bg-caak-extraLight rounded-[6px]"
                  }
                >
                  Пост засах
                </Button>
              </a>
            </Link>
          </div>
          {post ? (
            <Card
              // headerClassname={"h-[115px]"}
              mediaContainerClassname={"max-h-[308px] h-full"}
              className={"mb-0 rounded-t-none max-h-[468px]"}
              post={post}
              sponsored
            />
          ) : (
            <FeedCardSkeleton />
          )}
        </div>
      </div>
      {/*Footer*/}
      <div
        className={
          "px-[30px] min-h-[56px] py-[10px] h-full flex flex-col-reverse md:flex-row items-center justify-between bg-white flex-shrink-0 h-[60px] rounded-b-[12px]"
        }
      >
        <div className={"flex flex-row items-center"}>
          <div
            className={
              "flex flex-row items-center text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[17px] mr-[10px]"
            }
          >
            <span>
              Та бүүстлэх товч дарснаар{" "}
              <Link href={"/help"}>
                <a>
                  <span className={"text-[#367CE6]"}>Үйлчилгээний нөхцөл</span>
                </a>
              </Link>{" "}
              -ийг зөвшөөрсөнд тооцно
            </span>
            <span className={"text-[#CDCFD9] mx-[10px]"}> |</span>
            <Link href={"/help"}>
              <a>
                <span className={"text-[#257CEE]"}>Тусламж</span>
              </a>
            </Link>
          </div>
        </div>

        <Button
          onClick={updateBoostData}
          className={
            "w-full max-w-[200px] min-w-[150px] mb-[6px] md:mb-0 text-[14px] font-medium leading-[17px] tracking-[0.21px] px-[24px] py-[10px] h-[36px] rounded-[8px]"
          }
          skin={"primary"}
          disabled={!isValid}
          loading={loading}
        >
          Пост бүүстлэх
        </Button>
      </div>
    </BoostPostModalLayout>
  );
};

export default BoostPostModal;
