import React from "react";
import { getFileUrl } from "../../../utility/Util";
import Link from "next/link";

const CardImageContainer = ({ files, postId }) => {
  return (
    <Link href={`/post/view/${postId}`}>
      <div className={"relative"}>
        {files.length > 1 ? (
          <div
            className={
              "flex flex-row tracking-wide items-center text-center align-middle absolute font-bold h-5 top-3 right-3 text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1"
            }
          >
            <span className={"icon-fi-rs-album mr-1 text-11px"} />+
            {files?.length}
          </div>
        ) : (
          ""
        )}
        <img
          src={getFileUrl(files[0].file)}
          className={"w-full h-full max-h-[770px] object-cover"}
          alt={""}
        />
      </div>
    </Link>
  );
};

export default CardImageContainer;
