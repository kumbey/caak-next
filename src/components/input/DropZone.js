import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import awsExports from "../../aws-exports";
import { getFileExt, getFileName } from "../../utility/Util";

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
    if (post.items.length + dropZoneFiles.length > 10) {
      alert("maxFiles 10 files");
    } else {
      let files = [];

      dropZoneFiles.map((file) => {
        let fileData = {
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
        let items = [...post.items, ...files];
        setPost({ ...post, items: items });
      }
    }
    // eslint-disable-next-line
  }, [dropZoneFiles]);

  return (
    <div
      {...getRootProps({
        className: `cursor-pointer flex flex-col justify-center items-center rounded-square bg-caak-liquidnitrogen ${
          className && className
        }`,
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
