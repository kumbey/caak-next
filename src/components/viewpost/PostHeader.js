import { useEffect, useRef, useState } from "react";
import AnimatedCaakButton from "../button/animatedCaakButton";
import toast from "react-hot-toast";
import { FacebookShareButton, TwitterShareButton } from "next-share";
import { decode } from "html-entities";
import DropDown from "../navigation/DropDown";
import PostMoreMenu from "../card/PostMoreMenu";
import PostDeleteConfirm from "../card/PostDeleteConfirm";
import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
  useClickOutSide,
} from "../../utility/Util";
import Link from "next/link";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "../card/ProfileHoverCard";
import userVerifiedSvg from "../../../public/assets/images/fi-rs-awarded.svg";
import Button from "../button";
import { API, graphqlOperation } from "aws-amplify";
import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../graphql-custom/GroupUsers/mutation";
import { useUser } from "../../context/userContext";
import useMediaQuery from "../navigation/useMeduaQuery";
import {useRouter} from "next/router";

const PostHeader = ({
  addCommentRef,
  post,
  activeIndex,
  mobile,
  setClickComment,
}) => {
  const [item, setItem] = useState(post.items.items[activeIndex]);
  const [render, setRender] = useState(0);
  const [open, setOpen] = useState(false);
  const { user, isLogged } = useUser();
  const [pathName, setPathName] = useState("");
  const isTablet = useMediaQuery("screen and (max-device-width: 1023px)");
  const [isShareButtonVisible, setIsShareButtonVisible] = useState(!isTablet);
  const router = useRouter()
  const titleMaxCharacters = 160;
  const titleRef = useRef();
  const [isViewMoreTextVisible, setIsViewMoreTextVisible] = useState(
    post.items.items[activeIndex].title.length > titleMaxCharacters
  );
  const [isExpanded, isSetExpanded] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToast = ({ param }) => {
    if (param === "follow") toast.success("Группт амжилттай нэгдлээ!");
    if (param === "unfollow") toast.success("Группээс амжилттай гарлаа.");
    if (param === "copy") toast.success("Холбоос амжилттай хуулагдлаа.");
    if (param === "saved") toast.success("Пост амжилттай хадгалагдлаа.");
    if (param === "unSaved") toast.success("Пост амжилттай хасагдлаа.");
  };
  const notifyCopy = () => toast.success("Холбоос амжилттай хуулагдлаа.");
  const followGroup = async () => {
    try {
      if (isLogged) {
        if (post.group.followed) {
          await API.graphql(
            graphqlOperation(deleteGroupUsers, {
              input: {
                id: `${post.group_id}#${user.id}`,
              },
            })
          );
          post.group.followed = false;
          setRender(render + 1);
        } else {
          await API.graphql(
            graphqlOperation(createGroupUsers, {
              input: {
                id: `${post.group_id}#${user.id}`,
                group_id: post.group_id,
                user_id: user.id,
                role: "MEMBER",
              },
            })
          );
          post.group.followed = true;
          setRender(render + 1);
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
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    setPathName(window.location.origin);
  }, []);

  useEffect(() => {
    setPathName(window.location.origin);
    setItem(post.items.items[activeIndex]);
    // eslint-disable-next-line
  }, [activeIndex]);

  useEffect(() => {
    if (titleRef.current) {
      const height = titleRef.current.getBoundingClientRect().height;
      if (height > 50) {
        setIsViewMoreTextVisible(true);
      }
    }
  }, [titleRef, setIsViewMoreTextVisible]);

  return (
    <>
      <div className={"w-full"}>
        {/*Button*/}
        <div
          onClick={toggleMenu}
          ref={menuRef}
          className={"flex justify-end items-center z-10 mr-[16px]"}
        >
          <div
            className={`${
              mobile ? "bg-transparent" : "hover:bg-gray-100"
            } flex items-center justify-center p-[15px] rounded-full cursor-pointer w-[35px] h-[35px]`}
          >
            <span
              className={`icon-fi-rs-dots text-[28px] ${
                mobile ? "text-white" : "text-caak-generalblack"
              }`}
            />
            <DropDown
              arrow={"topRight"}
              open={isMenuOpen}
              onToggle={toggleMenu}
              content={
                <PostMoreMenu
                  groupId={post.group.id}
                  post={post}
                  postUser={post.user}
                  handleToast={handleToast}
                  setOpen={setOpen}
                />
              }
              className={"top-10 right-1"}
            />
          </div>
          {
        open && <PostDeleteConfirm setOpen={setOpen} post={post}/>
      }
        </div>
        <div className={"flex flex-col-reverse lg:flex-col px-[24px]"}>
          <div
            className={"relative flex flex-row justify-between items-center"}
          >
            <div className={"flex flex-row"}>
              <div className={"relative"}>
                <img
                  className="w-[48px] h-[48px] m-34px rounded-[6px] object-cover"
                  src={
                    post.group.profile
                      ? getFileUrl(post.group.profile)
                      : getGenderImage("default").src
                  }
                  alt={post.group?.profile?.name}
                />
              </div>
              <div
                className={"flex flex-col justify-center ml-[10px] self-center"}
              >
                <span
                  className={`${
                    mobile ? "text-white" : "text-caak-generalblack"
                  } font-bold text-[16px]`}
                >
                  <Link
                    href={{
                      pathname: `/group/${post.group.id}`,
                    }}
                  >
                    {post.group.name}
                  </Link>
                </span>
                <div className={"flex flex-row items-center"}>
                  <Link
                    href={{
                      pathname: `/user/${post.user.id}/profile`,
                    }}
                  >
                    <a>
                      <Tooltip
                        className={"-left-6"}
                        content={<ProfileHoverCard userId={post.user.id} />}
                      >
                        <span
                          className={`${
                            mobile ? "text-white" : "text-caak-generalblack"
                          } text-[13px]`}
                        >
                          @{post.user.nickname}
                        </span>
                      </Tooltip>
                    </a>
                  </Link>
                  {post.user.verified && (
                    <div
                      className={
                        "flex items-center justify-center w-[17px] h-[17px] ml-[3px]"
                      }
                    >
                      <img
                        className={"w-[16.5px] h-[14.25px]"}
                        alt={""}
                        height={14.25}
                        width={16.5}
                        // quality={100}
                        // priority={true}
                        src={userVerifiedSvg.src}
                      />
                    </div>
                  )}
                  <p
                    className={`${
                      mobile ? "text-white" : "text-caak-darkBlue"
                    } text-[13px] tracking-[0.2px] leading-[16px]`}
                  >
                    &nbsp; &middot; &nbsp;
                    {generateTimeAgo(post.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={followGroup}
                icon={
                  <div
                    className={
                      "flex items-center justify-start w-[20px] h-[20px]"
                    }
                  >
                    <span
                      className={`${
                        post.group.followed
                          ? "icon-fi-rs-check"
                          : "icon-fi-rs-add-l"
                      }  text-[18px]`}
                    />
                  </div>
                }
                iconPosition={"left"}
                className={`h-[28px] tracking-[0.18px] justify-between leading-[15px] flex rounded-[6px] ${
                  post.group.followed
                    ? "text-gray-400 border-gray-400"
                    : "text-caak-primary border-caak-primary"
                }  text-[12px] font-semibold uppercase border-[1px]  pr-[12px] pl-[7px] py-[7px]`}
              >
                {post.group.followed ? "Нэгдсэн" : "Нэгдэх"}
              </Button>
            </div>
          </div>
          <div className={`flex flex-col`}>
            <p
              ref={titleRef}
              className={`break-words text-[15px] mb-[10px] lg:mb-[20px] lg:mt-[20px] ${
                !isExpanded ? "truncate-2" : "max-h-[50vh] overflow-y-auto"
              } ${mobile ? "text-white" : "text-caak-generalblack"} `}
            >
              {item.title && decode(item.title)}
            </p>
            {isViewMoreTextVisible && (
              <p
                onClick={() => isSetExpanded(!isExpanded)}
                className={"cursor-pointer text-[12px] text-blue-400 self-end"}
              >
                {!isExpanded ? "Дэлгэрэнгүй" : "Хураах"}
              </p>
            )}
          </div>
        </div>
        {/*Content*/}
        <div className={"flex flex-col px-[24px]"}>
          {post.status === "CONFIRMED" && (
            <div
              className={
                "flex flex row justify-between text-caak-generalblack my-[12px]"
              }
            >
              <div className={"flex flex-row "}>
                <div
                  className={
                    "flex flex-row items-center mr-[22px] cursor-pointer group"
                  }
                >
                  <AnimatedCaakButton
                    subscription={true}
                    reactionType={"POST_ITEM"}
                    itemId={item.id}
                    hideCaakText={mobile}
                    totals={item.totals}
                    reacted={item.reacted}
                    setReacted={(changedReacted) => {
                      post.items.items[activeIndex].reacted = changedReacted;
                    }}
                    textClassname={
                      "ml-[6px] text-caak-nocturnal font-medium text-[15px] tracking-[0.23px] leading-[18px]"
                    }
                    iconContainerClassname={"w-[24px] h-[24px] bg-transparent"}
                    iconClassname={"text-[23px]"}
                    iconColor={"text-caak-scriptink"}
                  />
                </div>
                <div
                  onClick={() => {
                    if (post.status === "CONFIRMED") {
                      setClickComment && setClickComment((prev) => prev + 1);
                      addCommentRef.current.focus();
                    }
                  }}
                  className={"flex flex-row items-center mr-4 cursor-pointer"}
                >
                  <div
                    className={
                      "w-[24px] h-[24px] flex items-center justify-center"
                    }
                  >
                    <span
                      className={
                        "icon-fi-rs-comment-o text-[21px] text-caak-scriptink"
                      }
                    />
                  </div>
                  <span
                    className={
                      "ml-[6px] text-caak-nocturnal font-medium text-[15px] tracking-[0.23px] leading-[18px]"
                    }
                  >
                    {item.totals?.comments}
                  </span>
                </div>
              </div>
              {isTablet && (
                <div
                  onClick={() => setIsShareButtonVisible(!isShareButtonVisible)}
                  className={
                    "flex justify-center items-center w-[24px] h-[24px]"
                  }
                >
                  <span
                    className={`${
                      isShareButtonVisible
                        ? "icon-fi-rs-share-f text-white"
                        : "icon-fi-rs-share-o"
                    }  text-[24px] h-[24px w-[24px]`}
                  />
                </div>
              )}

              <div
                className={`${isShareButtonVisible ? "flex" : "hidden"} ${
                  isTablet ? "right-[58px]" : "right-[24px]"
                } absolute flex flex-row items-center`}
              >
                {!isTablet && (
                  <span
                    className={`text-14px ${
                      mobile ? "text-white" : "text-caak-darkBlue"
                    } tracking-[0.21px] leading-[16px]`}
                  >
                    Хуваалцах
                  </span>
                )}

                <div
                  className={
                    "flex flex-row items-center justify-center ml-[7px]"
                  }
                >
                  <FacebookShareButton
                    url={`${pathName}/post/view/${post.id}/${item.id}`}
                  >
                    <div
                      className={
                        "flex items-center bg-white justify-center w-[22px] h-[22px] rounded-full cursor-pointer"
                      }
                    >
                      <span
                        className={
                          "icon-fi-rs-facebook text-facebook text-[22px]"
                        }
                      />
                    </div>
                  </FacebookShareButton>
                  <TwitterShareButton
                    title={post.title}
                    url={`${pathName}/post/view/${post.id}/${item.id}`}
                  >
                    <div
                      className={
                        "flex items-center ml-[7px] bg-caak-twitter rounded-full justify-center w-[22px] h-[22px] cursor-pointer"
                      }
                    >
                      <span
                        className={"icon-fi-rs-twitter text-white text-[13px]"}
                      />
                    </div>
                  </TwitterShareButton>
                  <div
                    onClick={() => {
                      if (typeof navigator !== "undefined")
                        navigator.clipboard.writeText(
                          `${pathName}/post/view/${post.id}/${item.id}`
                        );
                      notifyCopy();
                    }}
                    className={
                      "flex items-center ml-[7px] justify-center w-[22px] h-[22px] rounded-full bg-caak-red cursor-pointer"
                    }
                  >
                    <span
                      className={"icon-fi-rs-link text-white text-[13px]"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default PostHeader;
