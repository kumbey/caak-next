import { useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "../../components/card/ProfileHoverCard";

import Image from "next/image";
import Link from "next/link";
import DropDown from "../../components/navigation/DropDown";
import FacebookIcon from "../../../public/assets/images/Facebook-Color.svg";
import TwitterIcon from "../../../public/assets/images/Twitter-Color.svg";
import AnimatedCaakButton from "../../components/button/animatedCaakButton";
import { getReturnData, useClickOutSide } from "../../../src/utility/Util";

import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";

const postShareMenu = [
  {
    id: 0,
    title: "Facebook",
    icon: (
      <Image width={22} height={22} alt={"facebook icon"} src={FacebookIcon} />
    ),
  },
  {
    id: 1,
    title: "Twitter",
    icon: (
      <Image width={22} height={22} alt={"twitter icon"} src={TwitterIcon} />
    ),
  },
  {
    id: 2,
    title: "Линк хуулах",
    icon: (
      <div
        className={
          "flex justify-center items-center p-[5px] w-[22px] h-[22px] rounded-full bg-caak-red"
        }
      >
        <span className={"icon-fi-rs-link text-white text-[11px]"} />
      </div>
    ),
  },
];

const List = ({ video, post, imageSrc }) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-white relative flex   mx-auto  rounded-lg shadow-card  mb-[24px]">
      <div className="flex m-[15px]">
        <div className=" mr-3">
          <Link
            href={{
              pathname: `/post/view/${post.id}`,
            }}
          >
            <a>
              <div className={"w-[96px] h-[96px] relative"}>
                <Image
                  className=" bg-white rounded-3xl"
                  objectFit={"cover"}
                  src={
                    !imageSrc ? getGenderImage("default") : getFileUrl(imageSrc)
                  }
                  width={96}
                  height={96}
                  layout="responsive"
                  //   objectFit={"cover"}
                  alt="#"
                />
              </div>
            </a>
          </Link>
        </div>
        <div className="flex flex-col ">
          <Link
            href={{
              pathname: `/post/view/${post.id}`,
            }}
          >
            <a>
              <div className="text-15px text-caak-generalblack font-inter font-medium">
                {post.title}
              </div>
            </a>
          </Link>
          <div className="flex mt-1 text-xs text-caak-darkBlue font-normal font-inter">
            <div className="mr-[23px]">{post.group.name}</div>
            <Tooltip
              className={"-left-14"}
              content={
                <ProfileHoverCard userId={post.user.id} postUser={post.user} />
              }
            >
              <Link
                href={{
                  pathname: `/user/${post.user_id}/profile`,
                }}
              >
                <a>
                  <div className="mr-[24px]">@{post.user.nickname}</div>
                </a>
              </Link>
            </Tooltip>

            <div className="">{generateTimeAgo(post.createdAt)}</div>
          </div>
          <div className="flex mt-2">
            <div className="flex items-center mr-6 ">
              <span className="icon-fi-rs-rock-i text-2xl mr-2 cursor-pointer" />
              <p>{post.totals.reactions}</p>
            </div>
            <div className="flex items-center mr-6">
              <span className="icon-fi-rs-comment-f text-2xl mr-2 cursor-pointer" />
              <p>{post.totals.comments}</p>
            </div>
            <div className="flex items-center mr-6">
              <div
                ref={menuRef}
                onClick={toggleMenu}
                className={
                  "flex flex-row relative items-center cursor-pointer w-[24px] h-[24px]"
                }
              >
                <i
                  className={
                    "icon-fi-rs-share text-caak-generalblack transition duration-150 hover:text-caak-carbonfootprint text-22px mr-1.5"
                  }
                />
                <DropDown
                  arrow={"bottomLeft"}
                  className="left-[-15px] bottom-8"
                  open={isMenuOpen}
                  onToggle={toggleMenu}
                  content={postShareMenu.map((data) => (
                    <div
                      key={data.id}
                      style={{ height: "36px" }}
                      className="z-1 flex items-center cursor-pointer px-c6 hover:bg-caak-liquidnitrogen"
                    >
                      {data.icon}
                      <p className="text-14px text-caak-extraBlack ml-px-12">
                        {data.title}
                      </p>
                    </div>
                  ))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
