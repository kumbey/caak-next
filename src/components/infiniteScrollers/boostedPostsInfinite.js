import InfinitScroller from "../layouts/extra/InfinitScroller";
import BoostedPostItem from "../group/BoostedPostItem";
import { useRouter } from "next/router";

const BoostedPostsInfinite = ({ posts, fetcher, loading }) => {
  const router = useRouter();
  // const subscribe = () => {
  //   let authMode = "AWS_IAM";
  //
  //   if (isLogged) {
  //     authMode = "AMAZON_COGNITO_USER_POOLS";
  //   }
  //   subscriptions.onPostUpdateByStatusConfirmed = API.graphql({
  //     query: onCreateBoostedPost,
  //     authMode: authMode,
  //   }).subscribe({
  //     next: (data) => {
  //       setSubscribedPost(getReturnData(data, true));
  //     },
  //   });
  // };
  //
  // useEffect(() => {
  //   subscribe();
  //
  //   return () => {
  //     Object.keys(subscriptions).map((key) => {
  //       subscriptions[key].unsubscribe();
  //       return true;
  //     });
  //   };
  //   //  eslint-disable-next-line
  // }, []);
  //
  // useEffect(() => {
  //   if (subscribedPost) {
  //     console.log(subscribedPost)
  //     // const boostedIndex = posts.items.findIndex(
  //     //   (post) => post.id === subscribedPost.post.id
  //     // );
  //     // console.log(boostedIndex);
  //   }
  //   //  eslint-disable-next-line
  // }, [subscribedPost]);
  return (
    <div className="flex flex-col">
      {!loading && posts.items.length === 0 ? (
        <div className="flex items-center justify-center h-80">
          <p className="text-sm">
            Уучлаарай та одоогоор пост бүүстлээгүй байна.&nbsp;
            <strong
              onClick={() =>
                router.push("/help/ads", undefined, {
                  shallow: false,
                })
              }
              className="text-[#0000EE] cursor-pointer"
            >
              ЭНД &nbsp;
            </strong>
            дарж дэлгэрэнгүй мэдээлэл авна уу!
          </p>
        </div>
      ) : null}
      <InfinitScroller onNext={fetcher} loading={loading}>
        <table className="w-full table">
          {posts.items.length > 0 ? (
            <thead className="">
              <tr className="">
                <th className="w-[215px] max-w-[215px] text-left font-inter font-normal text-14px text-caak-generalblack">
                  Пост
                </th>
                <th className="text-left w-10  font-inter font-normal text-14px text-caak-generalblack">
                  Хоног
                </th>
                <th className="text-center w-36  font-inter font-normal text-14px text-caak-generalblack">
                  Эхлэх дуусах огноо
                </th>

                {/* <th className="text-left font-inter font-normal text-14px text-caak-generalblack">
                              Зарцуулалт
                            </th> */}
                <th className="text-center font-inter font-normal text-14px text-caak-generalblack">
                  Хандалт
                </th>
                <th className="text-left w-36  font-inter font-normal text-14px text-caak-generalblack">
                  Үйлдэл
                </th>
              </tr>
            </thead>
          ) : null}
          <tbody>
            {posts.items.length > 0 &&
              posts.items.map((boostedPost, index) => {
                return (
                  <tr key={index} className="border-t border-b mb-2">
                    <BoostedPostItem
                      type={"user"}
                      key={index}
                      imageSrc={boostedPost?.post?.items?.items[0]?.file}
                      video={boostedPost?.post?.items?.items[0]?.file?.type?.startsWith(
                        "video"
                      )}
                      post={boostedPost}
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

export default BoostedPostsInfinite;
