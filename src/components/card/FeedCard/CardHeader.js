import { useState } from "react";
import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
  useClickOutSide,
} from "../../../utility/Util";
import Tooltip from "../../tooltip/Tooltip";
import DropDown from "../../navigation/DropDown";
import PostMoreMenu from "../PostMoreMenu";
import Link from "next/link";
import ProfileHoverCard from "../ProfileHoverCard";
import Image from "next/image";
import { useWrapper } from "../../../context/wrapperContext";

const CardHeader = ({
  post,
  hideTitle,
  containerClassname,
  titleClassname,
}) => {
  const { setFeedSortType } = useWrapper();

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
      <div className={"flex justify-between items-center h-[34px]"}>
        <div className="flex justify-between items-center h-full">
          <div
            className={`relative flex-shrink-0 border border-caak-titaniumwhite rounded-square w-[34px] h-[34px]`}
          >
            <Image
              className={`rounded-square`}
              width={34}
              height={34}
              src={
                post.group.profile
                  ? getFileUrl(post.group?.profile)
                  : getGenderImage("default")
              }
              alt="Group profile"
            />
          </div>

          <div className="flex flex-col justify-between ml-[8px] h-full">
            <div className={"flex flex-row items-center"}>
              <span className="mr-1 font-semibold cursor-pointer text-generalblack text-14px leading-[16px] tracking-[0.21px]">
                <Link shallow href={`/group/${post.group.id}`}>
                  <a>{post.group.name}</a>
                </Link>
              </span>
              {post.group.verified ? (
                <span
                  className={
                    "icon-fi-rs-verified text-caak-buttonblue text-13px mr-1.5"
                  }
                />
              ) : (
                ""
              )}
            </div>
            <div className={"flex flex-row items-center h-[16px]"}>
              {/*<span className={"text-darkblue text-12px mx-1"}>•</span>*/}
              <Tooltip
                className={"-left-14"}
                content={
                  <ProfileHoverCard
                    userId={post.user.id}
                    postUser={post.user}
                  />
                }
              >
                <div className={"flex flex-row items-center"}>
                  <Link
                    shallow
                    href={{
                      pathname: `/user/${post.user.id}/profile`,
                    }}
                  >
                    <a>
                      <p className="cursor-pointer hover:underline text-generalblack text-[13px] leading-[16px] tracking-[0.2px]">
                        @{post.user.nickname}
                      </p>
                    </a>
                  </Link>
                  {post.user.verified ? (
                    <span
                      className={
                        "icon-fi-rs-verified text-caak-buttonblue text-13px mr-1.5"
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </Tooltip>
              <span className={"flex items-center text-darkblue"}>
                &nbsp;&#903;&nbsp;
              </span>
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
        <div className={"cursor-pointer flex flex-row items-center"}>
          {post.owned === "CAAK" && (
            <div
              onClick={() => setFeedSortType("CAAK")}
              className={
                "flex flex-row items-center h-[24px] px-[10px] py-[4px] rounded-[6px] cContentGradient mr-[4px]"
              }
            >
              <div
                className={
                  "flex items-center justify-center w-[16px] h-[16px] "
                }
              >
                <span className={"icon-fi-rs-caak-f text-white"} />
              </div>
              <div className={"ml-[6px]"}>
                <p
                  className={
                    "text-[12px] text-white font-rubik uppercase tracking-[0.08em]"
                  }
                >
                  КОНТЕНТ
                </p>
              </div>
            </div>
          )}

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
      </div>
      {!hideTitle && (
        <div
          className={` text-caak-generalblack break-words pt-[12px]  ${
            titleClassname
              ? titleClassname
              : "text-15px leading-[18px] tracking-[0.23px]"
          }`}
        >
          <Link shallow href={`/post/view/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </div>
      )}
    </div>
  ) : null;
};

export default CardHeader;
