const ViewPostMoreMenu = () => {
  return (
    <div className={"dropdown-item-wrapper flex flex-col w-full"}>
      <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
        <div className={"w-[20px] h-[20px] flex items-center justify-center"}>
          <span
            className={"icon-fi-rs-save-o text-[17px]"}
          />
        </div>
        <p className="ml-[12px] text-14px text-caak-extraBlack">Хадгалах</p>
      </div>
      <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <div className={"w-[20px] h-[20px] flex items-center justify-center"}>
          <span
              className={"icon-fi-rs-flag text-[17px]"}
          />
          </div>
          <p className="ml-[12px] text-14px text-caak-extraBlack">Репорт</p>
      </div>
    </div>
  );
};

export default ViewPostMoreMenu;
