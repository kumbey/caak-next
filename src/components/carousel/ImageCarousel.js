import CardVideoContainer from "../card/FeedCard/CardVideoContainer";
import CardImageContainer from "../card/FeedCard/CardImageContainer";
import { useState } from "react";
import { getFileUrl } from "../../utility/Util";
import Image from "next/image";

const ImageCarousel = ({ items, postId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);

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
    } else {
      setActiveIndex(0);
    }
  };
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(items.length - 1);
    }
  };
  return (
    <div className={"relative h-full w-full overflow-hidden"}>
      <div className={"flex flex-nowrap flex-row items-center h-full w-full"}>
        {items.map((item, index) => {
          return (
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              key={index}
              className={"w-full h-full flex-shrink-0 transition duration-300"}
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              <div
                className={
                  "relative flex justify-center items-center w-full h-[462px] bg-black"
                }
              >
                {item.file.type.startsWith("video") ? (
                  <CardVideoContainer postId={postId} file={item.file} />
                ) : (
                  <div
                    className={
                      "w-full h-full relative overflow-hidden bg-black"
                    }
                  >
                    <div
                      className={""}
                      style={{
                        width: "10%",
                        height: "10%",
                        filter: "blur(2px)",
                        position: "absolute",
                        transform: "scale(10)",
                        left: "50%",
                        top: "50%",
                        opacity: "0.3",
                        // zIndex: -1
                      }}
                    >
                      <div className={"relative w-full h-full"}>
                        <Image
                          objectFit={"cover"}
                          layout={"fill"}
                          alt={item.file.type}
                          src={getFileUrl(item.file)}
                        />
                      </div>
                    </div>
                    <CardImageContainer postId={postId} file={item.file} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {activeIndex > 0 && (
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

        {activeIndex !== items.length - 1 && (
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
        <div
          className={
            "flex flex-row absolute right-1/2 translate-x-1/2 bottom-6 z-[10]"
          }
        >
          {items.length > 1 &&
            items.map((_, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-full mr-1.5 w-[8px] h-[8px] bg-white ${
                    activeIndex === index ? "bg-opacity-100" : "bg-opacity-40"
                  } `}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
