import React from "react";

const EditMore = ({ setIsModalOpen }) => {
  return (
    <div className={"dropdown-item-wrapper"}>
      <div
        onClick={() => setIsModalOpen(true)}
        className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-edit mr-px-12  text-20px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">Засах</p>
      </div>

      <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
        <span className={"icon-fi-rs-delete mr-px-12  text-20px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">Устгах</p>
      </div>
    </div>
  );
};

export default EditMore;
