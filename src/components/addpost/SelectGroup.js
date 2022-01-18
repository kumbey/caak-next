import { generateFileUrl, useClickOutSide } from "../../utility/Util";
import DropDownSelect from "../input/DropDownSelect";
import { useEffect, useState } from "react";

const SelectGroup = ({
  setIsGroupVisible,
  isGroupVisible,
  selectedGroup,
  setSelectedGroup,
  groupData,
  containerClassName,
  setPost,
  setIsAuraModalOpen,
  userAura,
}) => {
  const dropDownClickOutsideRef = useClickOutSide(() => {
    setIsGroupVisible(false);
  });
  console.log(groupData)
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <div className={"flex flex-row items-center px-[18px]"}>
        <div
          ref={dropDownClickOutsideRef}
          onClick={() => setIsGroupVisible(!isGroupVisible)}
          className={`relative flex flex-row items-center cursor-pointer bg-white text-16px text-caak-generalblack w-full pl-[12px] pr-10 py-3 block h-11 w-full rounded-[3px] text-base  border border-gray-200 placeholder-gray-400   sm:text-sm  hover:bg-white`}
        >
          {selectedGroup ? (
            ""
          ) : (
            <span
              className={
                "icon-fi-rs-thick-search text-caak-darkBlue flex items-center justify-center border-2 border-dashed border-caak-darkBlue w-6.5 h-6.5 rounded-square p-1"
              }
            />
          )}
          {selectedGroup ? (
            <div className={"flex flex-row items-center"}>
              <img
                src={generateFileUrl(selectedGroup.profile)}
                className={"w-8 h-8 rounded-md object-cover mr-2"}
                alt={""}
              />
              <span className={"text-16px text-caak-generalblack"}>
                {selectedGroup.name}
              </span>
            </div>
          ) : (
            <p
              className={
                "text-caak-generalblack text-[15px] ml-[10px] tracking-[0.23px] leading-[18px]"
              }
            >
              Группээ сонгоно уу
            </p>
          )}
          <div
            className={
              "flex items-center justify-center w-[12px] h-[12px] absolute right-[12px]"
            }
          >
            <span
              className={`  icon-fi-rs-triangle text-caak-generalblack text-10px`}
            />
          </div>
          <span />
          {groupData.unMember && (
            <DropDownSelect
              setPost={setPost}
              onSelect={setSelectedGroup}
              open={isGroupVisible}
              onToggle={() => setIsGroupVisible(!isGroupVisible)}
              groupData={groupData}
              setIsAuraModalOpen={setIsAuraModalOpen}
              userAura={userAura}
              className={"-top-3 left-0 right-0 bg-white rounded-[3px] w-full"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectGroup;
