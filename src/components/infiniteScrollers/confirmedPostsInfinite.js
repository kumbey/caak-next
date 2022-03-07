import InfinitScroller from "../layouts/extra/InfinitScroller";
import DashList from "../list/DashList";
import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { onPostByUser } from "../../graphql-custom/post/subscription";
import { getReturnData } from "../../utility/Util";
import { useUser } from "../../context/userContext";

const ConfirmedPostsInfinite = ({ posts, setPosts, fetcher, loading, totals }) => {
  const subscriptions = {};
  const { user, isLogged } = useUser();
  const [subscribedPost, setSubscribedPost] = useState(null);

  const subscribe = () => {
    let authMode = "AWS_IAM";

    if (isLogged) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }
    subscriptions.onPostUpdateByStatusPending = API.graphql({
      query: onPostByUser,
      variables: {
        status: "PENDING",
        user_id: user.id,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscribedPost(getReturnData(data, true));
      },
    });
    subscriptions.onPostUpdateByStatusArchived = API.graphql({
      query: onPostByUser,
      variables: {
        status: "ARCHIVED",
        user_id: user.id,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscribedPost(getReturnData(data, true));
      },
    });
    subscriptions.onPostUpdateByStatusConfirmed = API.graphql({
      query: onPostByUser,
      variables: {
        status: "CONFIRMED",
        user_id: user.id,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscribedPost(getReturnData(data, true));
      },
    });
    subscriptions.onPostUpdateByStatusDraft = API.graphql({
      query: onPostByUser,
      variables: {
        status: "DRAFT",
        user_id: user.id,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscribedPost(getReturnData(data, true));
      },
    });
    subscriptions.onPostUpdateByStatusReported = API.graphql({
      query: onPostByUser,
      variables: {
        status: "REPORTED",
        user_id: user.id,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscribedPost(getReturnData(data, true));
      },
    });
  };

  useEffect(() => {
    if (subscribedPost) {
      const post_status = subscribedPost.status;
      const postIndex = posts.items.findIndex(
        (post) => post.id === subscribedPost.id
      );
      if (post_status === "CONFIRMED") {
        if (postIndex === -1) {
          totals.confirmed = totals.confirmed + 1
          setPosts({
            ...posts,
            items: [subscribedPost, ...posts.items],
          });
        }
      } else {
        if (postIndex > -1) {
          const post_items = posts.items;
          post_items.splice(postIndex, 1);
          totals.confirmed = totals.confirmed - 1
          setPosts({
            ...posts,
            items: [...post_items],
          });
        }
      }
    }
    //  eslint-disable-next-line
  }, [subscribedPost]);

  useEffect(() => {
    subscribe();

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    //  eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mb-[13px] hidden md:flex ">
        <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[230px]">
          Пост
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack mr-[250px]">
          Групп
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack mr-[175px]">
          Хандалт
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack">
          Үйлдэл
        </p>
      </div>

      <InfinitScroller onNext={fetcher} loading={loading}>
        {posts.items.length > 0 &&
          posts.items.map((post, index) => {
            return (
              <DashList
                key={index}
                type={"user"}
                imageSrc={post?.items?.items[0]?.file}
                video={post?.items?.items[0]?.file?.type?.startsWith("video")}
                post={post}
                className="ph:mb-4 sm:mb-4"
              />
            );
          })}
      </InfinitScroller>
    </div>
  );
};

export default ConfirmedPostsInfinite;
