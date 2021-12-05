import Image from "next/image";
import { generateTimeAgo, getFileUrl } from "../../utility/Util";

const CommentItemCard = ({
  children,
  subComment,
  comment,
  setReply,
  setCommentInputValue,
}) => {
  return (
    <div
      className={`flex flex-row justify-between ${
        subComment ? "" : "mb-[16px]"
      } w-full`}
    >
      <div className={"flex flex-row w-full"}>
        {/*User Profile Picture*/}
        <div
          className={`${
            subComment ? "w-[26px] h-[26px]" : "w-[38px] h-[38px]"
          }  flex-shrink-0 relative rounded-full`}
        >
          <Image
            className={"rounded-full"}
            width={subComment ? 26 : 38}
            height={subComment ? 26 : 38}
            src={`${
              comment?.user?.pic
                ? getFileUrl(comment.user.pic)
                : "https://picsum.photos/50"
            }`}
            alt={"user profile"}
          />
        </div>
        <div className={"flex flex-col ml-[12px] w-full"}>
          <div className={"mb-[4px]"}>
            <p
              className={
                "text-caak-generalblack text-[15px] tracking-[0.23px] leading-[17px] font-semibold"
              }
            >
              {comment?.user?.nickname}
            </p>
          </div>

          <div className={"flex flex-row items-center justify-between"}>
            <div className={"w-[320px] flex flex-col justify-center"}>
              <p
                className={
                  "text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px]"
                }
              >
                {comment.comment}
              </p>
              <div
                  className={
                    "flex flex-row text-caak-darkBlue items-center mt-[10px]"
                  }
              >
                <div>
                  <p className={"text-[13px]"}>
                    {generateTimeAgo(comment.createdAt)}
                  </p>
                </div>
                <div
                    onClick={() => {
                      setCommentInputValue(prev=> `@${comment.user.nickname} ${prev}`);
                      setReply({
                        isReplying: true,
                        user_id: comment.user.id,
                        user_nickname: `@${comment.user.nickname} `,
                        comment_id: subComment ? subComment : comment.id
                      });
                    }}
                    className={"flex flex-row item-center ml-[16px]"}
                >
                  <div
                      className={
                        "flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
                      }
                  >
                    <span className={"icon-fi-rs-comment text-[14px]"} />
                  </div>
                  <p className={"text-[13px] cursor-pointer"}>Хариулах</p>
                </div>
              </div>
            </div>
            <div className={"flex flex-col text-caak-aleutian self-center"}>
              <div
                className={
                  "flex items-center justify-center w-[24px] h-[24px] cursor-pointer"
                }
              >
                <span className={"icon-fi-rs-rock-i text-[24px]"} />
              </div>
              <div className={"flex items-center justify-center"}>
                <p className={"text-13px tracking-[0.2px] leading-[16px]"}>
                  {comment.totals?.reactions}
                </p>
              </div>
            </div>
          </div>


          {children}
        </div>
      </div>
    </div>
  );
};

export default CommentItemCard;
