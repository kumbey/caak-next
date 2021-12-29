import { useEffect, useRef, useState } from "react";
import ViewPostBlogAddComment from "../input/ViewPostBlogAddComment";
import CommentCardNew from "../card/CommentCardNew";

const CommentSection = ({ post, commentRef, jumpToCommentId }) => {
  const [commentInputValue, setCommentInputValue] = useState("");
  const [reply, setReply] = useState({
    isReplying: false
  });

  return (
    <div
      ref={commentRef}
      className={
        "flex flex-col bg-white py-[4px] px-[8px] md:py-[16px] md:px-[29px] rounded-b-square"
      }
    >
      {/*Add Comment section*/}
      <ViewPostBlogAddComment
        inputClassname={"h-[97px]"}
        containerClassname={"min-h-[135px]"}
        commentInputValue={commentInputValue}
        setCommentInputValue={setCommentInputValue}
        comments={post.comments.items}
        postId={post.id}
        replyUserId={post.user_id}
        reply={reply}
        setReply={setReply}
      />

      <CommentCardNew
        jumpToCommentId={jumpToCommentId}
        setup={{
          id: post.id,
          type: "POST",
        }}
      />
    </div>
  );
};

export default CommentSection;
