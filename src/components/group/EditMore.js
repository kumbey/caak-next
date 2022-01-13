import { useState } from "react";

const EditMore = ({
  setIsModalOpen,
  activeIndex,
  setActiveIndex,
  setType,
  handleDelete,
}) => {
  const [render, setRender] = useState(0);
  return (
    <div className={"dropdown-item-wrapper"}>
      <div
        onClick={() => {
          setType("edit");
          setActiveIndex(activeIndex);
          setIsModalOpen(true);
        }}
        className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-edit mr-px-12  text-20px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">Засах</p>
      </div>

      <div
        onClick={() => {
          // setType("delete");
          setActiveIndex(activeIndex);
          handleDelete(activeIndex);
        }}
        className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-delete-o mr-px-12  text-18px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">Устгах</p>
      </div>
    </div>
  );
};

export default EditMore;
