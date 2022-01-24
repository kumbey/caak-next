import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../graphql-custom/post/mutation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import { getReturnData } from "../../utility/Util";
import {
  onReactionCreateByUserItem,
  onReactionDeleteByUserItem,
} from "../../graphql-custom/reaction/subscriptions";
import { onChangedTotalsBy } from "../../graphql-custom/totals/subscription";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { getReactions } from "../../graphql/queries";

const AnimatedCaakButton = ({
  disableOnClick,
  totals,
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
  setReacted,
}) => {
  const [shake, setShake] = useState(false);
  const [render, setRender] = useState(0);
  const [subscripTotal, setSubscripTotal] = useState(0);
  const reactionTimer = useRef(null);
  const initReacted = useRef();
  const [isReacted, setIsReacted] = useState();
  const subscriptions = {};

  const { user, isLogged } = useUser();
  const router = useRouter();

  const subscrip = () => {
    subscriptions.onChangedTotalsBy = API.graphql({
      query: onChangedTotalsBy,
      variables: {
        type: totalType(),
        id: itemId,
      },
      authMode: "AWS_IAM",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscripTotal(parseInt(JSON.parse(onData.totals).reactions));
        // totals.reactions = parseInt(JSON.parse(onData.totals).reactions);
        // setRender(render + 1)
      },
      error: (error) => {
        console.warn(error);
      },
    });
    if (isLogged) {
      subscriptions.onReactionCreateByUserItem = API.graphql({
        query: onReactionCreateByUserItem,
        variables: {
          item_id: itemId,
          on_to: on_to(),
          user_id: user.id,
        },
        authMode: "AWS_IAM",
      }).subscribe({
        next: () => {
          setIsReacted(true);
        },
        error: (error) => {
          console.warn(error);
        },
      });
    }

    if (isLogged) {
      subscriptions.onReactionDeleteByUserItem = API.graphql({
        query: onReactionDeleteByUserItem,
        variables: {
          item_id: itemId,
          on_to: on_to(),
          user_id: user.id,
        },
        authMode: "AWS_IAM",
      }).subscribe({
        next: () => {
          setIsReacted(false);
        },
        error: (error) => {
          console.warn(error);
        },
      });
    }
  };

  const animate = () => {
    // Button begins to shake
    setShake(true);

    // Buttons stops to animate after 2 seconds
    setTimeout(() => setShake(false), 500);
  };

  const localHandler = () => {
    if (isLogged) {
      setIsReacted(!isReacted);
      initReacted.current = isReacted;
      setReacted(!isReacted);
      if (reactionTimer.current) {
        clearTimeout(reactionTimer.current);
      }

      if (!isReacted) {
        totals.reactions += 1;
        // reacted = true;
        animate();
        setRender(render + 1);
      } else {
        if (totals.reactions > 0) totals.reactions -= 1;
        // reacted = false;
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
            prevPath: router.asPath,
          },
        },
        `/signInUp/signIn`,
        { shallow: true }
      );
    }
  };
  const totalType = () => {
    if (reactionType === "POST") {
      return "PostTotal";
    } else if (reactionType === "POST_ITEM") {
      return "PostItemsTotal";
    } else if (reactionType === "COMMENT") {
      return "CommentTotal";
    }
  };
  const on_to = () => {
    if (reactionType === "COMMENT") {
      return "COMMENT";
    } else if (reactionType === "POST") {
      return "POST";
    } else if (reactionType === "POST_ITEM") {
      return "POST_ITEM";
    }
  };
  const reactionHandler = async (type) => {
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

  const getIsReacted = async () => {
    try {
      let resp = await API.graphql({
        query: getReactions,
        variables: { id: `${itemId}#${user.id}` },
      });
      resp = getReturnData(resp);
      if (resp) {
        setReacted(true);
        setIsReacted(true);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useUpdateEffect(() => {
    totals.reactions = subscripTotal;
    setRender(render + 1);
  }, [subscripTotal]);

  useEffect(() => {
    subscrip();

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initReacted.current = reacted;
    setIsReacted(reacted);
  }, [reacted]);

  useUpdateEffect(() => {
    if (isLogged) {
      getIsReacted();
    }
  }, [isLogged]);

  return (
    <div
      className={`flex ${bottomTotals ? "flex-col" : "flex-row"} items-center`}
    >
      <div
        onClick={() => !disableOnClick && localHandler()}
        className={`caak-button ${shake ? `shake` : null} ${
          iconContainerClassname ? iconContainerClassname : ""
        } ${
          isReacted
            ? activeBackgroundColor
            : `bg-white hover:bg-caak-titaniumwhite`
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
        {totals ? totals.reactions + `${hideCaakText ? "" : " саак"}` : 0}
      </p>
    </div>
  );
};

export default AnimatedCaakButton;
