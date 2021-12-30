import contentImage from "../../../public/assets/images/Content@2x.png";
import Image from "next/image";
import Button from "../button";
import {useEffect, useState} from "react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import AddPostHandler from "../addposthandler";
import useLocalStorage from "../../hooks/useLocalStorage";
import Consts from "../../utility/Consts";

const AddPostCaakCard = ({ isOpen, setIsOpen }) => {
  
  const {lsSet, lsGet} = useLocalStorage("session")
  const { isLogged } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(lsGet(Consts.addPostKey).addPost)
  }, [])

  return isOpen ? (
    <div
      className={
        "w-full bg-white rounded-[8px] p-[12px] mb-[24px] relative"
      }
    >
      <div
        onClick={() => {
          setIsOpen(false)
          lsSet(Consts.addPostKey, {...lsGet(Consts.addPostKey), addPost: false})
        }}
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
        <div className={"w-[533px] h-[179px] relative m-[11px]"}>
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
            quality={100}
            width={533}
            height={179}
            src={contentImage}
            // layout={"fill"}
            alt={"caak share"}
            className={"rounded-[8px]"}
          />
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
            "cursor-pointer flex items-center justify-center h-[44px] bg-caak-primary rounded-[8px] w-[533px]"
          }
        >
          <div
            className={"w-[16px] h-[16px] flex items-center justify-center"}
          >
            <span
              className={"icon-fi-rs-add-l text-[16px] text-white"}
            />
          </div>
          <p
            className={
              "text-[15px] ml-[13px] font-medium text-white"
            }
          >
            Пост оруулах
          </p>
        </div>
      </div>
    </div>
  ) : <AddPostHandler/>;
};

export default AddPostCaakCard;
