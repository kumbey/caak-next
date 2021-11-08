import React, { useState } from "react";
import {
  generateTimeAgo,
  getFileUrl,
  useClickOutSide,
} from "../../utility/Util";
import Dummy from "dummyjs";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "./ProfileHoverCard";
import DropDown from "../navigation/DropDown";
import PostMoreMenu from "./PostMoreMenu";
import Link from 'next/link'

const CardHeader = ({ verifiedUser, postUser, group, updatedAt, postId }) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return group ? (
    <div className="flex relative justify-between items-center px-4 h-14">
      <div className="flex justify-between items-center py-4">
        <div className={"relative w-34px h-34px"}>
          <img
            className="object-cover w-34px h-34px m-34px rounded-square"
            src={
              group.profile ? getFileUrl(group?.profile) : Dummy.img("100x100")
            }
            alt="Alex"
          />
          <img
            className="-bottom-1.5 -right-1.5 absolute w-22px h-22px border-2 border-white rounded-full object-cover"
            src={
              postUser.pic ? getFileUrl(postUser?.pic) : Dummy.img("100x100")
            }
            alt="John"
          />
        </div>

        <div className="ml-3">
          <div className={"flex flex-row  items-center"}>
            <Link href={`/group/${group.id}`}>
              <span className="mr-1 font-bold cursor-pointer text-generalblack text-14px">
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
          </div>

          <div className={"flex flex-row items-center"}>
            <Tooltip
              className={"-left-14"}
              content={
                <ProfileHoverCard userId={postUser.id} postUser={postUser} />
              }
            >
              <Link
                href={{
                  pathname: `/user/${postUser.id}/profile`,
                }}
              >
                <p className="cursor-pointer hover:underline text-generalblack text-12px">
                  @{postUser.nickname}
                </p>
              </Link>
            </Tooltip>
            <span className={"text-darkblue text-12px mx-1"}>•</span>
            <span className={"text-darkblue text-12px"}>
              {generateTimeAgo(updatedAt)}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={menuRef}
        onClick={toggleMenu}
        className={`flex justify-center w-c8 h-c8 transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-liquidnitrogen rounded-full`}
      >
        <span className="icon-fi-rs-dots text-4px" />
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
  ) : null;
};

export default CardHeader;
