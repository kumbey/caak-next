import React, { useState } from "react";
import Link from "next/link";
import { extractDate, getFileUrl, getGenderImage } from "../../utility/Util";
import Image from "next/image";
import Button from "../../components/button";
import Divider from "../divider";
import { useUser } from "../../context/userContext";
import { API } from "aws-amplify";
import { deleteComment } from "../../graphql-custom/comment/mutation";
import Video from "../video";

const CommentList = ({
  comment,
  imageSrc,
  userComments,
  setUserComments,
  video,
}) => {
  const { isLogged } = useUser();
  const [loading, setLoading] = useState(false);
  const createdAt = extractDate(comment.createdAt);

  const deleteComments = async (id) => {
    if (isLogged)
      try {
        setLoading(true);
        await API.graphql({
          query: deleteComment,
          variables: {
            input: {
              id: id,
            },
          },
        });

        setLoading(false);
      } catch (ex) {
        setLoading(false);
        console.log(ex);
      }
  };
  let filteredComments;
  const handleDelete = async (id) => {
    if (comment.sub.items.length === 0) {
      filteredComments = userComments.filter(
        (ucomment) => ucomment.id !== comment.id
      );
      await deleteComments(comment.id);
      setUserComments((prev=> ({
        ...prev, items: [...filteredComments]
      })));
    } else {
      comment.sub.items.map((sub) => {
        deleteComments(sub.id);
      });
      filteredComments = await userComments.filter(
        (comm) => id !== comm.parent_id
      );

      setUserComments((prev=> ({
        ...prev, items: [...filteredComments]
      })));

      await deleteComments(comment.id);
    }

    filteredComments = filteredComments.filter(
      (ucomment) => ucomment.id !== comment.id
    );
    setUserComments((prev=> ({
      ...prev, items: [...filteredComments]
    })));
  };

  return (
    <div className="w-full first:border-t-0 first:pt-0 border-t-[1px] border-caak-liquidnitrogen pt-[19px] mb-[19px]">
      <div className="relative flex items-center ">
        <div className="flex w-[200px] md:w-[300px] items-center">
          <Link
            href={{
              pathname: `/post/view/${comment?.post?.id}`,
            }}
          >
            <a>
              <div className={"w-[64px] h-[64px] mr-[12px] relative"}>
                {video ? (
                  <Video
                    initialAutoPlay={false}
                    videoClassname={"object-contain rounded-[4px]"}
                    src={getFileUrl(imageSrc)}
                    smallIndicator
                    disableOnClick
                    hideControls
                  />
                ) : (
                  <img
                    className=" bg-white rounded-md object-cover w-full h-full"
                    src={
                      !imageSrc
                        ? getGenderImage("default").src
                        : getFileUrl(imageSrc)
                    }
                    width={64}
                    height={64}
                    // layout="fixed"
                    // objectFit={"cover"}
                    alt="#"
                  />
                )}
              </div>
            </a>
          </Link>
          <div className="flex flex-col mt-1 w-[300px] font-inter mr-[26px]">
            <Link
              href={{
                pathname: `/post/view/${comment?.post?.id}`,
              }}
            >
              <a>
                <div className="truncate-3 text-15px font-medium text-caak-generalblack">
                  {comment?.post?.title}
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center w-[300px] min-w-[200px] mr-[10px]">
          <span className="icon-fi-rs-comment-f text-lg text-caak-aleutian mr-2" />
          <p className="truncate-3 text-caak-generalblack text-13px font-normal mx-2">
            {comment?.comment}
          </p>
        </div>
        <div className="text-xs font-normal  text-caak-darkBlue mr-[50px]">
          <p className="text-14px ">{`${createdAt.year}.${createdAt.month}.${createdAt.day}`}</p>
        </div>
        <div className="flex mr-[10px]">
          <Button
            onClick={() => handleDelete(comment.id)}
            loading={loading}
            round
            className={
              "hover:bg-gray-100 border border-gray-200 w-[102px] h-[39px]  font-medium font-inter rounded-lg text-caak-generalblack text-15px bg-white relative"
            }
          >
            <p className="">????????????</p>
          </Button>
        </div>
      </div>
      {/*<Divider color={"border-titaniumwhite"} className={"pb-5"} />*/}
    </div>
  );
};

export default CommentList;
