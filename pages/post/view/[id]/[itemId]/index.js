import { useEffect, useRef, useState } from "react";
import { findMatchIndex, getFileUrl } from "../../../../../src/utility/Util";
import { useRouter } from "next/router";
import PostHeader from "../../../../../src/components/viewpost/PostHeader";
import { withSSRContext } from "aws-amplify";
import ImageCarousel from "../../../../../src/components/carousel/ImageCarousel";
import AddComment from "../../../../../src/components/input/AddComment";
import Head from "next/head";
import Consts from "../../../../../src/utility/Consts";
import useScrollBlock from "../../../../../src/hooks/useScrollBlock";
import useWindowSize from "../../../../../src/hooks/useWindowSize";
import useModalLayout from "../../../../../src/hooks/useModalLayout";
import { ssrDataViewPostItem } from "../../../../../src/apis/ssrDatas";
import CommentCardNew from "../../../../../src/components/card/CommentCardNew";
import {decode} from "html-entities";

export async function getServerSideProps({ req, query }) {
  const host = req.headers.host
  const { API, Auth } = withSSRContext({ req });
  return await ssrDataViewPostItem({ API, Auth, query, host });
}

const PostItem = ({ ssrData }) => {
  const [post, setPost] = useState(ssrData.post);
  const router = useRouter();
  const scrollableRef = useRef();
  const [activeIndex, setActiveIndex] = useState(
    findMatchIndex(post.items.items, "id", router.query.itemId)
  );

  const size = useWindowSize();
  const [commentInputValue, setCommentInputValue] = useState("");
  const [reply, setReply] = useState({});
  const [loading, setLoading] = useState(true);
  const [blockScroll, allowScroll] = useScrollBlock();
  const [isPostHeaderVisible, setIsPostHeaderVisible] = useState(true);
  const [clickComment, setClickComment] = useState(0);

  const addCommentRef = useRef();
  const [item, setItem] = useState(post.items.items[activeIndex]);
  const ViewPostItemModal = useModalLayout({ layoutName: "viewPostItem" });

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
  useEffect(() => {
    if (scrollableRef.current) {
     const elementBottom = scrollableRef.current.getBoundingClientRect().bottom
      scrollableRef.current.scrollTo({
        left: 0,
        top: elementBottom,
        behavior: "smooth"
      });
    }
  }, [clickComment, setClickComment]);
  return (
    <>
      <Head>
        <title>
          {item.title} - {Consts.siteMainTitle}
        </title>
        <meta name="description" content={post.description} />

        <meta
          property="og:url"
          content={`https://www.${ssrData.host}/post/view/${ssrData.post.id}/${router.query.itemId}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={getFileUrl(item.file)} />


        {/* for Twitter */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ssrData.post.title} />
        <meta
          name="twitter:description"
          content={decode(ssrData.post.description)}
        />
        <meta
          name="twitter:url"
          content={`https://www.${ssrData.host}/post/view/${ssrData.post.id}`}
        />
        <meta
          property="twitter:image"
          content={
            ssrData.post.items.items[0].thumbnail
              ? getFileUrl(ssrData.post.items.items[0].thumbnail)
              : getFileUrl(ssrData.post.items.items[0].file)
          }
        />

      </Head>
      {!loading ? (
        <ViewPostItemModal>
          <div
            ref={scrollableRef}
            className={`z-[5] h-full fixed top-0 w-full  flex flex-col justify-between sm:flex-col md:flex-col lg:flex-row overflow-y-auto`}
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
              <div onClick={() => setIsPostHeaderVisible(!isPostHeaderVisible)}>
                <ImageCarousel
                  viewPostItem
                  index={activeIndex}
                  changeActiveIndex={setActiveIndex}
                  mediaContainerClassname={"w-full h-full"}
                  postId={post.id}
                  items={post.items.items}
                />
              </div>
              <div
                className={`${
                  isPostHeaderVisible ? "block" : "hidden"
                } lg:hidden absolute bottom-0 bg-black bg-opacity-80 w-full`}
              >
                <PostHeader
                  mobile
                  addCommentRef={addCommentRef}
                  activeIndex={activeIndex}
                  post={post}
                  setClickComment={setClickComment}
                  clickComment={clickComment}
                />
              </div>
            </div>

            {/*</div>*/}
            <div
              className={
                "viewPostCarousel flex-shrink-0 relative flex flex-col w-full justify-between bg-white h-full lg:pt-[12px] overflow-y-auto"
              }
            >
              <div className={"hidden lg:block"}>
                <PostHeader
                  addCommentRef={addCommentRef}
                  activeIndex={activeIndex}
                  post={post}
                />
              </div>
              {post.commentType && post.status === "CONFIRMED" && (
                <div
                  className={"w-full bg-caak-liquidnitrogen px-[24px]"}
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
                      initialComments={post.items.items[activeIndex].comments}
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
