import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import Image from "next/image";
import AddPostThumbnailImage from "/public/assets/images/AddPostThumbnail.svg";
import awsExports from "../../aws-exports";
import {
  findMatchIndex,
  getFileExt,
  getFileName,
  getGenderImage,
} from "../../utility/Util";
import imageCompression from "browser-image-compression";
import Consts from "../../utility/Consts";

const DropZone = ({
  setPost,
  post,
  className,
  title,
  subTitle,
  subTitleStyle,
  titleStyle,
  icon,
  hideThumbnailImage,
}) => {
  const [dropZoneFiles, setDropZoneFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: setDropZoneFiles,
    accept: "image/jpeg, image/png, image/gif, video/*",
    noKeyboard: true,
    noClick: false,
    multiple: true,
  });

  const fileChoosed = async () => {
    if (post.items.length + dropZoneFiles.length > 30) {
      alert("Зөвшөөрөгдөх зурагны нийт тоо 30");
    } else {
      const localPost = { ...post };
      const postItemLength = post.items.length;
      const toCompressFiles = [];

      for (let index = 0; index < dropZoneFiles.length; index++) {
        const file = dropZoneFiles[index];
        const realIndex = postItemLength + index + 1;
        
        if(file.type.startsWith("video/") && await getVideoDuration(file) > 180){
          alert("Too long video")
        }else{
          const fileData = {
            id: realIndex,
            title: "",
            post_id: post.id,
            file: {
              ext: getFileExt(file.name),
              name: getFileName(file.name),
              key: file.name,
              type: file.type,
              url: "",
              bucket: awsExports.aws_user_files_s3_bucket,
              region: awsExports.aws_user_files_s3_bucket_region,
              level: "public",
              obj: file,
            },
          };
  
          if (Consts.regexImage.test(file.type)) {
            fileData.url = getGenderImage("default").src;
            fileData.loading = true;
            toCompressFiles.push(fileData);
          } else {
            fileData.file.url = URL.createObjectURL(file);
          }
  
          localPost.items.push(fileData); 
        }
      }

      setPost({ ...localPost });
      compressFiles(toCompressFiles);
    }
  };

  const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const media = new Audio(reader.result);
      media.onloadedmetadata = () => resolve(media.duration);
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });


  const compressFiles = async (files) => {
    for (let index = 0; index < files.length; index++) {
      const curItem = files[index];

      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(curItem.file.obj, options);

      curItem.file.obj = compressedFile;
      curItem.file.url = URL.createObjectURL(compressedFile);
      const curIndex = findMatchIndex(post.items, "id", curItem.id);
      const postItems = post.items;
      postItems[curIndex].file = curItem.file;
      delete postItems[curIndex].loading;
      setPost((prev) => ({ ...prev, items: [...postItems] }));
    }
  };

  useEffect(() => {
    fileChoosed();
    // eslint-disable-next-line
  }, [dropZoneFiles]);

  return (
    <div
      {...getRootProps({
        className: `${
          className ? className : ""
        } cursor-pointer flex flex-col justify-center items-center rounded-square`,
      })}
    >
      <input {...getInputProps()} />
      {icon && icon}
      {!hideThumbnailImage && (
        <div className={"relative w-[116px] h-[93px]"}>
          <img
            // priority={true}
            alt={""}
            // layout={"fill"}
            src={AddPostThumbnailImage.src}
          />
        </div>
      )}

      <span className={`${titleStyle}`}>{title}</span>
      <span className={`${subTitleStyle}`}>{subTitle}</span>
    </div>
  );
};

export default DropZone;
