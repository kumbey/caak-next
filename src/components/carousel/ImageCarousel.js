import { useEffect, useState } from "react";
import { getFileUrl, findMatchIndex } from "../../utility/Util";
import Video from "../video";
import useWindowSize from "../../hooks/useWindowSize";
import { useRouter } from "next/router";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from "../loader";

const ImageCarousel = ({
  items,
  postId,
  mediaContainerClassname,
  card,
  route,
  changeActiveIndex,
  viewPostItem,
  index,
  duration,
}) => {
  const [activeIndex, setActiveIndex] = useState(card ? 0 : index);
  const [itemLength, setItemLength] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const size = useWindowSize();
  const router = useRouter();

  //Swipe left, right on mobile screen
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      nextItem();
    }

    if (diff < -5) {
      prevItem();
    }

    setTouchPosition(null);
  };
  const nextItem = () => {
    if (activeIndex < itemLength - 1) {
      setActiveIndex(activeIndex + 1);
      changeActiveIndex && changeActiveIndex(activeIndex + 1);
    }
  };
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      changeActiveIndex && changeActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    const findActiveIndex = findMatchIndex(items, "id", router.query.itemId);
    if (findActiveIndex <= -1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(findActiveIndex);
    }
    // eslint-disable-next-line
  }, [router.query]);

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 39) {
        nextItem();
      } else if (e.keyCode === 37) {
        prevItem();
      }
    };
    !card && document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  });

  useEffect(() => {
    if (items) {
      let length = 0;
      items.map((item) => {
        if (!(item.isEmbed === "TRUE")) {
          length++;
        }
      });
      setItemLength(length);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div
      style={!card ? { height: size.height } : {}}
      className={`${card ? "h-full" : ""} relative w-full overflow-hidden`}
    >
      {card && itemLength > 1 && (
        <div
          className={
            "flex items-center justify-center absolute top-[10px] right-[10px] z-[1] bg-black bg-opacity-60 rounded-[100px] px-[10px] py-[1px]"
          }
        >
          <p className={"text-[12px] font-roboto text-white"}>{`${
            activeIndex + 1
          }/${itemLength}`}</p>
        </div>
      )}
      {viewPostItem && (
        <div className={"flex flex-row absolute right-[20px] top-[20px]"}>
          <div
            className={
              "flex items-center justify-center w-[67px] h-[40px] bg-caak-carbon z-2 rounded-[100px] mr-[12px]"
            }
          >
            <p className={"text-[16px] font-roboto text-white"}>{`${
              activeIndex + 1
            }/${itemLength}`}</p>
          </div>
          <div className={"hidden md:flex"}>
            <div
              onClick={() => prevItem()}
              className={
                "cursor-pointer flex justify-center p-1 items-center w-[40px] h-[40px] z-2 text-white bg-caak-carbon hover:bg-caak-carbon-hover rounded-full p-1"
              }
            >
              <span
                className={
                  "icon-fi-rs-next text-white text-16px rotate-180 pl-[2px]"
                }
              />
            </div>
            <div
              onClick={() => nextItem()}
              className={
                "cursor-pointer ml-[8px] flex justify-center p-1 items-center w-[40px] h-[40px] z-2 text-white bg-caak-carbon hover:bg-caak-carbon-hover rounded-full p-1"
              }
            >
              <span
                className={"icon-fi-rs-next text-white text-16px pl-[2px]"}
              />
            </div>
          </div>
        </div>
      )}
      <div
        // style={{ height: images?.maxHeight ? images.maxHeight : "100%" }}
        className={"flex flex-nowrap flex-row items-center h-full w-full"}
      >
        <div
          className={
            "flex flex-nowrap flex-row items-center w-full h-[calc(100%+1px)] bg-black"
          }
        >
          {items.map((item, index) => {
            return (
              !item.isEmbed && (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  key={index}
                  className={`w-[calc(100%+1px)] h-[calc(100%+1px)] min-h-[200px] flex items-center flex-shrink-0 transition duration-300 ${
                    card ? `max-h-[770px]` : ""
                  } `}
                  style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                    // height: images?.maxHeight ? images.maxHeight : "100%",
                  }}
                >
                  <div
                    className={`${
                      mediaContainerClassname ? mediaContainerClassname : ""
                    } relative flex justify-center items-center h-full`}
                  >
                    {item.file.type.startsWith("video") ? (
                      <Video
                        durationIndicator={duration}
                        postId={postId}
                        route={route}
                        videoFileId={item.file.id}
                        // containerClassname={"bg-black"}
                        videoClassname={`object-contain items-center justify-center rounded-none ${
                          card ? "videoMaxHeight max-h-[700px]" : "w-full"
                        }`}
                        src={getFileUrl(item.file)}
                        // light={getFileUrl(item.thumbnail)}
                      />
                    ) : (
                      <div
                        className={
                          "w-full h-full relative overflow-hidden z-[1]"
                        }
                      >
                        {route ? (
                          <Link
                            as={`/post/view/${postId}`}
                            shallow
                            href={{
                              query: {
                                ...router.query,
                                viewPost: "post",
                                id: postId,
                                prevPath: router.asPath,
                                isModal: true,
                              },
                            }}
                          >
                            <a>
                              <LazyLoadImage
                                alt={items[index].file.name}
                                className={`${
                                  index === 0
                                    ? "object-cover"
                                    : "object-contain"
                                } w-full h-full`}
                                src={getFileUrl(items[index].file)}
                              />
                            </a>
                          </Link>
                        ) : (
                          <img
                            alt={""}
                            className={"object-contain h-full w-full"}
                            src={getFileUrl(items[index].file)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            );
          })}
        </div>

        {!viewPostItem && activeIndex > 0 && (
          <div
            onClick={() => prevItem()}
            className={
              "cursor-pointer flex justify-center p-1 items-center w-[24px] h-[24px] z-2 absolute text-2xl left-2 text-white top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
            }
          >
            <span
              className={
                "icon-fi-rs-next-b text-black text-16px rotate-180 pl-[2px]"
              }
            />
          </div>
        )}
        {!viewPostItem && activeIndex !== itemLength - 1 && (
          <div
            onClick={() => nextItem()}
            className={
              "cursor-pointer flex justify-center items-center w-[24px] h-[24px] z-2 absolute text-2xl right-2 text-white top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
            }
          >
            <span
              className={"icon-fi-rs-next-b text-black text-16px pl-[2px]"}
            />
          </div>
        )}
        {/*{card && (*/}
        {/*  <div*/}
        {/*    className={`absolute right-1/2 translate-x-1/2 bottom-6 z-[1] w-[154px]`}*/}
        {/*  >*/}
        {/*    <div*/}
        {/*      className={`flex flex-row overflow-hidden w-full ${*/}
        {/*        activeIndex > 10 ? `transform translate-x-[-${activeIndex + 14}px]` : ""*/}
        {/*      }`}*/}
        {/*    >*/}
        {/*      {itemLength > 1 &&*/}
        {/*        items.map((_, index) => {*/}
        {/*          return (*/}
        {/*            <div*/}
        {/*              key={index}*/}
        {/*              className={`flex-shrink-0 rounded-full mr-[6px] w-[8px] h-[8px] bg-opacity-100 bg-white ${*/}
        {/*                activeIndex === index ? `` : "bg-opacity-40"*/}
        {/*              }`}*/}
        {/*            />*/}
        {/*          );*/}
        {/*        })}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

export default ImageCarousel;
