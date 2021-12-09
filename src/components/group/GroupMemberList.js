import Image from "next/image";
import { getFileUrl, getGenderImage } from "../../utility/Util";

const GroupMemberList = ({ admin, ...props }) => {
  const tagColor =
    admin?.role === "ADMIN"
      ? "caak-buttonblue"
      : admin?.role === "MODERATOR"
      ? "caak-alfafuel"
      : null;

  return (
    <div className="flex justify-between mb-[20px]">
      <div className="flex items-center">
        <div className="">
          <div className={"w-[48px] h-[48px] mr-[8px] relative"}>
            <Image
              className=" bg-white rounded-full"
              src={
                admin?.user.pic
                  ? getFileUrl(admin?.user.pic)
                  : getGenderImage(admin?.user?.gender)
              }
              width={48}
              height={48}
              layout="fixed"
              //   objectFit={"cover"}
              alt="#"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="font-medium font-inter text-15px text-caak-generalblack mr-[15px]">
              @{admin?.user?.nickname}
            </div>
            <div
              className={`flex items-center px-[8px] rounded bg-${tagColor}
               bg-opacity-10`}
            >
              <p
                className={`text-${tagColor} font-inter font-normal text-12px`}
              >
                {admin?.role}
              </p>
            </div>
          </div>
          <div className="font-medium font-inter text-13px text-caak-extraBlack text-opacity-60">
            {admin?.user?.totals?.followers} дагагчид
          </div>
        </div>
      </div>
      <div className="">dots</div>
    </div>
  );
};

export default GroupMemberList;
