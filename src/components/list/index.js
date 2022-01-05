import { useState, useEffect } from "react";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "../../components/card/ProfileHoverCard";

import Image from "next/image";
import Link from "next/link";
import DropDown from "../../components/navigation/DropDown";
import FacebookIcon from "../../../public/assets/images/Facebook-Color.svg";
import { FacebookShareButton, TwitterShareButton } from "next-share";
import TwitterIcon from "../../../public/assets/images/Twitter-Color.svg";
import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
  useClickOutSide,
} from "../../utility/Util";
import PostMoreMenu from "../card/PostMoreMenu";
import Consts from "../../utility/Consts";
import Video from "../video";

const List = ({ post, imageSrc, handleToast }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [pathName, setPathName] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const moreMenuRef = useClickOutSide(() => {
    setIsMoreMenuOpen(false);
  });

  useEffect(() => {
    setPathName(window.location.origin);
  }, []);

  return (
    <div className="bg-white relative flex mx-auto border-b-[1px] border-caak-titaniumwhite last:rounded-b-[8px] first:rounded-t-[8px]">
      <div className="flex m-[15px] w-full justify-between">
        <div className={"flex"}>
          <div className=" mr-[12px]">
            {Consts.regexImage.test(imageSrc.type) ? (
              <Link
                href={{
                  pathname: `/post/view/${post.id}`,
                }}
              >
                <a>
                  <div className={"w-[102px] h-[76px] relative"}>
                    <Image
                      className=" bg-white rounded-[4px]"
                      objectFit={"cover"}
                      src={
                        !imageSrc
                          ? getGenderImage("default")
                          : getFileUrl(imageSrc)
                      }
                      width={102}
                      height={76}
                      layout="responsive"
                      //   objectFit={"cover"}
                      alt="#"
                    />
                  </div>
                </a>
              </Link>
            ) : (
              <div className={"w-[102px] h-[76px] relative"}>
                <Video
                  containerClassname={"rounded-[4px]"}
                  videoClassname={"rounded-[4px] object-contain"}
                  hideControls
                  thumbnailIcon
                  postId={post.id}
                  src={getFileUrl(imageSrc)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <Link
              href={{
                pathname: `/post/view/${post.id}`,
              }}
            >
              <a>
                <div className="text-[15px] tracking-[0.23px] leading-[19px] font-inter text-caak-generalblack">
                  {post.title}
                </div>
              </a>
            </Link>
            <div className="flex mt-[4px] items-center text-caak-darkBlue text-[12px] font-inter">
              <div className={"flex flex-row items-center"}>
                <p className="mr-[2px] text-[12px] tracking-[0.18px] leading-[15px]">{`/${post.group.name}`}</p>
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
                      pathname: `/user/${post.user_id}/profile`,
                    }}
                  >
                    <a>
                      <p className="text-[12px] tracking-[0.18px] leading-[15px]">
                        @{post.user.nickname}
                      </p>
                    </a>
                  </Link>
                </Tooltip>
              </div>
              <p>&nbsp; &middot; &nbsp;</p>
              <p className="text-[12px] tracking-[0.18px] leading-[15px]">
                {generateTimeAgo(post.createdAt)}
              </p>
            </div>
            <div className="flex mt-[12px]">
              <div className="flex items-center mr-[18px]">
                <div
                  className={
                    "flex items-end justify-center w-[20px] h-[20px] cursor-pointer"
                  }
                >
                  <span className="icon-fi-rs-rock-i text-[19.17px] text-caak-scriptink" />
                </div>
                <p
                  className={
                    "ml-[4px] text-[14px] font-medium text-caak-nocturnal"
                  }
                >
                  {post.totals.reactions}
                </p>
              </div>
              <div className="flex items-center mr-[18px]">
                <div
                  className={
                    "flex items-end justify-center w-[20px] h-[20px] cursor-pointer"
                  }
                >
                  <span className="icon-fi-rs-comment-o text-caak-scriptink text-[17.5px]" />
                </div>
                <p
                  className={
                    "ml-[4px] text-[14px] font-medium text-caak-nocturnal"
                  }
                >
                  {post.totals.comments}
                </p>
              </div>
              <div className="flex items-center mr-6">
                <div
                  ref={menuRef}
                  onClick={toggleMenu}
                  className={
                    "flex flex-row relative items-center cursor-pointer w-[20px] h-[20px]"
                  }
                >
                  <span
                    className={
                      "icon-fi-rs-share-o text-caak-generalblack transition duration-150 hover:text-caak-carbonfootprint text-[18.33px] mr-1.5"
                    }
                  />
                  <DropDown
                    arrow={"bottomLeft"}
                    className="left-[-15px] bottom-8"
                    open={isMenuOpen}
                    onToggle={toggleMenu}
                    content={
                      <div className={"flex flex-row items-center"}>
                        <div
                          className={"flex flex-col  justify-start  z-1    "}
                        >
                          <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                            <FacebookShareButton
                              url={`${pathName}/post/view/${post.id}`}
                            >
                              <div
                                className={
                                  "flex items-center rounded-full cursor-pointer h-[36px] "
                                }
                              >
                                <Image
                                  width={22}
                                  height={22}
                                  alt={"facebook icon"}
                                  src={FacebookIcon}
                                />
                                <p className="text-14px text-caak-extraBlack ml-px-12">
                                  Facebook
                                </p>
                              </div>
                            </FacebookShareButton>
                          </div>
                          <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                            <TwitterShareButton
                              url={`${pathName}/post/view/${post.id}`}
                            >
                              <div
                                className={
                                  "flex items-center rounded-full cursor-pointer h-[36px]"
                                }
                              >
                                <Image
                                  width={22}
                                  height={22}
                                  alt={"twitter icon"}
                                  src={TwitterIcon}
                                />
                                <p className="text-14px text-caak-extraBlack ml-px-12">
                                  Twitter
                                </p>
                              </div>
                            </TwitterShareButton>
                          </div>
                          <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                            <div
                              onClick={() => {
                                if (typeof navigator !== "undefined")
                                  navigator.clipboard.writeText(
                                    `${pathName}/post/view/${post.id}`
                                  );
                              }}
                              className={
                                "flex items-center  rounded-full cursor-pointer h-[36px]"
                              }
                            >
                              <div
                                className={
                                  "flex justify-center items-center p-[5px] w-[22px] h-[22px] rounded-full bg-caak-red"
                                }
                              >
                                <span
                                  className={
                                    "icon-fi-rs-link text-white text-[11px]"
                                  }
                                />
                              </div>
                              <p className="text-14px text-caak-extraBlack ml-px-12">
                                Линк хуулах
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={moreMenuRef}
          onClick={toggleMoreMenu}
          className={`flex justify-center flex-shrink-0 w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-liquidnitrogen rounded-full`}
        >
          <span className="icon-fi-rs-dots text-22px" />
          <DropDown
            arrow={"topRight"}
            open={isMoreMenuOpen}
            onToggle={toggleMoreMenu}
            content={
              <PostMoreMenu
                groupId={post.group.id}
                post={post}
                postUser={post.user}
                handleToast={handleToast}
              />
            }
            className={"top-6 -right-3"}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
