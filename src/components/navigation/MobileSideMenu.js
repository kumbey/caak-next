import Button from "../button";
import { useUser } from "../../context/userContext";
import { checkUser, getFileUrl } from "../../utility/Util";
import React from "react";
import Dummy from "dummyjs";
import NavBarMenu from "./NavBarMenu";
import Link from "next/link";

const MobileSideMenu = ({ setOpen }) => {
  const { user } = useUser();

  return (
    <div className="mobileSideMenu flex flex-col h-screen px-2 pb-3 bg-white">
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
        {checkUser(user) && (
          <div className={"relative flex flex-row items-center"}>
            <Link
              href={{
                pathname: checkUser(user)
                  ? `/user/${user.sysUser.id}/profile`
                  : "/login",
                // state: { background: location },
              }}
            >
              <div className={"cursor-pointer "}>
                {checkUser(user) ? (
                  <img
                    alt={user.sysUser.nickname}
                    src={
                      user.sysUser.pic
                        ? getFileUrl(user.sysUser.pic)
                        : Dummy.img("50x50")
                    }
                    className={"block w-c13 h-c13 object-cover rounded-full"}
                  />
                ) : (
                  <span className="icon-fi-rs-profile text-caak-generalblack text-24px py-px-8 p-2 rounded-lg" />
                )}
              </div>
            </Link>

            <div className={"flex flex-col items-center justify-center  px-3"}>
              <div className={"flex flex-row justify-center items-center"}>
                <div className="flex flex-col items-center">
                  <Link
                    href={{
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
              </div>
            </div>
          </div>
        )}
        <NavBarMenu type={"mobile"} />
        {checkUser(user) && (
          <Button
            round
            className={" h-12 w-full"}
            skin={"secondary"}
            onClick={() =>
              history.push({
                pathname: "/logout",
              })
            }
          >
            Гарах
          </Button>
        )}
      </div>
      {!checkUser(user) && (
        <div className={"flex flex-col"}>
          <Button
            round
            className={"mb-2 h-12"}
            skin={"secondary"}
            onClick={() =>
              history.push({
                pathname: "/login",
                // state: { background: location },
              })
            }
          >
            Нэвтрэх
          </Button>
          <Button
            round
            className={"h-12"}
            skin={"primary"}
            onClick={() =>
              history.push({
                pathname: "/register",
                // state: { background: location },
              })
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
