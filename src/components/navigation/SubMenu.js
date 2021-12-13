import React, { useEffect, useState } from "react";
import Button from "../button";
import DropDown from "./DropDown";
import NavBarMenu from "./NavBarMenu";
import {getFileUrl, getGenderImage, useClickOutSide} from "../../utility/Util";
import { useWrapper } from "../../context/wrapperContext";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import NotificationDropDown from "./NotificationDropDown";

const SubMenu = ({ params }) => {
  const { isNotificationMenu, setIsNotificationMenu } = useWrapper();
  const { user, isLogged } = useUser();
  const router = useRouter();
  const notificationRef = useClickOutSide(() => {
    setIsNotificationMenu(false);
  });
  const menuRef = useClickOutSide(() => {
    params.setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    params.setIsMenuOpen(!params.isMenuOpen);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted &&
    ((isLogged && params.type === "mobile") ||
      (!isLogged && params.type === "mobile") ||
      (isLogged && params.type === "web")) && (
      <div
        className={
          "flex flex-row items-center w-full justify-around md:w-auto md:justify-center"
        }
      >
        <div className={"flex items-center mr-0 block md:hidden"}>
          <span className="icon-fi-sp-home-f text-caak-generalblack text-24px py-px-8 p-2 rounded-lg" />
        </div>
        <div className={"flex items-center mr-0 block md:hidden"}>
          <span className="p-2 rounded-lg icon-fi-rs-search text-caak-generalblack text-24px py-px-8" />
        </div>
        <div className={"mr-0 md:mr-[10px]"}>
          <Button
            roundedSquare
            skin={"transparent"}
            className={
              "w-[34px] h-[32px] px-0 py-0 flex justify-center items-center bg-caak-primary"
            }
            icon={
              <span className={"icon-fi-rs-add-l text-white text-[22px]"} />
            }
            onClick={() =>
              isLogged
                ? router.push("/post/add")
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
          />
        </div>
        <div
          ref={notificationRef}
          onClick={() => {
            isLogged
              ? setIsNotificationMenu((oldState) => !oldState)
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
                );
          }}
          className={`${
            isNotificationMenu ? "bg-caak-liquidnitrogen" : ""
          } relative flex items-center justify-center w-[50px] h-[36px] mr-0 md:mr-[10px] cursor-pointer rounded-square  hover:bg-caak-liquidnitrogen transition duration-100`}
        >
          <span
            className={`icon-fi-rs-notification text-22px text-caak-generalblack text-21px`}
          />
          {parseInt(params.userTotal.unseen) > 0 ? (
            <div
              className={
                "absolute flex justify-center items-center top-1 right-[7px] w-[16px] h-[16px] border-[1px] rounded-[4px] font-medium border-white bg-caak-bleudefrance"
              }
            >
              <span className={"text-white text-11px text-center"}>
                {params.userTotal.unseen > 9 ? "9+" : params.userTotal.unseen}
              </span>
            </div>
          ) : null}
          {isLogged && (
            <NotificationDropDown
              isOpen={isNotificationMenu}
              setIsOpen={setIsNotificationMenu}
            />
          )}
        </div>
        <div
          className={
            "relative hidden md:flex flex-row w-max mr-0 md:mr-[10px] h-[36px] bg-caak-liquidnitrogen px-[12px] py-[10px] rounded-square"
          }
        >
          {params.type === "web" && isLogged && (
            <div className={"flex flex-col items-center justify-center"}>
              <div className={"flex flex-row justify-center items-center"}>
                <span className={"icon-fi-rs-auro auroGradient mr-1"} />
                <span
                  className={"text-14px text-caak-generalblack font-medium"}
                >
                  {`${user && user.aura} Аура`}
                </span>
              </div>
            </div>
          )}
        </div>
        <div
          className={
            "relative cursor-pointer flex items-center justify-center w-[36px] h-[36px] flex-shrink-0"
          }
        >
          <DropDown
            open={params.isMenuOpen}
            onToggle={toggleMenu}
            content={<NavBarMenu />}
            className={"top-8 -right-3 w-[215px]"}
          />
          {isLogged && user ? (
            <img
              ref={menuRef}
              onClick={() => params.setIsMenuOpen(!params.isMenuOpen)}
              alt={user.nickname}
              src={user.pic ? getFileUrl(user.pic) : getGenderImage(user.gender).src}
              className={
                "block mr-0 w-[36px] h-[36px] object-cover rounded-full"
              }
            />
          ) : (
            <span className="p-2 rounded-lg icon-fi-rs-profile text-caak-generalblack text-24px py-px-8" />
          )}
        </div>
      </div>
    )
  );
  // <div
  //   className="block flex absolute top-0 justify-evenly items-center w-full bg-white  md:hidden
  //
  //   <span className="rounded-lg icon-fi-sp-home-f text-caak-generalblack text-14px px-b5 py-px-8" /
  //   <span className="rounded-lg icon-fi-fi-sp-hamburger-menu text-caak-blue text-24px px-b5 py-px-8" /
  //   <spa
  //     onClick={() =
  //       checkUser(user
  //         ? router.push(
  //             pathname: "/post/add/new"
  //             state: { background: location }
  //           }
  //         : router.push(
  //             pathname: "/login"
  //             state: { background: location }
  //           }
  //
  //     className="text-white rounded-lg cursor-pointer icon-fi-rs-thick-add text-14px bg-caak-primary px-b5 py-px-8
  //
  //   <div
  //       // ref={notificationR
  //     onClick={() =>
  //       checkUser(user
  //         ? setIsNotificationMenu((oldState) => !oldState
  //         : router.push(
  //             pathname: "/login"
  //             state: { background: location }
  //           })
  //     }
  //     className={"relative flex items-center cursor-pointer"
  //
  //     <spa
  //       className={`$
  //         isNotificationMen
  //           ? "icon-fi-rs-bookmark-f
  //           : "icon-fi-rs-notification
  //       } text-22px text-caak-blue px-b5 py-px-8 rounded-lg`
  //     /
  //   </div

  //   {checkUser(user) ?
  //     <im
  //       onClick={() =
  //         router.push(
  //           pathname: `/user/${user.sysUser.id}/profile`
  //         }
  //
  //       className={"rounded-full w-c3 h-c3 cursor-pointer"
  //       alt={user.sysUser.name
  //       src=
  //         user.sysUser.pi
  //           ? getFileUrl(user.sysUser.pic
  //           : Dummy.image("50x50"
  //
  //     /
  //   ) :
  //     <spa
  //       onClick={() =>
  //         router.push(
  //           pathname: "/login"
  //         })
  //       }
  //       className="rounded-lg icon-fi-rs-profile text-24px text-caak-blue px-b5 py-px-8
  //     /
  //   )
  // </div
  // )
};
export default SubMenu;
