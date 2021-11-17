import Image from "next/image";

const SearchedGroupItem = ({ image, name, setIsSearchBarOpen, clear }) => {
  return (
    <div
      onClick={() => setIsSearchBarOpen(false)}
      className={
        "cursor-pointer flex flex-row flex-grow items-center relative p-[6px] hover:bg-caak-liquidnitrogen rounded-[10px]"
      }
    >
      <div
        className={
          "flex flex-shrink-0 items-center justify-center w-[34px] h-[34px] rounded-square"
        }
      >
        <Image
          className={"rounded-square"}
          src={`${image ? image : "https://picsum.photos/200"}`}
          alt="Comment user"
          width={34}
          height={34}
          objectFit="cover"
        />
      </div>
      <div className={"whitespace-nowrap overflow-hidden overflow-ellipsis text-15px font-medium text-caak-generalblack ml-[10px]"}>
        {name}
      </div>
      {clear && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            "flex items-center justify-center cursor-pointer rounded-full p-1.5  hover:bg-gray-200 absolute right-[16px] top-1/2 transform -translate-y-1/2"
          }
        >
          <span
            className={"icon-fi-rs-close text-caak-blue w-[16px] h-[16px]"}
          />
        </div>
      )}
    </div>
  );
};

export default SearchedGroupItem;
