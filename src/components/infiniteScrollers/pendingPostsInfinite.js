import InfinitScroller from "../layouts/extra/InfinitScroller";
import GroupPostItem from "../group/GroupPostItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { onPostByUser } from "../../graphql-custom/post/subscription";
import { getReturnData } from "../../utility/Util";
import { useUser } from "../../context/userContext";

const PendingPostsInfinite = ({
  posts,
  setPosts,
  fetcher,
  loading,
  totals,
}) => {
  const subscriptions = {};
  const router = useRouter();
  const { user, isLogged } = useUser();
  const [subscribedPost, setSubscribedPost] = useState(null);

  const subscribe = () => {
    let authMode = "AWS_IAM";

    if (isLogged) {
      authMode = "AMAZON_COGNITO_USER_POOLS";
    }
    subscriptions.onPostUpdateByStatusConfirmed = API.graphql({
      query: onPostByUser,
      variables: {
        status: "CONFIRMED",
        user_id: user.id,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscribedPost({
          post: getReturnData(data, true),
          type: "remove",
        });
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
        setSubscribedPost({
          post: getReturnData(data, true),
          type: "remove",
        });
      },
    });
    subscriptions.onPostUpdateByStatusPending = API.graphql({
      query: onPostByUser,
      variables: {
        status: "PENDING",
        user_id: user.id,
      },
      authMode: authMode,
    }).subscribe({
      next: (data) => {
        setSubscribedPost({
          post: getReturnData(data, true),
          type: "add",
        });
      },
    });
  };

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

  useEffect(() => {
    if (subscribedPost) {
      const pendingIndex = posts.items.findIndex(
        (post) => post.id === subscribedPost.post.id
      );
      if (subscribedPost.post.status === "PENDING") {
        if (pendingIndex === -1) {
          totals.pending = totals.pending + 1;
          setPosts({
            ...posts,
            items: [subscribedPost.post, ...posts.items],
          });
        }
      } else {
        if (pendingIndex > -1) {
          const post_items = posts.items;
          post_items.splice(pendingIndex, 1);
          totals.pending = totals.pending - 1;
          setPosts({
            ...posts,
            items: [...post_items],
          });
        }
      }
    }
    //  eslint-disable-next-line
  }, [subscribedPost]);

  return (
    <div className="flex flex-col">
      {posts.items.length > 0 ? (
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
      ) : null}
      {!loading && posts.items.length === 0 ? (
        <div className="flex items-center justify-center h-80">
          <p className="text-sm">
            Уучлаарай та пост илгээгээгүй байна.&nbsp;
            <strong
              onClick={() =>
                router.push("/post/add", undefined, {
                  shallow: false,
                })
              }
              className="text-[#0000EE] cursor-pointer"
            >
              ЭНД &nbsp;
            </strong>
            дарж пост оруулна уу!
          </p>
        </div>
      ) : null}
      <InfinitScroller onNext={fetcher} loading={loading}>
        {posts.items.map((pendingPost, index) => {
          return (
            <GroupPostItem
              type={"user"}
              key={index}
              imageSrc={pendingPost?.items?.items[0]?.file}
              video={pendingPost?.items?.items[0]?.file?.type?.startsWith(
                "video"
              )}
              post={pendingPost}
              className="ph:mb-4 sm:mb-4"
            />
          );
        })}
      </InfinitScroller>
    </div>
  );
};

export default PendingPostsInfinite;
