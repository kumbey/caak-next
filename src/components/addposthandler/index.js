import React from "react";
import Image from "next/image";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import { getFileUrl } from "../../utility/Util";

export default function AddPostHandler({ groupId }) {
  const { user, isLogged } = useUser();
  const router = useRouter();
  return (
    <div className="bg-white h-[60px] rounded-[8px] flex flex-row items-center w-full mb-[32px] px-[16px]">
      {isLogged ? (
        <Image
          alt={""}
          src={getFileUrl(user.pic)}
          width={36}
          height={36}
          objectFit="cover"
          className="rounded-full bg-[#6C7392]"
        />
      ) : (
        <div className="w-[36px] h-[36px] rounded-full bg-[#6C7392]" />
      )}
      <div
        onClick={() =>
          isLogged
            ? router.push(
                {
                  pathname: "/post/add",
                  query: {
                    groupId: groupId,
                  },
                },
              "/post/add",
                { shallow: true }
              )
            : router.push(
                {
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    signInUp: "signIn",
                    isModal: true,
                  },
                },
                `/signInUp/signIn`,
                { shallow: true }
              )
        }
        className="h-[36px] w-full bg-[#F3F3F4] ml-[10px] rounded-[6px] flex items-center cursor-pointer"
      >
        <p className="text-[#6C7392] text-[14px] ml-[16px]">Пост оруулах</p>
      </div>
      <span className="icon-fi-rs-image-o text-[#2FC474] text-[20px] ml-[16px]" />
    </div>
  );
}
