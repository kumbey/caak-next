import DropZone from "./DropZone";

const DropZoneWithCaption = ({ setPost, post }) => {
  // const onChangeText = (e) => {
  //   setPost({ ...post, title: e.target.value });
  // };

  return (
    <div>
      {/*<div className={"relative flex flex-row mt-2 items-center px-7"}>*/}
      {/*  <textarea*/}
      {/*    rows={1}*/}
      {/*    onChange={onChangeText}*/}
      {/*    maxLength={"200"}*/}
      {/*    placeholder={"Нийтлэлийн тайлбар оруулах..."}*/}
      {/*    className="placeholder-caak-aleutian text-16px focus:outline-none focus:ring-1 focus:ring-caak-primary focus:border-caak-primary w-full pr-12 mb-2 border-transparent rounded resize"*/}
      {/*  />*/}
      {/*  <span className={"absolute right-8 text-14px text-caak-generalblack"}>*/}
      {/*    {textCount}/200*/}
      {/*  </span>*/}
      {/*</div>*/}
      <div
        className={
          "border-caak-titaniumwhite  border border-dashed rounded-square p-1 mx-7"
        }
      >
        <DropZone
          title={"Зураг/Видео нэмэх"}
          subTitleStyle={"text-caak-aleutian text-14px"}
          titleStyle={
            "items-center text-caak-generalblack font-medium text-18px "
          }
          subTitle={"эсвэл шууд чирэн оруулна уу"}
          className={"flex items-center w-full h-64"}
          setPost={setPost}
          post={post}
        />
      </div>
    </div>
  );
};

export default DropZoneWithCaption;
