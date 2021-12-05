import { useState } from "react";
import Image from "next/image";
import Button from "../button";
import { updatePost } from "../../graphql-custom/post/mutation";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";
import { useClickOutSide } from "../../Utility/Util";

import DropDown from "../navigation/DropDown";

const GroupPostItem = ({ imageSrc, post, ...props }) => {
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [loading, setLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const postHandler = async (id, status) => {
    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: { id, status, expectedVersion: post.version },
        })
      );
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  return (
    <div className="bg-white  flex w-full   rounded-lg shadow-card  mb-[24px]">
      <div className="flex m-[15px] items-center ">
        <div className=" mr-3">
          <div className={"w-[96px] h-[96px] "}>
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
        <div className="flex flex-col w-[400px]  justify-between">
          <div className="text-15px text-caak-generalblack font-inter font-medium">
            {post.title}
          </div>
          <div className="flex mt-1 text-xs text-caak-darkBlue font-normal font-inter">
            <div className="mr-[23px]">{post.group.name}</div>
            <div className="mr-[24px]">@{post.user.nickname}</div>
            <div className="">{generateTimeAgo(post.createdAt)}</div>
          </div>
        </div>
        <div className="relative justify-end">
          <span
            ref={menuRef}
            onClick={toggleMenu}
            className="icon-fi-rs-dots p-3 text-30px hidden md:flex cursor-pointer  hover:bg-caak-liquidnitrogen"
          />
          <DropDown
            className={"top-5"}
            open={isMenuOpen}
            onToggle={toggleMenu}
            content={
              <div className="dropdown-item-wrapper flex flex-col w-full p-2">
                <Button
                  loading={loading}
                  onClick={() => postHandler(post.id, "CONFIRMED")}
                  className="bg-caak-bleudefrance text-15px w-full mb-2 mr-2 text-white"
                >
                  Зөвшөөрөх
                </Button>
                <Button
                  loading={loading}
                  onClick={() => postHandler(post.id, "ARCHIVED")}
                  className="text-caak-generalblack text-15px w-full bg-white border"
                >
                  Татгалзах
                </Button>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default GroupPostItem;
