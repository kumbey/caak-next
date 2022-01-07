import Image from "next/image";
import { getFileUrl } from "../../../../utility/Util";

const CommentItem = ({ comment }) => {
  return (
    <div
      className={
        "flex flex-row my-[4px] leading-[24px] tracking-[0.21px] transition-all duration-100"
      }
    >
      <div className={"flex flex-row "}>
        <div className={"w-[24px] h-[24px] rounded-full"}>
          <img
            className={"rounded-full object-cover w-full h-full"}
            src={getFileUrl(comment.user.pic)}
            alt="Comment user"
            width={24}
            height={24}
            // objectFit="cover"
          />
        </div>
        <div
          className={"text-14px font-medium text-caak-generalblack mx-[8px]"}
        >
          {comment.user.nickname}
        </div>
      </div>

      <div className={"text-14px text-caak-generalblack flex-grow"}>
        {comment.comment}
      </div>
    </div>
  );
};

export default CommentItem;
