import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
const dblTouchTapMaxDelay = 300;
let latestTouchTap = {
  time: 0,
  target: null,
};

export function isDblTouchTap(event) {
  const touchTap = {
    time: new Date().getTime(),
    target: event.currentTarget,
  };
  const isFastDblTouchTap =
    touchTap.target === latestTouchTap.target &&
    touchTap.time - latestTouchTap.time < dblTouchTapMaxDelay;
  latestTouchTap = touchTap;
  return isFastDblTouchTap;
}
const Video = ({ src, containerClassname, videoClassname, postId, route }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef();
  const router = useRouter();
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  function secondsToTime(e) {
    const m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div
      onClick={() => setIsPlaying(!isPlaying)}
      onDoubleClick={() =>
        route &&
        router.push({
          pathname: `/post/view/${postId}`,
        })
      }
      onTouchEnd={(e) => {
        if (isDblTouchTap(e)) {
          if (route) {
            setIsPlaying(false);
            router.push({
              pathname: `/post/view/${postId}`,
            });
          }
        }
      }}
      className={`${
        containerClassname ? containerClassname : ""
      } relative w-full h-full group`}
    >
      <ReactPlayer
        ref={videoRef}
        playing={isPlaying}
        muted={isMuted}
        loop
        onReady={(e) => setVideoDuration(e.getDuration())}
        onProgress={(e) => setPlayedSeconds(e.playedSeconds)}
        className={`${videoClassname ? videoClassname : ""} react-player`}
        width={"100%"}
        height={"100%"}
        url={src}
      />
      <div
        className={
          "h-[18px] w-full absolute bottom-[21px] px-[21px] transition-all duration-300 opacity-0 group-hover:opacity-100"
        }
      >
        <div className={"flex flex-row items-center"}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className={
              "w-[24px] h-[24px] flex items-center justify-center cursor-pointer flex-shrink-0"
            }
          >
            {isPlaying ? (
              <span className={"icon-fi-rs-pause text-[18px] text-white"} />
            ) : (
              <span className={"icon-fi-rs-play text-[14px] text-white"} />
            )}
          </div>
          <div className={"ml-[8px] w-[40px]"}>
            <p className={"text-[14px] font-bold text-white"}>
              {secondsToTime(videoDuration - playedSeconds)}
            </p>
          </div>
          <div
            className={
              "flex items-center w-full h-[2px] relative bg-white bg-opacity-40 mx-[18px]"
            }
          >
            <span
              style={{
                width: `${
                  (100 * Math.floor(playedSeconds)) / Math.floor(videoDuration)
                }%`,
              }}
              className={"h-full bg-white absolute top-0 left-0"}
            />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className={
              "w-[24px] h-[24px] flex items-center justify-center relative cursor-pointer"
            }
          >
            <span className={"icon-fi-rs-volume text-white text-[22px]"} />
            {isMuted && (
              <span
                className={`w-full bg-white h-[2px] absolute rotate-[45deg]`}
              />
            )}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              // videoRef.current
            }}
            className={
              "w-[24px] h-[24px] flex items-center justify-center relative cursor-pointer ml-[8px]"
            }
          >
            <span className={"icon-fi-rs-full-screen text-white text-[22px]"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
