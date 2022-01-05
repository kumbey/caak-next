import Image from "next/image";
import { useEffect, useState } from "react";
import { useClickOutSide } from "../../utility/Util";
import DropDown from "../navigation/DropDown";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import MemberMoreMenu from "./MemberMoreMenu";

const GroupMemberList = ({ userList, ...props }) => {
  const [tag, setTag] = useState({ color: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex justify-between items-center mb-[20px]">
      <div className="flex items-center">
        <div className="">
          <div className={"w-[48px] h-[48px] mr-[8px] relative"}>
            <img
              className=" bg-white rounded-full"
              src={
                userList?.user.pic
                  ? getFileUrl(userList?.user.pic)
                  : getGenderImage(userList?.user?.gender)
              }
              width={48}
              height={48}
              // layout="fixed"
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
              className={`flex items-center h-[18px] px-[8px] rounded ${tag.color}
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
      <div
        ref={menuRef}
        onClick={toggleMenu}
        className={`flex justify-center flex-shrink-0 ml-3 w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-titaniumwhite rounded-full`}
      >
        <span className=" icon-fi-rs-dots rounded-full h-full p-2 cursor-pointer  hover:bg-caak-liquidnitrogen" />
        <DropDown
          className={"top-5"}
          open={isMenuOpen}
          onToggle={toggleMenu}
          content={<MemberMoreMenu />}
        />
      </div>
    </div>
  );
};

export default GroupMemberList;
