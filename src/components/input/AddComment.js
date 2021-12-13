import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import { createComment } from "../../graphql-custom/comment/mutation";
import Button from "../button";

const AddComment = ({
  activeIndex,
  post,
  addCommentRef,
  commentInputValue,
  setCommentInputValue,
  reply,
  setReply,
}) => {
  const [loading, setLoading] = useState(false);

  const { user, isLogged } = useUser();
  const router = useRouter();
  const item = post.items.items[activeIndex];
  const [render, setRender] = useState(0);

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
  const addComment = async () => {
    if (commentInputValue) {
      setLoading(true);
      try {
        if (isLogged) {
          const resp = await API.graphql(
            graphqlOperation(createComment, {
              input: {
                comment: commentInputValue,
                post_item_id: item.id,
                status: "ACTIVE",
                type: reply.isReplying ? "SUB" : "PARENT",
                ...(reply.isReplying ? { parent_id: reply.comment_id } : {}),
                on_to: "POST_ITEM",
                user_id: user.id,
                replyUserID: reply.isReplying ? reply.user_id : post.user.id,
              },
            })
          );
          setCommentInputValue("");
          item.totals.comments++;
          item.comments.items.push(getReturnData(resp, false));
          setRender(render + 1)
        } else {
          router.push(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                signInUp: "signIn",
                isModal: true,
              },
            },
            `/signInUp/signIn`,
            { shallow: true }
          );
        }
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    }
  };
  useEffect(() => {
    if (!commentInputValue?.trim().startsWith(reply?.user_nickname?.trim())) {
      setReply({ user_nickname: "", isReplying: false, user_id: null });
    }
  }, [commentInputValue]);
  return (
    <div
      className={
        "bg-white sticky bottom-0 right-0 left-0 flex flex-row justify-between items-center py-3 pl-c11 z-2 h-[62px]"
      }
    >
      {isLogged ? (
        <img
          className="w-[38px] h-[38px] rounded-full object-cover"
          src={user?.pic ? getFileUrl(user.pic) : getGenderImage(user.gender).src}
          alt="User"
        />
      ) : null}
      <div className={"relative flex w-full justify-center items-center px-2"}>
        <input
          ref={addCommentRef}
          value={commentInputValue || ""}
          // rows={2}
          className={
            "px-2.5 border-0 bg-caak-liquidnitrogen w-full text-caak-darkBlue rounded-square text-16px h-[38px] focus:ring-1 ring-caak-primary"
          }
          placeholder={"Сэтгэгдэл үлдээх"}
          onChange={(e) => setCommentInputValue(e.target.value)}
          onFocus={() =>
            !isLogged &&
            router.push(
              {
                pathname: router.pathname,
                query: {
                  ...router.query,
                  signInUp: "signIn",
                  isModal: true,
                },
              },
              `/signInUp/signIn`,
              { shallow: true }
            )
          }
        />
        {/*TODO Emoji, File upload*/}
        {/*<div*/}
        {/*  className={*/}
        {/*    "flex flex-row absolute right-2 text-18px text-caak-generalblack"*/}
        {/*  }*/}
        {/*>*/}
        {/*  <span className={"icon-fi-rs-mention mr-2"} />*/}
        {/*  <span className={"icon-fi-rs-emoji"} />*/}
        {/*</div>*/}
      </div>

      <Button
        loading={loading}
        onClick={() => addComment()}
        className={
          "bg-white text-caak-primary px-[2px] text-15px font-medium h-full border-0 shadow-none"
        }
      >
        Илгээх
      </Button>
    </div>
  );
};

export default AddComment;
