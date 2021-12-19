import Image from "next/image";
import { getFileUrl } from "../../../utility/Util";
import { useUser } from "../../../context/userContext";
import ItemsCounterCard from "../ItemsCounterCard";
import { useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import { useRouter } from "next/router";
import useDeviceDetect from "../../../hooks/useDeviceDetect";

const UserPostsCard = ({ post }) => {
  const firstItem = post ? post.items.items[0] : null;
  const [videoDuration, setVideoDuration] = useState(0);
  const { user } = useUser();
  const [playing, setPlaying] = useState(false);
  const router = useRouter();
  const { isMobile } = useDeviceDetect();

  return firstItem ? (
    <div
      className={"rounded-[4px] w-full h-[391px] userPostsItem relative group"}
    >
      {firstItem.file.type.startsWith("video") ? (
        <div
          onClick={() => setPlaying(!playing)}
          className={"rounded-[4px] relative w-full h-full"}
        >
          <ReactPlayer
            playing={playing}
            loop
            onReady={(e) => setVideoDuration(Math.floor(e.getDuration()))}
            onProgress={(e) =>
              setVideoDuration(Math.floor(e.loadedSeconds - e.playedSeconds))
            }
            className={"react-player rounded-[4px] object-cover"}
            width={"100%"}
            height={"100%"}
            url={getFileUrl(firstItem.file)}
          />
        </div>
      ) : (
        <div className={"relative w-full h-full"}>
          <Image
            className={"rounded-[4px]"}
            objectFit={"cover"}
            layout={"fill"}
            alt={""}
            src={
              firstItem.file
                ? getFileUrl(firstItem.file)
                : "https://picusm.photos/300/600"
            }
          />
        </div>
      )}
      <div
        className={`absolute bottom-0 rounded-b-[4px] w-full h-[161px] z-[1] userProfilePostsCardGradient ${
          isMobile ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100 transition-all duration-300`}
      />

      {firstItem.file.type.startsWith("video") ? (
        <ItemsCounterCard
          duration={videoDuration}
          count={post.items.items.length}
        />
      ) : (
        <ItemsCounterCard count={post.items.items.length} />
      )}

      {post.user.id === user?.id && (
        <div
          onClick={() => router.push(`/post/edit/${post.id}`)}
          className={`cursor-pointer w-[28px] h-[28px] bg-white rounded-full z-[1] absolute top-[12px] left-[12px] p-[6px] ${
            isMobile ? "block" : "hidden"
          } group-hover:block`}
        >
          <div className={"flex items-center justify-center w-[16px] h-[16px]"}>
            <span className={"icon-fi-rs-edit-f text-black text-[14px]"} />
          </div>
        </div>
      )}

      <div
        className={`flex flex-col absolute bottom-[18px] pr-[18px] left-[18px] z-[2] ${
          isMobile ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100 transition-all duration-300`}
      >
        <Link href={`/post/view/${post.id}`}>
          <a>
            <p
              className={
                "text-white font-roboto text-[18px] tracking-[0.36px] leading-[23px]"
              }
            >
              {post.title}
            </p>
          </a>
        </Link>

        <div
          className={
            "flex flex-row items-center rounded-[100px] bg-black bg-opacity-60 self-start py-[4px] px-[8px] mt-[13px]"
          }
        >
          <div className={"flex flex-row items-center"}>
            <div
              className={"flex items-center justify-center w-[18px] h-[18px]"}
            >
              <span
                className={"icon-fi-rs-rock-f text-caak-uclagold text-[18px]"}
              />
            </div>
            <p
              className={
                "text-white text-[14px] tracking-[0.21px] leading-[16px] ml-[4px]"
              }
            >
              {post.totals.reactions}
            </p>
          </div>
          <div className={"flex flex-row items-center ml-[10px]"}>
            <div
              className={"flex items-center justify-center w-[18px] h-[18px]"}
            >
              <span
                className={
                  "icon-fi-rs-comment-f text-caak-cherenkov text-[17px]"
                }
              />
            </div>
            <p
              className={
                "text-white text-[14px] tracking-[0.21px] leading-[16px] ml-[4px]"
              }
            >
              {post.totals.comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default UserPostsCard;
