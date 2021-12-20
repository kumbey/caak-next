import Image from "next/image";
import { generateFileUrl, getFileUrl } from "../../utility/Util";
import Link from "next/link";
import Video from "../video";

const GroupTrendPostsCardItem = ({ item }) => {
  const firstItem = item.items.items[0];
  return (
    <div className={"flex flex-row mb-[21px]"}>
      <Link shallow href={`/post/view/${item.id}`}>
        <a>
          <div
            className={
              "w-[80px] h-[80px] rounded-square relative flex-shrink-0"
            }
          >
            {firstItem.file.type.startsWith("video") ? (
              <Video
                smallIndicator
                hideControls
                videoClassname={"object-contain rounded-[4px]"}
                src={
                  firstItem.file.url
                    ? getFileUrl(firstItem.file.url)
                    : generateFileUrl(firstItem.file)
                }
              />
            ) : (
              <Image
                alt={firstItem.file.name}
                src={getFileUrl(firstItem.file)}
                layout={"fill"}
                objectFit={"cover"}
                className={"rounded-square"}
              />
            )}
          </div>
        </a>
      </Link>

      <div className={"flex flex-col ml-[10px] justify-between"}>
        <Link shallow href={`/post/view/${item.id}`}>
          <a>
            <p
              className={
                "text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] truncate-3"
              }
            >
              {item.title}
            </p>
          </a>
        </Link>

        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center"}>
            <div
              className={"flex justify-center items-center w-[20px] h-[20px]"}
            >
              <span
                className={"icon-fi-rs-rock-i text-caak-scriptink text-[20px]"}
              />
            </div>
            <p
              className={
                "text-caak-nocturnal tracking-[0.23px] leading-[18px] text-[15px] ml-[4px]"
              }
            >
              {item.totals.reactions}
            </p>
          </div>

          <div className={"flex flex-row items-center ml-[12px]"}>
            <div
              className={
                "flex items-center justify-center w-[20px] h-[20px] cursor-pointer"
              }
            >
              <span
                className={
                  "icon-fi-rs-comment-o text-caak-scriptink text-[20px]"
                }
              />
            </div>
            <p
              className={
                "text-[15px] text-caak-nocturnal tracking-[0.21px] leading-[16px] ml-[4px]"
              }
            >
              {item.totals.comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTrendPostsCardItem;
