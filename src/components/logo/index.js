import Image from "next/image";
import logoIcon from "../../../public/New-Logo.svg";

const Logo = ({ ...props }) => {
  return (
    <div
      {...props}
      className={"relative flex flex-shrink-0 flex-row items-center w-[112px]"}
    >
        <Image
          src={logoIcon}
          className="cursor-pointer"
          alt="Caak Logo"
          width={112}
          height={34}
          objectFit="contain"
        />
    </div>
  );
};
export default Logo;
