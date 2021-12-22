import Image from "next/image";
import logoIcon from "../../../public/assets/images/New-Logo.svg";
import logoText from "../../../public/assets/images/logo-text.svg";

const Logo = ({ ...props }) => {
  return (
    <div
      {...props}
      className={"relative flex flex-shrink-0 flex-row items-center w-[114px]"}
    >
      <div className={"relative flex items-center justify-center w-[34px]"}>
        <Image
          src={logoIcon}
          className="cursor-pointer"
          alt="Caak Logo"
          width={34}
          height={34}
          objectFit="contain"
        />
      </div>
      <div className={"relative flex items-center justify-center w-[72px] ml-[5px]"}>
        <Image
          src={logoText}
          className="cursor-pointer"
          alt="Caak Logo"
          width={72}
          height={34}
          objectFit="contain"
        />
      </div>
    </div>
  );
};
export default Logo;
