import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../button";
import { updatePost } from "../../graphql-custom/post/mutation";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  extractDate,
  generateFileUrl,
  generateTimeAgo,
  getDate,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "../card/ProfileHoverCard";
import Video from "../video";
import ImageCarousel from "../carousel/ImageCarousel";

const GroupPostItem = ({ imageSrc, post, video, type, index }) => {
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postHandler = async (id, status) => {
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
      {isModalOpen && (
        <div className="popup_modal">
          <div className="popup_modal-content-pending relative rounded-[10px]">
            <div
              onClick={() => setIsModalOpen(false)}
              className={
                "w-[40px] h-[40px] absolute flex items-center justify-center rounded-full bg-[#FFFFFF33] right-[-50px] cursor-pointer"
              }
            >
              <span className={"icon-fi-rs-close text-white"} />
            </div>
            <div
              className={
                "flex flex-col w-full h-full min-h-[627px] bg-white rounded-[10px] relative"
              }
            >
              {/*Header title*/}
              <div
                style={{ height: "max-content" }}
                className={
                  "flex items-row justify-between px-[30px] pt-[23px] pb-[18px]"
                }
              >
                <p
                  className={
                    "h-full text-[18px] text-caak-generalblack font-semibold break-all"
                  }
                >
                  {post.title}
                </p>
                <div
                  className={
                    "flex-shrink-0 flex items-center justify-center w-[35px] h-[35px] rounded-full hover:bg-caak-titaniumwhite transition-all duration-150"
                  }
                >
                  <span className={"icon-fi-rs-dots text-[24px]"} />
                </div>
              </div>
              <div className={"w-full h-[565px] relative"}>
                <ImageCarousel
                  card
                  index={activeIndex}
                  changeActiveIndex={setActiveIndex}
                  mediaContainerClassname={"w-full h-full"}
                  items={post.items.items}
                  postId={post.id}
                />
              </div>
              <div
                className={
                  "flex flex-col justify-between px-[30px] py-[14px] bg-white min-h-[129px] rounded-b-[10px]"
                }
              >
                <p
                  className={
                    "text-caak-generalblack text-[16px] tracking-[0.24px] leading-[19px]"
                  }
                >
                  {post.items.items[activeIndex]?.title}
                </p>
                <div className={"flex flex-row items-center"}>
                  <div
                    className={
                      "flex-shrink-0 w-[40px] h-[40px] relative rounded-full"
                    }
                  >
                    <Image
                      alt={""}
                      layout={"fill"}
                      src={
                        post.user.pic
                          ? generateFileUrl(post.user.pic)
                          : getGenderImage(post.user.gender).src
                      }
                      objectFit={"cover"}
                      className={"rounded-full"}
                    />
                  </div>
                  <div
                    className={
                      "flex flex-row items-center ml-[8px] tracking-[0.23px] leading-[18px]"
                    }
                  >
                    <p
                      className={
                        "text-caak-generalblack text-[15px] font-medium"
                      }
                    >
                      @{post.user.nickname}
                    </p>
                    <p>&nbsp;&middot;&nbsp;</p>
                    <p className={"text-caak-generalblack text-[15px]"}>
                      {generateTimeAgo(post.createdAt)}
                    </p>
                    <p>&nbsp;&middot;&nbsp;</p>
                    <p className={"text-caak-generalblack text-[15px]"}>
                      {getDate(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                "flex flex-row float-right h-[44px] my-[18px] bg-transparent mx-auto"
              }
            >
              <Button
                loading={loading}
                onClick={() => postHandler(post.id, "PENDING")}
                className={
                  "h-[44px] text-caak-generalblack text-[16px] font-medium"
                }
                skin={"white"}
              >
                Татгалзах
              </Button>
              <Button
                loading={loading}
                onClick={() => postHandler(post.id, "CONFIRMED")}
                className={
                  "ml-[10px] h-[44px] text-[16px] font-medium text-white bg-[#257CEE]"
                }
                skin={"primary"}
              >
                Зөвшөөрөх
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="first:border-t-0 first:pt-0 border-t-[1px] border-caak-liquidnitrogen pt-[19px] mb-[19px]">
        <div
          className={`relative flex items-center ${
            type === "user" ? "justify-between" : ""
          }`}
        >
          <div className="cursor-pointer flex w-[180px] md:w-[280px] lg:w-[306px] flex-shrink-0 items-center mr-[10px] md:mr-[36px]">
            <div
              onClick={() => {
                setActiveIndex(index);
                setIsModalOpen(true);
              }}
              className={"flex-shrink-0 w-[64px] h-[64px] mr-[12px] relative"}
            >
              {video ? (
                <Video
                  videoClassname={"object-contain rounded-[4px]"}
                  src={generateFileUrl(video)}
                  thumbnailIcon
                  hideControls
                />
              ) : (
                <Image
                  className=" bg-white rounded-md"
                  src={
                    !imageSrc
                      ? getGenderImage("default")
                      : generateFileUrl(imageSrc)
                  }
                  width={64}
                  height={64}
                  layout="responsive"
                  objectFit={"cover"}
                  alt="#"
                />
              )}
            </div>

            <div
              onClick={() => {
                setActiveIndex(index);
                setIsModalOpen(true);
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
                <Tooltip
                  className={"-left-14"}
                  content={<ProfileHoverCard userId={post.user.id} />}
                >
                  <Link
                    shallow
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
              <div className="truncate-2 h-full rounded-md bg-caak-extraLight font-inter flex items-center">
                <Link
                  shallow
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
          {post.status === "ARCHIVED" ? (
            <div className=" flex w-[102px] ">
              <Link shallow href={`/post/edit/${post.id}`}>
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
          ) : post.status === "PENDING" && type === "user" ? (
            <div className=" flex w-[100px] "></div>
          ) : (
            <div className=" flex w-[224px] ">
              <Button
                loading={loading}
                onClick={() => postHandler(post.id, "CONFIRMED")}
                className="bg-caak-cardinal w-[112px] text-14px font-inter font-medium  mr-[10px] text-white"
              >
                Зөвшөөрөх
              </Button>

              <Button
                loading={loading}
                onClick={() => postHandler(post.id, "ARCHIVED")}
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
