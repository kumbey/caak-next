const DefaultBoostModalLayout = ({ setIsOpen, children, headerTitle }) => {
  return (
    <div className="popup_modal">
      <div className="popup_modal-content-boost w-full">
        <div
          className={
            "flex flex-col justify-between bg-[#ECECEF] w-full h-full rounded-[12px]"
          }
        >
          {/*Header*/}
          <div
            className={
              "flex-shrink-0 relative flex items-center justify-center w-full h-[60px] border-b-[1px] border-[#E4E4E5] bg-white rounded-t-[12px]"
            }
          >
            <div
              onClick={() => setIsOpen(false)}
              className={
                "cursor-pointer absolute p-[8px] bg-[#E4E4E5] rounded-full right-[16px] top-[16px] w-[30px] h-[30px] flex items-center justify-center"
              }
            >
              <span
                className={
                  "text-caak-generalblack icon-fi-rs-close text-[14px] w-[14px] h-[14px]"
                }
              />
            </div>
            <p
              className={
                "text-caak-generalblack text-[20px] tracking-[0.3px] leading-[24px] font-semibold"
              }
            >
              {headerTitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultBoostModalLayout;
