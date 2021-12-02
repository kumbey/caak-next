import DropZone from "../input/DropZone";

const AddPostCardSmall = ({ post, setPost }) => {
  return (
    <div
      className={
        "flex items-center justify-center bg-white w-[77px] h-[77px] rounded-[5px] border-[1px] border-dashed"
      }
    >
      <DropZone
        className={"h-full w-full bg-white"}
        post={post}
        setPost={setPost}
        icon={
          <div className={"flex items-center justify-center w-[26px] h-[26px]"}>
            <span
              className={"icon-fi-rs-add-l text-[26px] text-caak-darkBlue"}
            />
          </div>
        }
      />
    </div>
  );
};

export default AddPostCardSmall;
