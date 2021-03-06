import { useUser } from "../../context/userContext";
import { Fragment, useEffect, useState } from "react";
import Divider from "../divider";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  getFileUrl,
  getGenderImage,
  numberWithCommas,
} from "../../utility/Util";
import useMediaQuery from "./useMeduaQuery";

export default function NavBarMenu({ type, setIsAuraModalOpen }) {
  const { user, isLogged } = useUser();
  const router = useRouter();

  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");

  return (
    <div className={`dropdown-item-wrapper`}>
      {isLogged && (
        <Fragment>
          {type !== "mobile" && (
            <Link href={`/user/${user.id}/profile`}>
              <a>
                <div className="hover:bg-caak-liquidnitrogen pb-[14px] border-b dropdown-items flex items-center cursor-pointer">
                  {/* <span
                    className={
                      "icon-fi-rs-profile text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                    }
                  /> */}
                  <div
                    className={
                      "relative cursor-pointer flex items-center justify-center w-[48px] h-[48px] flex-shrink-0 text-[18px] px5 text-center mr-2"
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
                        "block mr-0 w-[48px] h-[48px] object-cover rounded-full"
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-15px text-[#21293C] font-semibold">
                      @{user.nickname}
                    </p>
                    <p className="text-[#6C7392] text-[13px]">?????????? ??????????????</p>
                  </div>
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
                `/user/${user.id}/profile`
              )
            }
            className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          >
            <span
              className={
                "icon-fi-rs-save-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
              }
            />
            <p className="text-14px text-caak-extraBlack">?????????????????? ??????????????</p>
          </div>
          <Link
            as={`/user/${user.id}/dashboard`}
            href={{
              pathname: `/user/${user.id}/dashboard`,
              query: { activeIndex: 8 },
            }}
          >
            <a>
              <div className="hover:bg-caak-liquidnitrogen h-c25 justify-between dropdown-items w-full flex items-center cursor-pointer">
                <div className="flex flex-row items-center">
                  <span
                    className={
                      "icon-fi-rs-megaphone-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                    }
                  />
                  <p className="text-14px text-caak-extraBlack">
                    Caak Ads ????????
                  </p>
                </div>
                <p className="bg-[#257CEE] bg-opacity-10 flex items-center rounded-full px-[8px] h-[20px] text-[#257CEE] text-[12px] font-medium">
                  {user.balance?.balance
                    ? numberWithCommas(user.balance.balance, ".")
                    : 0}
                  ???
                </p>
              </div>
            </a>
          </Link>

          {/* <div
            onClick={() => router.push({
              pathname: `/user/${user.id}/dashboard`,
              query: {
                activeIndex: 1
              },
            },
            `/user/${user.id}/dashboard`
            )}
            className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          >
            <span
              className={
                "icon-fi-rs-pending-posts text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
              }
            />
            <p className="text-[14px] text-caak-extraBlack">?????????????????? ?????? ??????????????</p>
          </div> */}
          <Link href={`/user/${user.id}/dashboard`}>
            <a>
              <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <span
                  className={
                    "icon-fi-rs-statistic-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                  }
                />
                <p className="text-14px text-caak-extraBlack">????????????????</p>
              </div>
            </a>
          </Link>
          {isTablet && (
            <Link href={"/group/all"}>
              <a>
                <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                  <span
                    className={
                      "icon-fi-rs-group-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                    }
                  />
                  <p className="text-14px text-caak-extraBlack">?????? ??????????</p>
                </div>
              </a>
            </Link>
          )}
          <div
            onClick={() =>
              user.aura < 5000
                ? setIsAuraModalOpen(true)
                : router.push({
                    pathname: "/group/create",
                  })
            }
            className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          >
            <span
              className={
                "icon-fi-rs-add-l text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
              }
            />
            <p className="text-14px text-caak-extraBlack">?????????? ????????????</p>
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
                <p className="text-14px text-caak-extraBlack">????????????????</p>
              </div>
            </a>
          </Link>
          <Link href={`/group/all`}>
            <a>
              <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <span
                  className={
                    "icon-fi-rs-group-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                  }
                />
                <p className="text-14px text-caak-extraBlack">?????? ??????????</p>
              </div>
            </a>
          </Link>
        </Fragment>
      )}
      {isLogged && <Divider className={"my-2"} />}
      <Link href={`/help/aura`}>
        <a>
          <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
            <span
              className={
                "icon-fi-rs-aura-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
              }
            />
            <p className="text-14px text-caak-extraBlack">???????? ?????? ???? ?????</p>
          </div>
        </a>
      </Link>
      {isLogged ? null : (
        <Link href={`/group/all`}>
          <a>
            <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
              <span
                className={
                  "icon-fi-rs-group-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                }
              />
              <p className="text-14px text-caak-extraBlack">?????? ??????????</p>
            </div>
          </a>
        </Link>
      )}
      <Link href={`/help`}>
        <a>
          <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
            <span
              className={"icon-fi-rs-help text-[18px] w-[20px] h-[18px] mr-2"}
            />
            <p className="text-14px text-caak-extraBlack">??????????????</p>
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
                <p className="text-14px text-caak-extraBlack">??????????</p>
              </div>
            </a>
          </Link>
        </>
      )}
    </div>
  );
}
