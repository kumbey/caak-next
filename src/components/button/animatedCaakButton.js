import { isLogged } from "../../utility/Authenty";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../graphql-custom/post/mutation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/userContext";

const AnimatedCaakButton = ({
  totals,
  sub,
  reacted,
  reactionType,
  commentId,
  render,
  setRender,
}) => {
  const [shake, setShake] = useState(false);
  const reactionTimer = useRef(null);
  const initReacted = useRef(null);
  const [isReacted, setIsReacted] = useState(reacted);
  const { user } = useUser();
  useEffect(() => {
    setIsReacted(reacted);
  }, [reacted]);

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
        totals.reactions += 1;
        animate();
        setRender(render + 1);
      } else {
        if (totals.reactions > 0) totals.reactions -= 1;
        setRender(render + 1);
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
      });
    }
  };

  const reactionHandler = async (type) => {
    try {
      if (type) {
        const on_to = () => {
          if (reactionType === "COMMENT") {
            return "COMMENT";
          } else if (reactionType === "POST") {
            if (sub) return "POST_ITEM";
            return "POST";
          }
        };
        await API.graphql(
          graphqlOperation(createReaction, {
            input: {
              id: `${commentId}#${user.id}`,
              item_id: commentId,
              on_to: on_to(),
              type: "CAAK",
              user_id: user.id,
            },
          })
        );
      } else {
        await API.graphql(
          graphqlOperation(deleteReaction, {
            input: {
              id: `${commentId}#${user.id}`,
            },
          })
        );
      }
      initReacted.current = type;
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div
      onClick={() => localHandler()}
      className={`caak-button ${
        shake ? `shake` : null
      } w-[24px] h-[24px] cursor-pointer`}
    >
      <span
        className={`${
          isReacted
            ? "icon-fi-rs-rock-f text-caak-uclagold"
            : "icon-fi-rs-rock-i"
        }  text-[23px]`}
      />
    </div>
  );
};

export default AnimatedCaakButton;
