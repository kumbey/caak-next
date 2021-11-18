import React, { useState } from "react";
import {
  generateTimeAgo,
  getFileUrl,
  useClickOutSide,
} from "../../../utility/Util";
import Dummy from "dummyjs";
import Tooltip from "../../tooltip/Tooltip";
import DropDown from "../../navigation/DropDown";
import PostMoreMenu from "../PostMoreMenu";
import Link from "next/link";

const CardHeader = ({
  verifiedUser,
  postUser,
  group,
  updatedAt,
  postId,
  title,
}) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return group ? (
    <div className="flex flex-col relative p-4">
      <div className={"flex justify-between items-center"}>
        <div className="flex justify-between items-center">
          <div className={"relative w-34px h-34px"}>
            <img
              className="object-cover w-34px h-34px m-34px rounded-square"
              src={
                group.profile
                  ? getFileUrl(group?.profile)
                  : Dummy.img("100x100")
              }
              alt="Alex"
            />
          </div>

          <div className="ml-3">
            <div className={"flex flex-row items-center"}>
              <Link href={`/group/${group.id}`}>
                <span className="mr-1 font-semibold cursor-pointer text-generalblack text-14px leading-[16px] tracking-[0.21px]">
                  {group.name}
                </span>
              </Link>
              {verifiedUser ? (
                <i
                  className={
                    "icon-fi-rs-verified text-caak-buttonblue text-13px mr-1.5"
                  }
                />
              ) : (
                ""
              )}
              <Tooltip
                className={"-left-14"}
                // content={
                //   <ProfileHoverCard userId={postUser.id} postUser={postUser} />
                // }
              >
                <Link href={`/user/${postUser.id}/profile`}>
                  <p className="cursor-pointer hover:underline text-generalblack text-13px leading-[16px] tracking-[0.2px]">
                    @{postUser.nickname}
                  </p>
                </Link>
              </Tooltip>
            </div>

            <div className={"flex flex-row items-center"}>
              {/*<span className={"text-darkblue text-12px mx-1"}>•</span>*/}
              <span
                className={
                  "text-darkblue text-12px leading-[15px] tracking-[0.18px]"
                }
              >
                {generateTimeAgo(updatedAt)}
              </span>
            </div>
          </div>
        </div>
        <div
          ref={menuRef}
          onClick={toggleMenu}
          className={`flex justify-center w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-liquidnitrogen rounded-full`}
        >
          <span className="icon-fi-rs-dots text-22px" />
          <DropDown
            open={isMenuOpen}
            onToggle={toggleMenu}
            content={
              <PostMoreMenu
                groupId={group.id}
                postId={postId}
                postUser={postUser}
              />
            }
            className={"top-6 -right-6"}
          />
        </div>
      </div>
      <div
        className={
          "text-15px text-caak-generalblack break-words pt-[12px] leading-[18px] tracking-[0.23px]"
        }
      >
        {title}
      </div>
    </div>
  ) : null;
};

export default CardHeader;
