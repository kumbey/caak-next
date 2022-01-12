import { generateFileUrl, getGenderImage } from "../../utility/Util";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Video from "../video";

const TrendPostsByCategoryItem = ({ item }) => {
  const [firstItem] = useState(item.post.items.items[0]);
  const router = useRouter();
  return (
    <div
      className={
        "flex flex-col w-[240px] h-[320px] rounded-[8px] relative flex-shrink-0 mr-[12px]"
      }
    >
      <Link
        shallow
        href={{
          query: {
            ...router.query,
            id: item.post.id,
            viewPost: "post",
            prevPath: router.asPath,
            isModal: true,
          },
        }}
        as={`/post/view/${item.post.id}`}
      >
        <a>
          <div className={"flex flex-col absolute top-0"}>
            <div className={"relative w-[240px] h-[320px]"}>
              {firstItem.file.type.startsWith("video") ? (
                <Video
                  initialAutoPlay={false}
                  hideControls
                  disableOnClick
                  durationIndicator
                  src={generateFileUrl(firstItem.file)}
                  containerClassname={"rounded-[8px] object-cover"}
                  videoClassname={"rounded-[8px] object-cover"}
                />
              ) : (
                <img
                  alt={""}
                  // layout={"fill"}
                  src={
                    firstItem.file
                      ? generateFileUrl(firstItem.file)
                      : getGenderImage("default").src
                  }
                  // objectFit={"cover"}
                  className={"rounded-[8px] object-cover w-full h-full"}
                />
              )}
            </div>
            <div
              className={`absolute bottom-0 rounded-b-[4px] w-full h-[161px] z-[0] userProfilePostsCardGradient transition-all duration-300`}
            />
          </div>
        </a>
      </Link>

      <div
        className={
          "flex flex-col self-end absolute bottom-[14px] left-[14px] z-[2]"
        }
      >
        <Link href={`/post/view/${item.post.id}`}>
          <a>
            <p className={"text-[15px] text-white mb-[11px]"}>
              {item.post.title}
            </p>
          </a>
        </Link>
        <Link href={`/group/${item.post.group.id}`}>
          <a>
            <div className={"flex flex-row items-center"}>
              <div
                className={
                  "flex items-center justify-center relative w-[18px] h-[18px]"
                }
              >
                <img
                  alt={""}
                  // layout={"fill"}
                  src={
                    item.post.group.profile
                      ? generateFileUrl(item.post.group.profile)
                      : getGenderImage("default").src
                  }
                  // objectFit={"cover"}
                  className={"rounded-[4px] object-cover"}
                />
              </div>

              <p className={"ml-[6px] text-[12px] text-white"}>
                {item.post.group.name}
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TrendPostsByCategoryItem;
