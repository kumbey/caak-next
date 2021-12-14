import Link from "next/link";
import Image from "next/image";
import { generateTimeAgo, getFileUrl } from "../../utility/Util";
import Button from "../../components/button";

const DashList = ({ imageSrc, post }) => {
  return (
    <div className="first:border-t-0 first:pt-0 border-t-[1px] border-caak-liquidnitrogen pt-[19px] mb-[19px] ">
      <div className="relative flex items-center ">
        <div className="flex w-[400px] items-center">
          <Link
            href={{
              pathname: `/post/view/${post.id}`,
            }}
          >
            <a>
              <div className={"w-[64px] h-[64px] mr-[12px] relative"}>
                <Image
                  className=" bg-white rounded-md"
                  src={getFileUrl(imageSrc)}
                  width={64}
                  height={64}
                  layout="fixed"
                  objectFit={"cover"}
                  alt="#"
                />
              </div>
            </a>
          </Link>

          <div className="flex flex-col  font-inter mr-[26px]">
            <div className="truncate-3 text-15px font-medium text-caak-generalblack">
              <Link
                href={{
                  pathname: `/post/view/${post.id}`,
                }}
              >
                <a>{post.title}</a>
              </Link>
            </div>
            <div className="text-xs font-normal  text-caak-darkBlue">
              {generateTimeAgo(post.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex w-[150px] mr-[10px]">
          <div className="truncate-3 h-full rounded-md bg-caak-extraLight font-inter flex items-center">
            <Link
              href={{
                pathname: `/group/${post.group.id}`,
              }}
            >
              <a>
                <p className="text-caak-generalblack text-13px font-normal mx-2">
                  {post.group.name}
                </p>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex text-sm text-caak-darkBlue mr-2">
          <div className="flex items-center mr-5">
            <span className="icon-fi-rs-rock-i text-20px mr-2 " />
            <p>{post.totals.reactions}</p>
          </div>
          <div className="flex items-center mr-5">
            <span className="icon-fi-rs-comment-o text-20px mr-2 " />
            <p>{post.totals.comments}</p>
          </div>
          <div className="flex items-center">
            <span className="icon-fi-rs-view text-20px mr-2 " />
            <p>{post.totals.views}</p>
          </div>
        </div>
        <div className="flex ml-[10px] ">
          <Link href={`/post/edit/${post.id}`}>
            <a>
              <Button
                round
                className={
                  "hover:bg-gray-100 border border-gray-200 w-[102px] h-[39px]  font-medium font-inter rounded-lg text-caak-generalblack text-16px bg-white relative"
                }
              >
                <p className="">Засах</p>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashList;
