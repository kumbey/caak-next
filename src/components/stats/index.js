import { kFormatter, numberWithCommas } from "../../utility/Util";

const StatsItem = ({ id, stat }) => {
  const { bgcolor, icon, color, gradient, number, text, type } = stat;

  return (
    <div
      className={`${
        id !== 0 ? "ml-[4px] md:ml-[16px]" : ""
      } flex flex-col w-full sm:flex-row rounded-lg border border-caak-titaniumwhite bg-caak-emptiness h-[104px] items-center p-[10px] md:p-[30px]`}
    >
      <div
        className={`w-[44px] h-[44px] ${bgcolor} relative flex rounded-[8px] justify-center items-center mr-[14px] `}
      >
        <div
          className={`absolute top-0 opacity-10 rounded-[8px] right-0 w-[44px] ${gradient} h-[44px]`}
        />
        <span className={`${icon} ${color} text-[26px] `} />
      </div>
      <div className="flex flex-col">
        <div className="text-[18px] text-caak-generalblack md:text-[22px] leading-[24px] font-inter font-medium">
          {type === "money"
            ? `${numberWithCommas(number, ".")}₮`
            : kFormatter(number)}
        </div>
        <div className="text-caak-aleutian text-[12px] md:text-[14px] leading-[17px] font-normal font-inter">
          {text}
        </div>
      </div>
    </div>
  );
};

export default StatsItem;
