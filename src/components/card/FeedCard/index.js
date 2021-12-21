import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import ImageCarousel from "../../carousel/ImageCarousel";

const Card = ({ post }) => {
  return (
    post && (
      <div className="feedCard relative flex flex-col justify-between mx-auto bg-white rounded-xl shadow-card mb-[24px]">
        <div className={"flex flex-col"}>
          <CardHeader post={post} />
          <ImageCarousel
            duration
            route
            card
            mediaContainerClassname={"w-full h-full max-h-[800px]"}
            postId={post.id}
            items={post.items.items}
          />
        </div>

        <CardFooter
          reacted={post.reacted}
          postId={post.id}
          title={post.title}
          totals={post.totals}
        />
      </div>
    )
  );
};

export default Card;
