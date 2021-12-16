import Image from "next/image";
import Link from "next/link";

const SideBarGroupItem = ({ name, notification, image, groupId }) => {
  return (
    <Link href={`/group/${groupId}`}>
      <a>
        <div
          className={
            "flex flex-row items-center justify-between my-[6px] h-[32px]"
          }
        >
          <div className={"flex flex-row items-center"}>
            <Image
              className={"w-[32px] h-[32px] rounded-square"}
              src={image}
              alt={"group icon"}
              width={32}
              height={32}
              objectFit={"cover"}
            />

            <div
              className={"truncate-2 leading-4 text-15px ml-[10px] w-[144px]"}
            >
              {name}
            </div>
          </div>
          {notification > 0 && (
            <div
              className={
                "w-[34px] flex justify-center items-center text-center bg-caak-bleudefrance  bg-opacity-[14%] w-[34px] h-[18px] rounded-[100px]"
              }
            >
              <div
                className={"font-semibold  text-caak-bleudefrance text-11px"}
              >
                +{notification}
              </div>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default SideBarGroupItem;
