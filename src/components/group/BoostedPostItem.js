import ReactTooltip from "react-tooltip";

import {
  generateFileUrl,
  getDiffDays,
  getGenderImage,
  kFormatter,
} from "../../utility/Util";

import Video from "../video";
import { useRouter } from "next/router";
import moment from "moment";
import { DateTime } from "luxon";
import Button from "../../components/button";
import { numberWithCommas } from "../../utility/Util";

const BoostedPostItem = ({ imageSrc, post, video }) => {
  const router = useRouter();

  const now = new Date();

  const convertDateTime = (date, seperator, noTime, noSec) => {
    const Date = DateTime.fromISO(date);
    const sep = seperator ? seperator : "/";
    const fullDate = Date.toFormat(`yyyy${sep}MM${sep}dd`);
    const fullTime = Date.toFormat(`${noSec ? "HH:mm" : "HH:mm:ss"} `);
    return `${fullDate} ${noTime ? "" : fullTime}`;
  };

  return (
    <>
      <td>
        <div className=" flex items-center ">
          <div
            onClick={() => {
              router.push(
                {
                  query: {
                    ...router.query,
                    viewPost: "post",
                    id: post.post_id,
                    prevPath: router.asPath,
                    isModal: true,
                  },
                },
                `/post/view/${post.post_id}`,
                { shallow: true, scroll: false }
              );
            }}
            className={
              "flex-shrink-0 w-[64px] h-[64px] mr-[12px] relative cursor-pointer"
            }
          >
            {video ? (
              <Video
                initialAutoPlay={false}
                containerClassname={"rounded-[4px]"}
                videoClassname={"object-contain rounded-[4px]"}
                src={generateFileUrl(imageSrc)}
                smallIndicator
                hideControls
              />
            ) : (
              <img
                className="bg-white rounded-md object-cover w-full h-full"
                src={
                  !imageSrc
                    ? getGenderImage("default").src
                    : generateFileUrl(imageSrc)
                }
                width={64}
                height={64}
                alt="#"
              />
            )}
          </div>
          <div className="flex flex-col  ">
            <div
              onClick={() => {
                router.push(
                  {
                    query: {
                      ...router.query,
                      viewPost: "post",
                      id: post.post_id,
                      prevPath: router.asPath,
                      isModal: true,
                    },
                  },
                  `/post/view/${post.post_id}`,
                  { shallow: true, scroll: false }
                );
              }}
              className="break-words cursor-pointer text-15px break-all truncate-2 text-caak-generalblack font-roboto font-medium min-w-[120px]"
            >
              {post.post.title}
            </div>
            <div className="flex text-12px cursor-default text-caak-darkBlue tracking-[0.21px]  leading-[16px] ">
              <p>{convertDateTime(post.post.createdAt, ".", "true")}</p>
            </div>
          </div>
        </div>
      </td>
      <td>
        <p className="text-caak-generalblack text-13px font-normal ml-4">
          {getDiffDays(moment(post.start_date)._d, moment(post.end_date)._d)}
        </p>
      </td>

      <td>
        <div className="flex  ">
          <p
            className={
              "text-13px font-inter font-normal text-caak-darkBlue tracking-[0.21px]  leading-[16px]"
            }
          >
            {convertDateTime(post.start_date, ".", false, true)}
          </p>
          <p
            className={
              "text-13px font-inter font-normal text-caak-darkBlue tracking-[0.21px]  leading-[16px] mx-2 mt-2"
            }
          >
            ~
          </p>
          <p
            className={
              "text-13px font-inter font-normal text-caak-darkBlue tracking-[0.21px]  leading-[16px]"
            }
          >
            {convertDateTime(post.end_date, ".", false, true)}
          </p>
        </div>
      </td>
      {/* <td className="max-w-[80px]">
        <p
          className={
            "text-13px font-inter font-normal text-caak-darkBlue tracking-[0.21px]  leading-[16px] "
          }
        >
          {`${numberWithCommas(3000500)}₮`}
        </p>
      </td> */}
      <td>
        <div className="flex text-sm text-caak-darkBlue w-[166px] ">
          <div
            className="flex items-center mr-4 min-w-[50px]"
            data-tip
            data-for="reachtTip"
          >
            <span className="icon-fi-rs-view text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.post.totals.reach ? kFormatter(post.post.totals.reach) : 0}
            </p>
            <ReactTooltip
              id="reachtTip"
              place="top"
              effect="solid"
              className="p-1 opacity-50"
            >
              <p className="text-11px text-white ">Харсан тоо</p>
            </ReactTooltip>
          </div>
          <div
            className="flex items-center mr-4 min-w-[50px]"
            data-tip
            data-for="viewTip"
          >
            <span className="  icon-fi-rs-clicked-o text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.post.totals.views ? kFormatter(post.post.totals.views) : 0}
            </p>
            <ReactTooltip
              id="viewTip"
              place="top"
              effect="solid"
              className="p-1 opacity-50"
            >
              <p className="text-11px text-white ">Үзсэн тоо</p>
            </ReactTooltip>
          </div>

          <div
            className="flex items-center mr-4 min-w-[50px]"
            data-tip
            data-for="caakTip"
          >
            <span className=" icon-fi-rs-rock-i text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.post.totals.reactions
                ? kFormatter(post.post.totals.reactions)
                : 0}
            </p>
            <ReactTooltip
              id="caakTip"
              place="top"
              effect="solid"
              className="p-1 opacity-50"
            >
              <p className="text-11px text-white ">Саакын тоо</p>
            </ReactTooltip>
          </div>
          <div
            className="flex items-center mr-4 min-w-[50px]"
            data-tip
            data-for="commentTip"
          >
            <span className="  icon-fi-rs-comment-o text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.post.totals.reactions
                ? kFormatter(post.post.totals.comments)
                : 0}
            </p>
            <ReactTooltip
              id="commentTip"
              place="top"
              effect="solid"
              className="p-1 opacity-50"
            >
              <p className="text-11px text-white ">Сэтгэгдлийн тоо</p>
            </ReactTooltip>
          </div>
          {/* <Button
            // loading={loading}
            className={`${
              moment(post.end_date)._d > now
                ? "bg-caak-titaniumwhite"
                : "bg-[#257CEE]"
            } text-caak-generalblack text-14px font-inter font-medium w-[87px] h-[30px] bg-white border`}
          >
            <p
              className={`${
                moment(post.end_date)._d > now ? "text-caak-shit" : "text-white"
              } font-inter font-normal text-13px`}
            >
              {moment(post.end_date)._d > now ? "Бүүстлэсэн" : "Бүүстлэх"}
            </p>
          </Button> */}
        </div>
      </td>
    </>
  );
};

export default BoostedPostItem;
