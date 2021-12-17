import Image from "next/image";
import logoIcon from "../../../public/assets/images/logo-icon.svg";
import logoText from "../../../public/assets/images/logo-text.svg";

const Logo = ({ ...props }) => {
  return (
    <div
      {...props}
      className={"relative flex flex-shrink-0 flex-row items-center w-[102px]"}
    >
      <div className={"relative flex items-center justify-center w-[24.65px]"}>
        <Image
          src={logoIcon}
          className="cursor-pointer"
          alt="Caak Logo"
          width={24.65}
          height={24.65}
          objectFit="contain"
        />
      </div>
      <div className={"relative flex items-center justify-center w-[72.25px] ml-[5px]"}>
        <Image
          src={logoText}
          className="cursor-pointer"
          alt="Caak Logo"
          width={72.25}
          height={34}
          objectFit="contain"
        />
      </div>
    </div>
  );
};
export default Logo;
