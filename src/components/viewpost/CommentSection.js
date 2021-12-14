import { useState } from "react";
import ViewPostBlogAddComment from "../input/ViewPostBlogAddComment";
import CommentCardNew from "../card/CommentCardNew";

const CommentSection = ({ post, commentRef, jumpToCommentId }) => {
  const [commentInputValue, setCommentInputValue] = useState("");
  const [reply, setReply] = useState({});

  return (
    <div
      ref={commentRef}
      className={"flex flex-col bg-white py-[16px] px-[29px] rounded-b-square"}
    >
      {/*User*/}

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
        jumpToCommentId={jumpToCommentId}
        commentInputValue={commentInputValue}
        setCommentInputValue={setCommentInputValue}
        reply={reply}
        setReply={setReply}
        setup={{
          id: post.id,
          type: "POST",
        }}
      />
    </div>
  );
};

export default CommentSection;
