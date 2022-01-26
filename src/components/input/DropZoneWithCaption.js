import { useState } from "react";
import DropZone from "./DropZone";

const DropZoneWithCaption = ({ setPost, post }) => {
  const [videoDurationError, setVideoDurationError] = useState(false)
  return (
    <div>
      <div
        className={
          "border-caak-titaniumwhite  border border-dashed rounded-square p-1 mx-[18px] mt-[22px]"
        }
      >
        <DropZone
          title={"Зураг/Видео нэмэх"}
          subTitleStyle={"text-caak-aleutian text-14px"}
          titleStyle={
            "items-center text-caak-generalblack font-medium text-18px "
          }
          setVideoDurationError={setVideoDurationError}
          subTitle={"эсвэл шууд чирэн оруулна уу"}
          className={"flex items-center w-full h-64 bg-caak-liquidnitrogen"}
          setPost={setPost}
          post={post}
        />
      </div>
      { 
                videoDurationError
                ?
                <div className="flex flex-row items-center mx-[22px] my-[5px] rounded-[8px] p-[5px] bg-red-200 max-w-[430px]">
                  <span onClick={() => setVideoDurationError(false)} className="icon-fi-rs-close cursor-pointer text-[12px] p-[3px] border border-[#21293C] rounded-full"/>
                  <p className="text-[14px] text-[#21293C] ml-[10px] sm:mx-[10px]">Уучлаарай, таны бичлэг 5 минутаас хэтэрсэн байна</p>
                  <span className="icon-fi-rs-info text-[14px] text-[#21293C] hidden sm:flex"/>
                </div>
                :
                null
          }
    </div>
  );
};

export default DropZoneWithCaption;
