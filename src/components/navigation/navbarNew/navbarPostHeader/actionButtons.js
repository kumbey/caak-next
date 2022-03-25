const ActionButtons = () => {
  return (
    <div className={"flex flex-row items-center justify-center text-white"}>
      <div
        className={
          "w-[20px] h-[20px] flex items-center justify-center cursor-pointer"
        }
      >
        <span className={"iconNew-fi-rs-share text-[17px]"} />
      </div>
      <div
        className={
          "w-[20px] h-[20px] flex items-center justify-center cursor-pointer ml-[12px]"
        }
      >
        <span className={"iconNew-fi-rs-bookmark text-[17px]"} />
      </div>
      <div
        className={
          "w-[20px] h-[20px] flex items-center justify-center cursor-pointer ml-[14px]"
        }
      >
        <span className={"iconNew-fi-rs-heart text-[18px]"} />
      </div>
      <div
        className={
          "w-[20px] h-[20px] flex items-center justify-center cursor-pointer ml-[10px]"
        }
      >
        <span className={"iconNew-fi-rs-more-ver text-[17px]"} />
      </div>
    </div>
  );
};

export default ActionButtons;
