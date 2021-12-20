import Image from "next/image";
import Link from "next/link";
import Divider from "../divider";
import {
  extractDate,
  generateFileUrl,
  getGenderImage,
} from "../../utility/Util";
import Button from "../button";

const GroupInfo = ({ groupData, totalMember }) => {
  const createdAt = extractDate(groupData.createdAt);
  return (
    <div className=" flex flex-col relative bg-white mb-[16px]">
      <div className={"h-[34px] w-full relative"}>
        <Image
          alt={"group cover"}
          src={
            groupData.cover
              ? generateFileUrl(groupData?.cover)
              : getGenderImage("default")
          }
          layout={"fill"}
          objectFit={"cover"}
          className={"rounded-t-square"}
        />
      </div>
      <div className={"flex flex-row px-[18px] absolute top-[24px] items-end"}>
        <Link shallow href={`/group/view/${groupData.id}`}>
          <a>
            <div
              className={
                "flex items-center w-[48px] h-[48px] relative flex-shrink-0 border border-caak-titaniumwhite rounded-[6px]"
              }
            >
              <Image
                alt={"profile picture"}
                src={
                  groupData.profile
                    ? generateFileUrl(groupData?.profile)
                    : getGenderImage("default")
                }
                objectFit={"cover"}
                height={48}
                width={48}
                className={"rounded-[6px]"}
              />
            </div>
          </a>
        </Link>
        <div className={"ml-[11px] flex items-center pb-[10px]"}>
          <Link shallow href={`/group/view/${groupData.id}`}>
            <a>
              <p
                className={
                  "text-[15px] font-semibold text-caak-generalblack tracking-[0.23px] leading-[18px] truncate-1"
                }
              >
                {groupData.name}
              </p>
            </a>
          </Link>

          <span className={"icon-fi-rs-verified text-[16px] ml-[3px]"} />
        </div>
      </div>

      <div className={"p-[18px] mt-[38px]"}>
        <div className={"mb-[24px]"}>
          <p
            className={
              "text-15px text-caak-generalblack tracking-[0.23px] leading-[18px] truncate-2"
            }
          >
            {groupData.about}
          </p>
        </div>
        <div className="flex mt-[22px]">
          <div className="flex flex-col mr-[40px]">
            <p className="text-17px font-inter font-medium text-caak-generalblack">
              2434
            </p>
            <p className="text-14px text-caak-darkBlue">Аура</p>
          </div>
          <div className="flex flex-col">
            <p className="text-17px font-inter font-medium text-caak-generalblack">
              {totalMember}
            </p>
            <p className="text-14px text-caak-darkBlue">Гишүүн</p>
          </div>
        </div>
        <Divider
          className={"h-[1px] mt-[20px] mb-[16px]"}
          color={"border-caak-titaniumwhite"}
        />
        <div className="flex flex-col ">
          <div className="flex mb-2 text-caak-darkBlue items-center">
            <span className="icon-fi-rs-birth text-xl mr-2 pb-1" />
            <p className="text-14px ">{`${createdAt.year}.${createdAt.month}.${createdAt.day}`}</p>
          </div>
          <div className="flex text-caak-darkBlue items-center">
            <span className="icon-fi-rs-globe text-xl mr-2" />
            <p className="text-14px ">Нээлттэй бүлэг</p>
          </div>
        </div>
        <Divider
          className={"h-[1px] mt-[21px] mb-[21px]"}
          color={"border-caak-titaniumwhite"}
        />
        <div className="flex flex-col">
          <div className="text-caak-darkBlue text-sm mb-[10px]">
            Грүппын төрөл
          </div>
          <div className="flex  items-center  w-auto h-[35px] rounded-full border-2 border-caak-liquidnitrogen">
            <div className="flex items-center mx-[16px]">
              <span className={`${groupData.category.icon} mr-2`} />
              <p className="font-medium font-inter text-15px">
                {groupData.category.name}
              </p>
            </div>
          </div>
          {(groupData.role_on_group === "ADMIN" ||
            groupData.role_on_group === "MODERATOR") && (
            <div>
              <Button
                className={
                  "font-medium  w-full mt-5 mb-c1 bg-caak-cardinal text-16px text-white border border-caak-titaniumwhite h-[44px]"
                }
                iconPosition="left"
                icon={<span className="icon-fi-rs-edit mr-1 text-lg" />}
              >
                Группын мэдээлэл засах
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
