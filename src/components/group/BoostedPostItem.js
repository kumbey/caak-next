import { useEffect, useState } from "react";

import {
  convertDateTime,
  generateFileUrl,
  getDiffDays,
  getGenderImage,
  kFormatter,
} from "../../utility/Util";

import Video from "../video";
import { useRouter } from "next/router";
import moment from "moment";

const BoostedPostItem = ({ imageSrc, post, video }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 27) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <td>
        <div className="cursor-pointer flex items-center ">
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
            className={"flex-shrink-0 w-[64px] h-[64px] mr-[12px] relative"}
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
            className="break-words cursor-pointer text-15px break-all truncate-2 text-caak-generalblack font-roboto font-medium"
          >
            {post.post.title}
          </div>
        </div>
      </td>
      <td>
        <p className="text-caak-generalblack text-13px font-normal ml-4">
          {getDiffDays(moment(post.start_date)._d, moment(post.end_date)._d)}
        </p>
      </td>

      <td>
        <div className="flex  mr-[28px]">
          <p
            className={
              "text-[12px] font-inter font-normal text-caak-darkBlue tracking-[0.21px]  leading-[16px]"
            }
          >
            {convertDateTime(post.start_date)}
          </p>
        </div>
      </td>
      <td>
        <div className="flex  mr-[28px]">
          <p
            className={
              "text-[12px] font-inter font-normal text-caak-darkBlue tracking-[0.21px]  leading-[16px]"
            }
          >
            {convertDateTime(post.end_date)}
          </p>
        </div>
      </td>
      <td>
        <div className="flex text-sm text-caak-darkBlue w-[166px] ">
          <div className="flex items-center mr-5">
            <span className="icon-fi-rs-view text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.post.totals.reach ? kFormatter(post.post.totals.reach) : 0}
            </p>
          </div>
          <div className="flex items-center mr-5">
            <span className="  icon-fi-rs-clicked-o text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.post.totals.views ? kFormatter(post.post.totals.views) : 0}
            </p>
          </div>

          <div className="flex items-center mr-5">
            <span className=" icon-fi-rs-rock-i text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.post.totals.reactions
                ? kFormatter(post.post.totals.reactions)
                : 0}
            </p>
          </div>
          <div className="flex items-center mr-5">
            <span className="  icon-fi-rs-comment-o text-caak-scriptink text-20px mr-[6px] " />
            <p className="font-inter font-normal text-14px text-caak-darkBlue">
              {post.post.totals.reactions
                ? kFormatter(post.post.totals.comments)
                : 0}
            </p>
          </div>
        </div>
      </td>
    </>
  );
};

export default BoostedPostItem;
