import React, { useEffect, useState } from "react";
import { getReturnData } from "../../utility/Util";
import { useUser } from "../../context/userContext";
import { graphqlOperation } from "aws-amplify";
import API from "@aws-amplify/api";
import { useRouter } from "next/router";
import { updatePost } from "../../graphql-custom/post/mutation";
import { getGroupView } from "../../graphql-custom/group/queries";
import updateReaction from "../../apis/post/updateReaction";
import Button from "../button";

const PostHeader = ({ addCommentRef, post, activeIndex }) => {
  const item = post.items.items[activeIndex];
  const { user, isLogged } = useUser();
  const [isReacted, setIsReacted] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useRouter();
  // const { state } = useLocation();
  const getUsers = async (id) => {
    if (isLogged) {
      const resp = await API.graphql(
        graphqlOperation(getGroupView, {
          id,
        })
      );

      setUserRole(getReturnData(resp).role_on_group);
    }
  };

  useEffect(() => {
    setIsReacted(item.reacted);
  }, [item]);

  useEffect(() => {
    if (item)
      try {
        getUsers(post.group.id);
      } catch (ex) {
        console.log(ex);
      }

    // eslint-disable-next-line
  }, [item]);

  const handler = async (id, status) => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );
      setLoading(false);
      // closeModal(history, state);
    } catch (ex) {
      console.log(ex);
    }
  };

  const reactionHandler = () => {
    if (isLogged) {
      updateReaction({
        item,
        isReacted,
        setIsReacted,
        deleteReactionInput: {
          id: `${item.id}#${user.id}`,
        },
        createReactionInput: {
          id: `${item.id}#${user.id}`,
          item_id: item.id,
          on_to: "POST_ITEM",
          type: "CAAK",
          user_id: user.id,
        },
      });
    } else {
      history.push({
        pathname: "/login",
        // state: state,
      });
    }
  };

  return (
    <div className={"flex flex-col"}>
      <div
        className={"break-words text-[15px] py-[20px] text-caak-generalblack"}
      >
        {item.title}
      </div>
      {/*<div className={"text-caak-darkBlue text-14px pt-2 px-7"}>*/}
      {/*  {generateTimeAgo(post.updatedAt)} ·{" "}*/}
      {/*  {`${date.year}/${date.month}/${date.day}`}*/}
      {/*  {post.status === "PENDING" && " (Хүлээгдэж байгаа пост)"}*/}
      {/*  {post.status === "ARCHIVED" && " (Архивлагдсан пост)"}*/}
      {/*</div>*/}

      {post.status === "CONFIRMED" ? (
        <div
          className={
            "flex flex row justify-between text-caak-generalblack my-[12px]"
          }
        >
          <div className={"flex flex-row "}>
            <div
              className={
                "flex flex-row items-center mr-[22px] cursor-pointer group"
              }
            >
              <div
                onClick={() => post.status === "CONFIRMED" && reactionHandler()}
                className={
                  "flex justify-center items-center rounded-full w-24px] h-[24px]"
                }
              >
                <span
                  className={`${
                    isReacted
                      ? "text-caak-uclagold icon-fi-rs-rock-f"
                      : "icon-fi-rs-rock-i"
                  } text-[23px]`}
                />
              </div>
              <span
                className={
                  "text-15px tracking-[0.23px] leading-[18px] ml-[8px]"
                }
              >
                {item.totals?.reactions}
              </span>
            </div>
            <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
              <span className={"icon-fi-rs-comment text-22px"} />
              <span
                onClick={() =>
                  post.status === "CONFIRMED" && addCommentRef.current.focus()
                }
                className={"text-[15px] ml-[6px]"}
              >
                {item.totals?.comments}
              </span>
            </div>
          </div>
          <div className={"flex flex-row items-center cursor-pointer"}>
            <span
              className={
                "text-14px text-caak-darkBlue tracking-[0.21px] leading-[16px]"
              }
            >
              Хуваалцах
            </span>
            <div
              className={"flex flex-row items-center justify-center ml-[7px]"}
            >
              <div
                className={
                  "flex items-center justify-center w-[22px] h-[22px] rounded-full bg-caak-facebook"
                }
              >
                <span
                  className={"icon-fi-rs-facebook path1 text-white text-[20px]"}
                />
              </div>
              <div
                className={
                  "flex items-center ml-[7px] bg-caak-twitter rounded-full justify-center w-[22px] h-[22px]"
                }
              >
                <span className={"icon-fi-rs-twitter text-white text-[13px]"} />
              </div>
              <div
                className={
                  "flex items-center ml-[7px] justify-center w-[22px] h-[22px] rounded-full bg-caak-red"
                }
              >
                <span className={"icon-fi-rs-link text-white text-[13px]"} />
              </div>
            </div>
          </div>
        </div>
      ) : post.status === "PENDING" &&
        (userRole === "ADMIN" || userRole === "MODERATOR") ? (
        <div className="px-7 mt-b4 flex items-center pb-3">
          <Button
            loading={loading}
            onClick={() => handler(post.id, "CONFIRMED")}
            className="bg-caak-bleudefrance text-15px mr-c11 w-c132 text-white"
          >
            Зөвшөөрөх
          </Button>
          <Button
            loading={loading}
            onClick={() => handler(post.id, "ARCHIVED")}
            className="text-caak-generalblack text-15px w-c14 bg-white"
          >
            Татгалзах
          </Button>
        </div>
      ) : null}
    </div>
  );
};
export default PostHeader;
