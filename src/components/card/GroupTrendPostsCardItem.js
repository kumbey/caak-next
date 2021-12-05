import Image from "next/image";
import { getFileUrl } from "../../utility/Util";
import Link from 'next/link'

const GroupTrendPostsCardItem = ({ item }) => {
  const firstItem = item.items.items[0];
  return (
    <div className={"flex flex-row mb-[21px]"}>
      <Link href={`/post/view/${item.id}`}>
        <a>
          <div
            className={
              "w-[80px] h-[80px] rounded-square relative flex-shrink-0"
            }
          >
            <Image
              alt={firstItem.file.name}
              src={getFileUrl(firstItem.file)}
              layout={"fill"}
              objectFit={"cover"}
              className={"rounded-square"}
            />
          </div>
        </a>
      </Link>

      <div className={"flex flex-col ml-[10px] justify-between"}>
        <p
          className={
            "text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] truncate-3"
          }
        >
          {item.title}
        </p>
        <div className={"flex flex-row items-center"}>
          <div className={"flex justify-center items-center w-[20px] h-[20px]"}>
            <span
              className={"icon-fi-rs-rock-f text-caak-uclagold text-[20px]"}
            />
          </div>
          <p
            className={
              "text-caak-darkBlue tracking-[0.23px] leading-[18px] text-[15px] ml-[4px]"
            }
          >
            {item.totals.reactions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupTrendPostsCardItem;
