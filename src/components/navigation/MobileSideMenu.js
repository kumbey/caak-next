import Button from "../button";
import { useUser } from "../../context/userContext";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import React from "react";
import NavBarMenu from "./NavBarMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import SideBarGroups from "../card/SideBarGroups";
import useScrollBlock from "../../hooks/useScrollBlock";
import { useWrapper } from "../../context/wrapperContext";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import AuraModal from "../modals/auraModal";
import { useState } from "react";

const MobileSideMenu = ({ setOpen }) => {
  const [isAuraModalOpen, setIsAuraModalOpen] = useState(false);
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
            <AuraModal
              isOpen={isAuraModalOpen}
              setIsOpen={setIsAuraModalOpen}
            />
            <div className="flex flex-col ml-[10px]">
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
              <div
                className={
                  "flex flex-row justify-center items-center bg-[#F3F3F4] rounded-[8px] px-[12px] py-[3px]"
                }
              >
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
          </div>
        )}
        <NavBarMenu type={"mobile"} setIsAuraModalOpen={setIsAuraModalOpen} />
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
        {isLogged && (
          <div className={"pb-[140px]"}>
            <SideBarGroups
              userId={user.id}
              role={["ADMIN", "MODERATOR"]}
              addGroup
              title={"Миний группүүд"}
              setIsAuraModalOpen={setIsAuraModalOpen}
            />
            <SideBarGroups
              userId={user.id}
              role={["MEMBER"]}
              maxColumns={13}
              title={"Нэгдсэн группүүд"}
              setIsAuraModalOpen={setIsAuraModalOpen}
            />
            <SideBarGroups
              maxColumns={13}
              setIsAuraModalOpen={setIsAuraModalOpen}
              role={["NOT_MEMBER"]}
              title={"Бусад групп"}
            />
          </div>
        )}
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
                    prevPath: router.asPath,
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
                    prevPath: router.asPath,
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
