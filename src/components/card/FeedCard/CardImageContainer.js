import { getFileUrl } from "../../../utility/Util";
import Image from "next/image";

const CardImageContainer = ({ file }) => {
  return (
    <div className={"relative w-full max-w-[1400px] mx-auto h-full"}>
      <div className={"relative w-full h-full"}>
        <Image
          placeholder={"blur"}
          blurDataURL={getFileUrl(file)}
          alt={file.name}
          src={getFileUrl(file)}
          className={"w-full h-full max-h-[770px]"}
          layout={"fill"}
          objectFit={"contain"}
        />
      </div>
    </div>
    // {/*</div>*/}
  );
};

export default CardImageContainer;
