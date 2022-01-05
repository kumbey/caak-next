import Image from "next/image";
import { getFileUrl } from "../../utility/Util";
import userVerifiedSvg from "../../../public/assets/images/fi-rs-awarded.svg";

const GroupTopMemberCardItem = ({ color, user }) => {
  return (
    <div
      className={`flex flex-row items-center justify-between ${
        color ? color : ""
      } bg-opacity-[0.06] py-[10px] pl-[15px] pr-[25px] border-l-[3px] border-transparent`}
    >
      <div className={"flex flex-row items-center justify-between"}>
        <div
          className={"w-[42px] h-[42px] relative flex-shrink-0 rounded-full"}
        >
          {user.pic ? (
            <img
              className={"rounded-full object-cover"}
              height={42}
              width={42}
              // objectFit={"cover"}
              alt={"user profile pic"}
              src={getFileUrl(user.pic)}
            />
          ) : (
            <img
              className={"rounded-full object-cover"}
              height={42}
              width={42}
              // objectFit={"cover"}
              alt={"user profile pic"}
              src={"https://picsum.photos/100"}
            />
          )}
        </div>
        <div className={"flex flex-col ml-[12px]"}>
          <div className={"flex flex-row items-center"}>
            <p
              className={
                "text-caak-generalblack text-[15px] font-medium tracking-[0.23px] leading-[18px]"
              }
            >
              {user.nickname}
            </p>
            {user.verified && (
              <div className={"flex items-center w-[16px] h-[16px] ml-[4px]"}>
                <img
                  alt={""}
                  className={"w-[16.5px] h-[14.25px]"}
                  height={14.25}
                  width={16.5}
                  // quality={100}
                  // priority={true}
                  src={userVerifiedSvg.src}
                />
              </div>
            )}
          </div>
          <div>
            <p
              className={
                "text-caak-extraBlack opacity-[0.6] text-[13px] font-medium tracking-[0.2px] leading-[16px]"
              }
            >
              {user.totals.followers} дагагчид
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className={"flex flex-col"}>
          <div>
            <p
              className={
                "text-[16px] text-caak-extraBlack tracking-[0.24px] leading-[19px]"
              }
            >
              {user.aura}
            </p>
          </div>
          <div>
            <p
              className={
                "text-[12px] text-caak-extraBlack opacity-[0.6] tracking-[0.18px] leading-[15px] "
              }
            >
              Аура
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTopMemberCardItem;
