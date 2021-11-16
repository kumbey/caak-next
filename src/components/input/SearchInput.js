import React from "react";
import Input from "./index";

const SearchInput = ({ label, containerStyle, className, ...props }) => {
  return (
    <div className="relative">
      <div
        className={
          "flex justify-center items-center absolute w-[20px] h-[20px] left-[18px] mr-px-7 top-1/2 transform -translate-y-1/2 z-2"
        }
      >
        <span className={"icon-fi-rs-search text-16px text-darkblue "} />
      </div>

      <Input
        hideError
        {...props}
        label={label}
        className={`pl-c27 h-[36px] pl-[42px] border-transparent bg-gray-100 hover:placeholder-caak-generalblack ${
          className ? className : ""
        }`}
      />
    </div>
  );
};

export default SearchInput;
