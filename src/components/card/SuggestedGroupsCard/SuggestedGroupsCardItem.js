import Image from "next/image";

const SuggestedGroupsCardItem = ({ name, members, verified }) => {
  return (
    <div
      className={
        "suggestedGroupsCardItem flex flex-row items-center my-[7px] h-[42px]"
      }
    >
      <div className={"suggestedGroupsCardItemImage w-[42px] h-[42px]"}>
        <Image
          objectFit={"cover"}
          className={"rounded-full"}
          src={"https://picsum.photos/200"}
          alt={"group image"}
          layout={"fixed"}
          width={42}
          height={42}
        />
      </div>

      <div className={"flex flex-col justify-center pl-[8px]"}>
        <div
          className={
            "text-15px text-caak-generalblack tracking-0.23px leading-[18px]"
          }
        >
          {name}{" "}
          {verified ? (
            <span className={"icon-fi-rs-verified text-14px"} />
          ) : null}
        </div>
        <div
          className={"text-13px text-darkblue tracking-[0.2px] leading-[16px]"}
        >
          {members} гишүүн
        </div>
      </div>
    </div>
  );
};

export default SuggestedGroupsCardItem;
