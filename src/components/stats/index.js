const StatsItem = ({ icon, number, text, id, bgcolor, color }) => {
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  return (
    <div
      className={`${
        id !== 0 ? "ml-[4px] md:ml-[16px]" : ""
      } flex flex-col w-full sm:flex-row rounded-lg border border-caak-titaniumwhite bg-caak-emptiness h-[104px] items-center p-[10px] md:p-[30px]`}
    >
      <div
        className={`w-[44px] h-[44px] ${bgcolor} flex rounded-lg justify-center items-center mr-[14px]`}
      >
        <span className={`${icon} ${color} text-2xl`} />
      </div>
      <div className="flex flex-col">
        <div className="text-[18px] text-caak-generalblack md:text-[22px] font-inter font-medium">
          {kFormatter(number)}
        </div>
        <div className="text-caak-aleutian text-[12px] md:text-[15px] font-normal font-inter">
          {text}
        </div>
      </div>
    </div>
  );
};

export default StatsItem;
