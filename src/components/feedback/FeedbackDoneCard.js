import Image from "next/image";
import smileHeart from "/public/assets/images/feedback/smileHeart.svg";

const FeedbackDoneCard = ({isOpen, setIsOpen}) => {
  return isOpen && (
    <div onClick={()=> setIsOpen(false)} className={"cursor-pointer w-[321px] h-[157px] feedBack flex flex-col items-center justify-center z-[10] fixed bottom-[78px] md:bottom-[90px] right-[24px] p-[25px]"}>
      <img alt={""} src={smileHeart.src} height={38} width={38} />
      <p className={"mt-[16px] text-white text-[22px] font-semibold"}>Танд баярлалаа</p>
    </div>
  );
};

export default FeedbackDoneCard;