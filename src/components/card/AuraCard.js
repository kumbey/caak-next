import auraImage from "../../../public/assets/images/Aura.svg";
import Image from "next/image";
import Button from "../button";
const AuraCard = () => {
  return (
    <div
      className={
        "auraCard flex flex-col justify-between items-center bg-caak-icingrose px-[50px] py-[18px] w-[320px] h-[260px] rounded-square"
      }
    >
      <div className={"font-bold text-22px text-caak-extraBlack py-[10px]"}>
        Аура гэж юу вэ?
      </div>

      <Image
        src={auraImage}
        alt="What is Aura"
        width={"216px"}
        height={"146px"}
        objectFit="contain"
      />
      <Button skin={"primary w-[220px] h-[36px] font-medium text-14px"}>Дэлгэрэнгүй</Button>
    </div>
  );
};

export default AuraCard;
