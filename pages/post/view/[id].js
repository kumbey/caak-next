import React, { useState } from "react";
import useModalLayout from "../../../src/hooks/useModalLayout";
import CardHeader from "../../../src/components/card/FeedCard/CardHeader";
import { withSSRContext } from "aws-amplify";
import { getFileUrl, getReturnData } from "../../../src/utility/Util";
import { getPostView } from "../../../src/graphql-custom/post/queries";
import Image from "next/image";
import ViewPostBlogItem from "../../../src/components/card/ViewPostBlogItem";
import Button from "../../../src/components/button";
import CommentItemCard from "../../../src/components/card/CommentItemCard";
import { useUser } from "../../../src/context/userContext";

export async function getServerSideProps({ req, query }) {
  const { API } = withSSRContext({ req });
  const postId = query.id;
  const getPostById = async () => {
    const resp = await API.graphql({
      query: getPostView,
      authMode: "AWS_IAM",
      variables: { id: postId },
    });
    console.log(resp);
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
  console.log(ssrData.post.items.items[0]);
  const [post] = useState(ssrData.post);
  const { user } = useUser();
  const ViewPostModal = useModalLayout({ layoutName: "viewpost" });

  return post ? (
    <ViewPostModal
      containerClassname={"w-full max-w-[1183px] mx-auto my-[78px] rounded-b-square"}
    >
      <div className={"bg-white h-full w-full rounded-t-square"}>
        <CardHeader
          viewPost
          containerClassname={"py-[14px] px-[28px]"}
          titleClassname={
            "text-20px font-medium text-caak-generalblack tracking-[0.3px] leading-[24px]"
          }
          post={post}
        />
        <div className={"relative h-[444px] w-full pt-[4px]"}>
          <Image
            objectFit={"cover"}
            layout={"fill"}
            src={getFileUrl(post.items.items[0].file)}
            alt={"post picture"}
          />
        </div>
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
            Эрдэмтэд олон жилийн турш судалгаа явуулсаар байгаа ч одоогоор
            амьдрал оршдог гараг дэлхийгээс өөрийг илрүүлж чадаагүй билээ.
            Эндээс үзвэл манай гараг нь амьдрал бүрдэхэд тохирох хаа ч байхгүй
            жинхэнэ "төгс" орчныг бүрдүүлсэн болох нь илэрхий байна. Ингээд яг
            ямар хүчин зүйлс үүнд нөлөөлсөн болохыг та бүхэнд хүргэхээр
            бэлтгэлээ.
          </p>
          <ViewPostBlogItem postItem={post.items.items[0]} />
        </div>
        <div className={"flex flex-col bg-white py-[16px] px-[29px]"}>
          {/*User*/}
          <div className={"flex flex-row items-center"}>
            <div className={"w-[28px] h-[28px] rounded-full relative"}>
              <Image
                width={28}
                height={28}
                className={"rounded-full"}
                src={`${user.pic ? getFileUrl(user.pic) : "https://picsum.photos/50"}`}
                alt={"profile picture"}
              />
            </div>
            <div className={"ml-[6px]"}>
              <p
                className={
                  "text-caak-extraBlack text-[13px] tracking-[0.2px] leading-[16px]"
                }
              >
                {user.nickname}
              </p>
            </div>
          </div>

          {/*Add Comment section*/}
          <div
            className={
              "flex flex-col w-full bg-white min-h-[135px] mt-[10px] border border-caak-titaniumwhite rounded-square mb-[24px]"
            }
          >
            <textarea
              className={
                "w-full h-[97px] resize-y border-transparent rounded-t-square placeholder-caak-shit text-[15px] tracking-[0.23px] leading-[18px] focus:ring-caak-primary"
              }
              placeholder={"Таны санал сэтгэгдэл?"}
              rows={3}
            />
            <div
              className={
                "flex flex-row items-center justify-end w-full h-[38px] bg-caak-liquidnitrogen rounded-b-square px-[10px] py-[6px]"
              }
            >
              <div
                className={
                  "flex items-center justify-center w-[20px] h-[20px] cursor-pointer"
                }
              >
                <span
                  className={
                    "icon-fi-rs-mention text-[18px] text-caak-generalblack"
                  }
                />
              </div>
              <div
                className={
                  "flex items-center justify-center w-[20px] h-[20px] ml-[12px] cursor-pointer"
                }
              >
                <span
                  className={
                    "icon-fi-rs-smile text-[18px] text-caak-generalblack"
                  }
                />
              </div>
              <div className={"ml-[17px]"}>
                <Button
                  style={{ borderRadius: "8%/50%" }}
                  className={"h-[26px] text-[14px] font-medium"}
                  skin={"primary"}
                >
                  Сэтгэгдэл үлдээх
                </Button>
              </div>
            </div>
          </div>

          <div
            className={"border-t border-caak-titaniumwhite py-[25px] w-full"}
          >
            <CommentItemCard
              comment={ssrData.post.items.items[0].comments.items[1]}
            >
              <div className={"mt-[12px]"}>
                <CommentItemCard
                  comment={ssrData.post.items.items[0].comments.items[2]}
                  subComment
                />
              </div>
            </CommentItemCard>
            {ssrData.post.items.items[0].comments.items.map(
              (comment, index) => {
                return <CommentItemCard comment={comment} key={index} />;
              }
            )}
            {/* Comments section */}
            {/*Comments*/}

            {/*<CommentItemCard />*/}
          </div>
        </div>
      </div>
    </ViewPostModal>
  ) : null;
};

export default Post;
