import Link from "next/link";
import Image from "next/image";
import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";
import Button from "../../components/button";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "../card/ProfileHoverCard";

const DashList = ({ imageSrc, post, type }) => {
  return (
    <div className="first:border-t-0 first:pt-0 border-t-[1px] border-caak-liquidnitrogen pt-[19px] mb-[19px] ">
      <div className="relative flex items-center ">
        <div className="flex w-[304px] mr-[18px] items-center">
          <Link
            href={{
              pathname: `/post/view/${post.id}`,
            }}
          >
            <a>
              <div className={"w-[64px] h-[64px] mr-[12px] relative"}>
                <Image
                  className=" bg-white rounded-md"
                  src={getFileUrl(imageSrc)}
                  width={64}
                  height={64}
                  layout="fixed"
                  objectFit={"cover"}
                  alt="#"
                />
              </div>
            </a>
          </Link>

          <div className="flex flex-col  font-inter mr-[26px]">
            <div className="truncate-2 text-15px font-medium text-caak-generalblack">
              <Link
                href={{
                  pathname: `/post/view/${post.id}`,
                }}
              >
                <a>{post.title}</a>
              </Link>
            </div>
            <div className="text-xs font-normal font-inter  text-caak-darkBlue">
              {generateTimeAgo(post.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex w-[185px] mr-[50px]">
          {type === "group" ? (
            <Tooltip
              className={"-left-14"}
              content={
                <ProfileHoverCard userId={post.user.id} postUser={post.user} />
              }
            >
              <div className="flex items-center w-[141px] mr-[69px]">
                <div className={"w-[28px] h-[28px] mr-[6px]  relative"}>
                  <Image
                    className=" bg-white rounded-full"
                    src={
                      !post?.user?.pic
                        ? getGenderImage("default")
                        : getFileUrl(post?.user?.pic)
                    }
                    width={28}
                    height={28}
                    objectFit="cover"
                    alt="#"
                  />
                </div>

                <Link
                  href={{
                    pathname: `/user/${post.user_id}/profile`,
                  }}
                >
                  <a>
                    <div className=" text-13px font-inter font-normal text-caak-darkBlue">
                      @{post.user.nickname}
                    </div>
                  </a>
                </Link>
              </div>
            </Tooltip>
          ) : type === "user" ? (
            <div className="truncate-2 h-full rounded-md bg-caak-extraLight font-inter flex items-center">
              <Link
                href={{
                  pathname: `/group/${post.group.id}`,
                }}
              >
                <a>
                  <p className="text-caak-generalblack text-13px font-normal mx-2">
                    {post.group.name}
                  </p>
                </a>
              </Link>
            </div>
          ) : null}
        </div>
        <div className="flex text-sm text-caak-darkBlue w-[166px] mr-[32px]">
          <div className="flex items-center mr-5">
            <span className="icon-fi-rs-rock-i text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.totals.reactions}
            </p>
          </div>
          <div className="flex items-center mr-5">
            <span className="icon-fi-rs-comment-o text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.totals.comments}
            </p>
          </div>
          <div className="flex items-center">
            <span className="icon-fi-rs-view text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.totals.views}
            </p>
          </div>
        </div>
        <div className="flex ml-[10px] ">
          <Link href={`/post/edit/${post.id}`}>
            <a>
              <Button
                round
                className={
                  "hover:bg-gray-100 border border-gray-200 w-[102px] h-[39px]  font-medium font-inter rounded-lg text-caak-generalblack text-14px bg-white relative"
                }
              >
                <p className="">Засах</p>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashList;
