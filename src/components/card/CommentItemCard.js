import Image from "next/image";
import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";
import AnimatedCaakButton from "../button/animatedCaakButton";
import ProfileHoverCard from "./ProfileHoverCard";
import Tooltip from "../tooltip/Tooltip";
import ViewPostBlogAddComment from "../input/ViewPostBlogAddComment";
import { useEffect, useState } from "react";

const CommentItemCard = ({
  children,
  subComment,
  comment,
  jumpToCommentId,
  postId
}) => {
  const [isReplyInputActive, setIsReplyInputActive] = useState(false);
  const [reply, setReply] = useState({
    isReplying: true
  });

  return (
    <div
      className={`flex flex-row justify-between ${subComment ? "" : ""} w-full`}
    >
      <div className={"flex flex-row w-full"}>
        {/*User Profile Picture*/}
        <div
          className={`${
            subComment ? "w-[26px] h-[26px]" : "w-[38px] h-[38px]"
          }  flex-shrink-0 relative rounded-full`}
        >
          <Image
            className={"rounded-full"}
            objectFit={"cover"}
            width={subComment ? 26 : 38}
            height={subComment ? 26 : 38}
            src={`${
              comment?.user?.pic
                ? getFileUrl(comment.user.pic)
                : getGenderImage(comment.user.gender).src
            }`}
            alt={"user profile"}
          />
        </div>
        <div
          className={`flex flex-col ml-[12px] w-full rounded-square ${
            jumpToCommentId === comment.id ? "commentFade" : ""
          }`}
        >
          <div className={"mb-[4px] w-max"}>
            <Tooltip
              className={"-left-6"}
              content={<ProfileHoverCard userId={comment.user.id} />}
            >
              <p
                className={
                  "cursor-pointer text-caak-generalblack text-[15px] tracking-[0.23px] leading-[17px] font-semibold"
                }
              >
                {comment?.user?.nickname}
              </p>
            </Tooltip>
          </div>
          <div className={"flex flex-col"}>
            <div className={"flex flex-row items-center justify-between"}>
              <div className={"flex flex-col justify-center w-full"}>
                <p
                  className={`text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] break-all`}
                >
                  {comment.comment}
                </p>
                <div
                  className={
                    "flex flex-row text-caak-darkBlue items-center mt-[10px]"
                  }
                >
                  <div>
                    <p className={"text-[13px]"}>
                      {generateTimeAgo(comment.createdAt)}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setIsReplyInputActive(true);
                      setReply({
                        isReplying: true,
                        user_id: comment.user.id,
                        user_nickname: `@${comment.user.nickname} `,
                        comment_id: subComment ? subComment : comment.id,
                      });
                    }}
                    className={"flex flex-row item-center ml-[16px]"}
                  >
                    <div
                      className={
                        "flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
                      }
                    >
                      <span className={"icon-fi-rs-comment-o text-[15px]"} />
                    </div>
                    <p className={"text-[13px] cursor-pointer"}>Хариулах</p>
                  </div>
                </div>
              </div>
              <div className={"self-start"}>
                <AnimatedCaakButton
                  reactionType={"COMMENT"}
                  itemId={comment.id}
                  totals={comment.totals}
                  reacted={comment.reacted}
                  setReacted={(changedReacted) => {
                    comment.reacted = changedReacted;
                  }}
                  hideCaakText
                  bottomTotals
                  textClassname={
                    "text-[13px] font-medium text-13px tracking-[0.2px] leading-[16px] text-caak-nocturnal"
                  }
                  iconContainerClassname={"w-[24px] h-[24px] bg-transparent"}
                  iconColor={"text-caak-nocturnal"}
                  iconClassname={"text-[23px]"}
                />
              </div>
            </div>
            {isReplyInputActive && (
              <ViewPostBlogAddComment
                commentId={comment.id}
                postId={postId}
                setIsActive={setIsReplyInputActive}
                rootContainerClassname={"mt-[16px]"}
                containerClassname={"h-[94px]"}
                reply={reply}
              />
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default CommentItemCard;
