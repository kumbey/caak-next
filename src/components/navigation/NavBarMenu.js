import { useUser } from "../../context/userContext";
import { checkUser } from "../../utility/Util";
import { Fragment } from "react";
import Divider from "../divider";
import Link from "next/link";

export default function NavBarMenu({ type }) {
  const { user } = useUser();

  return (
    <div className={`dropdown-item-wrapper`}>
      {checkUser(user) && (
        <Fragment>
          {type !== "mobile" && (
            <Link to={{ pathname: `/user/${user.sysUser.id}/profile` }}>
              <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <span
                  className={
                    "icon-fi-rs-profile text-18 px5 text-center w-5 flex items-center h-5 mr-2"
                  }
                />
                <p className="text-14px text-caak-extraBlack font-roboto">
                  Миний профайл
                </p>
              </div>
            </Link>
          )}

          <Link to={`/user}/profile`}>
            <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
              <span
                className={
                  "icon-fi-rs-group text-18 px5 text-center w-5 flex items-center h-5 mr-2"
                }
              />
              <p className="text-14px text-caak-extraBlack font-roboto">
                Бүлгүүд
              </p>
            </div>
          </Link>

          <Link to={`/user/${user.sysUser.id}/settings`}>
            <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
              <span className={" icon-fi-rs-settings text-18px w-5 h-5 mr-2"} />
              <p className="text-14px text-caak-extraBlack font-roboto">
                Тохиргоо
              </p>
            </div>
          </Link>
          <Link to={`/user/profile`}>
            <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
              <span className={"icon-fi-rs-help text-18px w-5 h-5 mr-2"} />
              <p className="text-14px text-caak-extraBlack font-roboto">
                Тусламж
              </p>
            </div>
          </Link>
        </Fragment>
      )}
      {checkUser(user) && <Divider className={"my-2"} />}
      <Link to={`/user/profile`}>
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span
            className={
              "icon-fi-rs-view text-18 px5 text-center w-5 flex items-center h-5 mr-2"
            }
          />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Шөнийн горим
          </p>
        </div>
      </Link>
      <Link to={{ pathname: `/newcaak` }}>
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span
            className={
              "icon-fi-rs-about text-18 px5 text-center w-5 flex items-center h-5 mr-2"
            }
          />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Шинэ саак тухай
          </p>
        </div>
      </Link>
      <Link to={{ pathname: `/about/aura` }}>
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span
            className={
              "icon-fi-rs-auro auroGradient text-18 px5 text-center w-5 flex items-center h-5 mr-2"
            }
          />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Аура гэж юу вэ?
          </p>
        </div>
      </Link>
      <Link to={{ pathname: `/newcaak` }}>
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span
            className={
              "icon-fi-rs-notebook text-18 px5 text-center w-5 flex items-center h-5 mr-2"
            }
          />
          <p className="text-14px text-caak-extraBlack font-roboto">Блог</p>
        </div>
      </Link>

      <Link to={{ pathname: `/newcaak` }}>
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span
            className={
              "icon-fi-rs-megaphone text-18 px5 text-center w-5 flex items-center h-5 mr-2"
            }
          />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Сурталчилгаа
          </p>
        </div>
      </Link>

      <Divider className={"my-2"} />
      <Link to={{ pathname: `/newcaak` }}>
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span
            className={
              "icon-fi-rs-shield-exclamation text-18 px5 text-center w-5 flex items-center h-5 mr-2"
            }
          />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Нууцлалын бодлого
          </p>
        </div>
      </Link>
      <Link to={{ pathname: `/newcaak` }}>
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span
            className={
              "icon-fi-rs-document-signed text-18 px5 text-center w-5 flex items-center h-5 mr-2"
            }
          />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Үйлчилгээний нөхцөл
          </p>
        </div>
      </Link>
      {checkUser(user) && type !== "mobile" && (
        <Link to={`/logout`}>
          <Divider className={"my-2"} />
          <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
            <span className={"icon-fi-rs-exit text-18px w-5 h-5 mr-2"} />
            <p className="text-14px text-caak-extraBlack font-roboto">Гарах</p>
          </div>
        </Link>
      )}
    </div>
  );
}
