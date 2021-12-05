import React from "react";

const StatsItem = ({ icon, number, text, id, bgcolor, color }) => {
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  return (
    <div
      className={`${
        id !== 0 ? "ml-[16px]" : ""
      } flex  rounded-lg border border-caak-titaniumwhite bg-caak-emptiness  h-[104px] w-[300px] items-center `}
    >
      <div
        className={`w-11 h-11 ${bgcolor} flex rounded-lg justify-center items-center ml-[30px] mr-[14px]`}
      >
        <span className={`${icon} ${color}  text-2xl`} />
      </div>
      <div className="flex flex-col">
        <div className="text-caak-generalblack text-[22px] font-inter font-medium">
          {kFormatter(number)}
        </div>
        <div className="text-caak-aleutian text-[15px] font-normal font-inter">
          {text}
        </div>
      </div>
    </div>
  );
};

export default StatsItem;
