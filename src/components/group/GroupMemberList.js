import Image from "next/image";
import { useEffect, useState } from "react";
import { getFileUrl, getGenderImage } from "../../utility/Util";

const GroupMemberList = ({ userList, ...props }) => {
  const [tag, setTag] = useState({ color: "", text: "" });
  const tagColor = () => {
    if (userList?.role === "ADMIN") {
      setTag({
        color: "bg-caak-buttonblue text-caak-buttonblue",
        text: "Админ",
      });
    } else if (userList?.role === "EDITOR") {
      setTag({
        color: "bg-caak-algalfuel text-caak-algalfuel",
        text: "Редактор",
      });
    } else if (userList?.role === "MODERATOR") {
      setTag({
        color: "bg-caak-primary text-caak-primary",
        text: "Модератор",
      });
    } else if (userList?.role === "ANALYST") {
      setTag({
        color: "bg-caak-darkBlue text-caak-darkBlue",
        text: "Аналист",
      });
    }
  };
  useEffect(() => {
    tagColor();
  }, []);
  return (
    <div className="flex justify-between mb-[20px]">
      <div className="flex items-center">
        <div className="">
          <div className={"w-[48px] h-[48px] mr-[8px] relative"}>
            <Image
              className=" bg-white rounded-full"
              src={
                userList?.user.pic
                  ? getFileUrl(userList?.user.pic)
                  : getGenderImage(userList?.user?.gender)
              }
              width={48}
              height={48}
              layout="fixed"
              //   objectFit={"cover"}
              alt="#"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="font-medium font-inter text-15px text-caak-generalblack mr-[15px]">
              @{userList?.user?.nickname}
            </div>
            <div
              className={`flex items-center px-[8px] rounded ${tag.color}
               bg-opacity-10`}
            >
              <p className={`font-inter font-normal text-12px`}>{tag.text}</p>
            </div>
          </div>
          <div className="font-medium font-inter text-13px text-caak-extraBlack text-opacity-60">
            {userList?.user?.totals?.followers} дагагчид
          </div>
        </div>
      </div>
      <div className="">dots</div>
    </div>
  );
};

export default GroupMemberList;
