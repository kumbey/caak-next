import { useRef, useState } from "react";
import { getFileUrl } from "../../../utility/Util";
import VideoJS from "../VideoJS";

const CardVideoContainer = ({ file, addPost, postId, indicatorClassname }) => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  let clickTimer = null;
  let autoPlay;

  if (typeof window !== "undefined" && window.localStorage) {
    autoPlay = window.localStorage.getItem("autoPlay")
      ? localStorage.getItem("autoPlay")
      : "false";
  }

  const videoJsOptions = {
    autoplay: autoPlay === "true",
    muted: autoPlay === "true",
    controls: false,
    responsive: false,
    fluid: false,
    sources: [
      {
        src: getFileUrl(file),
        type: "video/mp4",
      },
    ],
  };

  function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  //Double click checker on mobile device
  function doubleTapHandler() {
    if (clickTimer == null) {
      clickTimer = setTimeout(function () {
        clickTimer = null;
        toggleVideo();
      }, 200);
    } else {
      clearTimeout(clickTimer);
      clickTimer = null;
      //When double clicked
      if (playerRef.current) playerRef.current.pause();
      history.push({
        pathname: `/post/view/${postId}`,
      });
    }
  }

  const formattedTime = formatTime(videoDuration);
  return (
    <div
      className={`relative rounded-[4px] ${
        file.length > 0 ? "max-h-100 h-100" : "h-full w-full"
      }`}
    >
      <div
        className={`${
          indicatorClassname ? indicatorClassname : ""
        } z-1 flex flex-row tracking-wide items-center leading-none text-center align-middle absolute font-bold top-3 text-white text-11px bg-black bg-opacity-20 rounded-[4px] h-5 px-2 py-1`}
      >
        <span className={"icon-fi-rs-video mr-1 text-[16px]"} />
        {`${formattedTime.minutes}:${formattedTime.seconds}`}
      </div>
      <VideoJS
        videoRef={videoRef}
        playerRef={playerRef}
        onTouchStart={() => {
          setIsTouching(true);
        }}
        onTouchMove={() => {
          setIsTouching(false);
        }}
        onTouchEnd={() => {
          isTouching && doubleTapHandler();
        }}
        onDoubleClick={() =>
          history.push({
            pathname: `/post/view/${postId}`,
          })
        }
        onLoadedMetadata={(e) => setVideoDuration(e.target.duration)}
        // file={file}
        options={videoJsOptions}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        videoClassName={`videoPlayer video-js vjs-big-play-centered  cursor-pointer`}
      />
    </div>
  );
};

export default CardVideoContainer;
