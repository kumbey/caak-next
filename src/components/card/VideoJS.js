import { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = ({
  options,
  onReady,
  videoClassName,
  pressToPlay,
  videoRef,
  playerRef,
  ...props
}) => {
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
        player.tech_.off("dblclick");
      }));
    }
    // eslint-disable-next-line
  }, [options]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        preload={"auto"}
        ref={videoRef}
        controlsList="nodownload noremoteplayback noplaybackrate"
        className={videoClassName}
        {...props}
      />
    </div>
  );
};

export default VideoJS;
