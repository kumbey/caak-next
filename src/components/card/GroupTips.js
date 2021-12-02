import Image from 'next/image'
import tipsSvg from '/public/assets/images/lifebuoy.svg'

const GroupTips = () => {
  return (
    <div className={"flex flex-col bg-white rounded-square pb-[20px]"}>
      <div
        className={
          "flex flex-row items-center border-b border-caak-titaniumwhite px-[12px] py-[10px]"
        }
      >
        <div className={"flex items-center justify-center w-[24px] h-[24px]"}>
          <Image alt={""} src={tipsSvg} height={24} width={24}/>
        </div>
        <p
          className={
            "ml-[8px] text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] font-semibold"
          }
        >
          Анхаарах зүйлс
        </p>
      </div>
      <div className={"flex flex-col"}>
        <ol
          type={"1"}
          className={
            "text-caak-extraBlack text-[14px] tracking-[0.21px] leading-[16px] px-[18px]"
          }
        >
          <li
            style={{ listStyle: "inside decimal none" }}
            className={"py-[12px] border-b border-caak-titaniumwhite py-[12px]"}
          >
            Эерэг бай, Бусдыг хүндэл
          </li>
          <li
            style={{ listStyle: "inside decimal none" }}
            className={"py-[12px] border-b border-caak-titaniumwhite py-[12px]"}
          >
            Групптэй холбоотой пост оруулах
          </li>
          <li
            style={{ listStyle: "inside decimal none" }}
            className={"py-[12px] border-b border-caak-titaniumwhite py-[12px]"}
          >
            Хууль бус мэдээлэл хавсаргахгүй
          </li>
          <li
            style={{ listStyle: "inside decimal none" }}
            className={"py-[12px] border-b border-caak-titaniumwhite py-[12px]"}
          >
            Постын чанарыг нягтлах
          </li>
          <li
            style={{ listStyle: "inside decimal none" }}
            className={"py-[12px] border-b border-caak-titaniumwhite py-[12px]"}
          >
            Группын дүрэм баримтлах
          </li>
        </ol>
      </div>
    </div>
  );
};

export default GroupTips;
