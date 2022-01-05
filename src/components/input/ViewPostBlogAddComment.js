import Button from "../button";
import {useEffect, useState} from "react";
import API from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {createComment} from "../../graphql-custom/comment/mutation";
import {useUser} from "../../context/userContext";
import {useRouter} from "next/router";
import {getFileUrl, getGenderImage} from "../../utility/Util";
import Image from "next/image";

const ViewPostBlogAddComment = ({
                                  postId,
                                  comments,
                                  replyUserId,
                                  commentInputValue,
                                  setCommentInputValue,
                                  setIsActive,
                                  reply,
  inputClassname,
  containerClassname,
  rootContainerClassname,
}) => {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(false);
  const { user, isLogged } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const addComment = async () => {
    if (inputValue) {
      setLoading(true);
      try {
        if (isLogged) {
          await API.graphql(
            graphqlOperation(createComment, {
              input: {
                comment: inputValue,
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
          setInputValue("");

          // comments.push(getReturnData(resp, false));
        } else {
          router.push(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                signInUp: "signIn",
                isModal: true,
                prevPath: router.asPath
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
    if (reply.isReplying)
      setInputValue((prev) => {
        if (!prev?.startsWith(`${reply.user_nickname}`)) {
          return `${reply.user_nickname} ${prev}`;
        } else {
          return prev;
        }
      });
  }, [reply]);

  //Press Enter key to comment
  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        if (focus) {
          addComment();
        }
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  });

  useEffect(() => {
    if (typeof document !== "undefined") setClient(true);
  }, []);

  return client ? (
    <div className={`${rootContainerClassname ? rootContainerClassname : ""}`}>
      {isLogged && (
        <div className={"flex flex-row items-center"}>
          <div className={"w-[28px] h-[28px] rounded-full relative"}>
            <img
              width={28}
              height={28}
              className={"rounded-full"}
              src={`${
                user.pic
                  ? getFileUrl(user.pic)
                  : getGenderImage(user.gender).src
              }`}
              alt={"profile picture"}
            />
          </div>

          <div className={"ml-[6px]"}>
            <p
              className={
                "text-caak-extraBlack text-[15px] tracking-[0.2px] leading-[16px] font-semibold"
              }
            >
              @{user?.nickname}
            </p>
          </div>
        </div>
      )}
      <div
        className={`${
          containerClassname ? containerClassname : ""
        } flex flex-col w-full bg-white mt-[10px] border border-caak-titaniumwhite rounded-square mb-[24px]`}
      >
        <textarea
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full resize-y border-transparent rounded-t-square placeholder-caak-shit text-[15px] tracking-[0.23px] leading-[18px] focus:ring-caak-primary ${
            inputClassname ? inputClassname : ""
          }`}
          placeholder={"Таны санал сэтгэгдэл?"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={3}
        />
        <div
          className={
            "flex flex-row items-center justify-end w-full h-[38px] bg-caak-liquidnitrogen rounded-b-square px-[10px] py-[6px]"
          }
        >
          {reply.isReplying && (
            <div className={"cursor-pointer"} onClick={()=> {
              setIsActive(false)
            }}>
              <p className={"font-medium text-[14px] text-caak-scriptink"}>Болих</p>
            </div>
          )}

          {/*<div*/}
          {/*  className={*/}
          {/*    "flex items-center justify-center w-[20px] h-[20px] cursor-pointer"*/}
          {/*  }*/}
          {/*>*/}
          {/*  <span*/}
          {/*    className={*/}
          {/*      "icon-fi-rs-mention text-[18px] text-caak-generalblack"*/}
          {/*    }*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  className={*/}
          {/*    "flex items-center justify-center w-[20px] h-[20px] ml-[12px] cursor-pointer"*/}
          {/*  }*/}
          {/*>*/}
          {/*  <span*/}
          {/*    className={"icon-fi-rs-smile text-[18px] text-caak-generalblack"}*/}
          {/*  />*/}
          {/*</div>*/}
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
    </div>
  ) : null;
};

export default ViewPostBlogAddComment;
