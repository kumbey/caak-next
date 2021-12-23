import Image from "next/image";
import { generateFileUrl, getGenderImage } from "../../../utility/Util";
import Link from "next/link";

const SuggestedGroupsCardItem = ({ group }) => {
  return (
    <div
      className={"suggestedGroupsCardItem flex flex-row mb-[14px] last:mb-0"}
    >
      <Link href={`/group/${group.id}`}>
        <a>
          <div className={"suggestedGroupsCardItemImage w-[42px] h-[42px]"}>
            <Image
              objectFit={"cover"}
              className={"rounded-full"}
              src={
                group.profile
                  ? generateFileUrl(group.profile)
                  : getGenderImage("default")
              }
              alt={"group image"}
              layout={"fixed"}
              width={42}
              height={42}
            />
          </div>
        </a>
      </Link>

      <div className={"flex flex-col justify-center w-full pl-[8px]"}>
        <div
          className={
            "text-15px text-caak-generalblack tracking-0.23px leading-[18px] truncate-2"
          }
        >
          <Link href={`/group/${group.id}`}>
            <a>{group.name}</a>
          </Link>
          {group?.verified ? (
            <span className={"icon-fi-rs-verified text-14px"} />
          ) : null}
        </div>
        <div
          className={
            "text-13px text-darkblue tracking-[0.2px] leading-[16px] h-[16px]"
          }
        >
          {group.totals.member} гишүүн
        </div>
      </div>
    </div>
  );
};

export default SuggestedGroupsCardItem;
