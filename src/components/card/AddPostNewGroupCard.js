const AddPostNewGroupCard = ({ setOpen }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={
        "absolute top-0 2xl:left-[-300px] addPostNewGroupCard flex flex-col items-center justify-center max-w-[300px] p-[25px] rounded-[8px]"
      }
    >
      <p className={"font-bold text-[18px] text-white text-center"}>
        Пост оруулахын тулд хамаарах группт нь нэгдсэн байх ёстой
      </p>
      <div
        onClick={() => {
            setOpen(false)
        }}
        className={
          "flex text-[16px] font-medium items-center justify-center text-center mt-[17px] w-[130px] h-[36px] bg-white text-caak-generalblack rounded-[8px]"
        }
      >
        Ok
      </div>
    </div>
  );
};

export default AddPostNewGroupCard;
