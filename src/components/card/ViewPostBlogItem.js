import Image from "next/image";
import { getFileUrl } from "../../utility/Util";
import Link from "next/link";
import { useRouter } from "next/router";
import Video from "../video";
import AnimatedCaakButton from "../button/animatedCaakButton";

const ViewPostBlogItem = ({ postItem, postId, singleItem, index }) => {
  const router = useRouter();

  return (
    <div className={"flex flex-col mt-[40px]"}>
      <div className={"relative h-[438px] w-full pt-[4px]"}>
        {postItem.file.type.startsWith("video") ? (
          <Video
            videoClassname={"object-contain rounded-[4px]"}
            src={getFileUrl(postItem.file)}
          />
        ) : !singleItem ? (
          <Link
            href={{
              pathname: `${router.pathname}/[itemId]`,
              query: {
                id: postId,
                itemId: postItem.id,
                isModal: true,
                itemIndex: index,
              },
            }}
            as={`${router.asPath}/${postItem.id}`}
            shallow={true}
            scroll={false}
          >
            <a>
              <div className={"relative h-[438px] w-full"}>
                <Image
                  className={"rounded-[6px]"}
                  objectFit={"cover"}
                  layout={"fill"}
                  src={getFileUrl(postItem.file)}
                  alt={postItem.file.name}
                />
              </div>
            </a>
          </Link>
        ) : (
          <div className={"relative h-[438px] w-full"}>
            <Image
              className={"rounded-[6px]"}
              objectFit={"cover"}
              layout={"fill"}
              src={getFileUrl(postItem.file)}
              alt={postItem.file.name}
            />
          </div>
        )}

        {!singleItem && (
          <div
            className={
              "flex flex-row absolute bottom-[12px] right-[10px] bg-white h-[26px] px-[8px] py-[4px] border-[1px] border-white rounded-[100px]"
            }
          >
            <AnimatedCaakButton
              reactionType={"POST_ITEM"}
              itemId={postItem.id}
              totals={postItem.totals}
              reacted={postItem.reacted}
              textClassname={
                "text-[13px] font-medium text-13px tracking-[0.2px] leading-[16px] text-caak-nocturnal ml-[4px]"
              }
              iconContainerClassname={"w-[18px] h-[18px] mb-[2px]"}
              iconColor={"text-caak-nocturnal"}
              iconClassname={"text-[18px]"}
            />
            <div
              onClick={() => {
                router.push(
                  {
                    pathname: `${router.pathname}/[itemId]`,
                    query: {
                      id: postId,
                      itemId: postItem.id,
                      isModal: true,
                    },
                  },
                  `${router.asPath}/${postItem.id}`
                );
              }}
              className={"flex flex-row items-center ml-[10px]"}
            >
              <div
                className={
                  "group flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
                }
              >
                <span
                  className={
                    "icon-fi-rs-comment text-caak-cherenkov text-[16.5px]"
                  }
                />
              </div>
              <p
                className={
                  "text-[13px] text-caak-darkBlue font-medium tracking-[0.21px] leading-[16px] ml-[4px]"
                }
              >
                {postItem.totals.comments}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={"pt-[20px]"}>
        <p
          className={
            "text-caak-generalblack text-[16px] tracking-[0.38px] leading-[22px] whitespace-pre-wrap"
          }
        >
          {!singleItem ? (
            <Link
              href={{
                pathname: `${router.pathname}/[itemId]`,
                query: {
                  id: postId,
                  itemId: postItem.id,
                  isModal: true,
                },
              }}
              as={`${router.asPath}/${postItem.id}`}
            >
              <a className={"relative"}>{postItem.title}</a>
            </Link>
          ) : (
            postItem.title
          )}
        </p>
      </div>
    </div>
  );
};

export default ViewPostBlogItem;
