import DropZone from "./DropZone";

const DropZoneWithCaption = ({ setPost, post, setVideoDurationError }) => {
  return (
    <div>
      <div
        className={
          "border-caak-titaniumwhite  border border-dashed rounded-square p-1 mx-[18px] mt-[22px]"
        }
      >
        <DropZone
          title={"Зураг/Видео нэмэх"}
          subTitleStyle={"text-caak-aleutian text-14px"}
          titleStyle={
            "items-center text-caak-generalblack font-medium text-18px "
          }
          setVideoDurationError={setVideoDurationError}
          subTitle={"эсвэл шууд чирэн оруулна уу"}
          className={"flex items-center w-full h-64 bg-caak-liquidnitrogen"}
          setPost={setPost}
          post={post}
        />
      </div>
    </div>
  );
};

export default DropZoneWithCaption;
