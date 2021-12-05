import { useUser } from "../../context/userContext";
import Image from "next/image";
import { getFileUrl } from "../../utility/Util";
import Divider from "../divider";
import { extractDate } from "../../utility/Util";
import Button from "../button";

const GroupInfo = ({ groupData }) => {
  const createdAt = extractDate(groupData.createdAt);
  return (
    <div className=" flex flex-col mb-[16px]">
      <div className=" h-[48px] w-full rounded-t-lg bg-caak-cardinal ">
        <h1 className=" ml-[18px] my-[15px] text-white">Группын тухай</h1>
      </div>
      <div className={"flex flex-col  px-[18px] rounded-b-lg bg-white "}>
        <div className="mt-[20px]  ">
          <p className="text-sm">{groupData.about}</p>
        </div>
        <div className="flex mt-[22px]">
          <div className="flex flex-col mr-[40px]">
            <p className="text-17px">2434</p>
            <p className="text-14px text-caak-darkBlue">Аура</p>
          </div>
          <div className="flex flex-col">
            <p className="text-17px">{groupData.totals.member}</p>
            <p className="text-14px text-caak-darkBlue">Гишүүн</p>
          </div>
        </div>
        <Divider
          className={"h-[1px] mt-[21px] mb-[21px]"}
          color={"border-caak-titaniumwhite"}
        />
        <div className="flex flex-col">
          <div className="flex mb-2 text-caak-darkBlue items-center">
            <span className="icon-fi-rs-birth  mr-2" />
            <p className="text-14px ">{`${createdAt.year}.${createdAt.month}.${createdAt.day}`}</p>
          </div>
          <div className="flex text-caak-darkBlue items-center">
            <span className="icon-fi-rs-globe mr-2" />
            <p className="text-14px ">Нээлттэй бүлэг</p>
          </div>
        </div>
        <Divider
          className={"h-[1px] mt-[21px] mb-[21px]"}
          color={"border-caak-titaniumwhite"}
        />
        <div className="flex flex-col">
          <div className="text-caak-darkBlue text-sm">Грүппын төрөл</div>
          <div className="flex items-center justify-center w-[110px] mt-2.5 h-[35px] rounded-full border-2 border-caak-liquidnitrogen">
            <span className={`${groupData.category.icon} mr-2`} />
            <p className="font-medium font-inter text-15px">
              {groupData.category.name}
            </p>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
