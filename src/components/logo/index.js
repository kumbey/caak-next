import logoIcon from "../../../public/New-Logo.svg";
import logoIconLight from "../../../public/New-Logo-Light.svg";
import anniversary from "../../../public/assets/images/Anniversary.svg";

import { useWrapper } from "../../context/wrapperContext";

const Logo = ({ ...props }) => {
  const { navBarTransparent } = useWrapper();
  return (
    <div
      {...props}
      className={"relative flex flex-shrink-0 flex-row items-center"}
    >
      <div
        className={
          "w-[112px] flex flex-shrink-0 flex-row items-center pr-[12px] mr-[12px] border-r-[1px]"
        }
      >
        <img
          src={navBarTransparent ? logoIconLight.src : logoIcon.src}
          className="cursor-pointer object-contain"
          alt="Caak Logo"
          width={112}
          height={34}
          // objectFit="contain"
        />
      </div>
      <img
        width={64}
        height={34.69}
        className={"w-[64px] h-[34.69px]"}
        alt={"16th Anniversary"}
        src={anniversary.src}
      />
    </div>
  );
};
export default Logo;
