import { useEffect, useState } from "react";
import useModalLayout from "../../../../src/hooks/useModalLayout";
import CardHeader from "../../../../src/components/card/FeedCard/CardHeader";
import { withSSRContext } from "aws-amplify";
import { getFileUrl, getReturnData } from "../../../../src/utility/Util";
import { getPostView } from "../../../../src/graphql-custom/post/queries";
import Image from "next/image";
import ViewPostBlogItem from "../../../../src/components/card/ViewPostBlogItem";
import CommentSection from "../../../../src/components/viewpost/CommentSection";
import Video from "../../../../src/components/video";

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
  useEffect(() => {
    setPost(ssrData.post);
  }, [ssrData.post]);

  const ViewPostModal = useModalLayout({ layoutName: "viewpost" });
  return post ? (
    <ViewPostModal
      post={post}
      containerClassname={
        "w-full max-w-[1183px] mx-auto my-[78px] rounded-b-square z-[0]"
      }
    >
      <div className={"bg-white h-full w-full rounded-square"}>
        <CardHeader
          viewPost
          containerClassname={"py-[14px] px-[28px]"}
          titleClassname={
            "text-20px font-medium text-caak-generalblack tracking-[0.3px] leading-[24px]"
          }
          post={post}
        />
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
        <CommentSection post={post} />
      </div>
    </ViewPostModal>
  ) : null;
};

export default Post;
