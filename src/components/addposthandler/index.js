import React from "react";
import Image from "next/image";
import {useUser} from "../../context/userContext";
import {useRouter} from "next/router";
import {getFileUrl, getGenderImage} from "../../utility/Util";

export default function AddPostHandler({groupId}) {
    const {user, isLogged} = useUser();
    const router = useRouter();
    return (
        <div className="max-w-[616px] mx-auto bg-white h-[60px] rounded-[8px] flex flex-row items-center w-full mb-[32px] px-[16px]">
            {isLogged ? (
                <div
                    className={
                        "relative bg-[#6C7392] w-[36px] h-[36px] rounded-full flex-shrink-0"
                    }
                >
                    <Image
                        alt={""}
                        src={user.pic ? getFileUrl(user.pic) : getGenderImage(user.gender)}
                        width={36}
                        height={36}
                        objectFit="cover"
                        className="rounded-full"
                    />
                </div>
            ) : (
                <div
                    className={
                        "relative bg-[#6C7392] w-[36px] h-[36px] rounded-full flex-shrink-0"
                    }
                >
                    <Image
                        alt={""}
                        src={getGenderImage("MALE")}
                        width={36}
                        height={36}
                        objectFit="cover"
                        className="rounded-full bg-[#6C7392]"
                    />
                </div>
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
              {shallow: true}
              )
            : router.push(
                {
                  pathname: router.pathname,
                  query: {
                      ...router.query,
                      signInUp: "signIn",
                      isModal: true,
                      prevPath: router.asPath,
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
