import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Button from "../button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import { useState } from "react";
import DropDown from "../navigation/DropDown";
import { useUser } from "../../context/userContext";
import { updateStatus } from "../../apis/post/updateStatus";
import { useClickOutSide } from "../../utility/Util";
import VideoJS from "../card/VideoJS";
import { generateFileUrl } from "../../utility/Util";
import { getFileUrl } from "../../utility/Util";
import { generateTimeAgo } from "../../utility/Util";
import Dummy from "dummyjs";
import { closeModal } from "../../utility/Util";
import { useHistory } from "react-router";

export default function PendingPostItem({ post, className }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { state } = useLocation();
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
      closeModal(history, state);
    } catch (ex) {
      if (
        ex.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"
      ) {
        updateStatus(post, user.sysUser.ID, status);
        setLoading(false);
        closeModal(history, state);
      }
    }
  };

  return (
    <div
      style={{ paddingBlock: "20px" }}
      className={`flex ph:grid w-full items-center ${
        className ? className : ""
      }`}
    >
      <div className="sm:w-1/3">
        <Link href={`/pending/view/${post.id}`}>
          <div
            style={{ textOverflow: "ellipsis", wordBreak: "break-all" }}
            className="flex items-center cursor-pointer pl-6 mr-5"
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
                  className={"h-c7 w-c33 rounded-lg "}
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
        </Link>
      </div>
      <div className="ph:w-full ph:mt-3 relative flex sm:w-2/3">
        <div className="sm:w-1/2">
          <div className="sm:flex flex-row items-center w-full">
            <div className="flex items-center sm:w-1/2">
              <img
                className="ph:w-c2 ph:h-c2 w-8 h-8 rounded-full"
                src={
                  post.user?.pic
                    ? getFileUrl(post.user?.pic)
                    : Dummy.img("100x100")
                }
                alt=""
              />
              <p className="text-15px ml-px-7">{post.user?.firstname}</p>
            </div>
            <div className="flex sm:w-1/2  justify-center">
              <span className={"text-darkblue text-12px"}>
                {generateTimeAgo(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div
          ref={menuRef}
          className={`flex justify-center w-1/2 h-c8 items-center relative rounded-full`}
        >
          <div className="hidden md:flex">
            <Button
              loading={loading}
              onClick={() => postHandler(post.id, "CONFIRMED")}
              className="bg-caak-bleudefrance text-15px w-full mb-2 mr-2 text-white"
            >
              Зөвшөөрөх
            </Button>
            <Button
              loading={loading}
              onClick={() => postHandler(post.id, "ARCHIVED")}
              className="text-caak-generalblack text-15px w-full bg-white border"
            >
              Татгалзах
            </Button>
          </div>
          <span
            onClick={toggleMenu}
            className="icon-fi-rs-dots text-4px md:hidden cursor-pointer  hover:bg-caak-liquidnitrogen"
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
                  Зөвшөөрөх
                </Button>
                <Button
                  loading={loading}
                  onClick={() => postHandler(post.id, "ARCHIVED")}
                  className="text-caak-generalblack text-15px w-full bg-white border"
                >
                  Татгалзах
                </Button>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
