import React from "react";
import Button from "../button";
import NotificationDropDown from "./NotificationDropDown";
import DropDown from "./DropDown";
import NavBarMenu from "./NavBarMenu";
import { checkUser, getFileUrl, useClickOutSide } from "../../utility/Util";
import { useWrapper } from "../../context/wrapperContext";
import { useUser } from "../../context/userContext";
import Dummy from "dummyjs";

const SubMenu = ({ params }) => {
  const { isNotificationMenu, setIsNotificationMenu } = useWrapper();
  const { user } = useUser();
  const notificationRef = useClickOutSide(() => {
    setIsNotificationMenu(false);
  });

  const menuRef = useClickOutSide(() => {
    params.setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    params.setIsMenuOpen(!params.isMenuOpen);
  };
  return (
    ((checkUser(user) && params.type === "mobile") ||
      (!checkUser(user) && params.type === "mobile") ||
      (checkUser(user) && params.type === "web")) && (
      <div
        className={
          "flex flex-row items-center w-full justify-around md:w-auto md:justify-center"
        }
      >
        <div className={"flex items-center mr-0 block md:hidden"}>
          <span
            onClick={() =>
              history.push({
                pathname: "/",
              })
            }
            className="icon-fi-sp-home-f text-caak-generalblack text-24px py-px-8 p-2 rounded-lg"
          />
        </div>
        <div className={"flex items-center mr-0 block md:hidden"}>
          <span className="icon-fi-rs-search text-caak-generalblack text-24px py-px-8 p-2 rounded-lg" />
        </div>
        <div className={"mr-0 md:mr-6"}>
          <Button
            roundedSquare
            skin={"primary"}
            className={"w-36px h-36px px-0 py-0"}
            icon={<span className={"icon-fi-rs-add text-15px"} />}
            onClick={() =>
              history.push({
                pathname: checkUser(user) ? "/post/add/new" : "/login",
                state: { background: location },
              })
            }
          />
        </div>
        <div
          ref={notificationRef}
          onClick={() => {
            checkUser(user)
              ? setIsNotificationMenu((oldState) => !oldState)
              : history.push({
                  pathname: "/login",
                  state: { background: location },
                });
          }}
          className={"relative flex items-center mr-0 md:mr-6 cursor-pointer"}
        >
          <span
            className={`${
              isNotificationMenu && "bg-caak-titaniumwhite"
            } icon-fi-rs-notification text-22px text-caak-generalblack text-24px p-2 rounded-square hover:bg-caak-titaniumwhite`}
          />
          {parseInt(params.userTotal.unseen) > 0 ? (
            <span
              className={
                "absolute text-center top-1 -right-0.5 w-18px h-18px border-1 rounded-full border-white font-medium border border-white bg-caak-bleudefrance text-white text-12px"
              }
            >
              {params.userTotal.unseen > 9 ? "9+" : params.userTotal.unseen}
            </span>
          ) : null}
          {checkUser(user) && (
            <NotificationDropDown
              isOpen={isNotificationMenu}
              setIsOpen={setIsNotificationMenu}
            />
          )}
        </div>
        <div className={"relative flex flex-row mr-0 md:mr-6"}>
          <DropDown
            open={params.isMenuOpen}
            onToggle={toggleMenu}
            content={<NavBarMenu />}
            // items={menu_data}
            className={"top-10 -right-4"}
          />
          <Link
            to={{
              ...(checkUser(user)
                ? { pathname: `/user/${user.sysUser.id}/profile` }
                : { pathname: "/login", state: { background: location } }),
            }}
          >
            <div className={"cursor-pointer flex items-center"}>
              {checkUser(user) ? (
                <img
                  alt={user.sysUser.nickname}
                  src={
                    user.sysUser.pic
                      ? getFileUrl(user.sysUser.pic)
                      : Dummy.img("50x50")
                  }
                  className={
                    "block mr-0 md:mr-px-8 w-c3 h-c3 md:w-px-45 md:h-px-45 object-cover rounded-full"
                  }
                />
              ) : (
                <span className="icon-fi-rs-profile text-caak-generalblack text-24px py-px-8 p-2 rounded-lg" />
              )}
            </div>
          </Link>
          {params.type === "web" && checkUser(user) && (
            <div
              className={
                "hidden md:flex flex flex-col items-center justify-center"
              }
            >
              <div className={"flex flex-row justify-center items-center"}>
                <div className="flex flex-col items-center">
                  <Link
                    to={{
                      pathname: `/user/${user.sysUser.id}/profile`,
                    }}
                  >
                    <span
                      className={
                        "text-generalblack text-14px font-bold cursor-pointer"
                      }
                    >
                      {user.sysUser.nickname}
                    </span>
                  </Link>
                  <div className={"flex flex-row items-center self-start"}>
                    <span className={"icon-fi-rs-auro auroGradient mr-1"} />
                    <span
                      className={"text-14px text-caak-darkBlue font-medium"}
                    >
                      {user.sysUser.aura}
                    </span>
                  </div>
                </div>
                <div
                  ref={menuRef}
                  onClick={() => params.setIsMenuOpen(!params.isMenuOpen)}
                  className="text-12px hover:bg-caak-liquidnitrogen flex items-center justify-center w-6 h-6 ml-1 text-center transition duration-100 ease-linear transform -rotate-90 rounded-full cursor-pointer"
                >
                  <span className="icon-fi-rs-back" />
                </div>
              </div>
            </div>
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
  //         ? history.push(
  //             pathname: "/post/add/new"
  //             state: { background: location }
  //           }
  //         : history.push(
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
  //         : history.push(
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
  //         history.push(
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
  //         history.push(
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
