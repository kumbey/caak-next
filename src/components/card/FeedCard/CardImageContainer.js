import { getFileUrl } from "../../../utility/Util";

const CardImageContainer = ({ file, cover, card }) => {
  return (
    <div
      className={
        "relative w-full max-w-[1400px] mx-auto h-full cursor-pointer z-1"
      }
    >
      <div
        className={`relative flex items-center justify-center w-full h-full ${
          card ? "max-h-[770px]" : ""
        } `}
      >
        <img
          alt={file.name}
          src={getFileUrl(file)}
          className={`w-full h-auto ${
            cover ? "object-cover" : "object-contain"
          }`}
        />
      </div>
    </div>
  );
};

export default CardImageContainer;
