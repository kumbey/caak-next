import { getFileUrl } from "../../utility/Util";
import Link from "next/link";
import { useRouter } from "next/router";

const GroupTrendPostsCardItem = ({ item, onClickItem }) => {
  const firstItem = item.items.items[0];
  const router = useRouter();

  return (
    <div className={"flex flex-row mb-[21px]"} onClick={onClickItem}>
      <Link
        shallow
        as={`/post/view/${item.id}`}
        href={{
          query: {
            ...router.query,
            viewPost: "post",
            id: item.id,
            // prevPath: router.query.prevPath,
            isModal: true,
          },
        }}
      >
        <a>
          <div
            className={
              "w-[80px] h-[80px] rounded-square relative flex-shrink-0 cursor-pointer"
            }
          >
            {firstItem.file.type.startsWith("video") ? (
              <div className={"relative w-full h-full"}>
                {firstItem.thumbnail && (
                  <div
                    className={
                      "absolute h-full w-full top-0 left-0 brightness-[.4]"
                    }
                  >
                    <img
                      alt=""
                      className={"w-full h-full object-cover rounded-[4px]"}
                      src={getFileUrl(firstItem.thumbnail)}
                    />
                  </div>
                )}
                {firstItem.thumbnail ? (
                  <img
                    alt=""
                    className={
                      "relative w-full h-full object-contain rounded-[4px]"
                    }
                    src={getFileUrl(firstItem.thumbnail)}
                  />
                ) : (
                  <div className={"w-full h-full bg-gray-500 rounded-[4px]"} />
                )}

                <div
                  className={
                    "flex cursor-pointer items-center justify-center w-[20px] h-[20px] rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                  }
                >
                  <span
                    className={"icon-fi-rs-play-button text-[16px] text-white "}
                  />
                </div>
              </div>
            ) : (
              // <Video
              //   light={getFileUrl(firstItem.thumbnail)}
              //   initialAutoPlay={false}
              //   smallIndicator
              //   disableOnClick
              //   hideControls
              //   containerClassname={"rounded-[4px]"}
              //   videoClassname={"object-contain rounded-[4px]"}
              //   src={
              //     firstItem.file.url
              //       ? getFileUrl(firstItem.file.url)
              //       : generateFileUrl(firstItem.file)
              //   }
              // />
              <img
                alt={firstItem.file.name}
                src={getFileUrl(firstItem.file)}
                className={"rounded-square object-cover w-full h-full"}
              />
            )}
          </div>
        </a>
      </Link>

      <div className={"flex flex-col ml-[10px] justify-between"}>
        <Link
          shallow
          as={`/post/view/${item.id}`}
          href={{
            query: {
              ...router.query,
              viewPost: "post",
              id: item.id,
              // prevPath: router.asPath,
              isModal: true,
            },
          }}
        >
          <a>
            <p
              className={
                "text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] truncate-3 cursor-pointer"
              }
            >
              {item.title}
            </p>
          </a>
        </Link>

        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center"}>
            <div
              className={"flex justify-center items-center w-[20px] h-[20px]"}
            >
              <span
                className={"icon-fi-rs-rock-i text-caak-scriptink text-[20px]"}
              />
            </div>
            <p
              className={
                "text-caak-nocturnal tracking-[0.23px] leading-[18px] text-[15px] ml-[4px]"
              }
            >
              {item.totals.reactions}
            </p>
          </div>

          <div className={"flex flex-row items-center ml-[12px]"}>
            <div
              className={
                "flex items-center justify-center w-[20px] h-[20px] cursor-pointer"
              }
            >
              <span
                className={
                  "icon-fi-rs-comment-o text-caak-scriptink text-[20px]"
                }
              />
            </div>
            <p
              className={
                "text-[15px] text-caak-nocturnal tracking-[0.21px] leading-[16px] ml-[4px]"
              }
            >
              {item.totals.comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTrendPostsCardItem;
