import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Button from "../button";
import { updatePost } from "../../graphql-custom/post/mutation";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { extractDate, getFileUrl, getGenderImage } from "../../utility/Util";

const GroupPostItem = ({ imageSrc, post, video, ...props }) => {
  const [loading, setLoading] = useState(false);

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
  return (
    <>
      <div className="first:border-t-0 first:pt-0 border-t-[1px] border-caak-liquidnitrogen pt-[19px] mb-[19px] ">
        <div className="relative flex items-center ">
          <div className="flex w-[306px] items-center mr-[36px]">
            <Link
              href={{
                pathname: `/post/view/${post?.id}`,
              }}
            >
              <a>
                <div className={"w-[64px] h-[64px] mr-[12px] relative"}>
                  <Image
                    className=" bg-white rounded-md"
                    src={
                      !imageSrc
                        ? getGenderImage("default")
                        : getFileUrl(imageSrc)
                    }
                    width={64}
                    height={64}
                    layout="responsive"
                    //   objectFit={"cover"}
                    alt="#"
                  />
                </div>
              </a>
            </Link>
            <Link
              href={{
                pathname: `/post/view/${post?.id}`,
              }}
            >
              <a>
                <div className="text-15px break-all truncate-2 text-caak-generalblack font-roboto font-medium">
                  {post.title}
                </div>
              </a>
            </Link>
          </div>
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
                layout="responsive"
                alt="#"
              />
            </div>

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
            <div className=" flex w-[224px] ">
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
