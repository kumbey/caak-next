import useScrollBlock from "../../hooks/useScrollBlock";
import { useEffect } from "react";
import Button from "../button";
import Link from "next/link";
import Card from "../card/FeedCard";

const BoostPostModal = ({ isBoostModalOpen, setIsBoostModalOpen }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);
  return isBoostModalOpen ? (
    <div className="popup_modal">
      <div className="popup_modal-content-boost w-full h-full">
        <div
          className={"flex flex-col bg-[#ECECEF] w-full h-full rounded-[12px]"}
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
                  "w-[590px] h-[146px] bg-white rounded-[8px] px-[24px] py-[22px] shadow-card px-[24px] py-[22px]"
                }
              >
                <p
                  className={
                    "text-caak-generalblack text-[18px] font-semibold tracking-[0.27px] leading-[21px]"
                  }
                >
                  Бүүстлэх хугацаа
                </p>
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
                "bg-white flex flex-col rounded-[8px] w-[400px] h-[519px] ml-[22px] shadow-card"
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
              </div>
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
              className={
                "text-[14px] font-medium leading-[17px] tracking-[0.21px] px-[24px] py-[10px] h-[36px] rounded-[8px]"
              }
              skin={"primary"}
            >
              Пост бүүстлэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default BoostPostModal;
