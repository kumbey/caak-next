import Image from "next/image";
import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";

const List = ({ video, post, imageSrc, ...props }) => {
  return (
    <div className="bg-white relative flex   mx-auto  rounded-lg shadow-card  mb-[24px]">
      <div className="flex m-[15px]">
        <div className=" mr-3">
          <div className={"w-[96px] h-[96px] relative"}>
            <Image
              className=" bg-white rounded-3xl"
              src={!imageSrc ? getGenderImage("default") : getFileUrl(imageSrc)}
              width={96}
              height={96}
              layout="responsive"
              //   objectFit={"cover"}
              alt="#"
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-15px text-caak-generalblack font-inter font-medium">
            {post.title}
          </div>
          <div className="flex mt-1 text-xs text-caak-darkBlue font-normal font-inter">
            <div className="mr-[23px]">{post.group.name}</div>
            <div className="mr-[24px]">@{post.user.nickname}</div>
            <div className="">{generateTimeAgo(post.createdAt)}</div>
          </div>
          <div className="flex mt-2">
            <div className="flex items-center mr-6 ">
              <span className="icon-fi-rs-rock-i text-2xl mr-2 cursor-pointer" />
              <p>23</p>
            </div>
            <div className="flex items-center mr-6">
              <span className="icon-fi-rs-comment-f text-2xl mr-2 cursor-pointer" />
              <p>14</p>
            </div>
            <div className="flex items-center mr-6">
              <span className="icon-fi-rs-share text-2xl mr-2 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
