import { useState } from "react";
import DropDown from "../navigation/DropDown";
import { useClickOutSide } from "../../utility/Util";
import ViewPostMoreMenu from "./ViewPostMoreMenu";
import AnimatedCaakButton from "../button/animatedCaakButton";

const ViewPostLeftReaction = ({ post, commentRef }) => {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={"flex flex-col items-center"}>
      <div className={"flex flex-col items-center mb-[22px]"}>
        <AnimatedCaakButton
          reactionType={"POST"}
          itemId={post.id}
          totals={post.totals}
          reacted={post.reacted}
          setReacted={(changedReacted) => {
            post.reacted = changedReacted;
          }}
          hideCaakText
          bottomTotals
          textClassname={
            "text-[13px] tracking-[0.2px] leading-[16px] text-white mt-[6px]"
          }
          iconContainerClassname={"w-[44px] h-[44px] rounded-full"}
          iconColor={"text-caak-extrablack"}
          iconClassname={"text-[23px]"}
          activeIconColor={"text-white"}
          activeBackgroundColor={"bg-caak-primary"}
          filledIcon
        />
      </div>
      <div
        onClick={() => {
          if (commentRef.current) {
            commentRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className={"flex flex-col items-center mb-[22px]"}
      >
        <div
          className={
            "flex items-center cursor-pointer justify-center w-[44px] h-[44px] rounded-full bg-white"
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
