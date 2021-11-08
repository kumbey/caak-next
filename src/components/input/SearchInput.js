import React from "react";
import Input from "./index";

const SearchInput = ({ label, ...props }) => {
  return (
    <div className="relative">
      {/*<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">*/}
      <span
        className={
          "absolute left-c11 mr-px-7 top-1/2 transform -translate-y-1/2 icon-fi-fi-sp-hamburger-menu text-14px text-darkblue z-2"
        }
      />
      {/*<SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />*/}
      {/*</div>*/}
      <Input
        hideError
        {...props}
        label={label}
        className={
          "pl-c27  h-c37 pl-8 bg-gray-100 hover:placeholder-caak-generalblack"
        }
      />
    </div>
  );
};

export default SearchInput;
