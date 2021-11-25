import React, { useState } from "react";
import { generateFileUrl } from "../../utility/Util";
import Dummy from "dummyjs";

const Notification = ({ item, ...props }) => {
  const [text] = useState({
    short: "",
    long: "",
  });

  const button = () => {
    if (item.action === "POST_CONFIRMED") {
      text.short = `таны пост`;
      text.long = `амжилттай нийтлэгдлээ`;

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5 p-1 bg-caak-algalfuel rounded-full"
          }
        >
          <span
            style={{ fontSize: "8px" }}
            className={"icon-fi-rs-thick-check text-white "}
          />
        </div>
      );
    } else if (
      item.action === "POST_PENDING" ||
      item.action === "POST_ARCHIVED"
    ) {
      if (item.action === "POST_PENDING") {
        text.short = `таны пост`;
        text.long = `шалгалдаж байна`;
      } else {
        text.short = `таны пост`;
        text.long = `архивлагдлаа`;
      }

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-absoluteapricot rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-add text-white "}
          />
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
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-primary rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fr-rs-caak-active text-white "}
          />
        </div>
      );
    } else if (item.action === "COMMENT_WRITED") {
      text.short = `таны пост`;
      text.long = `сэтгэгдэл үлдээлээ`;

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-darkBlue rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-comment text-white "}
          />
        </div>
      );
    } else if (item.action === "USER_FOLLOWED") {
      text.short = `таныг`;
      text.long = `дагалаа`;

      return (
        <div
          className={
            "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-bleudefrance rounded-full"
          }
        >
          <span
            style={{ fontSize: "10px" }}
            className={"icon-fi-rs-follow text-white "}
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
        <div className={"avatar relative"}>
          {/*{item.seen === "FALSE" && (*/}
          {/*  <div*/}
          {/*    className={*/}
          {/*      "absolute -left-3 top-4  w-2 h-2 bg-caak-bleudefrance rounded-full"*/}
          {/*    }*/}
          {/*  />*/}
          {/*)}*/}

          <div className={"flex justify-center items-center w-[38px] h-[38px]"}>
            <img
              className={"rounded-full w-full h-full object-cover"}
              src={
                item.from_user?.pic
                  ? generateFileUrl(item.from_user?.pic)
                  : Dummy.image("50x50")
              }
              alt={""}
            />
          </div>

          {/*<div*/}
          {/*  className={*/}
          {/*    "flex items-center justify-center absolute -right-2 border border-white -bottom-0.5 w-5 h-5  p-1 bg-caak-absoluteapricot rounded-full"*/}
          {/*  }*/}
          {/*>*/}
          {button()}
          {/*  <span*/}
          {/*    style={{ fontSize: "6px" }}*/}
          {/*    className={"icon-fi-rs-check text-white "}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        <div
          className={"flex flex-row flex-wrap items-center ml-3 content-center"}
        >
          <span
            className={
              "text-15px text-caak-generalblack font-medium tracking-[0.23px] leading-[16px]"
            }
          >
            {`${item.from_user?.nickname}`}
          </span>
          <span
            className={
              "text-14px text-caak-darkBlue tracking-[0.21px] leading-[16px]"
            }
          >
            &nbsp;{text.short}
          </span>
          <span
            className={
              "text-14px text-caak-generalblack tracking-[0.21px] leading-[16px]"
            }
          >
            &nbsp;{text.long}
          </span>
        </div>
      </div>
      {/*Post Image*/}
      {/*<div className={"flex-shrink-0 rounded-[6px] w-[50px] h-[40px]"}>*/}
      {/*  <Image*/}
      {/*      className={"rounded-[6px]"}*/}
      {/*      src={Dummy.image("50x50")}*/}
      {/*      alt="Comment user"*/}
      {/*      width={50}*/}
      {/*      height={40}*/}
      {/*      objectFit="cover"*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default Notification;
