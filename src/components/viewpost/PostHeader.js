import { useEffect, useState } from "react";
import { getReturnData } from "../../utility/Util";
import { useUser } from "../../context/userContext";
import { graphqlOperation } from "aws-amplify";
import API from "@aws-amplify/api";
import { updatePost } from "../../graphql-custom/post/mutation";
import { getGroupView } from "../../graphql-custom/group/queries";
import Button from "../button";
import AnimatedCaakButton from "../button/animatedCaakButton";
import { FacebookShareButton, TwitterShareButton } from "next-share";

const PostHeader = ({ addCommentRef, post, activeIndex }) => {
  const [item, setItem] = useState(post.items.items[activeIndex]);
  const { isLogged } = useUser();
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [pathName, setPathName] = useState("");

  const getUsers = async (id) => {
    if (isLogged) {
      const resp = await API.graphql({
        query: getGroupView,
        variables: { id },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });

      setUserRole(getReturnData(resp).role_on_group);
    }
  };
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
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    setPathName(window.location.origin);
  }, []);

  useEffect(() => {
    setPathName(window.location.origin);
    setItem(post.items.items[activeIndex])
  }, [activeIndex]);

  return (
    <>
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
                <AnimatedCaakButton
                  reactionType={"POST_ITEM"}
                  itemId={item.id}
                  totals={item.totals}
                  reacted={item.reacted}
                  textClassname={
                    "ml-[6px] text-caak-nocturnal font-medium text-[15px] tracking-[0.23px] leading-[18px]"
                  }
                  iconContainerClassname={"w-[24px] h-[24px]"}
                  iconClassname={"text-[23px]"}
                  iconColor={"text-caak-scriptink"}
                />
              </div>
              <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
                <div
                  className={
                    "w-[24px] h-[24px] flex items-center justify-center"
                  }
                >
                  <span
                    className={
                      "icon-fi-rs-comment-o text-[21px] text-caak-scriptink"
                    }
                  />
                </div>
                <span
                  onClick={() =>
                    post.status === "CONFIRMED" && addCommentRef.current.focus()
                  }
                  className={
                    "ml-[6px] text-caak-nocturnal font-medium text-[15px] tracking-[0.23px] leading-[18px]"
                  }
                >
                  {item.totals?.comments}
                </span>
              </div>
            </div>
            <div className={"flex flex-row items-center"}>
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
                <FacebookShareButton url={`${pathName}/post/view/${post.id}/${item.id}`}>
                  <div
                    className={
                      "flex items-center justify-center w-[22px] h-[22px] rounded-full bg-caak-facebook cursor-pointer"
                    }
                  >
                    <span
                      className={
                        "icon-fi-rs-facebook path1 text-white text-[20px]"
                      }
                    />
                  </div>
                </FacebookShareButton>
                <TwitterShareButton url={`${pathName}/${post.id}/post/view/${item.id}`}>
                  <div
                    className={
                      "flex items-center ml-[7px] bg-caak-twitter rounded-full justify-center w-[22px] h-[22px] cursor-pointer"
                    }
                  >
                    <span
                      className={"icon-fi-rs-twitter text-white text-[13px]"}
                    />
                  </div>
                </TwitterShareButton>
                <div
                  onClick={() => {
                    if (typeof navigator !== "undefined")
                      navigator.clipboard.writeText(`${pathName}/post/view/${post.id}/${item.id}`);
                  }}
                  className={
                    "flex items-center ml-[7px] justify-center w-[22px] h-[22px] rounded-full bg-caak-red cursor-pointer"
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
    </>
  );
};
export default PostHeader;
