import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../button";
import { updatePost } from "../../graphql-custom/post/mutation";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  extractDate,
  generateFileUrl,
  getFileUrl,
  getGenderImage,
  getReturnData,
} from "../../utility/Util";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "../card/ProfileHoverCard";
import Video from "../video";
import { useRouter } from "next/router";
import PostDenyModal from "../modals/postDenyModal";
import PendingPostApproveModal from "../modals/pendingPostApproveModal";
import {
  createPostStatusHistory,
  updatePostStatusHistory,
} from "../../graphql-custom/postHistory/mutation";
import { useUser } from "../../context/userContext";

const GroupPostItem = ({ imageSrc, post, video, type, index }) => {
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const postHandler = async ({ id, status, message }) => {
    setLoading(true);
    try {
      let resp = await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );
      resp = getReturnData(resp);
      if (resp.status_history.items?.length) {
        await API.graphql(
          graphqlOperation(updatePostStatusHistory, {
            input: {
              description: message,
              post_id: id,
              id: `${user.id}#${id}`,
            },
          })
        );
      } else {
        await API.graphql(
          graphqlOperation(createPostStatusHistory, {
            input: {
              description: message,
              post_id: id,
              id: `${user.id}#${id}`,
            },
          })
        );
      }

      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 27) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <PostDenyModal
        isOpen={isDenyModalOpen}
        setIsOpen={setIsDenyModalOpen}
        postHandler={postHandler}
        postTitle={post.title}
        postId={post.id}
      />
      <PendingPostApproveModal
        post={post}
        postHandler={postHandler}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />

      <div className="first:border-t-0 first:pt-0 border-t-[1px] border-caak-liquidnitrogen pt-[19px] mb-[19px]">
        <div
          className={`relative flex items-center ${
            type === "user" ? "justify-between" : ""
          }`}
        >
          <div className="cursor-pointer flex w-[180px] md:w-[280px] lg:w-[306px] flex-shrink-0 items-center mr-[10px] md:mr-[36px]">
            <div
              onClick={() => {
                if (type === "group" && post.status === "PENDING") {
                  setActiveIndex(index);
                  setIsModalOpen(true);
                } else {
                  router.push(
                    {
                      query: {
                        ...router.query,
                        viewPost: "post",
                        id: post.id,
                        prevPath: router.asPath,
                        isModal: true,
                      },
                    },
                    `/post/view/${post.id}`,
                    { shallow: true, scroll: false }
                  );
                }
              }}
              className={"flex-shrink-0 w-[64px] h-[64px] mr-[12px] relative"}
            >
              {video ? (
                <Video
                  initialAutoPlay={false}
                  containerClassname={"rounded-[4px]"}
                  videoClassname={"object-contain rounded-[4px]"}
                  src={generateFileUrl(imageSrc)}
                  smallIndicator
                  hideControls
                />
              ) : (
                <img
                  className=" bg-white rounded-md object-cover w-full h-full"
                  src={
                    !imageSrc
                      ? getGenderImage("default").src
                      : generateFileUrl(imageSrc)
                  }
                  width={64}
                  height={64}
                  // layout="responsive"
                  // objectFit={"cover"}
                  alt="#"
                />
              )}
            </div>

            <div
              onClick={() => {
                if (type === "group" && post.status === "PENDING") {
                  setActiveIndex(index);
                  setIsModalOpen(true);
                } else {
                  router.push(
                    {
                      query: {
                        ...router.query,
                        viewPost: "post",
                        id: post.id,
                        prevPath: router.asPath,
                        isModal: true,
                      },
                    },
                    `/post/view/${post.id}`,
                    { shallow: true, scroll: false }
                  );
                }
              }}
              className="cursor-pointer text-15px break-all truncate-2 text-caak-generalblack font-roboto font-medium"
            >
              {post.title}
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center w-[141px] mr-[10px] md:mr-[69px]">
            {type === "group" ? (
              <>
                <div className={"w-[28px] h-[28px] mr-[6px]  relative"}>
                  <img
                    className=" bg-white rounded-full object-cover w-full h-full"
                    src={
                      !post?.user?.pic
                        ? getGenderImage(post?.user?.gender).src
                        : getFileUrl(post?.user?.pic)
                    }
                    width={28}
                    height={28}
                    // objectFit="cover"
                    alt="#"
                  />
                </div>
                <Tooltip
                  className={"-left-14"}
                  content={<ProfileHoverCard userId={post.user.id} />}
                >
                  <Link
                    href={{
                      pathname: `/user/${post.user_id}/profile`,
                    }}
                  >
                    <a>
                      <div className="break-all truncate-3 text-13px font-inter font-normal text-caak-darkBlue">
                        @{post.user.nickname}
                      </div>
                    </a>
                  </Link>
                </Tooltip>
              </>
            ) : type === "user" ? (
              <div className="cursor-pointer truncate-2 h-full rounded-md bg-caak-extraLight font-inter flex items-center">
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
          <div className="flex w-[61px] mr-[28px]">
            <p
              className={
                "text-[12px] font-inter font-normal text-caak-darkBlue tracking-[0.21px]  leading-[16px]"
              }
            >
              {`${extractDate(post.createdAt).year}.${
                extractDate(post.createdAt).month
              }.${extractDate(post.createdAt).day}`}
            </p>
          </div>
          {post.status === "ARCHIVED" ||
          post.status === "DRAFT" ||
          post.status === "CAAK_DRAFT" ||
          (post.status === "PENDING" && type === "user") ? (
            <div className=" flex w-[102px] ">
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
          ) : (
            //  post.status === "PENDING" && type === "user" ? (
            //   <div className=" flex w-[120px] ">
            //     <Button
            //       loading={loading}
            //       onClick={() => {
            //         router.push(
            //           {
            //             query: {
            //               ...router.query,
            //               viewPost: "post",
            //               id: post.id,
            //               prevPath: router.asPath,
            //               isModal: true,
            //             },
            //           },
            //           `/post/view/${post.id}`,
            //           { shallow: true, scroll: false }
            //         );
            //       }}
            //       className="text-caak-generalblack text-14px font-inter font-medium w-[102px] bg-white border"
            //     >
            //       Үзэх
            //     </Button>
            //   </div>
            // ) :
            <div className=" flex w-[224px] ">
              <Button
                loading={loading}
                onClick={() =>
                  postHandler({ id: post.id, status: "CONFIRMED" })
                }
                className="bg-caak-cardinal w-[112px] text-14px font-inter font-medium  mr-[10px] text-white"
              >
                Зөвшөөрөх
              </Button>

              <Button
                loading={loading}
                onClick={() => {
                  setIsDenyModalOpen(true);
                }}
                className="text-caak-generalblack text-14px font-inter font-medium w-[102px] bg-white border"
              >
                Татгалзах
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupPostItem;
