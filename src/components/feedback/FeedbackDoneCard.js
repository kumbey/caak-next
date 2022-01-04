import Image from "next/image";
import smileHeart from "/public/assets/images/feedback/smileHeart.svg";

const FeedbackDoneCard = () => {
  return (
    <div className={"w-[321px] h-[157px] feedBack flex flex-col items-center justify-center z-[10] fixed bottom-[78px] md:bottom-[90px] right-[24px] p-[25px]"}>
      <Image alt={""} src={smileHeart} height={38} width={38} />
      <p className={"mt-[16px] text-white text-[22px] font-semibold"}>Танд баярлалаа</p>
    </div>
  );
};

export default FeedbackDoneCard;