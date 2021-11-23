import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import ImageCarousel from "../../carousel/ImageCarousel";

const Card = ({ verifiedUser, post }) => {
  // const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    post && (
      <div className="feedCard relative flex flex-col justify-between mx-auto bg-white rounded-xl shadow-card mb-[24px]">
        <div className={"flex flex-col"}>
          <CardHeader post={post} />

          <ImageCarousel postId={post.id} items={post.items.items} />

          {/*{video ? (*/}
          {/*  <CardVideoContainer postId={post.id} files={post.items.items} />*/}
          {/*) : (*/}
          {/*  <CardImageContainer postId={post.id} files={post.items.items} />*/}
          {/*)}*/}
        </div>

        <CardFooter
          reacted={post.reacted}
          postId={post.id}
          title={post.title}
          totals={post.totals}
          items={post.items.items}
          // setIsCommentOpen={setIsCommentOpen}
        />
        {/*{isCommentOpen && (*/}
        {/*  <CommentCard*/}
        {/*    isCommentOpen={isCommentOpen}*/}
        {/*    postItemId={post.items.items[0].id}*/}
        {/*    maxComments={4}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    )
  );
};

export default Card;
