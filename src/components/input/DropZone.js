import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import awsExports from "../../aws-exports";
import { getFileExt, getFileName } from "../../utility/Util";
import imageCompression from 'browser-image-compression';
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
}) => {
  const [dropZoneFiles, setDropZoneFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: setDropZoneFiles,
    accept: "image/*, video/*",
    noKeyboard: true,
    noClick: false,
    multiple: true,
  });

  useEffect(() => {
    if (post.items.length + dropZoneFiles.length > 50) {
      alert("maxFiles 50 files");
    } else {
      const files = [];
      dropZoneFiles.map((file, index) => {


        const options = { 
          maxSizeMB: 1,
          useWebWorker: true
        }

        if(Consts.regexImage.test(file.type)){
          file = await imageCompression(file, options)
        }

        const fileData = {
          id: post.items.length === 0 ? index + 1 : post.items.length + index + 1,
          title: "",
          post_id: post.id,
          file: {
            ext: getFileExt(file.name),
            name: getFileName(file.name),
            key: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
            bucket: awsExports.aws_user_files_s3_bucket,
            region: awsExports.aws_user_files_s3_bucket_region,
            level: "public",
            obj: file,
          },
        };

        // if(post.length <= 0 && index === 0){
        //     postData.featured = true
        // }
        files.push(fileData);
        return false;
      });

      if (files.length > 0) {
        const items = [...post.items, ...files];
        setPost({ ...post, items: items });
      }
    }
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
      <span className={`${titleStyle}`}>{title}</span>
      <span className={`${subTitleStyle}`}>{subTitle}</span>
    </div>
  );
};

export default DropZone;
