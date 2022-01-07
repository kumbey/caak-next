import React, { useEffect, useState } from "react";
import Button from "../button";
import DropDown from "./DropDown";
import NavBarMenu from "./NavBarMenu";
import {
  getFileUrl,
  getGenderImage,
  useClickOutSide,
} from "../../utility/Util";
import { useWrapper } from "../../context/wrapperContext";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import NotificationDropDown from "./NotificationDropDown";
import useMediaQuery from "./useMeduaQuery";
import SearchInput from "../input/SearchInput";
import AddPostGuideCard from "../card/AddPostGuideCard";
import useLocalStorage from "../../hooks/useLocalStorage";
import Consts from "../../utility/Consts";
import AuraModal from "../modals/auraModal";

const SubMenu = ({ params }) => {
  const [isSearchInputOpen, isSetSearchInputOpen] = useState(false);
  const { navBarTransparent } = useWrapper();
  const { lsGet } = useLocalStorage("session");

  const [isAuraModalOpen, setIsAuraModalOpen] = useState(false);
  const xd = lsGet(Consts.addPostKey).addPostGuide
  const [open, setOpen] = useState(xd)
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
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");

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
        <div
          className={`${
            isSearchInputOpen ? "" : "hidden"
          } mobileSearch w-full fixed top-0 left-0 bg-transparent`}
        >
          <div className="w-full h-[52px] border-t-[1px] border-caak-liquidnitrogen shadow-card bg-white p-[8px]">
            <SearchInput
              containerStyle={"h-[36px] w-full"}
              hideLabel
              placeholder={"Групп болон пост хайх"}
            />
          </div>
        </div>
          <AuraModal isOpen={isAuraModalOpen} setIsOpen={setIsAuraModalOpen}/>
        <div
          onClick={() => {
            router.push("/");
          }}
          className={"flex items-center mr-0 block md:hidden"}
        >
          <span className="icon-fi-rs-home-o text-caak-generalblack text-24px py-px-8 p-2 rounded-lg" />
        </div>
        <div
          onClick={() => isSetSearchInputOpen(!isSearchInputOpen)}
          className={"flex items-center mr-0 block md:hidden"}
        >
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
                ? router.push("/post/add", undefined, { shallow: true })
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
          >
            <AddPostGuideCard open={open} setOpen={setOpen} />
          </Button>
        </div>
        
        <div onClick={() => router.push({pathname: "/groups"})} className="ml-0 md:ml-[8px] md:mr-[12px] cursor-pointer h-[32px] w-[32px] rounded-full flex items-center justify-center border ">
          <span className={`${navBarTransparent ? "text-white" : "text-caak-generalblack"} icon-fi-rs-group-f text-[20px]`} />
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
                      prevPath: router.asPath,
                    },
                  },
                  `/signInUp/signIn`,
                  { shallow: true }
                );
          }}
          className={`${
            isNotificationMenu ? "bg-caak-liquidnitrogen" : ""
          } hover:bg-caak-liquidnitrogen relative flex items-center justify-center w-[32px] h-[32px] mr-0 md:mr-[10px] cursor-pointer rounded-square transition duration-100`}
        >
          <div className={"flex items-center justify-center w-[26px] h-[26px]"}>
            <span
              className={`${
                navBarTransparent && !isNotificationMenu && !isTablet
                  ? "text-white hover:text-caak-generalblack"
                  : "text-caak-generalblack"
              } icon-fi-rs-notification-o text-[22px]`}
            />
          </div>

          {parseInt(params.userTotal.unseen) > 0 ? (
            <div
              className={
                "absolute flex justify-center items-center top-[1px] right-[-4px] w-[16px] h-[16px] border-[1px] rounded-[4px] font-medium border-white bg-caak-bleudefrance"
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
                <span
                  className={"icon-fi-rs-aura-o auroGradient text-[24px] mr-1"}
                />
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
            arrow={"topRight"}
            open={params.isMenuOpen}
            onToggle={toggleMenu}
            content={<NavBarMenu setIsAuraModalOpen={setIsAuraModalOpen} />}
            className={"top-8 -right-3 w-[215px]"}
          />
          {isLogged && user ? (
            <img
              ref={menuRef}
              onClick={() => {
                if (isTablet) {
                  router.push(`/user/${user.id}/profile`);
                } else {
                  params.setIsMenuOpen(!params.isMenuOpen);
                }
              }}
              alt={user.nickname}
              src={
                user.pic
                  ? getFileUrl(user.pic)
                  : getGenderImage(user.gender).src
              }
              className={
                "block mr-0 w-[36px] h-[36px] object-cover rounded-full"
              }
            />
          ) : (
            <span
              onClick={() =>
                router.push(
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
              className="p-2 rounded-lg icon-fi-rs-profile text-caak-generalblack text-24px py-px-8"
            />
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
