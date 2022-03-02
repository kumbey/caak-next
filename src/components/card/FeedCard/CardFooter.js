import { useEffect, useState } from "react";
import { useClickOutSide } from "../../../utility/Util";
import DropDown from "../../navigation/DropDown";
import FacebookIcon from "../../../../public/assets/images/Facebook-Color.svg";
import TwitterIcon from "../../../../public/assets/images/Twitter-Color.svg";
import AnimatedCaakButton from "../../button/animatedCaakButton";
import { FacebookShareButton, TwitterShareButton } from "next-share";
import { useRouter } from "next/router";
import { useUser } from "../../../context/userContext";
import Button from "../../button";
import BoostPostModal from "../../modals/boostPostModal";

const CardFooter = ({
  totals,
  postId,
  reacted,
  handleToast,
  subscription,
  title,
  postUser,
  notBoosted,
}) => {
  const router = useRouter();
  const [pathName, setPathName] = useState("");
  const [isBoostPostModalOpen, setIsBoostPostModalOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const { user, isLogged } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setPathName(window.location.origin);
  }, []);

  return (
    <>
      {isLogged && postUser.id === user.id && notBoosted && (
        <>
          {isBoostPostModalOpen && (
            <BoostPostModal
              postId={postId}
              setIsBoostModalOpen={setIsBoostPostModalOpen}
            />
          )}

          <div
            className={
              "flex flex-row items-center justify-end h-[46px] bg-white p-[12px] border-b-[1px]"
            }
          >
            <Button
              onClick={()=> setIsBoostPostModalOpen(true)}
              iconPosition={"left"}
              icon={
                <div
                  className={
                    "w-[20px] h-[20px] flex items-center justify-center mr-[6px]"
                  }
                >
                  <span className={"icon-fi-rs-rocket text-[16.66px]"} />
                </div>
              }
              className={
                "bg-[#257CEE] h-[28px] m-0 text-white px-[8px] py-[4px] font-medium text-[14px] rounded-[4px] leading-[16px] tracking-[0.21px]"
              }
            >
              Бүүстлэх
            </Button>
          </div>
        </>
      )}

      <div className="relative flex flex-col justify-center h-[46px] py-[12px] px-[20px]">
        <div className={"flex row justify-between"}>
          <div className={"flex flex-row"}>
            <div
              className={
                "flex flex-row group items-center mr-4 cursor-pointer rounded-full text-caak-nocturnal"
              }
            >
              <AnimatedCaakButton
                subscription={subscription}
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
                    query: {
                      ...router.query,
                      viewPost: "post",
                      id: postId,
                      prevPath: router.asPath,
                      isModal: true,
                      jumpToComment: true,
                    },
                  },
                  `/post/view/${postId}`,
                  { shallow: true }
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
          <div className="flex flex-row items-center">
            <div
              ref={menuRef}
              onClick={toggleMenu}
              className={
                "flex flex-row items-center cursor-pointer w-[24px] h-[24px]"
              }
            >
              <span
                className={
                  "icon-fi-rs-share-o text-caak-scriptink transition duration-150 text-[22px]"
                }
              />
              <DropDown
                arrow={"bottomRight"}
                className="absolute right-0 bottom-12"
                open={isMenuOpen}
                onToggle={toggleMenu}
                content={
                  <div className={"flex flex-row items-center"}>
                    <div className={"flex flex-col  justify-start  z-1    "}>
                      <FacebookShareButton
                        url={`${pathName}/post/view/${postId}`}
                      >
                        <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                          <div
                            className={
                              "flex items-center rounded-full cursor-pointer h-[36px] "
                            }
                          >
                            <img
                              // priority={true}
                              width={22}
                              height={22}
                              alt={"facebook icon"}
                              src={FacebookIcon.src}
                            />
                            <p className="text-14px text-caak-extraBlack ml-px-12">
                              Facebook
                            </p>
                          </div>
                        </div>
                      </FacebookShareButton>
                      <TwitterShareButton
                        title={`${title} @caaktwt`}
                        url={`${pathName}/post/view/${postId}`}
                      >
                        <div className="hover:bg-caak-liquidnitrogen w-full px-c6">
                          <div
                            className={
                              "flex items-center rounded-full cursor-pointer h-[36px]"
                            }
                          >
                            <img
                              // priority={true}
                              width={22}
                              height={22}
                              alt={"twitter icon"}
                              src={TwitterIcon.src}
                            />
                            <p className="text-14px text-caak-extraBlack ml-px-12">
                              Twitter
                            </p>
                          </div>
                        </div>
                      </TwitterShareButton>
                      <div
                        onClick={() => {
                          if (typeof navigator !== "undefined")
                            navigator.clipboard.writeText(
                              `${pathName}/post/view/${postId}`
                            );
                          handleToast({ param: "copy" });
                        }}
                        className="hover:bg-caak-liquidnitrogen w-full px-c6"
                      >
                        <div
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
                              className={
                                "icon-fi-rs-link text-white text-[11px]"
                              }
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFooter;
