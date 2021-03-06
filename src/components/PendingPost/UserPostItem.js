import Link from "next/link";
import VideoJS from "../card/VideoJS";
import {
  generateFileUrl,
  getFileUrl,
  generateTimeAgo,
} from "../../utility/Util";
import Dummy from "dummyjs";
import Button from "../button";
import DropDown from "../navigation/DropDown";
import { useClickOutSide } from "../../utility/Util";
import { useState } from "react";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import { updateStatus } from "../../apis/post/updateStatus";

export default function UserPostItem({ post, className }) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const postHandler = async (id, status) => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );
      setLoading(false);
    } catch (ex) {
      if (
        ex.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"
      ) {
        updateStatus(post, user.sysUser.ID, status);
        setLoading(false);
      }
    }
  };

  return (
    <tr
      style={{ paddingBlock: "20px" }}
      className={`flex ph:grid w-full items-center ${
        className ? className : ""
      }`}
    >
      <td className=" w-1/2 text-center md:ml-c32">
        <Link href={`/pending/view/${post.id}`}>
          <>
            <div
              style={{ textOverflow: "ellipsis", wordBreak: "break-all" }}
              className="flex items-center"
            >
              {post.items.items[0].file.type.startsWith("video") ? (
                <VideoJS
                  files={post.items.items}
                  videoClassName={`videoPlayer rounded-lg video-js vjs-big-play-centered h-c7 w-c33`}
                /> ? (
                  <img
                    src={
                      "https://images-na.ssl-images-amazon.com/images/I/31OQNoCuVdL.png"
                    }
                    className={"h-c7 w-c33 rounded-lg object-cover"}
                    alt={""}
                  />
                ) : null
              ) : (
                <img
                  src={generateFileUrl(
                    post.items.items.length > 0 && post.items.items[0].file
                  )}
                  className={"h-c7 w-c33 rounded-lg object-cover"}
                  alt={""}
                />
              )}
              <p className="text-15px" style={{ marginInline: "20px" }}>
                {post.title}
              </p>
            </div>
          </>
        </Link>
      </td>
      <td className="flex text-center w-1/4">
        <Link href={`/group/${post.group?.id}`}>
          <a className="flex">
            <img
              className="ph:w-c2 ph:h-c2 w-8 h-8 ph:ml-10 rounded-full object-cover"
              src={
                post.group?.profile
                  ? getFileUrl(post.group?.profile)
                  : Dummy.img("100x100")
              }
              alt=""
            />
            <p className="text-15px ml-px-7">{post.group?.name}</p>
          </a>
        </Link>
      </td>
      <td className="w-1/6 text-center">
        <span className={"text-darkblue text-12px"}>
          {generateTimeAgo(post.createdAt)}
        </span>
      </td>
      <td className="w-1/6 text-center relative">
        <div className="md:flex md:flex-col  hidden dropdown-item-wrapper w-full p-2">
          <Button
            loading={loading}
            onClick={() => postHandler(post.id, "CONFIRMED")}
            className="bg-caak-bleudefrance text-15px w-full mb-2 mr-2 text-white"
          >
            ??????????????????
          </Button>
          <Button
            loading={loading}
            onClick={() => postHandler(post.id, "ARCHIVED")}
            className="text-caak-generalblack text-15px w-full bg-white border"
          >
            ??????????????????
          </Button>
        </div>

        <span
          ref={menuRef}
          onClick={toggleMenu}
          className=" icon-fi-rs-dots p-3 text-2xl flex  md:hidden justify-center cursor-pointer  hover:bg-caak-liquidnitrogen"
        />
        <DropDown
          className={"top-5"}
          open={isMenuOpen}
          onToggle={toggleMenu}
          content={
            <div className="dropdown-item-wrapper flex flex-col w-full p-2">
              <Button
                loading={loading}
                onClick={() => postHandler(post.id, "CONFIRMED")}
                className="bg-caak-bleudefrance text-15px w-full mb-2 mr-2 text-white"
              >
                ??????????????????
              </Button>
              <Button
                loading={loading}
                onClick={() => postHandler(post.id, "ARCHIVED")}
                className="text-caak-generalblack text-15px w-full bg-white border"
              >
                ??????????????????
              </Button>
            </div>
          }
        />
      </td>
    </tr>
  );
}
