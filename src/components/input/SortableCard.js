import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Loader from "../loader";
import Video from "../video";
import { getFileUrl, getGenderImage } from "../../utility/Util";

const SortableCard = ({
  active,
  item,
  onClickClose,
  setFeaturedPost,
  index,
  post,
  setPost,
  activeIndex,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  let videoThumbnailProps = {};
  if (post.items[activeIndex].file.type.startsWith("video")) {
    if (post.items[activeIndex].thumbnail) {
      videoThumbnailProps = {
        ...(post.items[activeIndex].thumbnail.hasOwnProperty("url")
          ? {
              post: post,
              setPost: setPost,
              generateThumbnail: true,
            }
          : {}),
      };
    }
  }

  const styles = {
    backgroundColor: "transparent",
    borderRadius: "5px",
    marginRight: "7px",
    marginBottom: "7px",
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const thumbnailImageHandler = (item) => {
    if (item?.file) {
      if (item.file.url) {
        return item.file.url;
      } else {
        if (!getFileUrl(item.file).includes("undefined")) {
          return getFileUrl(item.file);
        }
      }
    } else {
      return getGenderImage("default").src;
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={styles}
      {...attributes}
      className={`w-[77px] h-[77px] flex justify-center items-center group relative ${
        active ? "border-[2px] border-caak-primary" : ""
      }`}
    >
      <div
        onClick={onClickClose}
        className={
          "transition-all duration-150 group-hover:flex hidden justify-center items-center rounded-full w-[24px] h-[24px] bg-black bg-opacity-60 absolute top-[4px] right-[4px] z-[3]"
        }
      >
        <span className={"icon-fi-rs-close text-white text-[10px]"} />
      </div>
      <div
        onClick={setFeaturedPost}
        className={`${
          index === 0 ? "flex" : "group-hover:flex hidden"
        } transition-all duration-150  justify-center items-center rounded-full w-[24px] h-[24px] bg-caak-primary bg-opacity-90 absolute top-[4px] left-[4px] z-[3]`}
      >
        <span className={"icon-fi-rs-notification-o text-white text-[14px]"} />
      </div>
      <div
        {...listeners}
        className={`flex items-center justify-center group-hover:opacity-100 border-[1px] border-caak-titaniumwhite transition-all duration-300 relative ${
          active
            ? "w-[64px] h-[64px] opacity-100"
            : "opacity-[0.66] w-[77px] h-[77px]"
        }  bg-white rounded-[5px]`}
      >
        {item.loading && (
          <div
            className={
              "flex items-center absolute justify-center w-full h-full bg-white bg-opacity-80 z-[1]"
            }
          >
            <Loader className={"bg-caak-primary"} />
          </div>
        )}

        {item.file?.type?.startsWith("video") ? (
          <Video
            videoFileId={item.file.id}
            itemIndex={activeIndex}
            light={
              item.thumbnail
                ? item.thumbnail.hasOwnProperty("url")
                  ? item.thumbnail.url
                  : getFileUrl(item.thumbnail)
                : false
            }
            {...videoThumbnailProps}
            initialAutoPlay={false}
            videoClassname={"object-cover rounded-[4px]"}
            hideControls
            smallIndicator
            disableOnClick
            src={thumbnailImageHandler(item)}
          />
        ) : (
          <img
            className={"rounded-[5px] object-cover w-full h-full"}
            alt={""}
            src={thumbnailImageHandler(item)}
            // layout={"fill"}
            // objectFit={"cover"}
          />
        )}
      </div>
    </div>
  );
};

export default SortableCard;
