import API from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { getReturnData } from "../../../../../src/utility/Util";
import { onCommentByPostItem } from "../../../../../src/graphql-custom/comment/subscriptions";
import CommentCard from "../../../../../src/components/card/CommentCard";

const PostBody = ({ post, activeIndex }) => {
  const subscriptions = {};
  const [subscriptionComment, setSubscriptionComment] = useState(null);
  const [reRender, setReRender] = useState(0);
  const item = post.items.items[activeIndex];

  const subscrip = () => {
    subscriptions.onCommentByPostItem = API.graphql({
      query: onCommentByPostItem,
      variables: {
        post_item_id: item.id,
      },
      authMode: "AWS_IAM",
    }).subscribe({
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
        !item.comments.items.find((item) => item.id === subscriptionComment.id)
      ) {
        item.comments.items.push(subscriptionComment);
      }
      setReRender(reRender + 1);
    }
    // eslint-disable-next-line
  }, [subscriptionComment]);

  useEffect(() => {
    if (item.id) {
      subscrip();
    }
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, [item]);

  return (
    <div
      className={"relative flex flex-col justify-between bg-caak-whitesmoke"}
    >
      {item.comments.items.map((comment, index) => {
        return (
          <CommentCard key={index} comment={comment}>
            {/*<SubCommentCard name={"Bataa"} comment={"Харин тиймээ"}/>*/}
            {/*<SubCommentCard name={"Nomio"} comment={"Харин тиймээ"} />*/}
            {/*<SubCommentCard*/}
            {/*  name={"Tsetsegee"}*/}
            {/*  comment={"Харин тиймээ"}*/}
            {/*/>*/}
            {/*<SubCommentCard name={"Saraa"} comment={"Харин тиймээ"} />*/}
            {/*<SubCommentCard name={"Boloroo"} comment={"Харин тиймээ"} />*/}
          </CommentCard>
        );
      })}
    </div>
  );
};

export default PostBody;
