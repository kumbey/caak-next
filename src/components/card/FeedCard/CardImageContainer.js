import React, { useState } from "react";
import { getFileUrl } from "../../../utility/Util";
import Link from "next/link";
import Image from "next/image";

const CardImageContainer = ({ file, postId }) => {
  return (
    <Link href={{ pathname: `/post/view/${postId}` }}>
      <a>
        <div className={"relative"}>
          {file?.length > 1 ? (
            <div
              className={
                "flex flex-row tracking-wide items-center text-center align-middle absolute font-bold h-5 top-3 right-3 text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1"
              }
            >
              <span className={"icon-fi-rs-album mr-1 text-11px"} />+
              {file?.length}
            </div>
          ) : (
            ""
          )}

          <div className={"relative w-full h-[462px] bg-black"}>
            {/*<div*/}
            {/*    className={"absolute left-0 right-0 w-full h-full"}*/}
            {/*    style={{*/}
            {/*        backgroundImage: `url(${getFileUrl(file)})`,*/}
            {/*        backgroundSize: "cover",*/}
            {/*        filter: "blur(10px)",*/}
            {/*    }}*/}
            {/*/>*/}
            <Image
              placeholder={"blur"}
              blurDataURL={getFileUrl(file)}
              alt={file.name}
              src={getFileUrl(file)}
              className={"w-full h-full max-h-[770px]"}
              // width={"100%"}
              // height={"100%"}
              layout={"fill"}
              objectFit={"contain"}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardImageContainer;
