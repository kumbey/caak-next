import React from "react";
import Link from "next/link";
import { extractDate, getFileUrl, getGenderImage } from "../../utility/Util";
import Image from "next/image";
import Button from "../../components/button";
import Divider from "../divider";

const CommentList = ({ comment, imageSrc, ...props }) => {
  const createdAt = extractDate(comment.createdAt);
  return (
    <div className="  w-full">
      <div className="relative flex items-center ">
        <div className="flex w-[300px] items-center">
          <Link
            href={{
              pathname: `/post/view/${comment?.post?.id}`,
            }}
          >
            <a>
              <div className={"w-[96px] h-[96px] mr-[12px] relative"}>
                <Image
                  className=" bg-white rounded-md"
                  src={
                    !imageSrc ? getGenderImage("default") : getFileUrl(imageSrc)
                  }
                  width={96}
                  height={96}
                  layout="fixed"
                  //   objectFit={"cover"}
                  alt="#"
                />
              </div>
            </a>
          </Link>
          <div className="flex flex-col mt-1 w-[300px]  font-inter mr-[26px]">
            <Link
              href={{
                pathname: `/post/view/${comment?.post?.id}`,
              }}
            >
              <a>
                <div className="text-15px font-medium text-caak-generalblack">
                  {comment?.post?.title}
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center w-[300px]  mr-[10px]">
          <span className="icon-fi-rs-comment-f text-lg text-caak-aleutian mr-2" />
          <p className="text-caak-generalblack text-13px font-normal mx-2">
            {comment?.comment}
          </p>
        </div>
        <div className="text-xs font-normal  text-caak-darkBlue mr-[50px]">
          <p className="text-14px ">{`${createdAt.year}.${createdAt.month}.${createdAt.day}`}</p>
        </div>
        <div className="flex mr-[10px]">
          <Button
            onClick={() => null}
            round
            className={
              "hover:bg-gray-100 border border-gray-200 w-[102px] h-[39px]  font-medium font-inter rounded-lg text-caak-generalblack text-15px bg-white relative"
            }
          >
            <p className="">Устгах</p>
          </Button>
        </div>
      </div>
      <Divider color={"border-titaniumwhite"} className={"pb-5"} />
    </div>
  );
};

export default CommentList;
