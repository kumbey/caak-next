import CardHeader from "./FeedCard/CardHeader";
import Divider from "../divider";
import Image from "next/image";
import {generateFileUrl, getGenderImage} from "../../utility/Util";

const SearchCard = ({ type, result }) => {
  return result ? (
    type !== "POST" ? (
      <div
        className={
          "flex flex-row bg-white shadow-card rounded-square mb-[20px] p-[16px] h-[90px] justify-between w-full"
        }
      >
        <div className={"flex flex-row"}>
          <div className={"relative w-[60px] h-[60px] rounded-full"}>
            {result.profile && (
              <Image
                className={"rounded-square"}
                width={60}
                height={60}
                objectFit={"cover"}
                alt={"Group"}
                src={result.profile ? generateFileUrl(result.profile) : getGenderImage(result.gender).src}
              />
            )}
            {result.pic && (
              <Image
                className={"rounded-full"}
                width={60}
                height={60}
                objectFit={"cover"}
                alt={"User"}
                src={result.pic ? generateFileUrl(result.pic) : getGenderImage(result.gender).src}
              />
            )}
          </div>
          <div className={"flex flex-col justify-evenly ml-[10px]"}>
            <p
              className={
                "text-caak-generalblack text-[17px] tracking-[0.26px] leading-[19px] font-medium"
              }
            >
              {result?.nickname ? result.nickname : result.name}
            </p>
            <div
              className={
                "flex flex-row text-darkblue text-[14px] tracking-[0.21px] leading-[17px]"
              }
            >
              {result.type === "GROUP" ? (
                <div className={"flex flex-row items-center text-caak-"}>
                  <div className={"flex items-center  w-[14px] h-[14px]"}>
                    <span className={"icon-fi-rs-globe text-[13px]"} />
                  </div>
                  <p className={"ml-[5px] text-14px"}>Нээлттэй групп</p>
                  <p className={"ml-[14px]"}>{result.totals.member} гишүүн</p>
                </div>
              ) : (
                <div className={"flex flex-row items-center"}>
                  <p>{result.aura} аура</p>
                  <p className={"ml-[14px]"}>
                    {result.totals.followers} дагагчид
                  </p>
                </div>
              )}
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
              className={`${
                type === "group"
                  ? "icon-fi-rs-add-group-f"
                  : "icon-fi-rs-thick-add-friend"
              }  text-caak-generalblack-f text-[16px]`}
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
    ) : (
      <div className={"w-full bg-white shadow-card rounded-square mb-[20px]"}>
        <CardHeader
          containerClassname={"px-[16px] py-[14px]"}
          hideTitle
          post={result}
        />
        <Divider color={"border-caak-liquidnitgrogen"} />
        <div className={"flex flex-col p-[16px] justify-center"}>
          <div className={"flex flex-row justify-between items-center"}>
            <div
              className={
                "self-start text-[16px] tracking-[0.24px] leading-[21px] text-caak-generalblack break-all"
              }
            >
              {result.title}
            </div>
            <div
              className={
                "relative ml-[20px] w-[100px] h-[100px] relative rounded-square flex-shrink-0"
              }
            >
              <Image
                className={"rounded-square"}
                width={100}
                height={100}
                objectFit={"cover"}
                alt={"sda"}
                src={generateFileUrl(result.items.items[0].file)}
              />
            </div>
          </div>
          <div
            className={
              "flex flex-row justify-between items-center mt-[16px] text-[15px] text-caak-darkBlue tracking-[0.23px] leading-[18px]"
            }
          >
            <div className={"flex flex-row items-center w-[20px] h-[20px]"}>
              <span
                className={"icon-fi-rs-rock-i text-[20px] cursor-pointer"}
              />
              <p>{result.items.items[0].totals.reactions}</p>
            </div>
            <div>
              <p>{result.items.items[0].totals.comments} сэтгэгдэлтэй</p>
            </div>
          </div>
        </div>
      </div>
    )
  ) : null;
};

export default SearchCard;
