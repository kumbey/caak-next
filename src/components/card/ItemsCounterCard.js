const ItemsCounterCard = ({ count, containerClassname, duration }) => {
  function secondsToTime(e) {
    const m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div
      className={`${
        containerClassname ? containerClassname : ""
      } flex flex-row items-center absolute top-[10px] right-[10px]`}
    >
      {typeof duration !== "undefined" ? (
        <div
          className={
            "flex items-center justify-center h-[20px] bg-black bg-opacity-20 z-[1] py-[2px] px-[8px] rounded-[5px]"
          }
        >
          <div
            className={
              "flex items-center justify-center w-[16px] h-[16px] ml-[2px]"
            }
          >
            <span className={"icon-fi-rs-video text-white text-[14px]"} />
          </div>
          <p className={"text-white text-[11px] font-bold ml-[4px]"}>
            {secondsToTime(duration)}
          </p>
        </div>
      ) : null}
      {count > 1 && (
        <div
          className={
            "flex items-center justify-center h-[20px] bg-black bg-opacity-20 z-[1] py-[2px] px-[8px] rounded-[5px] ml-[4px]"
          }
        >
          <div
            className={
              "flex items-center justify-center w-[16px] h-[16px] ml-[2px]"
            }
          >
            <span className={"icon-fi-rs-album text-white text-[14px]"} />
          </div>
          <p className={"text-white text-[11px] font-bold ml-[3px]"}>
            +{count}
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemsCounterCard;
