import Button from "../button";

const PostSuccessModal = ({ messageTitle, isOpen, setIsOpen, finish }) => {
  return isOpen ? (
    <div className="popup_modal">
      <div className="popup_modal-success rounded-xl">
        <div
          className={
            "bg-white py-[40px] px-[50px] flex flex-col items-center relative rounded-xl"
          }
        >
          <div
            onClick={() => setIsOpen(false)}
            className={
              "flex items-center justify-center w-[30px] h-[30px] rounded-full bg-caak-titaniumwhite absolute right-[16px] top-[16px] cursor-pointer"
            }
          >
            <span className={"icon-fi-rs-close text-[14px]"} />
          </div>
          <div className="h-[48px] w-[48px] mb-[10px] rounded-full bg-caak-algalfuel flex items-center justify-center">
            <span className="icon-fi-rs-thick-check text-white text-26px" />
          </div>
          <p className="font-inter font-semibold text-18px text-caak-generalblack mb-[14px]">
            {messageTitle}
          </p>
          <p className="font-inter font-normal text-15px text-caak-darkBlue text-center tracking-0.23px px-2 ">
            Группын админ постыг баталгаажуулах хүртэл түр хүлээнэ үү.
          </p>

          <Button
            onClick={() => finish()}
            // disabled
            className={
              "mr-2 mt-[24px] text-14px font-inter font-medium text-white  w-[146px] h-[36px] bg-caak-bleudefrance"
            }
          >
            Постыг харах
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PostSuccessModal;
