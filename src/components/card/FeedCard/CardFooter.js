import API from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { onChangedTotalsBy } from "../../../graphql-custom/totals/subscription";
import { getReturnData, useClickOutSide } from "../../../utility/Util";
import DropDown from "../../navigation/DropDown";
import Image from "next/image";
import FacebookIcon from "../../../../public/assets/images/Facebook-Color.svg";
import TwitterIcon from "../../../../public/assets/images/Twitter-Color.svg";
import AnimatedCaakButton from "../../button/animatedCaakButton";
import { useRouter } from "next/router";

const postShareMenu = [
  {
    id: 0,
    title: "Facebook",
    icon: (
      <Image width={22} height={22} alt={"facebook icon"} src={FacebookIcon} />
    ),
  },
  {
    id: 1,
    title: "Twitter",
    icon: (
      <Image width={22} height={22} alt={"twitter icon"} src={TwitterIcon} />
    ),
  },
  {
    id: 2,
    title: "Линк хуулах",
    icon: (
      <div
        className={
          "flex justify-center items-center p-[5px] w-[22px] h-[22px] rounded-full bg-caak-red"
        }
      >
        <span className={"icon-fi-rs-link text-white text-[11px]"} />
      </div>
    ),
  },
];

const CardFooter = ({ totals, postId, reacted }) => {
  const [subscripTotal, setSubscripTotal] = useState();
  const router = useRouter();
  const [render, setRender] = useState(0);
  const subscriptions = {};
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="relative flex flex-col justify-center h-[50px] py-[12px] px-[20px]">
        <div className={"flex flex row justify-between"}>
          <div className={"flex flex-row"}>
            <div
              className={
                "flex flex-row group items-center mr-4 cursor-pointer rounded-full text-caak-nocturnal"
              }
            >
              <AnimatedCaakButton
                reactionType={"POST"}
                reacted={reacted}
                setReacted={(changedReacted) => {
                  reacted = changedReacted;
                }}
                totals={totals}
                itemId={postId}
                iconContainerClassname={"w-[24px] h-[24px]"}
                iconClassname={"text-[23px]"}
                iconColor={"text-caak-scriptink"}
                textClassname={"ml-[6px] text-[15px]"}
              />
            </div>
            <div
              onClick={() =>
                router.push(
                  {
                    pathname: `/post/view/${postId}`,
                    query: { jumpToComment: true },
                  },
                  `/post/view/${postId}`
                )
              }
              className={"flex flex-row items-center mr-4 cursor-pointer group"}
            >
              <span
                className={
                  "icon-fi-rs-comment-o text-[21px] mr-1.5 transition duration-150 text-caak-scriptink group-hover:text-caak-carbonfootprint"
                }
              />
              <span className={"text-[15px] text-caak-nocturnal"}>
                {totals.comments}
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
            <span
              className={
                "icon-fi-rs-share-o text-caak-scriptink transition duration-150 text-[22px] mr-1.5"
              }
            />
            <DropDown
              arrow={"bottomRight"}
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
