import Image from "next/image";
import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
  getReturnData,
} from "../../utility/Util";
import { API } from "aws-amplify";
import { listCommentByParent } from "../../graphql-custom/comment/queries";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import AnimatedCaakButton from "../button/animatedCaakButton";
import { onCommentByParent } from "../../graphql-custom/comment/subscriptions";
import Loader from "../loader";
import ProfileHoverCard from "./ProfileHoverCard";
import Tooltip from "../tooltip/Tooltip";

const CommentSubItemCard = ({
  setReply,
  setCommentInputValue,
  parentId,
  maxComment,
  addCommentRef,
  jumpToCommentId,
}) => {
  const { isLogged } = useUser();
  const subscriptions = {};
  const [subscriptionComment, setSubscriptionComment] = useState(null);
  const [reRender, setReRender] = useState(0);
  const [isFetchingComment, setIsFetchingComment] = useState(false);

  const [subComments, setSubComments] = useState({
    items: [],
    nextToken: null,
  });

  const subscrip = () => {
    const params = {
      query: onCommentByParent,
      variables: {
        parent_id: parentId,
        type: "SUB",
      },
      authMode: "AWS_IAM",
    };
    subscriptions.onCommentByPostItem = API.graphql(params).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionComment({ ...onData, totals: { reactions: 0 } });
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (subscriptionComment) {
      if (
        !subComments.items.find((item) => item.id === subscriptionComment.id)
      ) {
        setSubComments({
          ...subComments,
          items: [subscriptionComment, ...subComments.items],
        });
      }
      setReRender(reRender + 1);
    }
    // eslint-disable-next-line
  }, [subscriptionComment]);

  useEffect(() => {
    subscrip();

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, []);

  const listSubCommentByParentId = async () => {
    setIsFetchingComment(true);
    try {
      let resp = await API.graphql({
        query: listCommentByParent,
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        variables: {
          sortDirection: "DESC",
          parent_id: parentId,
          limit: maxComment,
          nextToken: subComments.nextToken,
        },
      });

      resp = getReturnData(resp);

      setSubComments({
        nextToken: resp.nextToken,
        items: [...subComments.items, ...resp.items],
      });
      setSubscriptionComment(false);
    } catch (ex) {
      setIsFetchingComment(false);
      console.log(ex);
    }
    setIsFetchingComment(false);
  };

  useEffect(() => {
    listSubCommentByParentId();
    // eslint-disable-next-line
  }, [parentId]);

  return subComments.items ? (
    <div className={"flex flex-col justify-center"}>
      {subComments.items.map((subComment, index) => {
        return (
          <div key={index} className={`flex flex-row justify-between w-full`}>
            <div className={"flex flex-row w-full"}>
              {/*User Profile Picture*/}
              <div
                className={`w-[26px] h-[26px] flex-shrink-0 relative rounded-full`}
              >
                <Image
                  className={"rounded-full"}
                  objectFit={"cover"}
                  width={26}
                  height={26}
                  src={`${
                    subComment?.user?.pic
                      ? getFileUrl(subComment.user.pic)
                      : getGenderImage(subComment.user.gender).src
                  }`}
                  alt={"user profile"}
                />
              </div>
              <div
                className={`flex flex-col ml-[12px] w-full ${
                  jumpToCommentId === subComment.id ? "commentFade" : ""
                }`}
              >
                <div className={"mb-[4px]"}>
                  <Tooltip
                    className={"-left-6"}
                    content={<ProfileHoverCard userId={subComment.user.id} />}
                  >
                    <p
                      className={
                        "cursor-pointer text-caak-generalblack text-[15px] tracking-[0.23px] leading-[17px] font-semibold"
                      }
                    >
                      {subComment?.user?.nickname}
                    </p>
                  </Tooltip>
                </div>

                <div className={"flex flex-row items-center justify-between"}>
                  <div className={"flex flex-col justify-center"}>
                    <p
                      className={
                        "text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px]"
                      }
                    >
                      {subComment.comment}
                    </p>
                    <div
                      className={
                        "flex flex-row text-caak-darkBlue items-center mt-[10px] mb-[10px]"
                      }
                    >
                      <div>
                        <p className={"text-[13px]"}>
                          {generateTimeAgo(subComment.createdAt)}
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setCommentInputValue(
                            (prev) => `@${subComment.user.nickname} ${prev}`
                          );
                          setReply({
                            isReplying: true,
                            user_id: subComment.user.id,
                            user_nickname: `@${subComment.user.nickname} `,
                            comment_id: parentId,
                          });
                          if (addCommentRef?.current)
                            addCommentRef.current.focus();
                        }}
                        className={"flex flex-row item-center ml-[16px]"}
                      >
                        <div
                          className={
                            "flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
                          }
                        >
                          <span
                            className={"icon-fi-rs-comment-o text-[15px]"}
                          />
                        </div>
                        <p className={"text-[13px] cursor-pointer"}>Хариулах</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={"flex flex-col text-caak-aleutian self-start"}
                  >
                    <AnimatedCaakButton
                      reactionType={"COMMENT"}
                      sub
                      itemId={subComment.id}
                      totals={subComment.totals}
                      reacted={subComment.reacted}
                      setReacted={(changedReacted) => {
                        subComment.reacted = changedReacted;
                      }}
                      hideCaakText
                      bottomTotals
                      textClassname={
                        "text-[13px] font-medium text-13px tracking-[0.2px] leading-[16px] text-caak-nocturnal"
                      }
                      iconContainerClassname={
                        "w-[24px] h-[24px] mb-[2px] bg-transparent"
                      }
                      iconColor={"text-caak-nocturnal"}
                      iconClassname={"text-[23px]"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {subComments.nextToken && (
        <div
          onClick={() => listSubCommentByParentId()}
          className={
            "text-caak-generalblack font-medium text-[12px] pl-[40px] mb-[10px] cursor-pointer"
          }
        >
          {isFetchingComment ? (
            <Loader className={`bg-caak-primary self-center`} />
          ) : (
            "Илүү ихийг үзэх"
          )}
        </div>
      )}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default CommentSubItemCard;
