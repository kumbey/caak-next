import CommentItem from "./CommentItem";
import Image from "next/image";
import Input from "../../../input";
import API from "@aws-amplify/api";
import { getCommentsByPostItem } from "../../../../graphql-custom/comment/queries";
import { useEffect, useState } from "react";
import { getReturnData } from "../../../../utility/Util";
import CommentItemSkeleton from "../../../skeleton/CommentItemSkeleton";

const Index = ({ postItemId, isCommentOpen, maxComments }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCommentsById = async () => {
    try {
      setLoading(true);
      const resp = await API.graphql({
        query: getCommentsByPostItem,
        limit: maxComments,
        authMode: "AWS_IAM",
        variables: { post_item_id: postItemId },
      });
      setComments(getReturnData(resp));
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommentsById();
  }, [postItemId]);

  return isCommentOpen ? (
    <div
      className={
        "flex flex-col py-[16px] px-[18px] bg-caak-lynxwhite rounded-b-square"
      }
    >
      <div className={"flex flex-row items-center mb-[10px]"}>
        <div className={"w-[28px] h-[28px] rounded-full"}>
          <Image
            className={"rounded-full"}
            src={"https://picsum.photos/200"}
            alt="Comment user"
            width={28}
            height={28}
            objectFit="cover"
          />
        </div>
        <div className={"relative w-full"}>
          <div
            className={
              "flex cursor-pointer justify-center items-center w-[20px] h-[20px] absolute right-1 top-1/2 transform -translate-y-1/2 z-2"
            }
          >
            <span
              className={
                "icon-fi-rs-send text-16px text-caak-generalblack font-bold"
              }
            />
          </div>
          <Input
            hideLabel
            className={"ml-[6px] h-[34px] pl-[14px] pr-[30px] rounded-[100px]"}
            placeholder={"Сэтгэгдэл үлдээх"}
            hideError
          />
        </div>
      </div>
      {!loading ? (
        comments.items?.map((comment, index) => {
          //  if maxComments=3, its renders 3 comments.
          if (index < maxComments)
            return <CommentItem comment={comment} key={index} />;
        })
      ) : (
        <>
          <CommentItemSkeleton width={200}/>
          <CommentItemSkeleton width={300}/>
        </>
      )}
      {comments.items && comments.items.length > maxComments ? (
        <div
          className={
            "flex flex-row justify-between items-center mt-[3px] leading-[24px] tracking-[0.21px]"
          }
        >
          <div
            className={
              "text-14px font-medium text-caak-generalblack cursor-pointer"
            }
          >
            Бусад сэтгэгдэл
          </div>
          <div className={"text-13px text-caak-aleutian"}>{maxComments}/14</div>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default Index;
