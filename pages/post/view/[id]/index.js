import React, { useEffect, useRef, useState } from "react";
import useModalLayout from "../../../../src/hooks/useModalLayout";
import { withSSRContext } from "aws-amplify";
import {
  generateTimeAgo,
  getFileUrl,
  getReturnData,
} from "../../../../src/utility/Util";
import { getPostView } from "../../../../src/graphql-custom/post/queries";
import Image from "next/image";
import ViewPostBlogItem from "../../../../src/components/card/ViewPostBlogItem";
import CommentSection from "../../../../src/components/viewpost/CommentSection";
import Video from "../../../../src/components/video";
import ViewPostLeftReaction from "../../../../src/components/viewpost/ViewPostLeftReaction";
import Link from "next/link";
import ProfileHoverCard from "../../../../src/components/card/ProfileHoverCard";
import Tooltip from "../../../../src/components/tooltip/Tooltip";
import { useRouter } from "next/router";

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

const Post = ({ ssrData }) => {
  const [post, setPost] = useState(ssrData.post);
  const commentRef = useRef();
  const router = useRouter();
  const { jumpToComment } = router.query;

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

  const ViewPostModal = useModalLayout({ layoutName: "viewpost" });
  return post ? (
    <ViewPostModal
      post={post}
      containerClassname={
        "w-full flex flex-row max-w-[1200px] mx-auto my-[78px] rounded-b-square z-[0]"
      }
    >
      {/*<Head>*/}
      {/*  <meta name="description" content={post.description} />*/}
      {/*  <meta property="og:title" content={post.title} />*/}
      {/*  <meta property="og:type" content="article" />*/}
      {/*  <meta*/}
      {/*    property="og:image"*/}
      {/*    content={getFileUrl(post.items.items[0].file)}*/}
      {/*  />*/}
      {/*  <title>{post.title}</title>*/}
      {/*</Head>*/}
      <div className={"viewPostLeftSideBar z-1"}>
        <ViewPostLeftReaction commentRef={commentRef} post={post} />
      </div>
      <div className={"bg-white h-full w-full rounded-square"}>
        <div
          className={
            "absolute flex flex-row justify-between w-full top-[-54px] right-0 pl-[69px]"
          }
        >
          <div className={"flex flex-row "}>
            <div className={"relative w-[40px] h-[40px] rounded-[6px]"}>
              <Image
                className={"rounded-[6px]"}
                src={getFileUrl(post.group.profile)}
                layout={"fill"}
                objectFit={"cover"}
                alt={""}
              />
            </div>
            <div className={"flex flex-col ml-[10px] justify-between"}>
              <Link href={`/group/${post.group.id}`}>
                <a>
                  <p
                    className={
                      "text-[16px] text-white font-semibold tracking-[0.24px] leading-[19px]"
                    }
                  >
                    {post.group.name}{" "}
                    {post.user.verified && (
                      <span className={"icon-fi-rs-verified text-[15px]"} />
                    )}
                  </p>
                </a>
              </Link>

              <div
                className={
                  "flex relative flex-row text-[13px] text-white tracking-[0.2px] leading-[16px] font-normal"
                }
              >
                <Tooltip
                  className={"-left-6"}
                  content={<ProfileHoverCard userId={post.user.id} />}
                >
                  <p className={"cursor-pointer opacity-90"}>
                    @{post.user.nickname}
                  </p>
                </Tooltip>
                &nbsp; &middot; &nbsp;
                <p>{generateTimeAgo(post.createdAt)}</p>
              </div>
            </div>
          </div>

          <div
            className={
              "flex items-center bg-caak-bluerhapsody cursor-pointer justify-center w-[40px] h-[40px] rounded-full"
            }
          >
            <span className={"icon-fi-rs-close text-white text-[13px]"} />
          </div>
        </div>
        <div className={"px-[32px] py-[30px]"}>
          <p
            className={
              "text-[22px] text-caak-generalblack font-medium font-roboto tracking-[0.55px] leading-[25px]"
            }
          >
            {post.title}
          </p>
        </div>

        {post.items.items.length > 1 && (
          <div className={"relative h-[444px] w-full pt-[4px]"}>
            {post.items.items[0].file.type.startsWith("video") ? (
              <Video
                videoClassname={"object-contain rounded-[4px]"}
                src={getFileUrl(post.items.items[0].file)}
              />
            ) : (
              <Image
                objectFit={"cover"}
                layout={"fill"}
                src={getFileUrl(post.items.items[0].file)}
                alt={"post picture"}
              />
            )}
          </div>
        )}

        <div
          className={
            "px-[52px] pt-[26px] pb-[52px] bg-white border-b border-caak-titaniumwhite"
          }
        >
          <p
            className={
              "text-[16px] text-caak-generalblack tracking-[0.38px] leading-[22px]"
            }
          >
            {post.description}
          </p>
          {post.items.items.map((item, index) => {
            return (
              <ViewPostBlogItem
                singleItem={post.items.items.length <= 1}
                key={index}
                index={index}
                postId={post.id}
                postItem={item}
              />
            );
          })}
        </div>
        <CommentSection commentRef={commentRef} post={post} />
      </div>
    </ViewPostModal>
  ) : null;
};

export default Post;
