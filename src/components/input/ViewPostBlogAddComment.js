import Button from "../button";
import { useEffect, useRef, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createComment } from "../../graphql-custom/comment/mutation";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import { getReturnData } from "../../utility/Util";

const ViewPostBlogAddComment = ({
  postId,
  comments,
  replyUserId,
  commentInputValue,
  setCommentInputValue,
  reply,
  setReply,
}) => {
  const [loading, setLoading] = useState(false);
  const { user, isLogged } = useUser();
  const router = useRouter();
  const inputRef = useRef();

  useEffect(() => {
    if (!commentInputValue?.trim().startsWith(reply.user_nickname?.trim())) {
      setReply({ user_nickname: "", isReplying: false, user_id: null });
    }
  }, [commentInputValue]);

  const addComment = async () => {
    if (commentInputValue) {
      setLoading(true);
      try {
        if (isLogged) {
          const resp = await API.graphql(
            graphqlOperation(createComment, {
              input: {
                comment: commentInputValue,
                post_id: postId,
                status: "ACTIVE",
                type: reply.isReplying ? "SUB" : "PARENT",
                ...(reply.isReplying ? { parent_id: reply.comment_id } : {}),
                on_to: "POST",
                user_id: user.id,
                replyUserID: reply.isReplying ? reply.user_id : replyUserId,
              },
            })
          );
          setCommentInputValue("");
          comments.push(getReturnData(resp, false));
        } else {
          router.push({
            pathname: "/login",
          });
        }
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  //Press Enter key to comment
  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        addComment();
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  });
  return (
    <div
      className={
        "flex flex-col w-full bg-white min-h-[135px] mt-[10px] border border-caak-titaniumwhite rounded-square mb-[24px]"
      }
    >
      <textarea
        ref={inputRef}
        className={
          "w-full h-[97px] resize-y border-transparent rounded-t-square placeholder-caak-shit text-[15px] tracking-[0.23px] leading-[18px] focus:ring-caak-primary"
        }
        placeholder={"Таны санал сэтгэгдэл?"}
        value={commentInputValue}
        onChange={(e) => setCommentInputValue(e.target.value)}
        rows={3}
      />
      <div
        className={
          "flex flex-row items-center justify-end w-full h-[38px] bg-caak-liquidnitrogen rounded-b-square px-[10px] py-[6px]"
        }
      >
        <div
          className={
            "flex items-center justify-center w-[20px] h-[20px] cursor-pointer"
          }
        >
          <span
            className={"icon-fi-rs-mention text-[18px] text-caak-generalblack"}
          />
        </div>
        <div
          className={
            "flex items-center justify-center w-[20px] h-[20px] ml-[12px] cursor-pointer"
          }
        >
          <span
            className={"icon-fi-rs-smile text-[18px] text-caak-generalblack"}
          />
        </div>
        <div className={"ml-[17px]"}>
          <Button
            onClick={() => addComment()}
            loading={loading}
            className={"h-[26px] text-[14px] font-medium rounded-[100px]"}
            skin={"primary"}
          >
            Сэтгэгдэл үлдээх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewPostBlogAddComment;
