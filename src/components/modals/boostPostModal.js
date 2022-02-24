import useScrollBlock from "../../hooks/useScrollBlock";
import { useEffect, useState } from "react";
import Button from "../button";
import Link from "next/link";
import DatePicker from "react-datepicker";
import Input from "../../components/input";
import { addDays, differenceDate, getReturnData } from "../../utility/Util";
import FeedCardSkeleton from "../skeleton/FeedCardSkeleton";
import Card from "../card/FeedCard";
import { getPostView } from "../../graphql-custom/post/queries";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import { createBoostedPost } from "../../graphql-custom/boost/mutation";

const BoostPostModal = ({ setIsBoostModalOpen, postId }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [day, setDay] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState();

  const [post, setPost] = useState(null);

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
    <div className="popup_modal">
      <div className="popup_modal-content-boost w-full h-full">
        <div
          className={
            "flex flex-col justify-between bg-[#ECECEF] w-full h-full rounded-[12px]"
          }
        >
          {/*Header*/}
          <div
            className={
              "flex-shrink-0 relative flex items-center justify-center w-full h-[60px] border-b-[1px] border-[#E4E4E5] bg-white rounded-t-[12px]"
            }
          >
            <div
              onClick={() => setIsBoostModalOpen(false)}
              className={
                "cursor-pointer absolute p-[8px] bg-[#E4E4E5] rounded-full right-[16px] top-[16px] w-[30px] h-[30px] flex items-center justify-center"
              }
            >
              <span
                className={
                  "text-caak-generalblack icon-fi-rs-close text-[14px] w-[14px] h-[14px]"
                }
              />
            </div>
            <p
              className={
                "text-caak-generalblack text-[20px] tracking-[0.3px] leading-[24px] font-semibold"
              }
            >
              Пост бүүстлэх
            </p>
          </div>
          {/*Main content*/}
          <div className={"flex flex-row h-[590px] py-[30px] px-[40px]"}>
            {/*Left*/}
            <div className={"flex flex-col"}>
              <div
                className={
                  " w-[590px] h-[146px] bg-white rounded-[8px] px-[24px] py-[22px] shadow-card "
                }
              >
                <p
                  className={
                    "text-caak-generalblack text-[18px] font-semibold tracking-[0.27px] leading-[21px] mb-5"
                  }
                >
                  Бүүстлэх хугацаа
                </p>
                <div className="flex">
                  <div className="relative flex flex-col mr-[18px]">
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
                        " border h-[37px] w-[168px] mt-1  block  rounded-md text-base  border-gray-200 placeholder-gray-400 focus:outline-none focus:text-gray-900 focus:placeholder-gray-500 hover:placeholder-caak-generalblack                        focus:ring-1 focus:ring-caak-primary focus:border-caak-primary sm:text-sm hover:border-caak-primary                        hover:bg-white transition ease-in duration-100"
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
                  <div className="flex flex-col mr-[18px] relative">
                    <p className="font-inter font-medium text-14px  ">
                      Эхлэх өдөр
                    </p>
                    <DatePicker
                      className=" h-[37px] w-[168px] mt-1  px-10 py-3 block  rounded-md text-base border border-gray-200 placeholder-gray-400
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
                  <div className="relative flex flex-col mr-[18px]">
                    <p className="font-inter font-medium text-14px">
                      Дуусах өдөр
                    </p>
                    <DatePicker
                      className=" h-[37px] w-[168px] mt-1  px-10   py-3 block  rounded-md text-base border border-gray-200 placeholder-gray-400
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
                  "w-[590px] h-[307px] bg-white mt-[20px]  rounded-[8px] shadow-card px-[24px] py-[22px]"
                }
              >
                <p
                  className={
                    "text-caak-generalblack text-[18px] font-semibold tracking-[0.27px] leading-[21px]"
                  }
                >
                  Нийт төлөх дүн
                </p>
              </div>
            </div>

            {/*Right*/}
            <div
              className={
                "flex flex-col rounded-[8px] w-[400px] h-[519px] ml-[22px]"
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
              "px-[30px] py-[10px] flex flex-row items-center justify-between bg-white flex-shrink-0 h-[60px] rounded-b-[12px]"
            }
          >
            <div
              className={
                "flex flex-row items-center text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[17px]"
              }
            >
              <span>
                Та бүүстлэх товч дарснаар{" "}
                <Link href={"/help"}>
                  <a>
                    <span className={"text-[#367CE6]"}>
                      Үйлчилгээний нөхцөл
                    </span>
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
            <Button
              onClick={updateBoostData}
              className={
                "text-[14px] font-medium leading-[17px] tracking-[0.21px] px-[24px] py-[10px] h-[36px] rounded-[8px]"
              }
              skin={"primary"}
              disabled={!isValid}
              loading={loading}
            >
              Пост бүүстлэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostPostModal;
