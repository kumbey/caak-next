import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import ImageCarousel from "../../carousel/ImageCarousel";

const Card = ({ post, handleToast }) => {
  return (
    post && (
      <div className="feedCard relative flex flex-col justify-between mx-auto bg-white rounded-xl shadow-card mb-[24px]">
        <div className={"flex flex-col"}>
          <CardHeader post={post} handleToast={handleToast} />
          <ImageCarousel
            cover={false}
            duration
            route
            card={true}
            mediaContainerClassname={"w-full h-full"}
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
        />
      </div>
    )
  );
};

export default Card;
