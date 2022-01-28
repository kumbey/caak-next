import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import ImageCarousel from "../../carousel/ImageCarousel";
import { getFileUrl } from "../../../utility/Util";

const Card = ({ post, handleToast, subscription }) => {
  let h;
  let w;
  function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  function findHHandWW() {
    h = this.height;
    w = this.width;
    return true;
  }
  const images = { items: [], maxHeight: 0 };

  post.items.items.map((item) => {
    if (
      item.file.isExternal === "TRUE" ||
      item.file.type.startsWith("image/")
    ) {
      const imagePath = getFileUrl(item.file);

      const newImage = new Image();
      newImage.id = imagePath;
      newImage.onload = findHHandWW;
      newImage.src = imagePath;
      const fit = calculateAspectRatioFit(
        newImage.width,
        newImage.height,
        616,
        770
      );
      images.items.push(newImage);

      if (fit.height > images.maxHeight) {
        images.maxHeight = fit.height;
      }
    } else {
      const imagePath = getFileUrl(item.thumbnail);
      const newImage = new Image();
      newImage.id = imagePath;
      newImage.onload = findHHandWW;
      newImage.src = imagePath;
      images.items.push(newImage);
    }
  });
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
            mediaContainerClassname={"w-full"}
            images={images}
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
      </div>
    )
  );
};

export default Card;
