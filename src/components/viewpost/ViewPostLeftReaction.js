import { useState, useEffect } from "react";
import Image from "next/image";
import DropDown from "../navigation/DropDown";
import { useClickOutSide } from "../../utility/Util";
import ViewPostMoreMenu from "./ViewPostMoreMenu";
import { FacebookShareButton, TwitterShareButton } from "next-share";
import FacebookIcon from "../../../public/assets/images/Facebook-Color.svg";
import TwitterIcon from "../../../public/assets/images/Twitter-Color.svg";
import AnimatedCaakButton from "../button/animatedCaakButton";

const ViewPostLeftReaction = ({ post, commentRef, containerClassname }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [pathName, setPathName] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const toggleShare = () => {
    setIsShareOpen(!isShareOpen);
  };

  const shareRef = useClickOutSide(() => {
    setIsShareOpen(false);
  });

  useEffect(() => {
    setPathName(window.location.origin);
  }, []);

  return (
    <div className={`${containerClassname} flex flex-col items-center`}>
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
        ref={shareRef}
        onClick={toggleShare}
        className={
          "flex flex-row items-center cursor-pointer relative  justify-center w-[44px] h-[44px] rounded-full bg-white mb-[22px]"
        }
      >
        <span
          className={
            "icon-fi-rs-share-o text-caak-scriptink transition duration-150 text-[22px]"
          }
        />

        <DropDown
          arrow={"bottomLeft"}
          className="absolute -left-1 bottom-14"
          open={isShareOpen}
          onToggle={toggleShare}
          content={
            <div className={"flex flex-row items-center"}>
              <div className={"flex flex-col  justify-start  z-1    "}>
                <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                  <FacebookShareButton url={`${pathName}/post/view/${post.id}`}>
                    <div
                      className={
                        "flex items-center rounded-full cursor-pointer h-[36px] "
                      }
                    >
                      <Image
                        width={22}
                        height={22}
                        alt={"facebook icon"}
                        src={FacebookIcon}
                      />
                      <p className="text-14px text-caak-extraBlack ml-px-12">
                        Facebook
                      </p>
                    </div>
                  </FacebookShareButton>
                </div>
                <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                  <TwitterShareButton url={`${pathName}/post/view/${post.id}`}>
                    <div
                      className={
                        "flex items-center rounded-full cursor-pointer h-[36px]"
                      }
                    >
                      <Image
                        width={22}
                        height={22}
                        alt={"twitter icon"}
                        src={TwitterIcon}
                      />
                      <p className="text-14px text-caak-extraBlack ml-px-12">
                        Twitter
                      </p>
                    </div>
                  </TwitterShareButton>
                </div>
                <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                  <div
                    onClick={() => {
                      if (typeof navigator !== "undefined")
                        navigator.clipboard.writeText(
                          `${pathName}/post/view/${post.id}`
                        );
                    }}
                    className={
                      "flex items-center  rounded-full cursor-pointer h-[36px]"
                    }
                  >
                    <div
                      className={
                        "flex justify-center items-center p-[5px] w-[22px] h-[22px] rounded-full bg-caak-red"
                      }
                    >
                      <span
                        className={"icon-fi-rs-link text-white text-[11px]"}
                      />
                    </div>
                    <p className="text-14px text-caak-extraBlack ml-px-12">
                      Линк хуулах
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
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
