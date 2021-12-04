import { useUser } from "../../context/userContext";
import Image from "next/image";
import { getFileUrl } from "../../utility/Util";
import Divider from "../divider";
import { extractDate } from "../../utility/Util";
import Button from "../button";

const GroupBadge = ({ groupData }) => {
  return (
    <div
      className={"flex flex-col bg-white rounded-square pb-[20px] mb-[16px]"}
    >
      <div
        className={
          "flex flex-row items-center border-b border-caak-titaniumwhite px-[12px] py-[10px]"
        }
      >
        <p
          className={
            "ml-[8px] text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] font-semibold"
          }
        >
          Группын цол
        </p>
      </div>
      <div className={"flex flex-col"}></div>
    </div>
  );
};

export default GroupBadge;
