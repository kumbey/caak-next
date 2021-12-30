import Button from "../button";
import { useState } from "react";

const PostDenyModal = ({
  postHandler,
  postTitle,
  postId,
  isOpen,
  setIsOpen,
}) => {
  const [denyReason, setDenyReason] = useState("");

  return isOpen ? (
    <div className="popup_modal">
      <div className="popup_modal-deny rounded-xl">
        <div
          className={
            "bg-white p-[20px] flex flex-col items-center relative rounded-xl"
          }
        >
          <div
            onClick={() => setIsOpen(false)}
            className={
              "flex items-center justify-center w-[24px] h-[24px] rounded-full bg-caak-liquidnitrogen absolute right-[10px] top-[10px] cursor-pointer"
            }
          >
            <span className={"icon-fi-rs-close text-[12px]"} />
          </div>
          <p className={"text-caak-generalblack font-bold"}>Пост татгалзах</p>
          <p className={"self-start mb-[10px]"}>{postTitle}</p>

          <textarea
            defaultValue={denyReason}
            onChange={(e) => setDenyReason(e.target.value)}
            className={"w-full h-[160px] rounded-[4px]"}
            placeholder={"Шалтгаан"}
          />
          <div className={"flex flex-row self-end mt-[10px]"}>
            <Button
              onClick={() =>
                postHandler({
                  id: postId,
                  status: "ARCHIVED",
                  message: denyReason,
                }).then(() => {
                  setDenyReason("");
                  setIsOpen(false);
                })
              }
              skin={"primary"}
              className={"mr-[4px] h-[30px] font-medium"}
            >
              Татгалзах
            </Button>
            <Button
              className={"h-[30px] font-medium"}
              onClick={() => setIsOpen(false)}
              skin={"white"}
            >
              Буцах
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PostDenyModal;
