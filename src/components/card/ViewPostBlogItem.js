import Image from "next/image";
import { getFileUrl } from "../../utility/Util";

const ViewPostBlogItem = ({postItem}) => {
  return (
    <div className={"flex flex-col mt-[40px]"}>
      <div className={"relative h-[438px] w-full pt-[4px] "}>
        <Image
          className={"rounded-[6px]"}
          objectFit={"cover"}
          layout={"fill"}
          src={getFileUrl(postItem.file)}
          alt={"post picture"}
        />
        <div
          style={{ borderRadius: "16%/50%" }}
          className={
            "flex flex-row absolute bottom-[12px] right-[10px] bg-white h-[26px] px-[8px] py-[4px] border-[1px] border-white"
          }
        >
          <div className={"flex flex-row items-center"}>
            <div
              className={
                "group flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
              }
            >
              <span
                className={
                  "icon-fi-rs-rock-i text-[18px] transition duration-200 group-hover:scale-110"
                }
              />
            </div>
            <p
              className={
                "text-[14px] text-darkblue tracking-[0.21px] leading-[16px] ml-[4px]"
              }
            >
              24
            </p>
          </div>
          <div className={"flex flex-row items-center ml-[15px]"}>
            <div
              className={
                "group flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
              }
            >
              <span
                className={
                  "icon-fi-rs-comment text-caak-cherenkov text-[16.5px] transition duration-200 group-hover:scale-125"
                }
              />
            </div>
            <p
              className={
                "text-[14px] text-darkblue tracking-[0.21px] leading-[16px] ml-[4px]"
              }
            >
              5
            </p>
          </div>
        </div>
      </div>
      <div className={"pt-[20px]"}>
        <p
          className={
            "text-caak-generalblack text-[16px] tracking-[0.38px] leading-[22px]"
          }
        >
          Дэлхийн соронзон орны талбай нь маш хүчирхэг юм. Үүний ачаар
          гарагуудын агаар мандлыг сүйтгэдэг нарны шуурга болон бүх амьд
          биетүүдийг шатаадаг сансрын цацраг туяа бидэнд хүрдэггүй аж.
        </p>
      </div>
    </div>
  );
};

export default ViewPostBlogItem;
