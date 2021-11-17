import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createReaction,
  deleteReaction,
} from "../../../graphql-custom/post/mutation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../../context/userContext";
import { onChangedTotalsBy } from "../../../graphql-custom/totals/subscription";
import {
  checkUser,
  getReturnData,
  useClickOutSide,
} from "../../../utility/Util";
import GroupInformationDrop from "../../PendingPost/GroupInformationDrop";

const postMenu = [
  {
    id: 0,
    title: "Facebook",
  },
  {
    id: 1,
    title: "Twitter",
  },
  {
    id: 2,
    title: "LinkedIn",
  },
  {
    id: 3,
    icon: <span className="icon-fi-rs-hide text-16px" />,
    title: "Өөр дээрээ",
  },
];

const CardFooter = ({ totals, items, postId, reacted }) => {
  const { user } = useUser();
  const [subscripTotal, setSubscripTotal] = useState();
  const [isReacted, setIsReacted] = useState(reacted);
  const [render, setRender] = useState(0);
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
    if (checkUser(user)) {
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
        state: { background: location },
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
              user_id: user.sysUser.id,
            },
          })
        );
      } else {
        await API.graphql(
          graphqlOperation(deleteReaction, {
            input: {
              id: postId,
              user_id: user.sysUser.id,
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
                {/*<svg*/}
                {/*  width="24px"*/}
                {/*  height="24px"*/}
                {/*  viewBox="0 0 48 48"*/}
                {/*  fill={`${isReacted ? "red" : "none"}`}*/}
                {/*  xmlns="http://www.w3.org/2000/svg"*/}
                {/*>*/}
                {/*  <path*/}
                {/*    d="M24 25C24 25 24 8.5 24 7.5C24 6.21875 24.5 4 27 4C29.5 4 30 6.21875 30 7.5C30 8 30 30 30 30C30 30 35.7031 24.2969 37 23C38.2969 21.7031 40.0781 21.0781 41.5 22.5C42.9219 23.9219 43.0938 25.4063 41.5 27C39.9063 28.5937 35 33.5 35 33.5C35 33.5 29.0938 44 26 44C22.9063 44 13 44 13 44C13 44 10 44 8.00002 42C6.00002 40 6.00002 37.5 6.00002 37.5C6.00002 37.5 5.99998 13.5 6.00002 12.7812C6.00005 12.0625 6.50002 10 9.00002 10C11.5 10 12 12 12 12.7812C12 13.5 12 25 12 25"*/}
                {/*    stroke={`${isReacted ? "white" : "black"}`}*/}
                {/*    strokeWidth="2"*/}
                {/*    strokeLinecap="round"*/}
                {/*    strokeLinejoin="round"*/}
                {/*  />*/}
                {/*  <rect*/}
                {/*    x="12"*/}
                {/*    y="19"*/}
                {/*    width="6"*/}
                {/*    height="12"*/}
                {/*    rx="3"*/}
                {/*    stroke={`${isReacted ? "white" : "black"}`}*/}
                {/*    strokeWidth="2"*/}
                {/*    strokeLinejoin="round"*/}
                {/*  />*/}
                {/*  <rect*/}
                {/*    x="18"*/}
                {/*    y="19"*/}
                {/*    width="6"*/}
                {/*    height="12"*/}
                {/*    rx="3"*/}
                {/*    stroke={`${isReacted ? "white" : "black"}`}*/}
                {/*    strokeWidth="2"*/}
                {/*    strokeLinejoin="round"*/}
                {/*  />*/}
                {/*</svg>*/}

                {/*<svg width="30px" height="30px" viewBox="0 0 32 32">*/}
                {/*  <g*/}
                {/*    stroke={`${isReacted ? "#fdb400" : "black"}`}*/}
                {/*    strokeWidth="1"*/}
                {/*    fill="none"*/}
                {/*    // fillRule="evenodd"*/}
                {/*  >*/}
                {/*    <g fill={`${isReacted ? "#fdb400" : "white"}`}>*/}
                {/*      <path d="M19,14 L19,12.5047388 C19,11.6736945 18.3342028,11 17.5,11 C16.6715729,11 16,11.6683155 16,12.5047388 L16,15 L15,15 L15,5.50524116 C15,4.67391942 14.3342028,4 13.5,4 C12.6715729,4 12,4.66712976 12,5.50524116 L12,15.2567418 L12,15.2567418 C9.98955659,13.0634835 7.35160658,10.6696995 6.24580826,11.7814695 C5.15863848,12.8745103 7.8026058,15.8883678 11.7146193,22.4707399 C12.1750887,23.2455281 12.6674752,23.9578607 13.2106862,24.5875008 C14.548549,26.6418224 16.8656647,28 19.5,28 C23.6421358,28 27,24.6421358 27,20.5 L27,16.7543674 L27,8.4912653 C27,7.66766222 26.3342028,7 25.5,7 C24.6715729,7 24,7.66254437 24,8.4912653 L24,15 L23,15 L23,13.5047388 C23,12.6736945 22.3342028,12 21.5,12 C20.6715729,12 20,12.6683155 20,13.5047388 L20,14 L19,14 L19,14 Z" />*/}
                {/*    </g>*/}
                {/*  </g>*/}
                {/*</svg>*/}
                <svg
                  id="rock"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <rect id="Cover" width="24" height="24" fill="none" />
                  <path
                    id="Path_360"
                    data-name="Path 360"
                    d="M406.616,382.545a8.824,8.824,0,0,1-7.125-3.959c-1.4-1.852-1.292-4.14-1.292-6.21v-9.37a1.538,1.538,0,0,1,1.587-1.562,1.7,1.7,0,0,1,1.772,1.961v7.657s.018.545.166.611.283-.285.283-.285v-3.456a1.583,1.583,0,0,1,1.569-1.38,1.655,1.655,0,0,1,1.661,1.247v4l.5-.69V367.5a1.641,1.641,0,0,1,3.249.145v2.639l.5.024v-9.334a1.65,1.65,0,0,1,1.6-1.416,1.73,1.73,0,0,1,1.661,1.852v9.9a5.688,5.688,0,0,1,2.037,1.8c.362.5-.1,2.135-.48,3.6-.332,1.276-.369,2.361-1.064,3.136A8.168,8.168,0,0,1,406.616,382.545Z"
                    transform="translate(-394.561 -359.556)"
                    fill={`${isReacted ? "#fdb400" : "none"}`}
                    // stroke={`${isReacted ? "none" : "black"}`}
                    style={{stroke: `${isReacted ? "red" : "black"}`}}
                    strokeWidth={1}
                  />
                  <path
                    id="Path_361"
                    data-name="Path 361"
                    d="M441.8,503.413a2.278,2.278,0,0,1-1.826-1.291l.317-.235.034.064c.005.011.535,1.071,1.474,1.071a1.409,1.409,0,0,0,1.537-1.272l.411-.087A1.929,1.929,0,0,1,441.8,503.413Z"
                    transform="translate(-432.802 -490.006)"
                    // fill="black"
                  />
                  <path
                    id="Path_362"
                    data-name="Path 362"
                    d="M487.369,495.854a5.532,5.532,0,0,0-2.231-.187,3.315,3.315,0,0,1-2.495-.65,1.76,1.76,0,0,1-.487-1.357c.042-1.575,1.007-1.923,2.045-2.064a19.6,19.6,0,0,1,3.712,0,4.861,4.861,0,0,1,1.382.354v.44a5.153,5.153,0,0,0-1.423-.4,19.1,19.1,0,0,0-3.618,0c-1.057.144-1.675.466-1.707,1.687a1.368,1.368,0,0,0,.371,1.069,2.977,2.977,0,0,0,2.205.538,5.432,5.432,0,0,1,2.427.231Z"
                    transform="translate(-470.968 -480.609)"
                    // fill="black"
                  />
                </svg>
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
            <GroupInformationDrop
              className="absolute right-0 bottom-12"
              open={isMenuOpen}
              onToggle={toggleMenu}
              content={postMenu.map((data) => (
                <div
                  key={data.id}
                  style={{ height: "36px" }}
                  className="flex items-center cursor-pointer px-c6 hover:bg-caak-liquidnitrogen"
                >
                  <span className="icon-fi-rs-drag text-14px" />
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
