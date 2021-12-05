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

const ViewPostBlogItem = ({ postItem, postId }) => {
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
              id: `${postId}#${user.id}`,
              item_id: postId,
              on_to: "POST",
              type: "CAAK",
              user_id: user.id,
            },
          })
        );
      } else {
        await API.graphql(
          graphqlOperation(deleteReaction, {
            input: {
              id: `${postId}#${user.id}`,
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
      <div className={"relative h-[438px] w-full pt-[4px] "}>
        <Image
          className={"rounded-[6px]"}
          objectFit={"cover"}
          layout={"fill"}
          src={getFileUrl(postItem.file)}
          alt={postItem.file.name}
        />
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
          <div className={"flex flex-row items-center ml-[10px]"}>
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
      </div>
      <div className={"pt-[20px]"}>
        <p
          className={
            "text-caak-generalblack text-[16px] tracking-[0.38px] leading-[22px]"
          }
        >
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
        </p>
      </div>
    </div>
  );
};

export default ViewPostBlogItem;
