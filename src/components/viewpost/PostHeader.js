import { useEffect, useState } from "react";
import AnimatedCaakButton from "../button/animatedCaakButton";
import toast, { Toaster } from "react-hot-toast";
import { FacebookShareButton, TwitterShareButton } from "next-share";

const PostHeader = ({ addCommentRef, post, activeIndex }) => {
  const [item, setItem] = useState(post.items.items[activeIndex]);
  const [pathName, setPathName] = useState("");

  const notifyCopy = () => toast.success("Холбоос амжилттай хуулагдлаа.");

  useEffect(() => {
    setPathName(window.location.origin);
  }, []);

  useEffect(() => {
    setPathName(window.location.origin);
    setItem(post.items.items[activeIndex]);
    // eslint-disable-next-line
  }, [activeIndex]);

  return (
    <>
      <Toaster
        toastOptions={{
          className: "toastOptions",
          duration: 5000,
        }}
      />
      <div className={"flex flex-col"}>
        <div
          className={"break-words text-[15px] py-[20px] text-caak-generalblack"}
        >
          {item.title}
        </div>
        {post.status === "CONFIRMED" && (
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
                  setReacted={(changedReacted) => {
                    post.items.items[activeIndex].reacted = changedReacted;
                  }}
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
                <FacebookShareButton
                  url={`${pathName}/post/view/${post.id}/${item.id}`}
                >
                  <div
                    className={
                      "flex items-center bg-caak-facebook justify-center w-[22px] h-[22px] rounded-full cursor-pointer"
                    }
                  >
                    <span
                      className={
                        "icon-fi-rs-facebook path1 text-caak-facebook text-[22px]"
                      }
                    />
                  </div>
                </FacebookShareButton>
                <TwitterShareButton
                  url={`${pathName}/post/view/${post.id}/${item.id}`}
                >
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
                      navigator.clipboard.writeText(
                        `${pathName}/post/view/${post.id}/${item.id}`
                      );
                    notifyCopy();
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
        )}
      </div>
    </>
  );
};
export default PostHeader;
