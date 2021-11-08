import Masonry from "react-masonry-css";
import CardVideoContainer from "../card/CardVideoContainer";
import AddPostCardSmall from "../card/AddPostCardSmall";
import Button from "../button";
import { getFileUrl } from "../../utility/Util";
import Loader from "../loader";

const Card = ({
  video,
  setIsEditing,
  setCurrentEditingIndex,
  error,
  index,
  post,
  setPost,
  data,
}) => {
  const popItem = (index_arg) => {
    const filteredArray = post.items.filter(function (item, index) {
      return index !== index_arg;
    });

    setPost({ ...post, items: filteredArray });
  };

  const editHandler = (index) => {
    setIsEditing(true);
    setCurrentEditingIndex(index);
  };

  return (
    <div key={index} className={"relative mb-1 w-full group"}>
      <span
        onClick={() => editHandler(index)}
        className={
          "absolute transition duration-300 ease-in-out z-10 opacity-0 group-hover:opacity-100 bottom-2 left-2 motion-safe:hover:animate-spin font-medium cursor-pointer leading-none text-14px text-white bg-black bg-opacity-50 py-2 px-3 rounded-full"
        }
      >
        Засварлах
      </span>
      {error && (
        <span
          className={
            "icon-fi-rs-close absolute bg-white w-full h-full flex justify-center items-center bg-opacity-70 text-caak-primary"
          }
        />
      )}

      {video ? (
        <CardVideoContainer addPost={true} files={data} />
      ) : (
        <img
          src={getFileUrl(data.file)}
          className={"rounded-md w-full h-full max-h-80  object-cover"}
          alt={""}
        />
      )}

      <span
        onClick={() => popItem(index)}
        className={
          "cursor-pointer bg-black bg-opacity-50 text-12px p-2 rounded-full text-white icon-fi-rs-close absolute top-2 right-3"
        }
      />
    </div>
  );
};

const UploadedMediaEdit = ({
  setPost,
  post,
  setIsEditing,
  setCurrentEditingIndex,
  errors,
  loading,
  uploadPost,
}) => {

  return (
    <div>
      {errors && (
        <div
          className={
            "flex flex-row justify-between bg-caak-red bg-opacity-70 w-full p-3.5 px-6 my-4"
          }
        >
          <span className={"text-15px text-white font-normal"}>
            Зураг болон Видео хуулахад алдаа гарлаа.
          </span>
          <span
            className={
              "cursor-pointer text-14px font-medium text-white underline tracking-wider"
            }
          >
            Дэлгэрэнгүй унших..
          </span>
        </div>
      )}
      {/*<div className={"relative flex flex-row mt-2 items-center px-7"}>*/}
      {/*  <textarea*/}
      {/*    rows={1}*/}
      {/*    onChange={onChangeText}*/}
      {/*    value={post.title}*/}
      {/*    maxLength={"200"}*/}
      {/*    placeholder={"Нийтлэлийн тайлбар оруулах..."}*/}
      {/*    className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded resize"*/}
      {/*  />*/}
      {/*  <span*/}
      {/*    className={*/}
      {/*      "absolute right-9 bottom-4 text-14px text-caak-darkBlue font-medium"*/}
      {/*    }*/}
      {/*  >*/}
      {/*    {post.title.length}/200*/}
      {/*  </span>*/}
      {/*</div>*/}
      <div
        className={
          "relative border-caak-titaniumwhite  border border-dashed rounded-square p-1 mx-7"
        }
      >
        {loading && (
          <div
            className={
              "flex items-center justify-center cursor-not-allowed text-center absolute w-full h-screen max-h-full top-0 left-0 z-30 bg-white bg-opacity-90"
            }
          >
            <Loader className={"bg-caak-primary"} />
          </div>
        )}
        <div
          className={`${
            loading ? "overflow-hidden" : "overflow-y-scroll"
          } max-h-96 editor-selection`}
        >
          <Masonry
            breakpointCols={2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {post.items.map((item, index) => {
              let video;
              if (item && item.file.type.startsWith("video")) {
                video = "video";
              } else {
                video = "";
              }
              return (
                <Card
                  key={index}
                  addPost
                  data={item}
                  // error
                  index={index}
                  post={post}
                  setPost={setPost}
                  video={video}
                  setIsEditing={setIsEditing}
                  setCurrentEditingIndex={setCurrentEditingIndex}
                />
              );
            })}
            {post.items.length < 10 && (
              <AddPostCardSmall post={post} setPost={setPost} />
            )}
          </Masonry>
        </div>
      </div>
      <div
        className={
          "text-caak-primary px-7 mt-3 flex flex-row items-center justify-items-start"
        }
      >
        <span className={"icon-fi-rs-desc  cursor-pointer"} />
        <span
          onClick={() => setIsEditing(true)}
          className={"font-medium text-15px ml-2  cursor-pointer"}
        >
          Зураг тус бүрт тайлбар оруулах
        </span>
      </div>
      <div className={"flex flex-row px-4"}>
        <Button
          icon={
            <span
              className={
                "icon-fi-rs-draft mr-1.5 text-caak-generalblack text-20px"
              }
            />
          }
          iconPosition={"left"}
          className={
            "white text-caak-generalblack py-3 w-3/6 ml-1 mt-4 justify-center text-15px mr-2"
          }
        >
          Ноорог
        </Button>
        <Button
          onClick={uploadPost}
          loading={loading}
          className={"mr-2 mt-4 w-full text-17px"}
        >
          Нийтлэх
        </Button>
      </div>
    </div>
  );
};

export default UploadedMediaEdit;
