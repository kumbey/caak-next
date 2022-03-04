import InfinitScroller from "../layouts/extra/InfinitScroller";
import CommentList from "../list/CommentList";

const CommentsInfinite = ({ comments, setComments, fetcher, loading }) => {
  return (
    <div className="flex flex-col">
      <div className="hidden md:flex mb-[13px] ">
        <p className="font-inter font-normal text-14px text-caak-generalblack  lg:mr-[266px]">
          Пост
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack mr-[240px]">
          Сэтгэгдэл
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack mr-[80px]">
          Огноо
        </p>
        <p className="font-inter font-normal text-14px text-caak-generalblack">
          Үйлдэл
        </p>
      </div>

      <InfinitScroller onNext={fetcher} loading={loading}>
        {comments.items.map((comment, index) => {
          return (
            <CommentList
              key={index}
              index={index}
              imageSrc={comment?.post?.items?.items[0]?.file}
              video={comment?.post?.items.items[0]?.file?.type?.startsWith(
                "video"
              )}
              comment={comment}
              userComments={comments.items}
              setUserComments={setComments}
              className="ph:mb-4 sm:mb-4"
            />
          );
        })}
      </InfinitScroller>
    </div>
  );
};

export default CommentsInfinite;
