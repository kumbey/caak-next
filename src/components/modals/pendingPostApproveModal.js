import ImageCarousel from "../carousel/ImageCarousel";
import Image from "next/image";
import {
  generateFileUrl,
  generateTimeAgo,
  getDate,
  getGenderImage,
} from "../../utility/Util";
import Button from "../button";
import PostDenyModal from "./postDenyModal";
import Input from "../input";
import { useState } from "react";

const PendingPostApproveModal = ({
  post,
  isOpen,
  setIsOpen,
  postHandler,
  activeIndex,
  setActiveIndex,
}) => {
  const [denyReason, setDenyReason] = useState("");
  const [isDenyReasonActive, setIsDenyReasonActive] = useState(false);

  return isOpen ? (
    <div className="popup_modal">
      <div className="popup_modal-content-pending relative rounded-[10px]">
        <div
          onClick={() => setIsOpen(false)}
          className={
            "w-[40px] h-[40px] absolute flex items-center justify-center rounded-full bg-[#FFFFFF33] right-[-50px] cursor-pointer"
          }
        >
          <span className={"icon-fi-rs-close text-white"} />
        </div>
        <div
          className={
            "flex flex-col w-full h-full min-h-[627px] bg-white rounded-[10px] relative"
          }
        >
          {/*Header title*/}
          <div
            style={{ height: "max-content" }}
            className={
              "flex items-row justify-between px-[30px] pt-[23px] pb-[18px]"
            }
          >
            <p
              className={
                "h-full text-[18px] text-caak-generalblack font-semibold break-all"
              }
            >
              {post.title}
            </p>
            <div
              className={
                "flex-shrink-0 flex items-center justify-center w-[35px] h-[35px] rounded-full hover:bg-caak-titaniumwhite transition-all duration-150"
              }
            >
              <span className={"icon-fi-rs-dots text-[24px]"} />
            </div>
          </div>
          <div className={"w-full h-[565px] relative"}>
            <ImageCarousel
              card
              route={false}
              index={activeIndex}
              changeActiveIndex={setActiveIndex}
              mediaContainerClassname={"w-full h-full"}
              items={post.items.items}
              postId={post.id}
            />
          </div>
          <div
            className={
              "flex flex-col justify-between px-[30px] py-[14px] bg-white min-h-[129px] rounded-b-[10px]"
            }
          >
            <p
              className={
                "text-caak-generalblack text-[16px] tracking-[0.24px] leading-[19px]"
              }
            >
              {post.items.items[activeIndex]?.title}
            </p>
            <div className={"flex flex-row items-center"}>
              <div
                className={
                  "flex-shrink-0 w-[40px] h-[40px] relative rounded-full"
                }
              >
                <Image
                  alt={""}
                  layout={"fill"}
                  src={
                    post.user.pic
                      ? generateFileUrl(post.user.pic)
                      : getGenderImage(post.user.gender).src
                  }
                  objectFit={"cover"}
                  className={"rounded-full"}
                />
              </div>
              <div
                className={
                  "flex flex-row items-center ml-[8px] tracking-[0.23px] leading-[18px]"
                }
              >
                <p className={"text-caak-generalblack text-[15px] font-medium"}>
                  @{post.user.nickname}
                </p>
                <p>&nbsp;&middot;&nbsp;</p>
                <p className={"text-caak-generalblack text-[15px]"}>
                  {generateTimeAgo(post.createdAt)}
                </p>
                <p>&nbsp;&middot;&nbsp;</p>
                <p className={"text-caak-generalblack text-[15px]"}>
                  {getDate(post.createdAt)}
                </p>
              </div>
            </div>
            {isDenyReasonActive && (
              <div>
                <Input
                  defaultValue={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  className={"h-[40px]"}
                  placeholder={"Татгалзах шалтгаан"}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={
            "flex flex-row float-right h-[44px] my-[18px] bg-transparent mx-auto"
          }
        >
          <Button
            onClick={() => {
              setIsDenyReasonActive(true);
              if (denyReason) {
                postHandler({
                  id: post.id,
                  status: "ARCHIVED",
                  message: denyReason,
                });
              }
            }}
            className={
              "h-[44px] text-caak-generalblack text-[16px] font-medium"
            }
            skin={"white"}
          >
            Татгалзах
          </Button>
          <Button
            onClick={() => postHandler({id: post.id, status: "CONFIRMED"})}
            className={
              "ml-[10px] h-[44px] text-[16px] font-medium text-white bg-[#257CEE]"
            }
            skin={"primary"}
          >
            Зөвшөөрөх
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PendingPostApproveModal;
