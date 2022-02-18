import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";
import AnimatedCaakButton from "../button/animatedCaakButton";
import ProfileHoverCard from "./ProfileHoverCard";
import Tooltip from "../tooltip/Tooltip";
import ViewPostBlogAddComment from "../input/ViewPostBlogAddComment";
import { useState } from "react";
import Link from "next/link";
import DropDown from '../navigation/DropDown'
import { useClickOutSide } from "../../utility/Util";
import { useUser } from "../../context/userContext";
import DeleteCommentConfirm from "./DeleteCommentConfirm";

const CommentItemCard = ({
  children,
  subComment,
  comment,
  jumpToCommentId,
  postId,
}) => {
  const [isReplyInputActive, setIsReplyInputActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [reply, setReply] = useState({
    isReplying: true,
  });

  const {isLogged, user} = useUser()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
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
          <Link href={`/user/${comment.user.id}/profile`}>
            <a>
              <img
                className={"rounded-full object-cover w-full h-full"}
                // objectFit={"cover"}
                width={subComment ? 26 : 38}
                height={subComment ? 26 : 38}
                src={`${
                  comment?.user?.pic
                    ? getFileUrl(comment.user.pic)
                    : getGenderImage(comment.user.gender).src
                }`}
                alt={"user profile"}
              />
            </a>
          </Link>
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
              <Link href={`/user/${comment.user.id}/profile`}>
                <a>
                  <p
                    className={
                      "cursor-pointer text-caak-generalblack text-[15px] tracking-[0.23px] leading-[17px] font-semibold"
                    }
                  >
                    {comment?.user?.nickname}
                  </p>
                </a>
              </Link>
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
                  {
                    isLogged 
                    &&
                    <div
                      ref={menuRef}
                      onClick={toggleMenu}
                      className={
                        "flex flex-col items-center cursor-pointer relative "
                      }
                    >
                    <div
                      className={
                        "flex items-center justify-center w-[44px] h-[44px] ml-[5px] rounded-full hover:bg-caak-titaniumwhite"
                      }
                    >
                      <DropDown
                        open={isMenuOpen}
                        onToggle={toggleMenu}
                        content={
                          user.id === comment.user.id ?
                          <div className="w-[149px]">
                            <p onClick={() => {
                              setConfirmOpen(true)
                            }} className="text-center">Устгах</p>
                          </div>
                          :
                          null
                        }
                        className={
                          "top-10 md:left-1/2 -left-4 -translate-x-1/2 z-[3] rounded-[4px]"
                        }
                      />
                    <DeleteCommentConfirm setOpen={setConfirmOpen} open={confirmOpen} comment={comment}/>
                      <span
                        className={"icon-fi-rs-dots text-caak-darkBlue text-[24px]"}
                      />
                    </div>
                  </div>
                  }
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


