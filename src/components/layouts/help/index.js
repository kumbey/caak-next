import React, { useEffect } from "react";
import { useUser } from "../../../context/userContext";
import Link from "next/link";
import Cover from "../../../../public/assets/images/cover.jpeg";
import {generateFileUrl, getFileUrl, getGenderImage} from "../../../utility/Util";
import { useWrapper } from "../../../context/wrapperContext";
import Head from "next/head";
import Consts from "../../../utility/Consts";

export default function DefaultHelpLayout({ children }) {
  const { setNavBarTransparent } = useWrapper();
  useEffect(() => {
    setNavBarTransparent(false);
    // eslint-disable-next-line
  }, []);
  const day = new Date();
  const year = day.getFullYear();

  const { user, isLogged } = useUser();
  return (
    <>
      <Head>
        <title>Тусламж - {Consts.siteMainTitle}</title>
      </Head>
      <div className="flex flex-col h-screen justify-between">
        <div className="sm:h-[150px] items-center md:h-[250px] xl:h-[396px] relative flex justify-center">
          <div className="h-full w-full">
            <img alt="" src={Cover.src} />
          </div>
          <div className="w-[300px] sm:w-[400px] md:w-[700px] xl:w-[1247px] top-[10px] md:top-[60px] xl:top-[129px] absolute text-white flex flex-col">
            <div className=" flex flex-row text-[16px]">
              Сайн уу?{" "}
              {isLogged ? (
                <div className="flex flex-row items-center ml-[5px]">
                  <img
                    alt=""
                    className="rounded-full w-[26px] h-[26px] border-[2px] border-[#FF6600] object-cover"
                    src={user.pic? getFileUrl(user.pic) : getGenderImage(user.gender).src}
                  />
                  <p className="ml-[5px]">
                    {user.nickname === null ? null : user.nickname}
                  </p>
                </div>
              ) : null}
            </div>
            <p className="font-semibold text-[20px] sm:text-[30px] md:text-[38px]">
              Танд хэрхэн туслах вэ?
            </p>
            <input
              disabled
              className="w-[300px] hidden sm:block sm:w-[400px] xl:w-[616px] h-[44px] bg-white rounded-[4px] text-[#6C7392] px-[40px] "
              placeholder="Тусламж хайх"
            />
          </div>
        </div>
        <div
          className={
            "max-w-[1247px] mx-auto flex items-start justify-start mt-[50px]"
          }
        >
          {children}
        </div>
        <div className="bg-white h-[200px] sm:h-[155px] flex justify-center mt-[65px]">
          <div className="w-full sm:w-[670px] md:w-[870px] xl:w-[1247px]">
            <div className="text-[15px] text-[#6C7392] flex flex-wrap justify-center sm:justify-start gap-[4px] sm:flex-row sm:h-[69px] border-b sm:items-end pb-[18px] border-color:[#F3F3F4]">
              <Link href="/help/connectus" shallow>
                <a>
                  <p>Холбоо барих</p>
                </a>
              </Link>
              <p className="mx-[5px] cursor-default">·</p>
              <Link href={"/help/connectus"} shallow>
                <a className="sm:ml-[10px] md:ml-[35px]">
                  <p>Сурталчилгаа</p>
                </a>
              </Link>
              <p className="mx-[5px] hidden sm:block cursor-default">·</p>
              <Link
                href={{
                  pathname: "/help/secure",
                  query: {
                    index: 1,
                  },
                }}
                shallow
              >
                <a className="sm:ml-[10px] md:ml-[35px]">
                  <p>Үйлчилгээний нөхцөл</p>
                </a>
              </Link>
              <p className="mx-[5px] cursor-default">·</p>
              <Link
                href={{
                  pathname: "/help/secure",
                  query: {
                    index: 2,
                  },
                }}
                shallow
              >
                <a className="sm:ml-[10px] md:ml-[35px]">
                  <p>Нууцлал</p>
                </a>
              </Link>
              <p className="mx-[5px] cursor-default">·</p>
              <Link href="/help" shallow>
                <a className="sm:ml-[10px] md:ml-[35px]">
                  <p>Тусламж</p>
                </a>
              </Link>
            </div>
            <div className="sm:flex text-[15px] text-[#6C7392] mt-[10px] sm:mt-[25.5px] pb-[20px]">
              <p className="md:ml-[16px] text-center">{`©${year} "Саак Холдинг" ХХК`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
