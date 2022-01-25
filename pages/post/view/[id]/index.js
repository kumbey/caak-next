import { useEffect, useRef, useState } from "react";
import useModalLayout from "../../../../src/hooks/useModalLayout";
import { withSSRContext } from "aws-amplify";
import { generateTimeAgo, getFileUrl } from "../../../../src/utility/Util";
import ViewPostBlogItem from "../../../../src/components/card/ViewPostBlogItem";
import CommentSection from "../../../../src/components/viewpost/CommentSection";
import Video from "../../../../src/components/video";
import { useRouter } from "next/router";
import ViewPostLeftReaction from "../../../../src/components/viewpost/ViewPostLeftReaction";
import Tooltip from "../../../../src/components/tooltip/Tooltip";
import ProfileHoverCard from "../../../../src/components/card/ProfileHoverCard";
import Link from "next/link";
import Head from "next/head";
import Consts from "../../../../src/utility/Consts";
import { ssrDataViewPost } from "../../../../src/apis/ssrDatas";
import Button from "../../../../src/components/button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../../../src/graphql-custom/post/mutation";
import ReportModal from "../../../../src/components/modals/reportModal";
import { useUser } from "../../../../src/context/userContext";
import { decode } from "html-entities";
import toast from "react-hot-toast";
import groupVerifiedSvg from "../../../../public/assets/images/fi-rs-verify.svg";
import ConditionalLink from "../../../../src/components/conditionalLink";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  return await ssrDataViewPost({ API, Auth, query });
}

const Post = ({ ssrData }) => {
  const ViewPostModal = useModalLayout({ layoutName: "viewpost" });
  const router = useRouter();
  const { user, isLogged } = useUser();
  const [post, setPost] = useState(ssrData.post);
  const [loading, setLoading] = useState(false);
  const commentRef = useRef();
  const { jumpToComment } = router.query;
  const [isReactionActive, setIsReactionActive] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleToast = ({ param }) => {
    if (param === "copy") toast.success("Холбоос амжилттай хуулагдлаа.");
    if (param === "follow") toast.success("Группт амжилттай элслээ.");
    if (param === "unfollow") toast.success("Группээс амжилттай гарлаа.");
    if (param === "saved") toast.success("Пост амжилттай хадгалагдлаа.");
    if (param === "unSaved") toast.success("Пост амжилттай хасагдлаа.");
  };

  useEffect(() => {
    setPost(ssrData.post);
  }, [ssrData.post]);

  useEffect(() => {
    if (jumpToComment) {
      if (commentRef.current) {
        commentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [jumpToComment]);

  const back = () => {
    if (router.query && router.query.prevPath) {
      router.replace(router.query.prevPath, undefined, { shallow: true });
    } else {
      router.replace(`/`);
    }
  };

  const postHandler = async ({ id, status }) => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );
      setPost({ ...post, status: status });
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 27) {
        if (!router.query.viewItemPost) back();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
    //eslint-disable-next-line
  }, [router.query]);

  return post ? (
    <>
      <ViewPostModal
        post={post}
        containerClassname={
          "w-full flex flex-row max-w-[1200px] mx-auto py-[20px] py-[78px] min-h-[100vh] rounded-b-square z-[0]"
        }
      >
        <div
          onClick={() => setIsReactionActive(!isReactionActive)}
          className={
            "flex md:hidden items-center justify-center w-[52px] h-[52px] bg-caak-primary rounded-full fixed p-[4px] z-[6] bottom-[74px] right-[14px]"
          }
        >
          <span className={"icon-fi-rs-rock-f text-white text-[30px]"} />
        </div>
        {isReactionActive && (
          <div
            className={
              "flex items-center bg-black rounded-[100px] p-[4px] bg-opacity-30 justify-center fixed z-[6] bottom-[130px] right-[14px]"
            }
          >
            <ViewPostLeftReaction
              mobile
              commentRef={commentRef}
              post={post}
              handleToast={handleToast}
            />
          </div>
        )}
        <Head>
          {/* for Twitter */}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={decode(post.description)} />
          <meta
            name="twitter:url"
            content={`https://www.beta.caak.mn/post/view/post/view/${post.id}`}
          />
          <meta
            property="twitter:image"
            content={getFileUrl(post.items.items[0].file)}
          />

          {/* for Facebook  */}
          <meta name="description" content={decode(post.description)} />
          <meta property="og:title" content={post.title} />
          <meta property="og:type" content="website" />
          <meta
            name="og:url"
            content={`https://www.beta.caak.mn/post/view/post/view/${post.id}`}
          />
          <meta
            property="og:image"
            content={getFileUrl(post.items.items[0].file)}
          />
          <title>
            {post.title} - {Consts.siteMainTitle}
          </title>
        </Head>
        {isLogged && (
          <ReportModal
            setIsOpen={setIsReportModalOpen}
            isOpen={isReportModalOpen}
            postId={post.id}
            userId={user.id}
          />
        )}
        {post.status === "CONFIRMED" && (
          <div
            className={
              "viewPostLeftSideBar hidden md:flex mx-[4px] md:mr-[25px] z-[3]"
            }
          >
            <ViewPostLeftReaction
              commentRef={commentRef}
              post={post}
              setIsReportModalOpen={setIsReportModalOpen}
              handleToast={handleToast}
            />
          </div>
        )}
        <div className={"flex flex-col w-full h-full bg-transparent"}>
          <div className={"bg-white h-full w-full rounded-square"}>
            <div
              className={`absolute flex flex-row justify-between w-full top-[-54px] ${
                post.status === "CONFIRMED"
                  ? "md:pl-[74px] px-[10px] md:px-0"
                  : ""
              } right-0`}
            >
              <div className={"flex flex-row "}>
                <Link href={`/group/${post.group.id}`}>
                  <a>
                    <div className={"relative w-[40px] h-[40px] rounded-[6px]"}>
                      <img
                        className={"rounded-[6px] object-cover w-full h-full"}
                        src={getFileUrl(post.group.profile)}
                        // layout={"fill"}
                        // objectFit={"cover"}
                        alt={""}
                      />
                    </div>
                  </a>
                </Link>

                <div className={"flex flex-col ml-[10px] justify-between"}>
                  <div className={"flex items-center"}>
                    <Link href={`/group/${post.group.id}`}>
                      <a>
                        <p
                          className={
                            "text-[16px] text-white font-semibold tracking-[0.24px] leading-[19px]"
                          }
                        >
                          {post.group.name}{" "}
                        </p>
                      </a>
                    </Link>
                    {post.group.verified && (
                      <img
                        className={"w-[16.5px] h-[14.25px]"}
                        alt={""}
                        height={14.25}
                        width={16.5}
                        src={groupVerifiedSvg.src}
                      />
                    )}
                  </div>

                  <div
                    className={
                      "flex relative flex-row text-[13px] text-white tracking-[0.2px] leading-[16px] font-normal"
                    }
                  >
                    <Tooltip
                      className={"-left-6"}
                      content={<ProfileHoverCard userId={post.user.id} />}
                    >
                      <Link href={`/user/${post.user.id}/profile`}>
                        <a>
                          <p className={"cursor-pointer opacity-90"}>
                            @{post.user.nickname}
                          </p>
                        </a>
                      </Link>
                    </Tooltip>
                    &nbsp; &middot; &nbsp;
                    <p>{generateTimeAgo(post.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div
                onClick={back}
                className={
                  "flex items-center bg-[#FFFFFF33] hover:bg-[#FFFFFF4D] cursor-pointer justify-center w-[40px] h-[40px] rounded-full"
                }
              >
                <span className={"icon-fi-rs-close text-white text-[13px]"} />
              </div>
            </div>
            <div className={"px-[22px] py-[20px] md:px-[32px] md:py-[30px]"}>
              <p
                className={
                  "text-[18px] md:text-[22px] break-words text-caak-generalblack font-medium font-roboto tracking-[0.55px] leading-[25px]"
                }
              >
                {post.title}
              </p>
              <p className={"text-caak-scriptink"}>
                {post.status === "PENDING" ? " (Шалгагдаж буй пост)" : ""}
                {post.status === "ARCHIVED" ? " (Архивлагдсан пост)" : ""}
              </p>
              {post.status === "ARCHIVED" &&
                post.status_history.items?.length > 0 && (
                  <p className={"text-caak-scriptink"}>
                    Шалтгаан: {post.status_history.items[0].description}
                  </p>
                )}
              {post.description && (
                <div>
                  {post.onlyBlogView === "TRUE" ? (
                    <div
                      className={
                        "text-[16px] mt-[13px] text-caak-generalblack tracking-[0.38px] leading-[22px] break-words"
                      }
                      dangerouslySetInnerHTML={{
                        __html: decode(post.description),
                      }}
                    />
                  ) : (
                    <p
                      className={
                        "text-[16px] mt-[13px] text-caak-generalblack tracking-[0.38px] leading-[22px] break-words"
                      }
                    >
                      {decode(post.description)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {post.items.items.length > 1 && (
              <div className={"relative h-[444px] w-full pt-[4px] mb-[13px]"}>
                {post.items.items[0].file.type.startsWith("video") ? (
                  <Video
                    route={!(post.onlyBlogView === "TRUE")}
                    postId={post.id}
                    postItemId={post.items.items[0].id}
                    videoClassname={"object-contain rounded-[4px]"}
                    src={getFileUrl(post.items.items[0].file)}
                  />
                ) : (
                  <div className={"w-full h-full relative bg-black"}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        filter: "blur(4px)",
                        position: "absolute",
                        opacity: "0.3",
                      }}
                    >
                      <img
                        className={"object-cover h-full w-full z-[1]"}
                        alt={post.items.items[0].file.type}
                        src={getFileUrl(post.items.items[0].file)}
                      />
                    </div>
                    <ConditionalLink
                      condition={!(post.onlyBlogView === "TRUE")}
                      wrapper={(children) => (
                        <Link
                          shallow
                          as={`/post/view/${post.id}/${post.items.items[0].id}`}
                          href={{
                            query: {
                              ...router.query,
                              id: post.id,
                              viewItemPost: "postItem",
                              itemId: post.items.items[0].id,
                              prevPath: router.asPath,
                              isModal: true,
                              itemIndex: 0,
                            },
                          }}
                        >
                          <a>{children}</a>
                        </Link>
                      )}
                    >
                      <img
                        src={getFileUrl(post.items.items[0].file)}
                        alt={"post picture"}
                        className={
                          "object-contain w-full h-full z-[2] relative"
                        }
                      />
                    </ConditionalLink>
                  </div>
                )}
              </div>
            )}
            {post.items.items.length > 1 && (
              <div>
                {post.items.items[0].description && (
                  <p
                    className={
                      "font-bold text-caak-generalblack text-[16px] px-[22px] md:px-[52px] mb-[40px] tracking-[0.38px] leading-[22px] whitespace-pre-wrap"
                    }
                  >
                    {decode(post.items.items[0].description)}
                  </p>
                )}
                {post.onlyBlogView === "TRUE" ? (
                  <div
                    className={
                      "text-caak-generalblack text-[16px] px-[22px] md:px-[52px] mb-[40px] tracking-[0.38px] leading-[22px] whitespace-pre-wrap"
                    }
                    dangerouslySetInnerHTML={{
                      __html: decode(post.items.items[0].title),
                    }}
                  />
                ) : (
                  <p
                    className={
                      "text-caak-generalblack text-[16px] px-[22px] md:px-[52px] mb-[40px] tracking-[0.38px] leading-[22px] whitespace-pre-wrap"
                    }
                  >
                    {decode(post.items.items[0].title)}
                  </p>
                )}
              </div>
            )}

            <div
              className={`px-[22px] md:px-[52px] md:pb-[52px] bg-white ${
                post.status === "CONFIRMED" ? "" : "rounded-square"
              } border-b border-caak-titaniumwhite`}
            >
              {/*<p*/}
              {/*    className={*/}
              {/*      "text-[16px] mb-[13px] text-caak-generalblack tracking-[0.38px] leading-[22px] break-words"*/}
              {/*    }*/}
              {/*>*/}
              {/*  {post.description}*/}
              {/*</p>*/}
              {post.items.items.map((item, index) => {
                if (post.items.items.length === 1) {
                  return (
                    <ViewPostBlogItem
                      onlyBlogView={post.onlyBlogView === "TRUE"}
                      // singleItem
                      key={index}
                      index={index}
                      postId={post.id}
                      postItem={item}
                    />
                  );
                } else {
                  if (index > 0)
                    return (
                      <ViewPostBlogItem
                        onlyBlogView={post.onlyBlogView === "TRUE"}
                        key={index}
                        index={index}
                        postId={post.id}
                        postItem={item}
                      />
                    );
                }
              })}
              <div
                className={
                  "text-caak-generalblack text-[16px] tracking-[0.38px] leading-[22px] whitespace-pre-wrap"
                }
              >
                <div dangerouslySetInnerHTML={{ __html: post.f_text }} />
              </div>
            </div>
            {post.commentType && post.status === "CONFIRMED" && (
              <div id={"viewPostCommentSection"} ref={commentRef}>
                <CommentSection
                  jumpToCommentId={jumpToComment}
                  commentRef={commentRef}
                  post={post}
                />
              </div>
            )}
          </div>
          {(post.group.role_on_group === "ADMIN" ||
            post.group.role_on_group === "MODERATOR") &&
            post.status === "PENDING" &&
            router.query.dashType === "group" && (
              <div
                className={"flex flex-row justify-end mt-[10px] bg-transparent"}
              >
                <Button
                  loading={loading}
                  onClick={() =>
                    postHandler({
                      id: post.id,
                      status: "ARCHIVED",
                    })
                  }
                  className={"mr-[4px] h-[40px] font-medium bg-white"}
                >
                  Татгалзах
                </Button>
                <Button
                  loading={loading}
                  className={"h-[40px] font-medium bg-[#367CE6] text-white"}
                  onClick={() =>
                    postHandler({
                      id: post.id,
                      status: "CONFIRMED",
                    })
                  }
                >
                  Зөвшөөрөх
                </Button>
              </div>
            )}
          {post.status === "ARCHIVED" && (
            <div
              className={"flex flex-row justify-end mt-[10px] bg-transparent"}
            >
              <Button
                loading={loading}
                className={"h-[40px] font-medium bg-[#367CE6] text-white"}
                onClick={() => router.push(`/post/edit/${post.id}`)}
              >
                Засах
              </Button>
            </div>
          )}
        </div>
      </ViewPostModal>
    </>
  ) : null;
};

export default Post;
