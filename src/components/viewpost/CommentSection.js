import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getFileUrl } from "../../utility/Util";
import ViewPostBlogAddComment from "../input/ViewPostBlogAddComment";
import CommentCardNew from "../card/CommentCardNew";
import { useUser } from "../../context/userContext";

const CommentSection = ({ post }) => {
  const [commentInputValue, setCommentInputValue] = useState("");
  const [reply, setReply] = useState({});

  const { user } = useUser();
  useEffect(() => {
    console.log(reply);
  }, [reply]);
  return (
    <div
      className={"flex flex-col bg-white py-[16px] px-[29px] rounded-b-square"}
    >
      {/*User*/}
      <div className={"flex flex-row items-center"}>
        <div className={"w-[28px] h-[28px] rounded-full relative"}>
          <Image
            width={28}
            height={28}
            className={"rounded-full"}
            src={`${
              user.pic ? getFileUrl(user.pic) : "https://picsum.photos/50"
            }`}
            alt={"profile picture"}
          />
        </div>
        <div className={"ml-[6px]"}>
          <p
            className={
              "text-caak-extraBlack text-[13px] tracking-[0.2px] leading-[16px]"
            }
          >
            {user.nickname}
          </p>
        </div>
      </div>

      {/*Add Comment section*/}
      <ViewPostBlogAddComment
        commentInputValue={commentInputValue}
        setCommentInputValue={setCommentInputValue}
        comments={post.comments.items}
        postId={post.id}
        replyUserId={post.user_id}
        reply={reply}
        setReply={setReply}
      />

      <CommentCardNew
        commentInputValue={commentInputValue}
        setReply={setReply}
        reply={reply}
        setCommentInputValue={setCommentInputValue}
        initialComments={post.comments.items}
        postId={post.id}
      />
    </div>
  );
};

export default CommentSection;
