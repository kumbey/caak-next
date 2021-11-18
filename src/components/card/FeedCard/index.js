import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import ImageCarousel from "../../carousel/ImageCarousel";
import { useState } from "react";
import CardVideoContainer from "./CardVideoContainer";
import CardImageContainer from "./CardImageContainer";

const Card = ({ video, verifiedUser, post }) => {
  // const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const nextItem = () => {
    if (activeIndex < post.items.items.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };
  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(post.items.items.length - 1);
    }
  };
  return (
    post && (
      <div className="feedCard relative flex flex-col justify-between mx-auto bg-white rounded-xl shadow-card mb-[24px]">
        <div className={"flex flex-col"}>
          <CardHeader
            postUser={post.user}
            title={post.title}
            postId={post.id}
            group={post.group}
            updatedAt={post.updatedAt}
          />

          <ImageCarousel>
            {post.items.items.map((item, index) => {
              if (item.file.type.startsWith("video")) {
                return (
                  <div
                    // onTouchStart={handleTouchStart}
                    // onTouchMove={handleTouchMove}
                    key={index}
                    className={
                      "w-full flex justify-center flex-shrink-0 transition duration-300"
                    }
                    style={{
                      transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                  >
                    <CardVideoContainer
                      postId={post.id}
                      files={post.items.items}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    // onTouchStart={handleTouchStart}
                    // onTouchMove={handleTouchMove}
                    // onTouchMove={(e) => swiperHandler(e)}
                    key={index}
                    className={
                      "w-full h-full flex-shrink-0 transition duration-300"
                    }
                    style={{
                      transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                  >
                    <CardImageContainer postId={post.id} file={item.file} />
                  </div>
                );
              }
            })}
            {activeIndex > 0 && (
                <span
                    onClick={() => prevItem()}
                    className={
                      "cursor-pointer z-2 absolute text-2xl left-2 text-white  top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1"
                    }
                >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
            )}

            {activeIndex !== post.items.items.length - 1 && (
                <span
                    onClick={() => nextItem()}
                    className={
                      "cursor-pointer z-2 absolute text-2xl right-2 text-white top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1"
                    }
                >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            )}
            <div
              className={
                "flex flex-row absolute right-1/2 translate-x-1/2 bottom-6 z-[10]"
              }
            >
              {post.items.items.length > 1 &&
                post.items.items.map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-full mr-1.5 w-[8px] h-[8px] bg-white ${
                        activeIndex === index
                          ? "bg-opacity-100"
                          : "bg-opacity-40"
                      } `}
                    />
                  );
                })}
            </div>
          </ImageCarousel>

          {/*{video ? (*/}
          {/*  <CardVideoContainer postId={post.id} files={post.items.items} />*/}
          {/*) : (*/}
          {/*  <CardImageContainer postId={post.id} files={post.items.items} />*/}
          {/*)}*/}
        </div>

        <CardFooter
          reacted={post.reacted}
          postId={post.id}
          title={post.title}
          totals={post.totals}
          items={post.items.items}
          // setIsCommentOpen={setIsCommentOpen}
        />
        {/*{isCommentOpen && (*/}
        {/*  <CommentCard*/}
        {/*    isCommentOpen={isCommentOpen}*/}
        {/*    postItemId={post.items.items[0].id}*/}
        {/*    maxComments={4}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    )
  );
};

export default Card;
