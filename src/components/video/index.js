import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Router, { useRouter } from "next/router";
import ItemsCounterCard from "../card/ItemsCounterCard";
import { useWrapper } from "../../context/wrapperContext";
import { useInView } from "react-intersection-observer";
import { useUser } from "../../context/userContext";
import Tooltip from "../tooltip/Tooltip";

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

const Video = ({
  src,
  containerClassname,
  videoClassname,
  postId,
  route,
  hideControls,
  smallIndicator,
  thumbnailIcon,
  durationIndicator,
  disableOnClick,
  loop,
  videoFileId,
  initialAutoPlay,
  postItemId,
  itemIndex,
  ...props
}) => {
  const { user, isLogged } = useUser();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoPlayEnabled] = useState(
    typeof initialAutoPlay === "boolean"
      ? initialAutoPlay
      : isLogged &&
        typeof JSON.parse(user.meta)?.settings?.autoPlay === "boolean"
      ? JSON.parse(user.meta)?.settings?.autoPlay
      : true
  );
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [volumeSliderActive, setVolumeSliderActive] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const canvasRef = useRef();
  const { currentPlayingVideoId, setCurrentPlayingVideoId } = useWrapper();
  const [ref, inView, entry] = useInView({
    threshold: 0.5,
  });

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };
  const handleSeekMouseDown = () => {
    setSeeking(true);
  };
  const handleSeekMouseUp = (e) => {
    e.stopPropagation();
    setSeeking(false);
    videoRef.current.seekTo(parseFloat(e.target.value));
    // setIsPlaying(true);
  };
  const handleFullscreen = (event) => {
    event.stopPropagation();
    const videoElem = videoRef.current.getInternalPlayer();
    videoElem.requestFullscreen();
  };
  const handleProgress = (state) => {
    if (!seeking) {
      setPlayedSeconds(state.playedSeconds);
      setPlayed(state.played);
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    setVolume(parseFloat(e.target.value));
  };

  function secondsToTime(e) {
    const m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
  }

  useEffect(() => {
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);
  //Buggy when 2 videos visible on viewport at the same time
  useEffect(() => {
    if (inView) {
      setLoaded(true);
      if (videoRef.current.player.isReady) {
        const windowHeight = window.innerHeight;
        const thisVideoEl = videoRef.current.player.player.player,
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;
        if (
          videoClientRect <= windowHeight - videoHeight * 0.5 &&
          videoClientRect >= 0 - videoHeight * 0.5
        ) {
          setIsPlaying(isAutoPlayEnabled);
          setCurrentPlayingVideoId(videoFileId);
        } else {
          setIsPlaying(false);
        }
      }
      // setIsPlaying(isAutoPlayEnabled);
      // setIsMuted(isAutoPlayEnabled);
      setCurrentPlayingVideoId(videoFileId);
    } else if (!inView && loaded) {
      setIsPlaying(false);
      // setCurrentPlayingVideoId(null);
    }

    // eslint-disable-next-line
  }, [inView]);

  useEffect(() => {
    const onBlur = () => {
      setIsPlaying(false);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.addEventListener("blur", onBlur);
    };
  });

  //Only play one video at a time
  useEffect(() => {
    if (currentPlayingVideoId !== videoFileId) {
      setIsPlaying(false);
    }
  }, [currentPlayingVideoId, videoFileId]);

  Router.events.on("routeChangeStart", () => setIsPlaying(false));
  return (
    <div
      className={`relative w-full h-full group bg-black ${
        containerClassname ? containerClassname : ""
      }`}
    >
      <canvas
        style={{
          filter: "blur(4px)",

          opacity: "0.3",
        }}
        className={`${
          containerClassname ? containerClassname : ""
        } w-full h-full absolute top-0 z-[1] object-cover`}
        ref={canvasRef}
      />

      <div
        ref={ref}
        onClick={() => {
          if (!disableOnClick && !isPlaying) {
            setCurrentPlayingVideoId(videoFileId);
            setIsPlaying(true);
          }
        }}
        onDoubleClick={() => {
          !disableOnClick &&
            route &&
            router.push(
              {
                pathname: router.pathname,
                query: {
                  ...router.query,
                  ...(postItemId
                    ? { viewItemPost: "postItem", itemId: postItemId }
                    : { viewPost: "post" }),
                  id: postId,
                  prevPath: router.asPath,
                  isModal: true,
                },
              },
              `${
                postItemId
                  ? `/post/view/${postId}/${postItemId}`
                  : `/post/view/${postId}`
              }`,
              { shallow: true }
            );
        }}
        onTouchEnd={(e) => {
          if (isDblTouchTap(e)) {
            if (!disableOnClick && route) {
              router.push(
                {
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    ...(postItemId
                      ? { viewItemPost: "postItem", itemId: postItemId, itemIndex: itemIndex }
                      : { viewPost: "post" }),
                    id: postId,
                    prevPath: router.asPath,
                    isModal: true,
                  },
                },
                `${
                  postItemId
                    ? `/post/view/${postId}/${postItemId}`
                    : `/post/view/${postId}`
                }`,
                { shallow: true }
              );
            }
          }
        }}
        className={`relative w-full h-full group z-[2]`}
      >
        {inView || loaded ? (
          <ReactPlayer
            light={thumbnailIcon}
            ref={videoRef}
            playing={isPlaying}
            muted={isMuted}
            loop={loop}
            volume={volume}
            onEnded={() => {
              setIsPlaying(false);
            }}
            onReady={(e) => {
              if (canvasRef.current && videoRef.current) {
                canvasRef.current.width =
                  videoRef.current.player.player.player.videoWidth;
                canvasRef.current.height =
                  videoRef.current.player.player.player.videoHeight;
                const ctx = canvasRef.current.getContext("2d");
                ctx.drawImage(
                  videoRef.current.player.player.player,
                  0,
                  0,
                  canvasRef.current.width,
                  canvasRef.current.height
                );
              }
              setVideoDuration(e.getDuration());
            }}
            onProgress={handleProgress}
            className={`${videoClassname ? videoClassname : ""} react-player`}
            width={"100%"}
            height={"100%"}
            url={src}
            {...props}
          />
        ) : null}

        {!smallIndicator && !isPlaying && (
          <div
            onClick={() => {
              !disableOnClick && setIsPlaying(true);
            }}
            className={
              "cursor-pointer flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[#0000004D] border-[2px] border-white absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
            }
          >
            <div className={"w-[28px] h-[28px] flex items-center justify-end"}>
              <span
                className={"icon-fi-rs-play-button text-[23px] text-white"}
              />
            </div>
          </div>
        )}

        {smallIndicator && !isPlaying && (
          <div
            className={
              "z-[100 flex cursor-pointer items-center justify-center w-[20px] h-[20px] rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            }
          >
            <span
              className={"icon-fi-rs-play-button text-[14px] text-white "}
            />
          </div>
        )}
        {durationIndicator && (
          <ItemsCounterCard
            containerClassname={"right-[10px]"}
            duration={videoDuration}
          />
        )}
      </div>
      {!hideControls && (
        <div
          className={
            "h-[18px] z-[2] w-full absolute bottom-[21px] px-[21px] transition-all duration-300 opacity-0 group-hover:opacity-100"
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
                <span
                  className={"icon-fi-rs-play-button text-[14px] text-white"}
                />
              )}
            </div>
            <div className={"ml-[8px] w-[44px]"}>
              <p className={"text-[14px] font-bold text-white w-[44px]"}>
                {secondsToTime(videoDuration - playedSeconds)}
              </p>
            </div>

            <div
              className={
                "flex items-center w-full h-[2px] relative bg-white bg-opacity-40 mx-[18px]"
              }
            >
              <input
                className={"videoPlayerSeek w-full h-[2px]"}
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onTouchStart={handleSeekMouseDown}
                onTouchEnd={handleSeekMouseUp}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
              />
            </div>

            <Tooltip
              debounceValue={0.1}
              className={"right-1/2 translate-x-1/2"}
              content={
                <div
                  className={
                    "flex items-center justify-center bg-transparent pt-[4px] rounded-[4px] w-[26px] h-[68px] relative bottom-[90px]"
                  }
                >
                  <div
                    className={`transition-all duration-300 items-center justify-center rounded-[4px]`}
                  >
                    <input
                      orient="vertical"
                      onClick={(e) => e.stopPropagation()}
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              }
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMuted && volume === 0) {
                    setVolume(0.8);
                  } else {
                    setVolume(0);
                    setIsMuted(!isMuted);
                  }
                  setVolumeSliderActive(!volumeSliderActive);
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
            </Tooltip>
            <div
              onClick={(e) => {
                handleFullscreen(e);
              }}
              className={
                "w-[24px] h-[24px] flex items-center justify-center relative cursor-pointer ml-[8px]"
              }
            >
              <span
                className={"icon-fi-rs-full-screen text-white text-[22px]"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
