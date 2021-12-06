import { useState } from "react";
import Image from "next/image";
import Button from "../button";
import { updatePost } from "../../graphql-custom/post/mutation";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  extractDate,
  generateTimeAgo,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";
import Divider from "../divider";

const GroupPostItem = ({ imageSrc, post, ...props }) => {
  const [loading, setLoading] = useState(false);

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
    <>
      <div className="flex w-full justify-evenly  items-center ">
        <div className=" mr-3">
          <div className={"w-[64px] h-[64px] "}>
            <Image
              className=" bg-white rounded-3xl"
              src={!imageSrc ? getGenderImage("default") : getFileUrl(imageSrc)}
              width={64}
              height={64}
              layout="responsive"
              //   objectFit={"cover"}
              alt="#"
            />
          </div>
        </div>
        <div className="flex  w-[220px]  justify-between">
          <div className="text-15px  text-caak-generalblack font-inter font-medium">
            {post.title}
          </div>
        </div>
        <div className="flex w-[200px] text-xs items-center text-caak-darkBlue font-normal font-inter">
          <div className={"w-[28px] h-[28px]  mx-[6px]"}>
            <Image
              className=" bg-white rounded-full"
              src={!imageSrc ? getGenderImage("default") : getFileUrl(imageSrc)}
              width={28}
              height={28}
              layout="responsive"
              //   objectFit={"cover"}
              alt="#"
            />
          </div>
          <div className="mr-[24px]">@{post.user.nickname}</div>
          <div className="">
            <p className={"text-[14px] tracking-[0.21px]  leading-[16px]"}>
              {`${extractDate(post.createdAt).year}.${
                extractDate(post.createdAt).month
              }.${extractDate(post.createdAt).day}`}
            </p>
          </div>
        </div>

        <div className=" flex p-2 ">
          <Button
            loading={loading}
            onClick={() => postHandler(post.id, "CONFIRMED")}
            className="bg-caak-bleudefrance text-15px w-full mr-2.5 text-white"
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
      </div>
      <Divider color={"border-titaniumwhite"} className={"w-full py-4"} />
    </>
  );
};

export default GroupPostItem;
