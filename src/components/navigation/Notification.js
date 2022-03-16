import React, { useState } from "react";
import {
  generateFileUrl,
  generateTimeAgo,
  getGenderImage,
} from "../../utility/Util";
import { useUser } from "../../context/userContext";
import Link from "next/link";

const Notification = ({ item, ...props }) => {
  const [text] = useState({
    short: "",
    long: "",
  });
  const { user } = useUser();
  const button = () => {
    if (item.action === "POST_CONFIRMED") {
      text.short = `таны пост`;
      text.long = `амжилттай нийтлэгдлээ`;

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-[18px] h-[18px] bg-caak-algalfuel rounded-full"
          }
        >
          <span className={"icon-fi-rs-thick-check text-[10px] text-white "} />
        </div>
      );
    } else if (
      item.action === "POST_PENDING" ||
      item.action === "POST_ARCHIVED" ||
      item.action === "POST_REPORTED" ||
      item.action === "POST_DRAFT"
    ) {
      if (item.action === "POST_PENDING") {
        text.short = `таны пост`;
        text.long = `шалгалдаж байна`;
      } else if (item.action === "POST_ARCHIVED") {
        text.short = `админ таны постыг`;
        text.long = `татгалзлаа`;
      } else if (item.action === "POST_DRAFT") {
        text.short = `таны ноорог`;
        text.long = `хадгалагдлаа`;
      } else if (item.action === "POST_REPORTED") {
        text.short = `таны пост`;
        text.long = `репортлогдлоо`;
      }

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-[18px] h-[18px]  bg-caak-absoluteapricot rounded-full"
          }
        >
          <span className={"icon-fi-rs-add-l text-[12px] text-white "} />
        </div>
      );
    } else if (
      item.action === "REACTION_POST" ||
      item.action === "REACTION_COMMENT" ||
      item.action === "REACTION_POST_ITEM"
    ) {
      if (item.action === "REACTION_COMMENT") {
        text.short = `таны сэтгэгдэл`;
        text.long = `дээр саак дарлаа`;
      } else {
        text.short = `таны пост`;
        text.long = `дээр саак дарлаа`;
      }

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border-[1.8px] border-white -bottom-0.5 w-[18px] h-[18px]  bg-caak-bleachedsilk1 rounded-full"
          }
        >
          <span
            className={"icon-fi-rs-rock-f text-caak-uclagold text-[13px]"}
          />
        </div>
      );
    } else if (
      item.action === "POST_ITEM_COMMENT_WRITED" ||
      item.action === "POST_COMMENT_WRITED"
    ) {
      text.short = `таны пост дээр`;
      text.long = `сэтгэгдэл үлдээлээ`;

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border-[1.8px] border-white -bottom-0.5 w-[18px] h-[18px] bg-caak-darkBlue rounded-full"
          }
        >
          <span className={"icon-fi-rs-comment-f text-[9px] text-white "} />
        </div>
      );
    } else if (item.action === "USER_FOLLOWED") {
      text.short = `таныг`;
      text.long = `дагалаа`;

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border-[1.8px] border-white -bottom-0.5 w-[18px] h-[18px]  bg-caak-bleudefrance rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-thick-add-friend text-white "}
          />
        </div>
      );
    } else if (item.action === "BALANCE_DECREASE") {
      text.short = `гүйлгээ хийгдэж`;
      text.long = `таны данс хасагдлаа`;
      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border-[1.8px] border-white -bottom-0.5 w-[18px] h-[18px] bg-caak-primary rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-megaphone text-white "}
          />
        </div>
      );
    } else if (item.action === "BALANCE_INCREASE") {
      text.short = `таны данс`;
      text.long = `амжилттай цэнэглэгдлээ`;
      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border-[1.8px] border-white -bottom-0.5 w-[18px] h-[18px] bg-caak-primary rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-megaphone text-white "}
          />
        </div>
      );
    }
  };
  return (
    <div
      {...props}
      className={`${
        item.seen === "FALSE" ? "bg-caak-aliceblue" : "bg-white"
      } flex flex-row justify-between items-center  pl-[14px] pr-3.5 py-2 cursor-pointer hover:bg-caak-titaniumwhite`}
    >
      <div className={"flex flex-row"}>
        <div className={"avatar relative self-center"}>
          <Link
            href={
              item.from && item.from !== "SYSTEM"
                ? `/user/${item.from}/profile`
                : `/user/${user.id}/profile`
            }
          >
            <a>
              <div
                onClick={(e) => e.stopPropagation()}
                className={"flex justify-center items-center w-[38px] h-[38px]"}
              >
                <img
                  className={"rounded-full w-full h-full object-cover"}
                  src={
                    item.from === "SYSTEM"
                      ? user.pic
                        ? generateFileUrl(user.pic)
                        : getGenderImage(user.gender).src
                      : item.from_user?.pic
                      ? generateFileUrl(item.from_user?.pic)
                      : getGenderImage(item.from_user?.gender).src
                  }
                  alt={""}
                />
              </div>
            </a>
          </Link>
          {button()}
        </div>
        <div className={"flex flex-col"}>
          <div
            className={
              "flex flex-row flex-wrap items-center ml-3 content-center"
            }
          >
            <Link
              href={
                item.from && item.from !== "SYSTEM"
                  ? `/user/${item.from}/profile`
                  : `/user/${user.id}/profile`
              }
            >
              <a>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={
                    "text-15px hover:underline text-caak-generalblack font-medium tracking-[0.23px] leading-[16px]"
                  }
                >
                  {`${
                    item.from_user?.nickname
                      ? item.from_user?.nickname
                      : user.nickname
                  }`}
                </span>
              </a>
            </Link>

            <span
              className={
                "text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[16px]"
              }
            >
              &nbsp;{text.short}&nbsp;
            </span>
            <span
              className={
                "text-[14px] text-caak-generalblack tracking-[0.21px] leading-[16px]"
              }
            >
              {text.long}
            </span>
          </div>
          <p
            className={
              "ml-3 text-[13px] text-caak-darkBlue tracking-[0.2px] leading-[19px]"
            }
          >
            {generateTimeAgo(item.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
