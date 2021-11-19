import { useUser } from "../../context/userContext";
import { Fragment, useEffect } from "react";
import Divider from "../divider";
import Link from "next/link";

export default function NavBarMenu({ type }) {

  const { user, isLogged, logout } = useUser();

  return (
    <div className={`dropdown-item-wrapper`}>
      {isLogged && (
        <Fragment>
          {type !== "mobile" && (
            <Link href={`/user/${user.id}/profile`}>
              <a>
                <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                  <span
                    className={
                      "icon-fi-rs-profile text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                    }
                  />
                  <p className="text-14px text-caak-extraBlack font-roboto">
                    Миний профайл
                  </p>
                </div>
              </a>
            </Link>
          )}

          <Link href={`/user/profile`}>
            <a>
              <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <span
                  className={
                    "icon-fi-rs-save-o text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                  }
                />
                <p className="text-14px text-caak-extraBlack font-roboto">
                  Хадгалсан постууд
                </p>
              </div>
            </a>
          </Link>

          <Link href={`/user/${user.id}/settings`}>
            <a>
              <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <div className={"flex justify-center items-center"}>
                  <span
                    className={
                      " icon-fi-rs-settings text-[18px] w-[20px] h-[18px] mr-2"
                    }
                  />
                </div>
                <p className="text-14px text-caak-extraBlack font-roboto">
                  Тохиргоо
                </p>
              </div>
            </a>
          </Link>
        </Fragment>
      )}
      <Link href={`/user/profile`}>
        <a>
          <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
            <div className={"flex justify-center items-center"}>
              <span
                className={
                  "icon-fi-rs-moon text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
                }
              />
            </div>

            <p className="text-14px text-caak-extraBlack font-roboto">
              Шөнийн горим
            </p>
          </div>
        </a>
      </Link>
      {isLogged && <Divider className={"my-2"} />}
      <Link href={`/about/aura`}>
        <a>
          <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
            <span
              className={
                "icon-fi-rs-auro text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
              }
            />
            <p className="text-14px text-caak-extraBlack font-roboto">
              Аура гэж юу вэ?
            </p>
          </div>
        </a>
      </Link>
      <Link href={`/newcaak`}>
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span
            className={
              "icon-fi-rs-refresh text-[18px] px5 text-center w-[20px] flex items-center h-[18px] mr-2"
            }
          />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Шинэ өөрчлөлтүүд
          </p>
        </div>
      </Link>

      <Link href={`/user/profile`}>
        <a>
          <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
            <span
              className={"icon-fi-rs-help text-[18px] w-[20px] h-[18px] mr-2"}
            />
            <p className="text-14px text-caak-extraBlack font-roboto">
              Тусламж
            </p>
          </div>
        </a>
      </Link>
      {isLogged && type !== "mobile" && (
        <>
          <Divider className={"my-2"} />
          <div
            onClick={() => logout()}
            className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          >
            <span
              className={"icon-fi-rs-exit text-[18px] w-[20px] h-[18px] mr-2"}
            />
            <p className="text-14px text-caak-extraBlack font-roboto">Гарах</p>
          </div>
        </>
      )}
    </div>
  );
}
