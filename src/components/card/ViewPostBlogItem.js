import { getFileUrl } from "../../utility/Util";
import { useRouter } from "next/router";
import Video from "../video";
import AnimatedCaakButton from "../button/animatedCaakButton";
import Link from "next/link";
import { decode } from "html-entities";
import ConditionalLink from "../conditionalLink";
import ReactPlayer from "react-player";

const ViewPostBlogItem = ({
  postItem,
  postId,
  singleItem,
  index,
  onlyBlogView,
}) => {
  const router = useRouter();
  const displayNumber = (number)=> {
    if(!number) return ""
    return `${number}. `
  }
  return (
    <div className={"flex flex-col w-full mb-[40px]"}>
      <div className={"relative pt-[4px]"}>
        {postItem.file.type.startsWith("video") ? (
          <div className={"w-full h-[438px]"}>
            <Video
              videoFileId={postItem.id}
              itemIndex={index}
              route={!onlyBlogView}
              postId={postId}
              postItemId={postItem.id}
              containerClassname={"rounded-[4px]"}
              videoClassname={"object-contain rounded-[4px] h-full"}
              src={getFileUrl(postItem.file)}
            />
          </div>
        ) : !singleItem ? (
          <ConditionalLink
            condition={!onlyBlogView}
            wrapper={(children) => (
              <Link
                shallow
                as={`/post/view/${postId}/${postItem.id}`}
                href={{
                  query: {
                    ...router.query,
                    id: postId,
                    viewItemPost: "postItem",
                    itemId: postItem.id,
                    prevPath: router.asPath,
                    isModal: true,
                    itemIndex: index,
                  },
                }}
              >
                <a>{children}</a>
              </Link>
            )}
          >
            {postItem.isEmbed ? (
              <div className={"youtube-player-wrapper"}>
                {
                  <ReactPlayer
                    config={{
                      youtube: {
                        playerVars: { controls: 1 },
                      },
                    }}
                    height={"100%"}
                    width={"100%"}
                    url={getFileUrl(postItem.file)}
                    className={"react-player"}
                  />
                }
              </div>
            ) : (
              <img
                className={"rounded-[6px] object-cover w-full h-full"}
                src={getFileUrl(postItem.file)}
                alt={postItem.file.name}
              />
            )}
          </ConditionalLink>
        ) : (
          <div className={"relative h-[438px] w-full"}>
            <img
              className={"rounded-[6px] object-cover h-full w-full"}
              // objectFit={"cover"}
              // layout={"fill"}
              src={getFileUrl(postItem.file)}
              alt={postItem.file.name}
            />
          </div>
        )}

        {!singleItem && !onlyBlogView && (
          <div
            className={
              "z-[3] flex flex-row absolute bottom-[12px] right-[10px] bg-white h-[26px] px-[8px] py-[4px] border-[1px] border-white rounded-[100px]"
            }
          >
            <AnimatedCaakButton
              // disableOnClick
              subscription={true}
              reactionType={"POST_ITEM"}
              hideCaakText
              itemId={postItem.id}
              totals={postItem.totals}
              reacted={postItem.reacted}
              setReacted={(changedReacted) => {
                postItem.reacted = changedReacted;
              }}
              textClassname={
                "text-[14px] font-medium text-13px tracking-[0.2px] leading-[16px] text-caak-nocturnal ml-[4px]"
              }
              iconContainerClassname={
                "w-[18px] h-[18px] mb-[2px] hover:bg-transparent"
              }
              iconColor={"text-caak-nocturnal"}
              iconClassname={"text-[17.25px]"}
            />
            <Link
              shallow
              as={`/post/view/${postId}/${postItem.id}`}
              href={{
                query: {
                  ...router.query,
                  id: postId,
                  viewItemPost: "postItem",
                  itemId: postItem.id,
                  prevPath: router.asPath,
                  isModal: true,
                  itemIndex: index,
                },
              }}
            >
              <a className={"flex flex-row items-center ml-[10px]"}>
                <div
                  className={
                    "group flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
                  }
                >
                  <span
                    className={
                      "icon-fi-rs-comment-o text-caak-scriptink text-[15.75px]"
                    }
                  />
                </div>
                <p
                  className={
                    "text-[14px] text-caak-darkBlue font-medium tracking-[0.21px] leading-[16px] ml-[4px]"
                  }
                >
                  {postItem.totals ? postItem.totals.comments : -20}
                </p>
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className={"pt-[13px]"}>
        {postItem.description && (
          <p
            className={
              "font-bold text-caak-generalblack text-[16px] mb-[5px] tracking-[0.38px] leading-[22px] whitespace-pre-wrap"
            }
          >
            {`${displayNumber(postItem.display_number)}${decode(postItem.description)}`}
          </p>
        )}
        {onlyBlogView ? (
          <div
            className={
              "text-caak-generalblack text-[16px] tracking-[0.38px] leading-[22px]"
            }
            dangerouslySetInnerHTML={{ __html: postItem.title }}
          />
        ) : (
          <p
            className={
              "text-caak-generalblack text-[16px] tracking-[0.38px] leading-[22px] whitespace-pre-wrap"
            }
          >
            {postItem.title && decode(postItem.title)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewPostBlogItem;
