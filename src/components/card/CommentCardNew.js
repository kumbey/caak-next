import CommentItemCard from "./CommentItemCard";
import { useState } from "react";
import { useUser } from "../../context/userContext";
import CommentSubItemCard from "./CommentSubItemCard";

const CommentCardNew = ({
  initialComments,
  postId,
  setCommentInputValue,
  reply,
  setReply,
}) => {
  const { isLogged } = useUser();
  const [comments, setComments] = useState(
    initialComments ? initialComments : []
  );

  // const getCommentsByPostId = async () => {
  //   const resp = await API.graphql({
  //     // query: isLogged
  //   });
  // };

  return (
    <div className={"border-t border-caak-titaniumwhite py-[25px] w-full"}>
      {comments.map((comment, index) => {
        return (
          comment.parent_id === null && (
            <CommentItemCard
              reply={reply}
              setReply={setReply}
              setCommentInputValue={setCommentInputValue}
              comment={comment}
              key={index}
            >
              <div className={"mt-[12px]"}>
                <CommentSubItemCard
                  reply={reply}
                  setReply={setReply}
                  setCommentInputValue={setCommentInputValue}
                  parentId={comment.id}
                  maxComment={2}
                />
                {/*<CommentItemCard*/}
                {/*  reply={reply}*/}
                {/*  setReply={setReply}*/}
                {/*  setCommentInputValue={setCommentInputValue}*/}
                {/*  comment={subComment}*/}
                {/*  subComment={comment.id}*/}
                {/*/>*/}
              </div>
            </CommentItemCard>
          )
        );
      })}
    </div>
  );
};

export default CommentCardNew;
