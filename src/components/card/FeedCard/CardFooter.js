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

const CardFooter = ({ totals, items, postId, reacted, setIsCommentOpen }) => {
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

  const localHandler = () => {
    if (checkUser(user)) {
      setIsReacted(!isReacted);
      if (reactionTimer.current) {
        clearTimeout(reactionTimer.current);
      }

      if (!isReacted) {
        totals.reactions += 1;
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
              <div className={"w-[24px] h-[24px]"}>
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
                    fill="#fdb400"
                  />
                  <path
                    id="Path_361"
                    data-name="Path 361"
                    d="M441.8,503.413a2.278,2.278,0,0,1-1.826-1.291l.317-.235.034.064c.005.011.535,1.071,1.474,1.071a1.409,1.409,0,0,0,1.537-1.272l.411-.087A1.929,1.929,0,0,1,441.8,503.413Z"
                    transform="translate(-432.802 -490.006)"
                    fill="#ac6d00"
                  />
                  <path
                    id="Path_362"
                    data-name="Path 362"
                    d="M487.369,495.854a5.532,5.532,0,0,0-2.231-.187,3.315,3.315,0,0,1-2.495-.65,1.76,1.76,0,0,1-.487-1.357c.042-1.575,1.007-1.923,2.045-2.064a19.6,19.6,0,0,1,3.712,0,4.861,4.861,0,0,1,1.382.354v.44a5.153,5.153,0,0,0-1.423-.4,19.1,19.1,0,0,0-3.618,0c-1.057.144-1.675.466-1.707,1.687a1.368,1.368,0,0,0,.371,1.069,2.977,2.977,0,0,0,2.205.538,5.432,5.432,0,0,1,2.427.231Z"
                    transform="translate(-470.968 -480.609)"
                    fill="#ac6d00"
                  />
                </svg>
              </div>
              <span className={"text-15px text-caak-generalblack ml-[6px]"}>
                {totals.reactions + " саак"}
              </span>
            </div>
            <div
              onClick={() => setIsCommentOpen(true)}
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
