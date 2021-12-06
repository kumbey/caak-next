import { useEffect, useRef, useState } from "react";
import {
  generateTimeAgo,
  getFileUrl,
  getReturnData,
  useClickOutSide,
} from "../../../../../src/utility/Util";
import { useRouter } from "next/router";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostMoreMenu from "../../../../../src/components/card/PostMoreMenu";
import DropDown from "../../../../../src/components/navigation/DropDown";
import useScrollBlock from "../../../../../src/hooks/useScrollBlock";
import { getPostView } from "../../../../../src/graphql-custom/post/queries";
import { withSSRContext } from "aws-amplify";
import Dummy from "dummyjs";
import Link from "next/link";
import ImageCarousel from "../../../../../src/components/carousel/ImageCarousel";
import Button from "../../../../../src/components/button";
import AddComment from "../../../../../src/components/input/AddComment";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });

  let user = null;

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }

  const postId = query.id;
  const getPostById = async () => {
    const resp = await API.graphql({
      query: getPostView,
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      variables: { id: postId },
    });
    return {
      props: {
        ssrData: {
          post: getReturnData(resp),
        },
      },
    };
  };
  try {
    return getPostById();
  } catch (ex) {
    console.log(ex);
  }
}

const PostItem = ({ ssrData }) => {
  const [post, setPost] = useState(ssrData.post);
  const [activeIndex, setActiveIndex] = useState(0);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [reply, setReply] = useState({});
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const itemId = router.query.itemId;
  const addCommentRef = useRef();

  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    blockScroll();
    return () => {
      allowScroll();
    };
  }, [allowScroll, blockScroll]);

  // const createPostView = async () => {
  //   try {
  //     if (isLogged) {
  //       await API.graphql(
  //         graphqlOperation(createPostViews, {
  //           input: { post_id: post.id, user_id: user.sysUser.id },
  //         })
  //       );
  //     }
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };
  // useEffect(() => {
  //   if (isLogged) {
  //     try {
  //       post && createPostView();
  //     } catch (ex) {
  //       console.log(ex);
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [post]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const back = () => {
    if (router.query && router.query.isModal) {
      router.replace(`/post/view/${post.id}`, undefined, { shallow: true });
    } else {
      router.replace(`/post/view/${post.id}`);
    }
  };
useEffect(()=> {
  console.log(post)
},[post])

  useEffect(()=> {
    console.log(render)
  },[render])

  return !loading ? (
    <div
      className={
        "viewPost z-4 fixed top-0 w-full h-full flex flex-col justify-between sm:flex-col md:flex-col lg:flex-row"
      }
    >
      <div
        className={
          "relative backBlur w-full flex justify-center items-center flex-1"
        }
      >
        <span
          onClick={back}
          className={
            "absolute cursor-pointer icon-fi-rs-close text-16px text-white top-4 right-4 z-2"
          }
        />
        <ImageCarousel
          changeActiveIndex={setActiveIndex}
          mediaContainerClassname={"w-full h-full"}
          postId={post.id}
          items={post.items.items}
        />
      </div>
      {/*</div>*/}
      <div
        style={{ flexBasis: "448px" }}
        className={
          "relative flex flex-col w-full justify-between bg-white h-full pt-[12px] overflow-y-scroll h-full"
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
                open={isMenuOpen}
                onToggle={toggleMenu}
                content={
                  <PostMoreMenu
                    groupId={post.group.id}
                    postId={itemId}
                    postUser={post.user}
                  />
                }
                className={"top-6 -right-2"}
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
                      className="w-[48px] h-[48px] m-34px rounded-[6px]"
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
                      className={"text-caak-generalblack font-bold text-[16px]"}
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
                          <span className={"text-caak-generalblack text-15px"}>
                            {post.user.nickname}
                          </span>
                        </a>
                      </Link>
                      {post.user.verified && (
                        <div
                          className={
                            "flex items-center justify-center w-[17px] h-[17px] ml-[3px]"
                          }
                        >
                          <span className={"icon-fi-rs-verified"} />
                        </div>
                      )}
                      <p
                        className={
                          "text-caak-darkBlue text-[13px] tracking-[0.2px] leading-[16px]"
                        }
                      >
                        &nbsp; &middot; &nbsp;
                        {generateTimeAgo(post.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    icon={
                      <div
                        className={
                          "flex items-center justify-start w-[20px] h-[20px]"
                        }
                      >
                        <span className={"icon-fi-rs-add-l text-[18px]"} />
                      </div>
                    }
                    iconPosition={"left"}
                    className={
                      "h-[28px] tracking-[0.18px] justify-between leading-[15px] flex rounded-[6px] text-caak-primary text-[12px] font-semibold uppercase border-[1px] border-caak-primary pr-[12px] pl-[7px] py-[7px]"
                    }
                  >
                    Нэгдэх
                  </Button>
                </div>
              </div>
              <PostHeader
                addCommentRef={addCommentRef}
                activeIndex={activeIndex}
                post={post}
              />
            </div>
            <div className={"flex-1 w-full bg-caak-liquidnitrogen px-[24px]"}>
              <PostBody
                commentInputValue={commentInputValue}
                setCommentInputValue={setCommentInputValue}
                reply={reply}
                setReply={setReply}
                addCommentRef={addCommentRef}
                activeIndex={activeIndex}
                post={post}
              />
            </div>
          </div>
        </div>

        {post.status === "CONFIRMED" && (
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
  ) : null;
};

export default PostItem;
