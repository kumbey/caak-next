import API from "@aws-amplify/api";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../button";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import {
  extractDate,
  generateFileUrl,
  getGenderImage,
  getReturnData,
} from "../../utility/Util";

import Video from "../video";
import { useRouter } from "next/router";
import { listPostStatusHistoryByPost } from "../../graphql-custom/post/queries";
import { updatePost } from "../../graphql-custom/post/mutation";

const ReportedPostItem = ({ imageSrc, post, video }) => {
  const router = useRouter();
  const [postHistory, setPostHistory] = useState();

  const [loading, setLoading] = useState(false);

  const postHandler = async ({ id, status }) => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );

      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  const fetchPostHistory = async () => {
    try {
      const resp = await API.graphql({
        query: listPostStatusHistoryByPost,
        variables: {
          post_id: post.id,
        },
      });
      setPostHistory(
        getReturnData(resp).items[getReturnData(resp).items.length - 1 || 0]
      );
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchPostHistory();

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
                    id: post.id,
                    prevPath: router.asPath,
                    isModal: true,
                  },
                },
                `/post/view/${post.id}`,
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
                    id: post.id,
                    prevPath: router.asPath,
                    isModal: true,
                  },
                },
                `/post/view/${post.id}`,
                { shallow: true, scroll: false }
              );
            }}
            className="break-words cursor-pointer text-15px break-all truncate-2 text-caak-generalblack font-roboto font-medium"
          >
            {post.title}
          </div>
        </div>
      </td>
      <td>
        <div className="flex cursor-pointer w-max truncate-2 h-full rounded-md bg-caak-extraLight font-inter  items-center">
          <Link
            href={{
              pathname: `/group/${post.group.id}`,
            }}
          >
            <a>
              <p className="text-caak-generalblack text-13px font-normal ">
                {post.group.name}
              </p>
            </a>
          </Link>
        </div>
      </td>

      <td>
        <p className="text-caak-generalblack text-13px font-normal ">
          {postHistory && postHistory.description}
        </p>
      </td>
      <td>
        <div className="flex  mr-[28px]">
          <p
            className={
              "text-[12px] font-inter font-normal text-caak-darkBlue tracking-[0.21px]  leading-[16px]"
            }
          >
            {`${extractDate(post.createdAt).year}.${
              extractDate(post.createdAt).month
            }.${extractDate(post.createdAt).day}`}
          </p>
        </div>
      </td>

      <td>
        <div className="flex justify-between items-center">
          <Button
            onClick={() => {
              {
                postHandler({ id: post.id, status: "ARCHIVED" });
              }
            }}
            round
            className="bg-caak-cardinal w-[112px] text-14px font-inter font-medium  mr-[10px] text-white"
          >
            <p className="">Устгах</p>
          </Button>
          <Link href={`/post/edit/${post.id}`}>
            <a>
              <Button
                round
                className={
                  "hover:bg-gray-100 border border-gray-200 w-[102px] h-[39px]  font-medium font-inter rounded-lg text-caak-generalblack text-14px bg-white relative"
                }
              >
                <p className="">Засах</p>
              </Button>
            </a>
          </Link>
        </div>
      </td>
    </>
  );
};

export default ReportedPostItem;
