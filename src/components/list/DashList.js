import { useState } from "react";
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
import Video from "../video";
import { updatePost } from "../../graphql-custom/post/mutation";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import PostDenyModal from "../modals/postDenyModal";
import { useRouter } from "next/router";

const DashList = ({ imageSrc, post, type, video }) => {
  const [loading, setLoading] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);

  const postHandler = async ({ id, status, message }) => {
    console.log(message);
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };
  const router = useRouter();
  return (
    <div className="first:border-t-0 first:pt-0 border-t-[1px] border-caak-liquidnitrogen pt-[19px] mb-[19px] ">
      <PostDenyModal
        isOpen={isDenyModalOpen}
        setIsOpen={setIsDenyModalOpen}
        postHandler={postHandler}
        postTitle={post.title}
        postId={post.id}
      />
      <div className="relative flex items-center ">
        <div className="flex flex-shrink-0 w-[240px] mr-[18px] items-center">
          <Link
            as={`/post/view/${post.id}`}
            shallow
            href={{
              ...router.query,
              viewPost: "post",
              id: post.id,
              prevPath: router.asPath,
              isModal: true,
            }}
          >
            <a className={"flex-shrink-0 w-[64px] h-[64px] mr-[12px] relative"}>
              {video ? (
                <Video
                  videoClassname={"object-contain rounded-[4px]"}
                  src={getFileUrl(video)}
                  thumbnailIcon
                  hideControls
                />
              ) : (
                <Image
                  quality={100}
                  className=" bg-white rounded-md"
                  src={getFileUrl(imageSrc)}
                  width={64}
                  height={64}
                  objectFit={"cover"}
                  alt="#"
                />
              )}
            </a>
          </Link>

          <div className="flex flex-col  font-inter mr-[26px]">
            <div className="cursor-pointer truncate-2 text-15px font-medium text-caak-generalblack">
              <Link
                shallow
                as={`/post/view/${post.id}`}
                href={{
                  ...router.query,
                  viewPost: "post",
                  id: post.id,
                  prevPath: router.asPath,
                  isModal: true,
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
        <div className="flex flex-shrink-0 w-[185px] mr-[50px]">
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
                    <div className=" text-[13px] font-inter font-normal text-caak-darkBlue">
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
        </div>{" "}
        <div className="flex ml-[10px] ">
          {type === "group" ? (
            <Button
              loading={loading}
              onClick={() => setIsDenyModalOpen(true)}
              className="text-caak-generalblack text-14px font-inter font-medium w-[102px] bg-white border"
            >
              Татгалзах
            </Button>
          ) : type === "user" ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DashList;
