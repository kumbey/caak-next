import { useUser } from "../../context/userContext";
import { Fragment, useEffect, useState } from "react";
import Divider from "../divider";
import Link from "next/link";
import { useRouter } from "next/router";
import { getFileUrl, getGenderImage } from "../../utility/Util";

export default function NavBarMenu({ type, setIsAuraModalOpen }) {
  const { user, isLogged } = useUser();
  const router = useRouter();

  return (
    <div className={`dropdown-item-wrapper`}>
      {isLogged && (
        <Fragment>
          {type !== "mobile" && (
            <Link href={`/user/${user.id}/profile`}>
              <a>
                <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                  {/* <span
                    className={
                      "icon-fi-rs-profile text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                    }
                  /> */}
                  <div
                    className={
                      "relative cursor-pointer flex items-center justify-center w-[18px] h-[18px] flex-shrink-0 text-[18px] px5 text-center mr-2"
                    }
                  >
                    <img
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
                        "block mr-0 w-[18px] h-[18px] object-cover rounded-full"
                      }
                    />
                  </div>
                  <p className="text-14px text-caak-extraBlack">
                    {user.nickname}
                  </p>
                </div>
              </a>
            </Link>
          )}

          <div
            onClick={() =>
              router.push(
                {
                  pathname: `/user/${user.id}/profile`,
                  query: { sortType: "SAVED" },
                },
                `/user/${user.id}/profile`,
                { shallow: true }
              )
            }
            className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          >
            <span
              className={
                "icon-fi-rs-save-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
              }
            />
            <p className="text-14px text-caak-extraBlack">Хадгалсан постууд</p>
          </div>
          <div
            // onClick={() => user.aura < 5000 && setIsAuraModalOpen(true)}
            onClick={() => router.push({
              pathname: '/creategroup'
            })}
            className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          >
            <span
              className={
                "icon-fi-rs-add-l text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
              }
            />
            <p className="text-14px text-caak-extraBlack">Грүпп үүсгэх</p>
          </div>
          <Link href={`/user/${user.id}/settings`}>
            <a>
              <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <div className={"flex justify-center items-center"}>
                  <span
                    className={
                      " icon-fi-rs-settings-o text-[18px] w-[20px] h-[18px] mr-2"
                    }
                  />
                </div>
                <p className="text-14px text-caak-extraBlack">Тохиргоо</p>
              </div>
            </a>
          </Link>
        </Fragment>
      )}
      {isLogged && <Divider className={"my-2"} />}
      <Link shallow href={`/help/aura`}>
        <a>
          <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
            <span
              className={
                "icon-fi-rs-aura-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
              }
            />
            <p className="text-14px text-caak-extraBlack">Аура гэж юу вэ?</p>
          </div>
        </a>
      </Link>
      <Link shallow href={`/help`}>
        <a>
          <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
            <span
              className={"icon-fi-rs-help text-[18px] w-[20px] h-[18px] mr-2"}
            />
            <p className="text-14px text-caak-extraBlack">Тусламж</p>
          </div>
        </a>
      </Link>
      {isLogged && type !== "mobile" && (
        <>
          <Divider className={"my-2"} />
          <Link href={`/signInUp/out`} shallow={true}>
            <a>
              <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <span
                  className={
                    "icon-fi-rs-exit text-[18px] w-[20px] h-[18px] mr-2"
                  }
                />
                <p className="text-14px text-caak-extraBlack">Гарах</p>
              </div>
            </a>
          </Link>
        </>
      )}
    </div>
  );
}
