import Button from "../button";
import { useUser } from "../../context/userContext";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import React, { useEffect } from "react";
import Dummy from "dummyjs";
import NavBarMenu from "./NavBarMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import SideBarGroups from "../card/SideBarGroups";
import useScrollBlock from "../../hooks/useScrollBlock";
import { useWrapper } from "../../context/wrapperContext";
import useUpdateEffect from "../../hooks/useUpdateEffect";

const MobileSideMenu = ({ setOpen }) => {
  const { user, isLogged, logout } = useUser();
  const { isMobileMenuOpen } = useWrapper();
  const router = useRouter();
  const [blockScroll, allowScroll] = useScrollBlock();

  useUpdateEffect(() => {
    if (isMobileMenuOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="mobileSideMenu flex flex-col h-screen px-2 pb-3 bg-white overflow-y-scroll">
      <div
        className={
          "relative text-20px text-caak-generalblack font-medium py-2.5 px-5 border-t border-b border-gray-100"
        }
      >
        Туслах цэс
        <span
          onClick={() => setOpen(false)}
          className={
            "cursor-pointer text-16px absolute right-0 top-1/2 transform -translate-y-1/2 icon-fi-rs-close"
          }
        />
      </div>
      <div className={`relative p-2`}>
        {isLogged && (
          <div className={"relative flex flex-row items-center"}>
            <Link
              href={
                isLogged ? `/user/${user.id}/profile` : "/login"
                // state: { background: location },
              }
            >
              <a>
                <div className={"cursor-pointer "}>
                  {isLogged ? (
                    <img
                      alt={user.nickname}
                      src={
                        user.pic
                          ? getFileUrl(user.pic)
                          : getGenderImage(user.gender).src
                      }
                      className={"block w-c13 h-c13 object-cover rounded-full"}
                    />
                  ) : (
                    <span className="icon-fi-rs-profile text-caak-generalblack text-24px py-px-8 p-2 rounded-lg" />
                  )}
                </div>
              </a>
            </Link>

            <div className={"flex flex-col items-center justify-center  px-3"}>
              <div className={"flex flex-row justify-center items-center"}>
                <div className="flex flex-col items-center">
                  <Link
                    href={{
                      pathname: `/user/${user.id}/profile`,
                    }}
                  >
                    <a>
                      <span
                        className={
                          "text-generalblack text-14px font-bold cursor-pointer"
                        }
                      >
                        {user.nickname}
                      </span>
                    </a>
                  </Link>
                  <div className={"flex flex-row items-center self-start"}>
                    <span className={"icon-fi-rs-auro auroGradient mr-1"} />
                    <span
                      className={"text-14px text-caak-darkBlue font-medium"}
                    >
                      {user.aura}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <NavBarMenu type={"mobile"} />
        {isLogged && (
          <Button
            round
            className={" h-12 w-full"}
            skin={"secondary"}
            onClick={() => logout()}
          >
            Гарах
          </Button>
        )}
        <div className={"pb-[140px]"}>
          <SideBarGroups
            role={["ADMIN", "MODERATOR"]}
            // maxColumns={3}
            addGroup
            title={"Миний группүүд"}
          />
          <SideBarGroups
            role={["MEMBER"]}
            // maxColumns={0}
            title={"Дагасан группүүд"}
          />
          <SideBarGroups role={["NOT_MEMBER"]} title={"Бүх групп"} />
        </div>
      </div>
      {!isLogged && (
        <div className={"flex flex-col"}>
          <Button
            round
            className={"mb-2 h-12"}
            skin={"secondary"}
            onClick={() =>
              router.push(
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
          >
            Нэвтрэх
          </Button>
          <Button
            round
            className={"h-12"}
            skin={"primary"}
            onClick={() =>
              router.push(
                {
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    signInUp: "signUp",
                    isModal: true,
                  },
                },
                `/signInUp/signUp`,
                { shallow: true }
              )
            }
          >
            Бүртгүүлэх
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileSideMenu;
