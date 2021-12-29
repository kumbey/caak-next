import { getFileUrl } from "../../../utility/Util";
import Image from "next/image";

const CardImageContainer = ({ file, cover, card }) => {
  return (
    <div
      className={
        "relative w-full max-w-[1400px] mx-auto h-full cursor-pointer z-1"
      }
    >
      <div
        className={`relative w-full h-full unset-img ${
          card ? "max-h-[770px] h-[650px] min-h-[432px]" : ""
        } `}
      >
        <Image
          priority={true}
          quality={100}
          placeholder={"blur"}
          blurDataURL={getFileUrl(file)}
          alt={file.name}
          src={getFileUrl(file)}
          className={`w-full h-auto ${
            cover ? "object-cover" : "object-contain"
          } custom-img`}
          layout={"fill"}
        />
      </div>
    </div>
  );
};

export default CardImageContainer;
