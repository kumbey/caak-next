import { useEffect, useRef, useState } from "react";
import {
  findMatchIndex,
  generateTimeAgo,
  getFileUrl,
  getReturnData,
  useClickOutSide,
} from "../../../../../src/utility/Util";
import { useRouter } from "next/router";
import PostHeader from "../../../../../src/components/viewpost/PostHeader";
import PostMoreMenu from "../../../../../src/components/card/PostMoreMenu";
import DropDown from "../../../../../src/components/navigation/DropDown";
import { getPostView } from "../../../../../src/graphql-custom/post/queries";
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import Dummy from "dummyjs";
import Link from "next/link";
import ImageCarousel from "../../../../../src/components/carousel/ImageCarousel";
import Button from "../../../../../src/components/button";
import AddComment from "../../../../../src/components/input/AddComment";
import CommentCardNew from "../../../../../src/components/card/CommentCardNew";
import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../../../../src/graphql-custom/GroupUsers/mutation";
import { useUser } from "../../../../../src/context/userContext";
import ProfileHoverCard from "../../../../../src/components/card/ProfileHoverCard";
import Tooltip from "../../../../../src/components/tooltip/Tooltip";
import Head from "next/head";
import Consts from "../../../../../src/utility/Consts";
import useScrollBlock from "../../../../../src/hooks/useScrollBlock";
import useWindowSize from "../../../../../src/hooks/useWindowSize";
import useModalLayout from "../../../../../src/hooks/useModalLayout";
import userVerifiedSvg from "../../../../../public/assets/images/fi-rs-awarded.svg";
import toast from "react-hot-toast";
import {ssrDataViewPostItem} from "../../../../../src/apis/ssrDatas";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  return await ssrDataViewPostItem({ API, Auth, query });
}

const PostItem = ({ ssrData }) => {
  const [post, setPost] = useState(ssrData.post);
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(
    findMatchIndex(post.items.items, "id", router.query.itemId)
  );

  const size = useWindowSize();
  const [commentInputValue, setCommentInputValue] = useState("");
  const [reply, setReply] = useState({});
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(0);
  const { user, isLogged } = useUser();
  const [blockScroll, allowScroll] = useScrollBlock();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const addCommentRef = useRef();
  const [item, setItem] = useState(post.items.items[activeIndex]);
  const ViewPostItemModal = useModalLayout({ layoutName: "viewPostItem" });

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

  const handleToast = ({ param }) => {
    if (param === "follow") toast.success("Группт амжилттай элслээ.");
    if (param === "unfollow") toast.success("Группээс амжилттай гарлаа.");
    if (param === "copy") toast.success("Холбоос амжилттай хуулагдлаа.");
    if (param === "saved") toast.success("Пост амжилттай хадгалагдлаа.");
    if (param === "unSaved") toast.success("Пост амжилттай хасагдлаа.");
  };

  useEffect(() => {
    blockScroll();
    setLoading(false);
    return () => {
      setReply(null);
      allowScroll();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const curPost = post.items.items[activeIndex];

    setItem(curPost);

    if (curPost.id !== router.query.itemId) {
      router.replace(
        {
          query: {
            ...router.query,
            id: post.id,
            itemId: post.items.items[activeIndex].id,
          },
        },
        `/post/view/${post.id}/${post.items.items[activeIndex].id}`,
        {
          shallow: true,
          scroll: false,
        }
      );
    }

    // eslint-disable-next-line
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(findMatchIndex(post.items.items, "id", router.query.itemId));
    // eslint-disable-next-line
  }, [router.query]);

  const back = () => {
    if (router.query && router.query.prevPath) {
      // router.replace({
      //   query: _objectWithoutKeys(router.query, ["viewItemPost","itemId"])
      // }, router.prevPath , {
      //   shallow: true,
      //   scroll: false,
      // });
      router.back();
    } else {
      router.replace(`/post/view/${post.id}`);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 27) {
        if (router.query.viewItemPost) back();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
    //eslint-disable-next-line
  }, [router.query]);

  return (
    <>
      <Head>
        <title>
          {item.title} - {Consts.siteMainTitle}
        </title>
        <meta name="description" content={post.description} />

        <meta
          property="og:url"
          content={`/post/view/${post.id}/${router.query.itemId}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={getFileUrl(item.file)} />
      </Head>
      {!loading ? (
        <ViewPostItemModal post={post}>
          <div
            className={`z-[5] h-full fixed top-0 w-full  flex flex-col justify-between sm:flex-col md:flex-col lg:flex-row overflow-y-scroll`}
          >
            <div
              style={{ height: size.height }}
              className={
                "relative backBlur w-full flex justify-center items-center"
              }
            >
              <div
                onClick={back}
                className={
                  "absolute rounded-full flex items-center justify-center top-[20px] left-[20px] z-2 cursor-pointer w-[40px] h-[40px] bg-caak-carbon hover:bg-caak-carbon"
                }
              >
                <span className={"icon-fi-rs-close text-16px text-white"} />
              </div>

              <ImageCarousel
                viewPostItem
                index={activeIndex}
                changeActiveIndex={setActiveIndex}
                mediaContainerClassname={"w-full h-full"}
                postId={post.id}
                items={post.items.items}
              />
            </div>
            {/*</div>*/}
            <div
              className={
                "viewPostCarousel flex-shrink-0 relative flex flex-col w-full justify-between bg-white h-full pt-[12px] overflow-y-scroll"
              }
            >
              <div className={"flex-1"}>
                <div
                  onClick={toggleMenu}
                  ref={menuRef}
                  className={"flex justify-end items-center z-10 mr-[16px]"}
                >
                  <div
                    className={
                      "flex items-center justify-center p-[15px] rounded-full cursor-pointer hover:bg-gray-100 w-[35px] h-[35px]"
                    }
                  >
                    <span className="icon-fi-rs-dots text-[28px] text-caak-generalblack" />
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
                        />
                      }
                      className={"top-10 right-1"}
                    />
                  </div>
                </div>
                <div className={"h-full"}>
                  <div className={"px-[24px]"}>
                    <div
                      className={
                        "relative flex flex-row justify-between items-center"
                      }
                    >
                      <div className={"flex flex-row"}>
                        <div className={"relative"}>
                          <img
                            className="w-[48px] h-[48px] m-34px rounded-[6px] object-cover"
                            src={
                              post.group.profile
                                ? getFileUrl(post.group.profile)
                                : Dummy.image("100x100")
                            }
                            alt={post.group?.profile?.name}
                          />
                        </div>
                        <div
                          className={
                            "flex flex-col justify-center ml-[10px] self-center"
                          }
                        >
                          <span
                            className={
                              "text-caak-generalblack font-bold text-[16px]"
                            }
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
                                  content={
                                    <ProfileHoverCard userId={post.user.id} />
                                  }
                                >
                                  <span
                                    className={
                                      "text-caak-generalblack text-[13px]"
                                    }
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
                              className={
                                "text-caak-darkBlue text-[13px] tracking-[0.2px] leading-[16px]"
                              }
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
                    <PostHeader
                      addCommentRef={addCommentRef}
                      activeIndex={activeIndex}
                      post={post}
                    />
                  </div>
                  {post.commentType && post.status === "CONFIRMED" && (
                    <div
                      className={
                        "flex-1 w-full bg-caak-liquidnitrogen px-[24px]"
                      }
                    >
                      <div
                        className={
                          "relative flex flex-col justify-between bg-caak-whitesmoke"
                        }
                      >
                        <CommentCardNew
                          addCommentRef={addCommentRef}
                          commentInputValue={commentInputValue}
                          setCommentInputValue={setCommentInputValue}
                          initialComments={
                            post.items.items[activeIndex].comments
                          }
                          reply={reply}
                          setReply={setReply}
                          setup={{
                            id: item.id,
                            type: "POST_ITEM",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {post.commentType && post.status === "CONFIRMED" && (
                <AddComment
                  commentInputValue={commentInputValue}
                  setCommentInputValue={setCommentInputValue}
                  reply={reply}
                  setReply={setReply}
                  addCommentRef={addCommentRef}
                  post={post}
                  activeIndex={activeIndex}
                  setPost={setPost}
                />
              )}
            </div>
          </div>
        </ViewPostItemModal>
      ) : null}
    </>
  );
};

export default PostItem;
