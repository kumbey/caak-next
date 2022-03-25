import logoIconLight from "../../../public/New-Logo-Light.svg";

const Logo = ({ ...props }) => {
  return (
    <div
      {...props}
      className={"relative flex flex-shrink-0 flex-row items-center"}
    >
      <div
        className={
          "w-[112px] flex flex-shrink-0 flex-row items-center pr-[12px]"
        }
      >
        <img
          src={logoIconLight.src}
          className="cursor-pointer object-contain"
          alt="Caak Logo"
          width={112}
          height={34}
          // objectFit="contain"
        />
      </div>
      {/*<img*/}
      {/*  width={64}*/}
      {/*  height={34.69}*/}
      {/*  className={"w-[64px] h-[34.69px]"}*/}
      {/*  alt={"16th Anniversary"}*/}
      {/*  src={navBarTransparent ?  whiteAnivery.src : anniversary.src}*/}
      {/*/>*/}
    </div>
  );
};
export default Logo;
