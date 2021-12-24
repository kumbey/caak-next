import CardImageContainer from "../card/FeedCard/CardImageContainer";
import { useEffect, useState } from "react";
import {
  getFileUrl,
  findMatchIndex,
  generateFileUrl,
} from "../../utility/Util";
import Image from "next/image";
import Video from "../video";
import useWindowSize from "../../hooks/useWindowSize";
import { useRouter } from "next/router";
import Link from "next/link";

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
  cover,
  singleItem,
}) => {
  const [activeIndex, setActiveIndex] = useState(card ? 0 : index);
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
    if (activeIndex < items.length - 1) {
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
  return (
    <div
      style={!card ? { height: size.height } : {}}
      className={`${card ? "h-full" : ""} relative w-full overflow-hidden`}
    >
      {card && items.length > 1 && (
        <div
          className={
            "flex items-center justify-center absolute top-[10px] right-[10px] z-[1] bg-black bg-opacity-60 rounded-[100px] px-[10px] py-[1px]"
          }
        >
          <p className={"text-[12px] font-roboto text-white"}>{`${
            activeIndex + 1
          }/${items.length}`}</p>
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
            }/${items.length}`}</p>
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
      <div className={"flex flex-nowrap flex-row items-center h-full w-full"}>
        <div className={"flex flex-nowrap flex-row items-center h-full w-full"}>
          {items.map((item, index) => {
            return (
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                key={index}
                className={`w-full h-full flex items-center flex-shrink-0 transition duration-300 ${
                  card
                    ? `${
                        !singleItem ? "h-[650px]" : ""
                      } min-h-[432px] max-h-[770px]`
                    : ""
                } `}
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                }}
              >
                <div
                  className={`${
                    mediaContainerClassname ? mediaContainerClassname : ""
                  } relative flex justify-center items-center`}
                >
                  {item.file.type.startsWith("video") ? (
                    <Video
                      durationIndicator={duration}
                      postId={postId}
                      route={route}
                      containerClassname={"rounded-[8px]"}
                      videoClassname={"object-contain rounded-none"}
                      src={getFileUrl(item.file)}
                    />
                  ) : (
                    <div
                      className={
                        "w-full h-full relative overflow-hidden bg-black"
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
                            <div
                              className={
                                "w-full h-full min-h-[432px] max-h-[770px] relative"
                              }
                            >
                              <div
                                className={""}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  filter: "blur(12px)",
                                  position: "absolute",
                                  // transform: "scale(12)",
                                  opacity: "0.3",
                                  zIndex: 1,
                                }}
                              >
                                <div className={"relative w-full h-full"}>
                                  <img
                                    alt={item.file.type}
                                    src={getFileUrl(item.file)}
                                    className={"object-cover h-full w-full"}
                                  />
                                </div>
                              </div>

                              {card && singleItem ? (
                                <div
                                  className={
                                    "flex items-center justify-center opacity-100"
                                  }
                                >
                                  <img
                                    alt={""}
                                    src={generateFileUrl(item.file)}
                                    className={
                                      "object-contain w-full h-full min-h-[432px] max-h-[770px] z-2"
                                    }
                                  />
                                </div>
                              ) : (
                                <CardImageContainer
                                  cover={cover}
                                  card={card}
                                  route
                                  postId={postId}
                                  file={item.file}
                                />
                              )}
                            </div>
                          </a>
                        </Link>
                      ) : (
                        <>
                          <div
                            className={""}
                            style={{
                              width: "10%",
                              height: "10%",
                              filter: "blur(2px)",
                              position: "absolute",
                              transform: "scale(12)",
                              left: "50%",
                              top: "50%",
                              opacity: "0.3",
                              // zIndex: -1
                            }}
                          >
                            <div className={"relative w-full h-auto"}>
                              <Image
                                objectFit={"cover"}
                                layout={"fill"}
                                alt={item.file.type}
                                src={getFileUrl(item.file)}
                              />
                            </div>
                          </div>
                          {card && singleItem ? (
                            <div
                              className={
                                "flex items-center justify-center opacity-100"
                              }
                            >
                              <img
                                alt={""}
                                src={generateFileUrl(item.file)}
                                className={
                                  "object-contain w-full h-full min-h-[432px] max-h-[770px] z-2"
                                }
                              />
                            </div>
                          ) : (
                            <CardImageContainer
                              cover={cover}
                              card={card}
                              postId={postId}
                              file={item.file}
                            />
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
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
        {!viewPostItem && activeIndex !== items.length - 1 && (
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
        {/*      {items.length > 1 &&*/}
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
