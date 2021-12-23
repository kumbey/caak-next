import contentImage from "../../../public/assets/images/Content@2x.png";
import Image from "next/image";
import Button from "../button";
import React from "react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";

const AddPostCaakCard = ({ isOpen, setIsOpen }) => {
  const { isLogged } = useUser();
  const router = useRouter();

  return isOpen ? (
    <div
      className={
        "w-full bg-white rounded-[8px] p-[12px] mb-[24px] relative"
      }
    >
      <div
        onClick={() => setIsOpen(false)}
        className={
          "w-[30px] h-[30px] hover:bg-gray-200 cursor-pointer flex items-center justify-center rounded-full absolute top-[12px] right-[12px] bg-caak-liquidnitrogen"
        }
      >
        <span
          className={"icon-fi-rs-close text-[12px] text-caak-generalblack"}
        />
      </div>
      <div className={"flex flex-col items-center justify-between h-full"}>
        <div
          className={
            "flex flex-col items-center md:flex-row text-[24px] font-semibold tracking-[0.12px] leading-[29px] py-[10px]"
          }
        >
          <p className={"text-caak-primary mr-[4px]"}>Саак мэдрэмжээ</p>

          <p className={"text-caak-generalblack"}>хуваалцаарай</p>
        </div>
        <div className={"w-[374px] h-[179px] relative m-[11px]"}>
          <Button
            onClick={() =>
              isLogged
                ? router.push("/post/add", undefined, { shallow: true })
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
            roundedSquare
            skin={"transparent"}
            className={
              "hover:bg-caak-primaryHover w-[45px] h-[42px] m-0 px-0 py-0 flex justify-center items-center gradientAdd absolute z-[1] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            }
            icon={
              <div
                className={"w-[32px] h-[32px] flex items-center justify-center"}
              >
                <span className={"icon-fi-rs-add-l text-white text-[30px]"} />
              </div>
            }
          />
          <Image
            objectFit={"cover"}
            quality={100}
            width={374}
            height={179}
            src={contentImage}
            // layout={"fill"}
            alt={"caak share"}
            className={"rounded-[8px]"}
          />
        </div>
        <div className={"flex flex-col md:flex-row items-center mt-[18px] w-full"}>
          <div
            className={
              "mb-[8px] md:mb-0 cursor-pointer flex items-center justify-center h-[36px] bg-caak-titaniumwhite rounded-[8px] w-full mx-[4px] w-full"
            }
          >
            <p className={"text-caak-generalblack font-medium text-[14px]"}>
              Саак мэдрэмж гэж юу вэ?
            </p>
          </div>
          <div
            onClick={() =>
              isLogged
                ? router.push("/post/add", undefined, { shallow: true })
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
            className={
              "cursor-pointer flex items-center justify-center h-[36px] bg-caak-primary rounded-[8px] w-full bg-opacity-10 mx-[4px] w-full"
            }
          >
            <div
              className={"w-[16px] h-[16px] flex items-center justify-center"}
            >
              <span
                className={"icon-fi-rs-add-l text-[16px] text-caak-primary"}
              />
            </div>
            <p
              className={
                "flex items-center justify-center text-[14px] text-caak-primary ml-[4px]"
              }
            >
              Пост оруулах
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddPostCaakCard;
