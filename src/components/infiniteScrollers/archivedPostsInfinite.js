import InfinitScroller from "../layouts/extra/InfinitScroller";
import GroupPostItem from "../group/GroupPostItem";
import {useEffect, useState} from "react";
import {useUser} from "../../context/userContext";
import API from "@aws-amplify/api";
import {onPostByUser} from "../../graphql-custom/post/subscription";
import {getReturnData} from "../../utility/Util";

const ArchivedPostsInfinite = ({posts, setPosts, loading, fetcher, totals}) => {
  const subscriptions = {};
  const { user, isLogged } = useUser();
  const [subscribedPost, setSubscribedPost] = useState(null);

  const subscribe = () => {
    let authMode = "AWS_IAM";

    if (isLogged) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }
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
        status: "PENDING",
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
      if (post_status === "ARCHIVED") {
        if (postIndex === -1) {
          totals.archived = totals.archived + 1;
          setPosts({
            ...posts,
            items: [subscribedPost, ...posts.items],
          });
        }
      } else {
        if (postIndex > -1) {
          const post_items = posts.items;
          post_items.splice(postIndex, 1);
          totals.archived = totals.archived - 1;
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
  }, [])

  return (
    <div className="flex flex-col">
      <div className="hidden md:flex mb-[13px]">
        <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[355px]">
          Пост
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack mr-[195px]">
          Гишүүн
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack mr-[93px]">
          Огноо
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack">
          Үйлдэл
        </p>
      </div>
      <InfinitScroller onNext={fetcher} loading={loading}>
        {posts.items.length > 0 &&
          posts.items.map((archivedPost, index) => {
            return (
              <GroupPostItem
                type={"user"}
                key={index}
                imageSrc={archivedPost?.items?.items[0]?.file}
                video={archivedPost?.items?.items[0]?.file?.type?.startsWith(
                  "video"
                )}
                post={archivedPost}
                className="ph:mb-4 sm:mb-4"
              />
            );
          })}
      </InfinitScroller>
    </div>
  );
};

export default ArchivedPostsInfinite;
