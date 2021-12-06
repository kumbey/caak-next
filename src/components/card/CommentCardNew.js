import CommentItemCard from "./CommentItemCard";
import { useEffect, useState } from "react";
import CommentSubItemCard from "./CommentSubItemCard";
import API from "@aws-amplify/api";
import {
  onCommentByParent,
  onCommentByPost,
  onCommentByPostItem,
} from "../../graphql-custom/comment/subscriptions";
import { getReturnData } from "../../utility/Util";
import { useUser } from "../../context/userContext";
import {
  listCommentsByDateAndType,
  listCommentsByDateAndTypeForItem,
} from "../../graphql-custom/comment/queries";
import Loader from "../loader";

const CommentCardNew = ({
  setCommentInputValue,
  reply,
  setReply,
  setup,
  addCommentRef,
}) => {
  const [comments, setComments] = useState({
    items: [],
    nextToken: null,
  });
  const subscriptions = {};
  const [subscriptionComment, setSubscriptionComment] = useState(null);
  const [reRender, setReRender] = useState(0);
  const [isFetchingComment, setIsFetchingComment] = useState(false);
  const { isLogged } = useUser();

  const listCommentByType = async () => {
    let params;
    if (setup.type === "POST") {
      params = {
        query: listCommentsByDateAndType,
        variables: {
          post_id: setup.id,
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      };
    } else
      params = {
        query: listCommentsByDateAndTypeForItem,
        variables: {
          post_item_id: setup.id,
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      };
    setIsFetchingComment(true);
    try {
      let resp = await API.graphql(params);
      resp = getReturnData(resp);
      setComments({
        nextToken: resp.nextToken,
        items: [...comments.items, ...resp.items],
      });
      setIsFetchingComment(false);
    } catch (ex) {
      setIsFetchingComment(false);
      console.log(ex);
    }
    setIsFetchingComment(false);
  };

  useEffect(() => {
    listCommentByType();
  }, [setup.id]);

  const subscrip = () => {
    let params = {};
    if (setup.type === "POST") {
      params = {
        query: onCommentByPost,
        variables: {
          post_id: setup.id,
        },
        authMode: "AWS_IAM",
      };
    } else {
      params = {
        query: onCommentByPostItem,
        variables: {
          post_item_id: setup.id,
        },
        authMode: "AWS_IAM",
      };
    }

    subscriptions.onCommentByPostItem = API.graphql(params).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscriptionComment(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (subscriptionComment) {
      if (
        subscriptionComment.type === "PARENT" &&
        !comments.items.find((item) => item.id === subscriptionComment.id)
      ) {
        setComments({
          ...comments,
          items: [subscriptionComment, ...comments.items],
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
  }, []);

  return comments.items ? (
    <div className={"border-t border-caak-titaniumwhite py-[25px] w-full"}>
      {comments.items.map((comment, index) => {
        return comment.type === "PARENT" ? (
          <CommentItemCard
            addCommentRef={addCommentRef}
            reply={reply}
            setReply={setReply}
            setCommentInputValue={setCommentInputValue}
            comment={comment}
            key={index}
          >
            <div className={"mt-[12px]"}>
              <CommentSubItemCard
                addCommentRef={addCommentRef}
                reply={reply}
                setReply={setReply}
                setCommentInputValue={setCommentInputValue}
                parentId={comment.id}
                maxComment={2}
              />
            </div>
          </CommentItemCard>
        ) : null;
      })}
      {comments.nextToken && (
        <div
          onClick={() => listCommentByType()}
          className={
            "text-caak-generalblack font-medium text-[13px] pl-[50px] mb-[10px] cursor-pointer"
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

export default CommentCardNew;
