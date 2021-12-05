import Image from "next/image";
import { generateTimeAgo, getFileUrl, getReturnData } from "../../utility/Util";
import { API } from "aws-amplify";
import { listCommentByParent } from "../../graphql-custom/comment/queries";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";

const CommentSubItemCard = ({
  setReply,
  setCommentInputValue,
  parentId,
  maxComment,
}) => {
  const { isLogged } = useUser();
  const [subComments, setSubComments] = useState({
    items: [],
    nextToken: null
  });

  const listSubCommentByParentId = async () => {
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

      resp = getReturnData(resp)

      setSubComments({
        nextToken: resp.nextToken,
        items: [...subComments.items, ...resp.items]
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    listSubCommentByParentId();
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
                  width={26}
                  height={26}
                  src={`${
                    subComment?.user?.pic
                      ? getFileUrl(subComment.user.pic)
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
                    {subComment?.user?.nickname}
                  </p>
                </div>

                <div className={"flex flex-row items-center justify-between"}>
                  <div className={"w-[320px] flex flex-col justify-center"}>
                    <p
                      className={
                        "text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px]"
                      }
                    >
                      {subComment.comment}
                    </p>
                    <div
                        className={
                          "flex flex-row text-caak-darkBlue items-center mt-[10px] mb-[17px]"
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
                  <div
                    className={"flex flex-col text-caak-aleutian self-center"}
                  >
                    <div
                      className={
                        "flex items-center justify-center w-[24px] h-[24px] cursor-pointer"
                      }
                    >
                      <span className={"icon-fi-rs-rock-i text-[24px]"} />
                    </div>
                    <div className={"flex items-center justify-center"}>
                      <p
                        className={"text-13px tracking-[0.2px] leading-[16px]"}
                      >
                        {subComment.totals?.reactions}
                      </p>
                    </div>
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
            "text-darkblue text-[12px] pl-[40px] mb-[10px] cursor-pointer"
          }
        >
          Илүү ихийг үзэх
        </div>
      )}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default CommentSubItemCard;
