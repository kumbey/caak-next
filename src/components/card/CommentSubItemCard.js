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
import ViewPostBlogAddComment from "../input/ViewPostBlogAddComment";
import Link from "next/link";
import DeleteCommentConfirm from "./DeleteCommentConfirm";
import { useClickOutSide } from "../../utility/Util";

const CommentSubItemCard = ({ parentId, maxComment, jumpToCommentId, postId }) => {
  const { isLogged, user } = useUser();
  const subscriptions = {};
  const [subscriptionComment, setSubscriptionComment] = useState(null);
  const [reRender, setReRender] = useState(0);
  const [isFetchingComment, setIsFetchingComment] = useState(false);
  const [isReplyInputActive, setIsReplyInputActive] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0);
  const [ deleteOpen,setDeleteOpen] = useState(false)
  // const [replyInputValue, setReplyInputValue] = useState("");
  const [reply, setReply] = useState({
    isReplying: true,
  });
  const [subComments, setSubComments] = useState({
    items: [],
    nextToken: null,
  });;

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
  }, [parentId, setSubscriptionComment]);

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
                <Link href={`/user/${subComment.user.id}/profile`}>
                  <a>
                    <img
                      className={"rounded-full object-cover w-full h-full"}
                      // objectFit={"cover"}
                      width={26}
                      height={26}
                      src={`${
                        subComment?.user?.pic
                          ? getFileUrl(subComment.user.pic)
                          : getGenderImage(subComment.user.gender).src
                      }`}
                      alt={"user profile"}
                    />
                  </a>
                </Link>
              </div>
              <div
                className={`flex flex-col ml-[12px] w-full ${
                  jumpToCommentId === subComment.id ? "commentFade" : ""
                }`}
              >
                <div className={"mb-[4px] w-max"}>
                  <Tooltip
                    className={"-left-6"}
                    content={<ProfileHoverCard userId={subComment.user.id} />}
                  >
                    <Link href={`/user/${subComment.user.id}/profile`}>
                      <a>
                        <p
                          className={
                            "cursor-pointer text-caak-generalblack text-[15px] tracking-[0.23px] leading-[17px] font-semibold"
                          }
                        >
                          {subComment?.user?.nickname}
                        </p>
                      </a>
                    </Link>
                  </Tooltip>
                </div>

                <div className={"flex flex-row items-center justify-between"}>
                  <div className={"flex flex-col justify-center"}>
                    <div
                      className={
                        "text-[15px] tracking-[0.23px] leading-[18px]"
                      }
                    >
                      <p className={"inline text-caak-bleudefrance"}>@{subComment.comment.split(/^(?:^|\W)@(\w+)(?!\w)?/)[1]}</p>
                      <p className={"inline text-caak-generalblack"}>
                        {subComment.comment.split(/^(?:^|\W)@(\w+)(?!\w)?/)[2]}
                      </p>
                    </div>
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
                          setIsReplyInputActive(!isReplyInputActive);
                          setActiveIndex(index);
                          setReply({
                            isReplying: true,
                            user_id: subComment.user.id,
                            user_nickname: `@${subComment.user.nickname} `,
                            comment_id: parentId,
                          });
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
                      {
                        isLogged && user.id === subComment.user.id &&
                        <div className="flex cursor-pointer relative h-[20px] ml-[10px]">
                          <div onClick={() => deleteOpen === subComment.id ? setDeleteOpen(false) : setDeleteOpen(subComment.id)}>
                            <span
                                className={"icon-fi-rs-dots text-caak-darkBlue hover:text-black text-[24px]"}
                            />
                            {
                              deleteOpen === subComment.id &&
                              <div className="w-[149px] text-[14px] bg-white text-[#0D1026] font-medium cursor-pointer absolute py-2 shadow-dropdown top-10 md:left-1/2 -left-4 -translate-x-1/2 z-[3] rounded-[4px]">
                                  <p onClick={() => {
                                    setConfirmOpen(true)
                                    setDeleteOpen(false)
                                  }} className="text-center">Устгах</p>
                              </div>
                            }
                            <DeleteCommentConfirm setIsMenuOpen={setDeleteOpen} setOpen={setConfirmOpen} open={confirmOpen} comment={subComment}/>
                          </div>
                        </div>
                      }
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
                {isReplyInputActive && activeIndex === index && (
                  <ViewPostBlogAddComment
                    postId={postId}
                    commentId={parentId}
                    setIsActive={setIsReplyInputActive}
                    containerClassname={"h-[94px]"}
                    reply={reply}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
      {subComments.nextToken && (
        <div
          onClick={() => listSubCommentByParentId()}
          className={"pl-[40px] mb-[10px] cursor-pointer"}
        >
          {isFetchingComment ? (
            <Loader className={`bg-caak-primary self-center`} />
          ) : (
            <div className={"flex flex-row items-center"}>
              <div
                className={"flex items-center justify-center w-[14px] h-[14px]"}
              >
                <span className={"fi-rs-reply text-[11.67px]"} />
              </div>
              <p
                className={
                  "ml-[3px] text-caak-nocturnal font-semibold text-[13px]"
                }
              >
                Илүү ихийг үзэх
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default CommentSubItemCard;
