import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Dummy from "dummyjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext";
import { getFileUrl, getReturnData } from "../../utility/Util";
import { createComment } from "../../graphql-custom/comment/mutation";
import Button from "../button";

const AddComment = ({ activeIndex, post, addCommentRef }) => {
  const [loading, setLoading] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");
  const { user, isLogged } = useUser();
  const router = useRouter();
  const item = post.items.items[activeIndex];

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
                type: "PARENT",
                user_id: user.sysUser.id,
                replyUserID: item.user_id,
              },
            })
          );
          setCommentInputValue("");
          item.comments.items.push(getReturnData(resp, false));
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

  return (
    <div
      className={
        "bg-white sticky bottom-0 right-0 left-0 flex flex-row justify-between items-center py-3 pl-c11 z-2"
      }
    >
      {isLogged ? (
        <img
          className="border-caak-primary w-10 h-10 border-2 rounded-full"
          src={
            user?.sysUser?.pic
              ? getFileUrl(user.sysUser.pic)
              : Dummy.image("50x50")
          }
          alt="Alex"
        />
      ) : null}
      <div className={"relative flex w-full justify-center items-center px-2"}>
        <textarea
          ref={addCommentRef}
          value={commentInputValue || ""}
          rows={1}
          className={
            "px-2.5 border-0 bg-caak-liquidnitrogen w-full text-caak-darkBlue rounded-square text-16px  focus:ring-1 ring-caak-primary"
          }
          placeholder={"Сэтгэгдэл үлдээх"}
          onChange={(e) => setCommentInputValue(e.target.value)}
          onFocus={() =>
            !isLogged &&
            router.push({
              pathname: "/login",
              state: { background: location },
            })
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
          "bg-white text-caak-primary py-2 text-15px font-medium h-full border-0 shadow-none"
        }
      >
        Илгээх
      </Button>
    </div>
  );
};

export default AddComment;
