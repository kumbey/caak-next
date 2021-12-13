import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../graphql-custom/post/mutation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";

const AnimatedCaakButton = ({
  totals,
  sub,
  reacted,
  reactionType,
  itemId,
  bottomTotals,
  iconContainerClassname,
  iconClassname,
  iconColor,
  textClassname,
  hideCaakText,
  activeIconColor,
  activeBackgroundColor,
  filledIcon,
}) => {
  const [shake, setShake] = useState(false);
  const [render, setRender] = useState(0)
  const reactionTimer = useRef(null);
  const initReacted = useRef(null);
  const [isReacted, setIsReacted] = useState(reacted);
  const { user, isLogged } = useUser();
  const router = useRouter();

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
          2000
        );
      }
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            signInUp: "signIn",
            isModal: true,
          },
        },
        `/signInUp/signIn`,
        { shallow: true }
      );
    }
  };

  const reactionHandler = async (type) => {
    const on_to = () => {
      if (reactionType === "COMMENT") {
        return "COMMENT";
      } else if (reactionType === "POST") {
        return "POST";
      } else if (reactionType === "POST_ITEM") {
        return "POST_ITEM";
      }
    };
    try {
      if (type) {
        await API.graphql(
          graphqlOperation(createReaction, {
            input: {
              id: `${itemId}#${user.id}`,
              item_id: itemId,
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
              id: `${itemId}#${user.id}`,
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
      className={`flex ${bottomTotals ? "flex-col" : "flex-row"} items-center`}
    >
      <div
        onClick={() => localHandler()}
        className={`caak-button ${shake ? `shake` : null} ${
          iconContainerClassname ? iconContainerClassname : ""
        } ${
          isReacted ? activeBackgroundColor : `bg-white`
        } cursor-pointer flex items-center justify-center`}
      >
        {filledIcon ? (
          <span
            className={`${iconClassname ? iconClassname : ""} ${
              isReacted
                ? `${filledIcon ? "icon-fi-rs-rock-f" : "icon-fi-rs-rock-i"} ${
                    activeIconColor ? activeIconColor : "text-caak-uclagold"
                  }`
                : `${filledIcon ? "icon-fi-rs-rock-f" : "icon-fi-rs-rock-i"} ${
                    iconColor ? iconColor : "text-caak-nocturnal"
                  }`
            }`}
          />
        ) : (
          <span
            className={`${iconClassname ? iconClassname : ""} ${
              isReacted
                ? `icon-fi-rs-rock-f ${
                    activeIconColor ? activeIconColor : "text-caak-uclagold"
                  }`
                : `icon-fi-rs-rock-i ${
                    iconColor ? iconColor : "text-caak-nocturnal"
                  }`
            }`}
          />
        )}
      </div>
      <p className={`${textClassname ? textClassname : "text-caak-scriptink"}`}>
        {totals.reactions + `${hideCaakText ? "" : " саак"}`}
      </p>
    </div>
  );
};

export default AnimatedCaakButton;
