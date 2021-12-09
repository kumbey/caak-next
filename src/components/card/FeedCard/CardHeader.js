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
import ProfileHoverCard from "../ProfileHoverCard";

const CardHeader = ({
  post,
  verifiedUser,
  hideTitle,
  containerClassname,
  titleClassname,
}) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return post.user ? (
    <div
      className={`flex flex-col relative ${
        containerClassname ? containerClassname : "p-[16px]"
      } `}
    >
      <div className={"flex justify-between items-center"}>
        <div className="flex justify-between items-center">
          <div
            className={`relative border border-caak-titaniumwhite rounded-square w-[34px] h-[34px]`}
          >
            <img
              className={`object-cover 
              w-[34px] h-[34px]
              m-34px rounded-square`}
              src={
                post.group.profile
                  ? getFileUrl(post.group?.profile)
                  : Dummy.img("100x100")
              }
              alt="Alex"
            />
          </div>

          <div className="ml-3">
            <div className={"flex flex-row items-center"}>
              <Link href={`/group/${post.group.id}`}>
                <a>
                  <span className="mr-1 font-semibold cursor-pointer text-generalblack text-14px leading-[16px] tracking-[0.21px]">
                    {post.group.name}
                  </span>
                </a>
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
                content={
                  <ProfileHoverCard
                    userId={post.user.id}
                    postUser={post.user}
                  />
                }
              >
                <Link
                  href={{
                    pathname: `/user/${post.user.id}/profile`,
                  }}
                >
                  <a>
                    <p className="cursor-pointer hover:underline text-generalblack text-13px leading-[16px] tracking-[0.2px]">
                      @{post.user.nickname}
                    </p>
                  </a>
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
                {generateTimeAgo(post.updatedAt)}
              </span>
            </div>
          </div>
        </div>
        <div
          ref={menuRef}
          onClick={toggleMenu}
          className={`flex justify-center flex-shrink-0 w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-liquidnitrogen rounded-full`}
        >
          <span className="icon-fi-rs-dots text-22px" />
          <DropDown
            open={isMenuOpen}
            onToggle={toggleMenu}
            content={
              <PostMoreMenu
                groupId={post.group.id}
                postId={post.id}
                postUser={post.user}
              />
            }
            className={"top-6 -right-3"}
          />
        </div>
      </div>
      {!hideTitle && (
        <div
          className={` text-caak-generalblack break-words pt-[12px]  ${
            titleClassname
              ? titleClassname
              : "text-15px leading-[18px] tracking-[0.23px]"
          }`}
        >
          <Link href={`/post/view/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </div>
      )}
    </div>
  ) : null;
};

export default CardHeader;
