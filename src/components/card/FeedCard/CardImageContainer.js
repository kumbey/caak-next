import { getFileUrl } from "../../../utility/Util";
import Image from "next/image";

const CardImageContainer = ({ file }) => {
  return (
    <div className={"relative w-full max-w-[1400px] mx-auto h-full"}>
      {file?.length > 1 ? (
        <div
          className={
            "flex flex-row tracking-wide items-center text-center align-middle absolute font-bold h-5 top-3 right-3 text-white text-11px bg-black bg-opacity-20 rounded h-5 px-2 py-1"
          }
        >
          <span className={"icon-fi-rs-album mr-1 text-11px"} />+{file?.length}
        </div>
      ) : (
        ""
      )}

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
