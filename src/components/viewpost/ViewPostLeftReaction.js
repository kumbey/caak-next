import React, { useEffect, useRef, useState } from "react";
import DropDown from "../navigation/DropDown";
import PostMoreMenu from "../card/PostMoreMenu";
import { isLogged } from "../../utility/Authenty";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../graphql-custom/post/mutation";
import { useUser } from "../../context/userContext";
import { useClickOutSide } from "../../utility/Util";
import ViewPostMoreMenu from "./ViewPostMoreMenu";

const ViewPostLeftReaction = ({ post }) => {
  const { user } = useUser();
  const reactionTimer = useRef(null);
  const initReacted = useRef(null);
  const [shake, setShake] = useState(false);
  const [isReacted, setIsReacted] = useState(post.reacted);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        post.totals.reactions += 1;
        animate();
      } else {
        if (post.totals.reactions > 0) post.totals.reactions -= 1;
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
              id: `${post.id}#${user.id}`,
              item_id: post.id,
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
              id: `${post.id}#${user.id}`,
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
    initReacted.current = post.reacted;
  }, []);

  return (
    <div className={"flex flex-col items-center"}>
      <div className={"flex flex-col items-center mb-[22px]"}>
        <div
          onClick={() => localHandler()}
          className={` flex items-center justify-center w-[44px] h-[44px] rounded-full bg-white cursor-pointer`}
        >
          <span
            className={`caak-button ${shake ? `shake` : null} ${
              isReacted
                ? "icon-fi-rs-rock-f text-caak-uclagold"
                : "icon-fi-rs-rock-f text-caak-extraBlack"
            }  text-[27px]`}
          />
        </div>
        <div className={"mt-[6px]"}>
          <p
            className={
              "text-white font-medium text-[12px] tracking-[0.18px] leading-[15px]"
            }
          >
            {post.totals.reactions}
          </p>
        </div>
      </div>
      <div className={"flex flex-col items-center mb-[22px]"}>
        <div
          className={
            "flex items-center justify-center w-[44px] h-[44px] rounded-full bg-white"
          }
        >
          <span
            className={"icon-fi-rs-comment text-caak-extraBlack text-[23px]"}
          />
        </div>
        <div className={"mt-[6px]"}>
          <p
            className={
              "text-white text-[12px] tracking-[0.18px] leading-[15px]"
            }
          >
            {post.totals.comments}
          </p>
        </div>
      </div>
      <div
        ref={menuRef}
        onClick={toggleMenu}
        className={
          "flex flex-col items-center mb-[22px] cursor-pointer relative"
        }
      >
        <div
          className={
            "flex items-center justify-center w-[44px] h-[44px] rounded-full bg-white"
          }
        >
          <DropDown
              arrow={"centerTop"}
              open={isMenuOpen}
              onToggle={toggleMenu}
              content={<ViewPostMoreMenu />}
              className={"top-10 left-1/2 -translate-x-1/2 z-[500] rounded-[4px]"}
          />
          <span
            className={"icon-fi-rs-dots text-caak-extraBlack text-[24px]"}
          />
        </div>
        <div className={"mt-[6px]"}>
          <p
            className={
              "text-white text-[12px] tracking-[0.18px] leading-[15px]"
            }
          >
            Бусад
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewPostLeftReaction;
