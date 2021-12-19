import { useState } from "react";
import { useClickOutSide } from "../../utility/Util";
import DropDown from "../navigation/DropDown";
import EditMore from "./EditMore";
import Button from "../button";

const GroupRuleItem = ({ setIsModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex  mt-[20px] border-b-[1px]">
      <span className="icon-fi-rs-drag text-20px text-caak-aleutian mr-[10px]" />
      <div className="flex flex-col mr-[10px] mb-[10px]">
        <p className="font-inter font-medium text-15px text-caak-generalblack">
          1. Зар оруулахгүй байх
        </p>
        <p className="font-inter font-normal text-14px text-caak-darkBlue">
          Хэрэв хамтарч ажиллах санал хүсэлт байгаа бол админуудтай холбогдох.
        </p>
      </div>
      <div
        ref={menuRef}
        onClick={toggleMenu}
        className={`flex justify-center flex-shrink-0 ml-3 w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-titaniumwhite rounded-full`}
      >
        <span className="icon-fi-rs-dots text-22px" />
        <DropDown
          open={isMenuOpen}
          onToggle={toggleMenu}
          content={<EditMore setIsModalOpen={setIsModalOpen} />}
          className={"top-[25px] z-[20000]"}
        />
      </div>
    </div>
  );
};

export default GroupRuleItem;
