import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import ImageCarousel from "../../carousel/ImageCarousel";
import FeedCardSkeleton from "../../skeleton/FeedCardSkeleton";
import { useInView } from "react-intersection-observer";
import useUpdateEffect from "../../../hooks/useUpdateEffect";
import { API } from "aws-amplify";
import { addViewToItem } from "../../../graphql-custom/post/mutation";

const Card = ({ post, handleToast, subscription, sponsored, loading }) => {
  const [ref, inView] = useInView({
    rootMargin: "-54px",
    triggerOnce: true,
  });

  const countReach = async () => {
    await API.graphql({
      query: addViewToItem,
      variables: {
        item_id: post.id,
        on_to: "POST",
        type: "REACH",
      },
      authMode: "AWS_IAM",
    });
  };

  const countViews = async () => {
    await API.graphql({
      query: addViewToItem,
      variables: {
        item_id: post.id,
        on_to: "POST",
        type: "VIEWS",
      },
      authMode: "AWS_IAM",
    });
  };

  useUpdateEffect(() => {
    if (post.sponsored)
      if (inView) {
        countReach();
      }
  }, [inView]);
  
  return (
    post && (
      <div className="feedCard relative flex flex-col justify-between mx-auto bg-white rounded-xl shadow-card mb-[24px]">
        {loading ? (
          <FeedCardSkeleton />
        ) : (
          <>
            <div
              onClick={() => countViews()}
              ref={ref}
              className={"flex flex-col"}
            >
              <CardHeader
                sponsored={sponsored}
                post={post}
                handleToast={handleToast}
              />
              <ImageCarousel
                cover={false}
                duration
                route
                card={true}
                mediaContainerClassname={"w-full"}
                postId={post.id}
                items={post.items.items}
              />
            </div>

            <CardFooter
              reacted={post.reacted}
              postId={post.id}
              title={post.title}
              totals={post.totals}
              handleToast={handleToast}
              subscription={subscription}
            />
          </>
        )}
      </div>
    )
  );
};

export default Card;
