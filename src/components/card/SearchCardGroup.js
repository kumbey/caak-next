import Image from "next/image";
import Button from "../button";
import { generateFileUrl, getFileUrl } from "../../utility/Util";

const SearchCardGroup = ({ result, sortType }) => {
  return sortType !== "DEFAULT" ? (
    <div
      className={
        "last:ml-[16px] bg-white flex flex-col justify-start w-[300px] h-full min-h-[201px] rounded-square relative mb-[24px]"
      }
    >
      <div className={"w-full h-[58px]"}>
        <div
          className={
            "flex flex-row items-center absolute top-[10px] right-[10px] z-[1]"
          }
        >
          <div
            className={
              "cursor-pointer w-[28px] h-[28px] rounded-full flex items-center justify-center mr-[5px] group hover:bg-white"
            }
          >
            <span
              className={
                "icon-fi-rs-dots text-white text-[18px] group-hover:text-caak-generalblack"
              }
            />
          </div>
          <Button
            iconPosition={"left"}
            icon={
              <div
                className={
                  "w-[20px] h-[20px] flex items-center justify-center "
                }
              >
                <span className={"icon-fi-rs-add-l text-[14px] text-white"} />
              </div>
            }
            skin={"primary"}
            className={
              "h-[28px] rounded-[6px] uppercase font-semibold text-[12px] tracking-[0.18px] leading-[15px] py-[4px] pr-[12px] pl-[6px]"
            }
          >
            Нэгдэх
          </Button>
        </div>
        <div className={"relative w-full h-full"}>
          <Image
            className={"rounded-t-square"}
            alt={""}
            src={"https://picsum.photos/300"}
            width={300}
            height={58}
            objectFit={"cover"}
          />
        </div>
      </div>
      <div className={"flex flex-col w-full h-full px-[16px] pb-[18px]"}>
        <div className={"absolute top-[20px]"}>
          <div
            className={
              "relative flex-shrink-0 w-[58px] h-[58px] border-[3px] border-white rounded-square"
            }
          >
            <Image
              className={"rounded-square"}
              src={getFileUrl(result.profile)}
              alt={""}
              width={58}
              height={58}
              objectFit={"cover"}
            />
          </div>
        </div>

        <div className={"flex flex-col mt-[20px]"}>
          <div className={"mt-[12px] flex flex-row items-center"}>
            <p
              className={
                "text-[16px] truncate-3 font-semibold text-caak-generalblack"
              }
            >
              {result.name}
              <span className={"icon-fi-rs-verified text-[14px]"} />
            </p>
          </div>
          <div className={"flex flex-row mt-[12px]"}>
            <div className={"flex flex-row items-center"}>
              <p className={"font-medium text-caak-generalblack text-[17px]"}>
                {result.aura}
              </p>
              <p className={"text-[14px] text-caak-darkBlue ml-[5px]"}>Аура</p>
            </div>
            <div className={"flex flex-row items-center ml-[24px]"}>
              <p className={"font-medium text-caak-generalblack text-[17px]"}>
                {result.totals.member}
              </p>
              <p className={"text-[14px] text-caak-darkBlue ml-[5px]"}>
                Гишүүн
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "flex flex-row text-caak-darkBlue items-center px-[16px] mb-[18px]"
        }
      >
        <div className={"flex justify-center items-center w-[16px] h-[16px]"}>
          <span className={"icon-fi-rs-globe text-[14px]"} />
        </div>
        <div className={"ml-[4px]"}>
          <p className={"text-[14px]"}>Нээлттэй бүлэг</p>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={
        "flex flex-row bg-white shadow-card rounded-square mb-[20px] p-[16px] h-[90px] justify-between"
      }
    >
      <div className={"flex flex-row"}>
        <div className={"w-[60px] h-[60px] rounded-full bg-red-200"}>
          <Image
            className={"rounded-square"}
            width={60}
            height={60}
            objectFit={"cover"}
            alt={"sda"}
            src={generateFileUrl(result.profile)}
          />
        </div>
        <div className={"flex flex-col justify-evenly ml-[10px]"}>
          <p
            className={
              "text-caak-generalblack text-[17px] tracking-[0.26px] leading-[19px] font-medium"
            }
          >
            {result.name}
          </p>
          <div
            className={
              "flex flex-row text-darkblue text-[14px] tracking-[0.21px] leading-[17px]"
            }
          >
            <div className={"flex flex-row items-center text-caak-"}>
              <div className={"flex items-center  w-[14px] h-[14px]"}>
                <span className={"icon-fi-rs-globe text-[13px]"} />
              </div>
              <p className={"ml-[5px] text-14px"}>Нээлттэй групп</p>
              <p className={"ml-[14px]"}>{result.totals.member} гишүүн</p>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex flex-row items-center"}>
        <div
          className={
            "flex items-center rounded-full justify-center w-[40px] h-[40px] bg-caak-liquidnitrogen"
          }
        >
          <span
            className={`icon-fi-rs-add-group-f text-caak-generalblack-f text-[16px]`}
          />
        </div>
        <div
          className={
            "ml-[10px] flex items-center justify-center w-[35px] h-[35px] flex-shrink-0 w-[35px] h-[35px] transition ease-linear duration-100 cursor-pointer relative hover:bg-caak-liquidnitrogen rounded-full"
          }
        >
          <span className="icon-fi-rs-dots text-22px" />
        </div>
      </div>
    </div>
  );
};

export default SearchCardGroup;
