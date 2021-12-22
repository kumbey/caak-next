import { getFileUrl } from "../../../utility/Util";

const CardImageContainer = ({ file, cover }) => {
  return (
    <div className={"relative w-full max-w-[1400px] mx-auto h-full"}>
      <div className={"relative w-full h-full"}>
        <img
          // quality={100}
          placeholder={"blur"}
          // blurDataURL={getFileUrl(file)}
          alt={file.name}
          src={getFileUrl(file)}
          className={`w-full h-full ${cover? "object-cover" : "object-contain"}`}
          // layout={"fill"}
        />
      </div>
    </div>
  );
};

export default CardImageContainer;
