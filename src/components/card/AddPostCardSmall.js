import DropZone from "../input/DropZone";

const AddPostCardSmall = ({ post, setPost }) => {
  return (
    <div className={"h-full w-full max-h-44"}>
      <DropZone
        title={"Нэмж оруулах"}
        subTitle={"Дээд хэмжээ 4мб"}
        className={"h-full w-full"}
        post={post}
        setPost={setPost}
        subTitleStyle={"text-caak-aleutian text-12px"}
        titleStyle={"items-center text-caak-generalblack font-medium text-16px"}
        icon={
          <span
            className={
              "icon-fi-rs-add text-caak-generalblack text-20px mb-1 rounded-full bg-white p-3 shadow-card"
            }
          />
        }
      />
    </div>
  );
};

export default AddPostCardSmall;
