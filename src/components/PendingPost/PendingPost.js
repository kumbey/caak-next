import GroupPostItem from "../group/GroupPostItem";

const PendingPost = ({ pendingPost, imageSrc, ...props }) => {
  return (
    <GroupPostItem
      imageSrc={imageSrc}
      video={imageSrc?.type?.startsWith("video")}
      post={pendingPost}
      className="ph:mb-4 sm:mb-4"
    />
  );
};
export default PendingPost;
