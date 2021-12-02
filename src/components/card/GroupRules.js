import { Accordion } from "../accordion/Accordion";
import Image from "next/image";
import ruleSvg from "../../../public/assets/images/clipboard.svg";

const GroupRules = () => {
  return (
    <div
      className={"flex flex-col bg-white rounded-square pb-[20px] mb-[16px]"}
    >
      <div
        className={
          "flex flex-row items-center border-b border-caak-titaniumwhite px-[12px] py-[10px]"
        }
      >
        <div className={"flex items-center justify-center w-[24px] h-[24px]"}>
          <Image alt={""} src={ruleSvg} height={24} width={24} />
        </div>
        <p
          className={
            "ml-[8px] text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] font-semibold"
          }
        >
          Группын дүрэм
        </p>
      </div>
      <div className={"flex flex-col"}>
        <ol
          style={{ counterReset: "section", listStyleType: "none" }}
          className={
            "text-caak-extraBlack text-[14px] tracking-[0.21px] leading-[16px] tracking-[0.21px] leading-[16px] px-[18px]"
          }
        >
          <li
            className={
              "py-[12px] border-b border-caak-titaniumwhite orderedAccordion flex flex-row"
            }
          >
            <Accordion
              contentClassname={
                "text-caak-extrablack text-[14px] tracking-[0.21px] leading-[16px] pt-[8px] break-wrods"
              }
              titleClassname={"text-caak-extrablack text-[15px]"}
              content={
                "Хэрэв хамтарч ажиллах санал хүсэлт байгаа бол админуудтай холбогдох."
              }
              title={"Аялалтай хамааралтай пост оруулах"}
            />
          </li>
          <li
            className={
              "py-[12px] border-b border-caak-titaniumwhite orderedAccordion flex flex-row"
            }
          >
            <Accordion
              contentClassname={
                "text-caak-extrablack text-[14px] tracking-[0.21px] leading-[16px] pt-[8px]"
              }
              titleClassname={"text-caak-extrablack text-[15px]"}
              content={
                "Хэрэв хамтарч ажиллах санал хүсэлт байгаа бол админуудтай холбогдох."
              }
              title={"Зар оруулахгүй байх"}
            />
          </li>
          <li
            className={
              "py-[12px] border-b border-caak-titaniumwhite py-[12px] orderedAccordion flex flex-row"
            }
          >
            <Accordion
              contentClassname={
                "text-caak-extrablack text-[14px] tracking-[0.21px] leading-[16px] pt-[8px]"
              }
              titleClassname={"text-caak-extrablack text-[15px]"}
              content={
                "Хэрэв хамтарч ажиллах санал хүсэлт байгаа бол админуудтай холбогдох."
              }
              title={"Эерэг бай, Бусдыг хүндэл"}
            />
          </li>
          <li
            className={
              "py-[12px] border-b border-caak-titaniumwhite py-[12px] orderedAccordion flex flex-row"
            }
          >
            <Accordion
              contentClassname={
                "text-caak-extrablack text-[14px] tracking-[0.21px] leading-[16px] pt-[8px]"
              }
              titleClassname={"text-caak-extrablack text-[15px]"}
              content={
                "Хэрэв хамтарч ажиллах санал хүсэлт байгаа бол админуудтай холбогдох."
              }
              title={"Эхлээд хай"}
            />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default GroupRules;
