import Image from "next/image";
import { getFileUrl } from "../../utility/Util";
import Link from "next/link";
import { useRouter } from "next/router";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../graphql-custom/post/mutation";
import { useEffect, useRef, useState } from "react";
import { isLogged } from "../../utility/Authenty";
import { useUser } from "../../context/userContext";
import Video from "../video";

const ViewPostBlogItem = ({ postItem, postId, singleItem }) => {
  const router = useRouter();
  const { user } = useUser();
  const reactionTimer = useRef(null);
  const initReacted = useRef(null);
  const [shake, setShake] = useState(false);
  const [isReacted, setIsReacted] = useState(postItem.reacted);
  const animate = () => {
    // Button begins to shake
    setShake(true);

    // Buttons stops to animate after 2 seconds
    setTimeout(() => setShake(false), 500);
  };
  const localHandler = () => {
    if (isLogged) {
      setIsReacted(!isReacted);
      if (reactionTimer.current) {
        clearTimeout(reactionTimer.current);
      }

      if (!isReacted) {
        postItem.totals.reactions += 1;
        animate();
      } else {
        if (postItem.totals.reactions > 0) postItem.totals.reactions -= 1;
      }
      if (initReacted.current !== !isReacted) {
        reactionTimer.current = setTimeout(
          () => reactionHandler(!isReacted),
          3000
        );
      }
    } else {
      history.push({
        pathname: "/login",
        // state: { background: location },
      });
    }
  };

  const reactionHandler = async (type) => {
    try {
      if (type) {
        await API.graphql(
          graphqlOperation(createReaction, {
            input: {
              id: `${postItem.id}#${user.id}`,
              item_id: postItem.id,
              on_to: "POST_ITEM",
              type: "CAAK",
              user_id: user.id,
            },
          })
        );
      } else {
        await API.graphql(
          graphqlOperation(deleteReaction, {
            input: {
              id: `${postItem.id}#${user.id}`,
            },
          })
        );
      }
      initReacted.current = type;
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    initReacted.current = postItem.reacted;
  }, []);

  return (
    <div className={"flex flex-col mt-[40px]"}>
      <div className={"relative h-[438px] w-full pt-[4px]"}>
        {postItem.file.type.startsWith("video") ? (
          <Video
            videoClassname={"object-contain rounded-[4px]"}
            src={getFileUrl(postItem.file)}
          />
        ) : !singleItem ? (
          <Link
            href={{
              pathname: `${router.pathname}/[itemId]`,
              query: {
                id: postId,
                itemId: postItem.id,
                isModal: true,
              },
            }}
            as={`${router.asPath}/${postItem.id}`}
          >
            <a>
              <div className={"relative h-[438px] w-full"}>
                <Image
                  className={"rounded-[6px]"}
                  objectFit={"cover"}
                  layout={"fill"}
                  src={getFileUrl(postItem.file)}
                  alt={postItem.file.name}
                />
              </div>
            </a>
          </Link>
        ) : (
          <div className={"relative h-[438px] w-full"}>
            <Image
              className={"rounded-[6px]"}
              objectFit={"cover"}
              layout={"fill"}
              src={getFileUrl(postItem.file)}
              alt={postItem.file.name}
            />
          </div>
        )}

        {!singleItem && (
          <div
            style={{ borderRadius: "16%/50%" }}
            className={
              "flex flex-row absolute bottom-[12px] right-[10px] bg-white h-[26px] px-[8px] py-[4px] border-[1px] border-white"
            }
          >
            <div className={"flex flex-row items-center"}>
              <div
                onClick={() => localHandler()}
                className={
                  "group flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
                }
              >
                <span
                  className={`text-[18px] transition duration-200 group-hover:scale-110 caak-button ${
                    shake ? `shake` : null
                  } ${
                    isReacted
                      ? "icon-fi-rs-rock-f text-caak-uclagold"
                      : "icon-fi-rs-rock-i"
                  }`}
                />
              </div>
              <p
                className={
                  "text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[16px] ml-[4px]"
                }
              >
                {postItem.totals.reactions}
              </p>
            </div>
            <div
              onClick={() => {
                router.push(
                  {
                    pathname: `${router.pathname}/[itemId]`,
                    query: {
                      id: postId,
                      itemId: postItem.id,
                      isModal: true,
                    },
                  },
                  `${router.asPath}/${postItem.id}`
                );
              }}
              className={"flex flex-row items-center ml-[10px]"}
            >
              <div
                className={
                  "group flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
                }
              >
                <span
                  className={
                    "icon-fi-rs-comment text-caak-cherenkov text-[16.5px] transition duration-200 group-hover:scale-125"
                  }
                />
              </div>
              <p
                className={
                  "text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[16px] ml-[4px]"
                }
              >
                {postItem.totals.comments}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={"pt-[20px]"}>
        <p
          className={
            "text-caak-generalblack text-[16px] tracking-[0.38px] leading-[22px] whitespace-pre-wrap"
          }
        >
          {!singleItem ? (
            <Link
              href={{
                pathname: `${router.pathname}/[itemId]`,
                query: {
                  id: postId,
                  itemId: postItem.id,
                  isModal: true,
                },
              }}
              as={`${router.asPath}/${postItem.id}`}
            >
              <a className={"relative"}>{postItem.title}</a>
            </Link>
          ) : (
            postItem.title
          )}
        </p>
      </div>
    </div>
  );
};

export default ViewPostBlogItem;
