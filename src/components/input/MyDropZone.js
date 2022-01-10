import { useDropzone } from "react-dropzone";
import { Fragment, useEffect, useState } from "react";
import awsExports from "../../aws-exports";
import { getFileUrl } from "../../utility/Util";

const MyDropZone = ({
  className,
  title,
  titleStyle,
  file,
  setFile,
  keyName,
}) => {
  const [dropZoneFile, setDropZoneFile] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: setDropZoneFile,
    accept: "image/*",
    noKeyboard: true,
    noClick: false,
    multiple: false,
  });

  useEffect(() => {
    dropZoneFile.map((file) => {
      const fileData = {
        ext: getFileExt(file.name),
        name: getFileName(file.name),
        key: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_user_files_s3_bucket_region,
        level: "public",
        obj: file,
      };
      setFile(keyName, fileData);
      return false;
    });
    // eslint-disable-next-line
  }, [dropZoneFile]);
  const getFileExt = (fileName) => {
    return fileName.substring(fileName.lastIndexOf(".") + 1);
  };

  const getFileName = (fileName) => {
    return fileName.replace("." + getFileExt(fileName), "");
  };

  return (
    <div className={` w-full border p-[20px] rounded-[8px] ${
        className && className
      }`}>
      {file ? (
        <Fragment>
          <input {...getInputProps()} />
          <img
            className={"max-h-[180px] rounded-md flex"}
            alt={file.name}
            src={getFileUrl(file)}
          />
          <p {...getRootProps({className: `cursor-pointer mt-[10px]`})}>{title} дахин сонгох</p>
        </Fragment>
      ) : (
        <Fragment>
            <input {...getInputProps()} />
            <p className={`${titleStyle}`}>{title}</p>
            <div {...getRootProps()} className="dropzone w-full h-[60px] cursor-pointer border-[2px] border-dashed border-[#E4E4E5] bg-[#F3F3F4] rounded-[8px] mt-[18px] flex flex-row items-center pl-[23px]">
                <span className="icon-fi-rs-image-f text-[#6C7392] text-[20px]"/>
                <div className="ml-[17px]">
                    <p className="text-[#6C7392] text-[15px] font-inter font-medium h-[18px]">Зураг оруулах</p>
                    <p className="text-[#9A9FB4] text-[12px] font-inter">эсвэл шууд чирэн оруулах</p>
                </div>
            </div>
        </Fragment>
      )}
    </div>
  );
};

export default MyDropZone;
