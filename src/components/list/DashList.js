import Link from "next/link";
import Image from "next/image";
import { getFileUrl, generateTimeAgo } from "../../utility/Util";
import Divider from "../divider";
import Button from "../../components/button";

const DashList = ({ imageSrc, post, ...props }) => {
  return (
    <div className=" ">
      <div className="relative flex items-center ">
        <div className="flex w-[400px] items-center">
          <Link
            href={{
              pathname: `/post/view/${post.id}`,
            }}
          >
            <a>
              <div className={"w-[96px] h-[96px] mr-[12px] relative"}>
                <Image
                  className=" bg-white rounded-md"
                  src={getFileUrl(imageSrc)}
                  width={96}
                  height={96}
                  layout="fixed"
                  //   objectFit={"cover"}
                  alt="#"
                />
              </div>
            </a>
          </Link>

          <div className="flex flex-col  font-inter mr-[26px]">
            <div className="text-15px font-medium text-caak-generalblack">
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
          <div className="h-full rounded-md bg-caak-extraLight font-inter flex items-center">
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
          <Button
            onClick={() => null}
            round
            className={
              "hover:bg-gray-100 border border-gray-200 w-[102px] h-[39px]  font-medium font-inter rounded-lg text-caak-generalblack text-16px bg-white relative"
            }
          >
            <p className="">Засах</p>
          </Button>
        </div>
      </div>
      <Divider color={"border-titaniumwhite"} className={"pb-5"} />
    </div>
  );
};

export default DashList;
