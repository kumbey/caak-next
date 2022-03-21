import Cropper from "react-easy-crop";
import { useCallback, useState } from "react";
import Button from "../button";
import getCroppedImg from "./getCroppedImage";
import {
  getFileExt,
  getFileName,
  getFileUrl,
  getGenderImage,
} from "../../utility/Util";
import awsExports from "../../aws-exports";
import Dropzone from "react-dropzone";
import { ApiFileUpload } from "../../utility/ApiHelper";
import { API, graphqlOperation } from "aws-amplify";
import { updateGroup } from "../../graphql-custom/group/mutation";
import { deleteFile } from "../../graphql-custom/file/mutation";
import Loader from "../loader";

const UploadCoverImageModal = ({ setIsOpen, groupData }) => {
  const [coverPictureDropZone, setCoverPictureDropZone] = useState(
    getFileUrl(groupData.cover)
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(0);

  const fileParams = (file) => {
    return {
      ext: getFileExt(file[0].name),
      name: getFileName(file[0].name),
      key: file[0].name,
      type: file[0].type,
      url: URL.createObjectURL(file[0]),
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      level: "public",
      obj: file[0],
    };
  };

  const updateImage = async (croppedImage) => {
    if (croppedImage) {
      setLoading(true);
      try {
        const resp = await ApiFileUpload(croppedImage);
        await API.graphql(
          graphqlOperation(updateGroup, {
            input: {
              id: groupData.id,
              groupCoverId: resp.id,
            },
          })
        );
        if (groupData.cover.id)
          await API.graphql(
            graphqlOperation(deleteFile, {
              input: {
                id: groupData.cover.id,
              },
            })
          );

        groupData.cover = resp;
      } catch (ex) {
        setLoading(false);

        console.log(ex);
      }
      setLoading(false);
    }
  };

  const onDropCover = useCallback((file) => {
    setCoverPictureDropZone(fileParams(file));
  }, []);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        coverPictureDropZone,
        croppedAreaPixels
      );
      await updateImage(croppedImage);
      setRender(render + 1);
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
    //eslint-disable-next-line
  }, [coverPictureDropZone, croppedAreaPixels]);

  return (
    <div className="popup_modal">
      <div className="popup_modal-uploadCover">
        <div className={"flex flex-col justify-between w-full h-full"}>
          {/*Header*/}
          <div
            className={
              "flex-shrink-0 relative flex items-center justify-center w-full h-[60px] border-b-[1px] border-[#E4E4E5] bg-white rounded-t-[12px]"
            }
          >
            <div
              onClick={() => setIsOpen(false)}
              className={
                "cursor-pointer absolute p-[8px] bg-[#E4E4E5] rounded-full right-[16px] top-[16px] w-[30px] h-[30px] flex items-center justify-center"
              }
            >
              <span
                className={
                  "text-caak-generalblack icon-fi-rs-close text-[14px] w-[14px] h-[14px]"
                }
              />
            </div>
            <p
              className={
                "text-caak-generalblack text-[20px] tracking-[0.3px] leading-[24px] font-semibold"
              }
            >
              Ковер зураг засах
            </p>
          </div>
          <div className={"flex flex-col h-full justify-between"}>
            <div className={"relative w-full h-[230px]"}>
              {loading && (
                <div
                  className={
                    "w-full flex justify-center items-center h-full bg-white absolute top-0 z-[1] bg-opacity-60 cursor-not-allowed"
                  }
                >
                  <Loader className={`bg-caak-primary self-center`} />
                </div>
              )}

              <Cropper
                image={
                  coverPictureDropZone
                    ? coverPictureDropZone.url
                      ? coverPictureDropZone.url
                      : coverPictureDropZone
                    : getGenderImage("default".src)
                }
                crop={crop}
                zoom={zoom}
                aspect={6 / 1}
                objectFit={"horizontal-cover"}
                classes={"w-full h-full"}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="flex flex-row w-full justify-center items-center mt-[23px] mb-[32px]">
              <div
                className={
                  "flex items-center justify-center w-[22px] h-[22px] opacity-80"
                }
              >
                <span
                  className={"icon-fi-rs-image-o text-[19px] text-[#777D85]"}
                />
              </div>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range w-[270px] mx-[10px]"
              />
              <div
                className={
                  "flex items-center justify-center w-[28px] h-[28px] opacity-80"
                }
              >
                <span
                  className={"icon-fi-rs-image-o text-[24px] text-[#777D85]"}
                />
              </div>
            </div>
            <div
              className={
                "flex flex-row justify-between p-[24px] w-full h-[76px] border-t-[1px]"
              }
            >
              <div className={"flex flex-row items-center cursor-pointer"}>
                <div
                  className={
                    "flex items-center justify-center w-[20px] h-[20px]"
                  }
                >
                  <span
                    className={
                      "icon-fi-rs-upload text-[18px] text-caak-primary"
                    }
                  />
                </div>
                <Dropzone
                  noKeyboard
                  maxFiles={1}
                  onDropRejected={(e) => console.log(e[0].errors[0].message)}
                  accept={"image/jpeg, image/png, image/gif"}
                  onDropAccepted={onDropCover}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <p className={"text-[14px] text-caak-primary ml-[6px]"}>
                        Шинэ зураг сонгох
                      </p>
                      <input {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className={"flex flex-row items-center"}>
                <Button
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  className={"h-[36px] rounded-[8px] border-[1px]"}
                >
                  Болих
                </Button>
                <Button
                  loading={loading}
                  onClick={showCroppedImage}
                  className={"h-[36px] ml-[10px]"}
                  skin={"primary"}
                >
                  Хадгалах
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCoverImageModal;
