import { generateTimeAgo, getFileUrl } from "../../utility/Util";
import ProfileHoverCard from "./ProfileHoverCard";
import Tooltip from "../tooltip/Tooltip";
import React from "react";
import Link from "next/link";
import Dummy from "dummyjs";

const CommentCard = ({ comment, children }) => {
  // useEffect(() => {
  //     setIsReacted(item.reacted);
  // }, [item]);
  // const replyHandler = () => {
  //   setCommentInputValue((prev) => `${comment.user.nickname}: ${prev}`);
  // };
  return (
    <div className={"flex flex-row border-t pl-c3 pr-c11 pt-b5 pb-b5"}>
      <Tooltip
        className={"-left-6"}
        content={<ProfileHoverCard userId={comment.user.id} />}
      >
        <Link
          href={`/user/${comment.user.id}/profile`}
          className={"m-34px w-10 h-10"}
        >
          <a>
            <img
              className="w-10 h-10 rounded-full"
              src={
                comment.user.pic
                  ? getFileUrl(comment.user.pic)
                  : Dummy.image("50x50")
              }
              alt="Alex"
            />
          </a>
        </Link>
      </Tooltip>

      <div className={"relative flex flex-col ml-2 justify-between w-full"}>
        <div className={"relative flex flex-row items-center"}>
          <div
            className={
              "flex justify-center items-center cursor-pointer absolute right-0 text-caak-blue z-1 hover:bg-white h-c8 w-c8 rounded-full"
            }
          >
            <span className={"icon-fi-rs-dots text-4px"} />
          </div>
          <Tooltip
            className={"-left-16"}
            content={<ProfileHoverCard userId={comment.user.id} />}
          >
            <Link href={`/user/${comment.user.id}/profile`}>
              <a>
                <span className={"text-16px font-bold text-caak-generalblack"}>
                  {comment.user.nickname}
                </span>
              </a>
            </Link>
          </Tooltip>

          <span className={"text-14px text-caak-darkBlue mx-1"}>·</span>
          <span className={"text-14px text-caak-darkBlue"}>
            {generateTimeAgo(comment.createdAt)}
          </span>
        </div>
        <span
          className={
            "text-15px text-caak-generalblack leading-5 tracking-0.23px pt-px-2 w-full"
          }
        >
          {comment.comment}
        </span>
        {/*<div*/}
        {/*  className={*/}
        {/*    "flex flex row justify-between text-blue-primary text-14px pt-3"*/}
        {/*  }*/}
        {/*>*/}
        {/*  <div className={"flex flex-row items-start justify-center"}>*/}
        {/*    <div*/}
        {/*      className={*/}
        {/*        "flex flex-row items-center mr-4 cursor-pointer hover:text-caak-primary group"*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <div*/}
        {/*        className={*/}
        {/*          "flex justify-center items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-7 w-7"*/}
        {/*        }*/}
        {/*      >*/}
        {/*        <i className={"icon-fr-rs-caak text-18px"} />*/}
        {/*      </div>*/}
        {/*      <span className={"text-14px"}>{comment.totals.reactions}</span>*/}
        {/*    </div>*/}
        {/*    /!*TODO Reply Comment*!/*/}
        {/*    <div*/}
        {/*      // onClick={() => replyHandler()}*/}
        {/*      className={"flex flex-row items-center mr-4 cursor-pointer"}*/}
        {/*    >*/}
        {/*      <div*/}
        {/*        className={*/}
        {/*          "flex justify-center items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-7 w-7"*/}
        {/*        }*/}
        {/*      >*/}
        {/*        <i className={"icon-fi-rs-comment text-16px mr-1.5"} />*/}
        {/*      </div>*/}
        {/*      <span className={"text-14px"}>Хариулах</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className={"flex flex-col"}>{children}</div>
      </div>
    </div>
  );
};

export default CommentCard;
