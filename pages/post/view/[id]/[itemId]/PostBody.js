import CommentCardNew from "../../../../../src/components/card/CommentCardNew";
import {useEffect} from "react";

const PostBody = ({
  post,
  activeIndex,
  commentInputValue,
  setCommentInputValue,
  reply,
  setReply,
  addCommentRef,
}) => {
  const item = post.items.items[activeIndex];

  useEffect(()=> {
    console.log(reply)
  },[reply])

  return (
    <div
      className={"relative flex flex-col justify-between bg-caak-whitesmoke"}
    >
      <CommentCardNew
        addCommentRef={addCommentRef}
        commentInputValue={commentInputValue}
        setCommentInputValue={setCommentInputValue}
        reply={reply}
        setReply={setReply}
        setup={{
          id: item.id,
          type: "POST_ITEM",
        }}
      />
    </div>
  );
};

export default PostBody;
