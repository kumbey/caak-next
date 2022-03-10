import InfinitScroller from "../layouts/extra/InfinitScroller";
import ReportedPostItem from "../group/ReportedPostItem";
import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { onPostByUser } from "../../graphql-custom/post/subscription";
import { getReturnData } from "../../utility/Util";
import { useUser } from "../../context/userContext";

const ReportedPostsInfinite = ({ posts, setPosts, loading, fetcher }) => {
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
      if (post_status === "REPORTED") {
        if (postIndex === -1) {
          setPosts({
            ...posts,
            items: [subscribedPost, ...posts.items],
          });
        }
      } else {
        if (postIndex > -1) {
          const post_items = posts.items;
          post_items.splice(postIndex, 1);
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
      <InfinitScroller onNext={fetcher} loading={loading}>
        <table className="w-full table">
          <thead className="">
            <tr className="">
              <th className="min-w-[200px] text-left w-1/3 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                Пост
              </th>
              <th className="text-left w-1/6 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                Групп
              </th>
              <th className="text-left w-1/6 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                Репорт
              </th>
              <th className="text-left w-1/12 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                Огноо
              </th>
              <th className="text-left w-1/12 mr-[18px] font-inter font-normal text-14px text-caak-generalblack">
                Үйлдэл
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.items.length > 0 &&
              posts.items.map((reportedPost, index) => {
                return (
                  <tr key={index} className="border-t border-b mb-2">
                    <ReportedPostItem
                      type={"user"}
                      key={index}
                      imageSrc={reportedPost?.items?.items[0]?.file}
                      video={reportedPost?.items?.items[0]?.file?.type?.startsWith(
                        "video"
                      )}
                      post={reportedPost}
                      className="ph:mb-4 sm:mb-4"
                    />
                  </tr>
                );
              })}
          </tbody>
        </table>
      </InfinitScroller>
    </div>
  );
};

export default ReportedPostsInfinite;
