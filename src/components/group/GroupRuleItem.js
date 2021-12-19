import { useState } from "react";
import { useClickOutSide } from "../../utility/Util";
import DropDown from "../navigation/DropDown";
import EditMore from "./EditMore";
import Button from "../button";

const GroupRuleItem = ({
  setIsModalOpen,
  setType,
  title,
  description,
  index,
  setActiveIndex,
  handleDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex flex-row justify-between w-full  mt-[20px] border-b-[1px]">
      <div className={"flex flex-row "}>
        <div className="flex items-center justify-center w-[20px] h-[20px]">
          <span className="icon-fi-rs-drag text-20px text-caak-aleutian mr-[10px]" />
        </div>
        <div className="flex flex-col mr-[10px] mb-[10px]">
          <p className="font-inter  break-all font-medium text-15px text-caak-generalblack">
            {`${index + 1}. ${title}`}
          </p>
          <p className="font-inter  break-all font-normal text-14px text-caak-darkBlue">
            {description}
          </p>
        </div>
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
          content={
            <EditMore
              setActiveIndex={setActiveIndex}
              activeIndex={index}
              setIsModalOpen={setIsModalOpen}
              setType={setType}
              handleDelete={handleDelete}
            />
          }
          className={"top-[25px] z-[20000]"}
        />
      </div>
    </div>
  );
};

export default GroupRuleItem;
