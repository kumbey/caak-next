import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../../graphql-custom/post/mutation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/userContext";
import { onChangedTotalsBy } from "../../../graphql-custom/totals/subscription";
import { getReturnData, useClickOutSide } from "../../../utility/Util";
import { useRouter } from "next/router";
import { isLogged } from "../../../utility/Authenty";
import DropDown from "../../navigation/DropDown";
import Image from "next/image";
import FacebookIcon from "../../../../public/assets/images/Facebook-Color.svg";
import TwitterIcon from "../../../../public/assets/images/Twitter-Color.svg";

const postShareMenu = [
  {
    id: 0,
    title: "Facebook",
    icon: <Image width={22} height={22} alt={"facebook icon"} src={FacebookIcon} />,
  },
  {
    id: 1,
    title: "Twitter",
    icon: <Image width={22} height={22} alt={"twitter icon"} src={TwitterIcon} />,
  },
  {
    id: 2,
    title: "Линк хуулах",
    icon: (
      <div className={"flex justify-center items-center p-[5px] w-[22px] h-[22px] rounded-full bg-caak-red"}>
        <span className={"icon-fi-rs-link text-white text-[11px]"} />
      </div>
    ),
  },
];

const CardFooter = ({ totals, items, postId, reacted }) => {
  const { user } = useUser();
  const [subscripTotal, setSubscripTotal] = useState();
  const [isReacted, setIsReacted] = useState(reacted);
  const [render, setRender] = useState(0);
  const history = useRouter();
  const subscriptions = {};
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalComment = Object.keys(items[0].comments.items).length;
  const reactionTimer = useRef(null);
  const initReacted = useRef(null);
  const [shake, setShake] = useState(false);

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
      } else {
        if (totals.reactions > 0) totals.reactions -= 1;
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
              id: postId,
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
              id: postId,
              user_id: user.id,
            },
          })
        );
      }
      initReacted.current = type;
    } catch (ex) {
      console.log(ex);
    }
  };
  const subscrip = () => {
    subscriptions.onChangedTotalsBy = API.graphql({
      query: onChangedTotalsBy,
      variables: {
        type: "PostTotal",
        id: postId,
      },
      authMode: "AWS_IAM",
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscripTotal(JSON.parse(onData.totals));
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    initReacted.current = reacted;
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
    if (subscripTotal) {
      totals.reactions = parseInt(subscripTotal.reactions);
      setRender(render + 1);
    }
    // eslint-disable-next-line
  }, [subscripTotal]);

  return (
    <>
      <div className="relative flex flex-col justify-between h-[50px] py-[12px]  px-[20px]">
        <div
          className={
            "flex flex row justify-between text-blue-primary text-14px"
          }
        >
          <div className={"flex flex-row"}>
            <div
              onClick={() => localHandler()}
              className={
                "flex flex-row group items-center mr-4 cursor-pointer rounded-full"
              }
            >
              <div
                className={`caak-button ${
                  shake ? `shake` : null
                } w-[24px] h-[24px]`}
              >
                <span className={`${isReacted ? "icon-fi-rs-rock-f text-caak-uclagold" : "icon-fi-rs-rock-i"}  text-[23px]`}/>
              </div>
              <span className={"text-15px text-caak-generalblack ml-[6px]"}>
                {totals.reactions + " саак"}
              </span>
            </div>
            <div
              // onClick={() => setIsCommentOpen(true)}
              className={"flex flex-row items-center mr-4 cursor-pointer group"}
            >
              <i
                className={
                  "icon-fi-rs-comment text-caak-generalblack text-22px mr-1.5 transition duration-150 group-hover:text-caak-carbonfootprint"
                }
              />
              <span className={"text-15px text-caak-generalblack"}>
                {totalComment + " сэтгэгдэл"}
              </span>
            </div>
          </div>
          <div
            ref={menuRef}
            onClick={toggleMenu}
            className={
              "flex flex-row items-center cursor-pointer w-[24px] h-[24px]"
            }
          >
            <i
              className={
                "icon-fi-rs-share text-caak-generalblack transition duration-150 hover:text-caak-carbonfootprint text-22px mr-1.5"
              }
            />
            <DropDown
              arrow={"bottom"}
              className="absolute right-0 bottom-12"
              open={isMenuOpen}
              onToggle={toggleMenu}
              content={postShareMenu.map((data) => (
                <div
                  key={data.id}
                  style={{ height: "36px" }}
                  className="z-1 flex items-center cursor-pointer px-c6 hover:bg-caak-liquidnitrogen"
                >
                  {data.icon}
                  <p className="text-14px text-caak-extraBlack ml-px-12">
                    {data.title}
                  </p>
                </div>
              ))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFooter;
