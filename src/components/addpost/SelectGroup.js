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
}) => {
  const dropDownClickOutsideRef = useClickOutSide(() => {
    setIsGroupVisible(false);
  });

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
                "icon-fi-rs-search text-caak-darkBlue flex items-center justify-center border-2 border-dashed border-caak-darkBlue w-6.5 h-6.5 rounded-square p-1"
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
              className={"icon-fi-rs-triangle text-caak-generalblack text-10px"}
            />
          </div>

          <span />
          {groupData.member && (
            <DropDownSelect
              setPost={setPost}
              onSelect={setSelectedGroup}
              open={isGroupVisible}
              onToggle={() => setIsGroupVisible(!isGroupVisible)}
              groupData={groupData}
              className={"-top-3 left-0 right-0 bg-white rounded-[3px] w-full"}
            />
          )}
        </div>
      </div>
      {/*<div className={"relative flex flex-row mt-2 items-center px-7"}>*/}
      {/*  <textarea*/}
      {/*    // rows={2}*/}
      {/*    ref={textareaRef}*/}
      {/*    onChange={onChangeText}*/}
      {/*    value={post.title}*/}
      {/*    maxLength={"200"}*/}
      {/*    placeholder={"Нийтлэлийн тайлбар оруулах..."}*/}
      {/*    className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded"*/}
      {/*  />*/}
      {/*  <span*/}
      {/*    className={*/}
      {/*      "absolute right-9 bottom-4 text-14px text-caak-darkBlue font-medium"*/}
      {/*    }*/}
      {/*  >*/}
      {/*    {post.title.length}/200*/}
      {/*  </span>*/}
      {/*</div>*/}
    </div>
  );
};

export default SelectGroup;
