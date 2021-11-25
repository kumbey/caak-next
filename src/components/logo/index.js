import Image from "next/image";
import logoIcon from "../../../public/assets/images/logo-icon.svg";
import logoText from "../../../public/assets/images/logo-text.svg";

const Logo = ({...props}) => {
  return (
    <div {...props} className={"flex flex-shrink-0 flex-row items-center w-[103px]"}>
      <Image
        src={logoIcon}
        className="cursor-pointer"
        alt="Caak Logo"
        width={29}
        height={29}
        objectFit="contain"
      />
      <Image
        src={logoText}
        className="cursor-pointer"
        alt="Caak Logo"
        width={72}
        height={34}
        objectFit="contain"
      />
    </div>
  );
};
export default Logo;
