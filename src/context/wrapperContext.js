import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WrapperContext = createContext();

function useWrapper() {
  const context = useContext(WrapperContext);
  if (!context) {
    throw new Error(`useWrapper must be used within a WrapperProvider`);
  }

  return context;
}

function WrapperProvider(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationMenu, setIsNotificationMenu] = useState(false);
  const [feedSortType, setFeedSortType] = useState("");
  const [navBarTransparent, setNavBarTransparent] = useState(false);
  const [groupIcon, setGroupIcon] = useState(false);
  const [currentPlayingVideoId, setCurrentPlayingVideoId] = useState(null);
  const [loadedVideos, setLoadedVideos] = useState([]);

  useEffect(() => {
    for (let i = 0; i < loadedVideos.length; i++) {
      if (loadedVideos[i].player) {
        loadedVideos[i].getInternalPlayer().addEventListener(
          "play",
          function () {
            pauseAll(this);
          },
          true
        );
      }
    }

    function pauseAll(elem) {
      for (let i = 0; i < loadedVideos.length; i++) {
        const video = loadedVideos[i];
        if (video.player) {
          if (video.getInternalPlayer() === elem) continue;
          if (
            video.getInternalPlayer().played.length > 0 &&
            !video.getInternalPlayer().paused
          ) {
            video.getInternalPlayer().pause();
          }
        }
      }
    }

    return () => {
      loadedVideos.map((video) => {
        if (video.player)
          video.getInternalPlayer().removeEventListener(
            "play",
            function () {
              pauseAll(this);
            },
            true
          );
      });
    };
  }, [loadedVideos]);
  useEffect(() => {
    console.log(loadedVideos);
  }, [loadedVideos]);
  const value = useMemo(
    () => ({
      loadedVideos,
      setLoadedVideos,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isNotificationMenu,
      setIsNotificationMenu,
      feedSortType,
      setFeedSortType,
      navBarTransparent,
      setNavBarTransparent,
      groupIcon,
      setGroupIcon,
      currentPlayingVideoId,
      setCurrentPlayingVideoId,
    }),
    [
      loadedVideos,
      isMobileMenuOpen,
      isNotificationMenu,
      feedSortType,
      navBarTransparent,
      groupIcon,
      currentPlayingVideoId,
    ]
  );
  return <WrapperContext.Provider value={value} {...props} />;
}

export { WrapperProvider, useWrapper };
