import Divider from "../../../src/components/divider";

const Header = ({
  title,
  iconLeft,
  iconRight,
  hideDivider,
  containerClassName,
}) => {
  return (
    <div
      className={`bg-white relative rounded-square header flex flex-row items-center justify-center px-3.5 shadow-sm ${containerClassName}`}
    >
      {iconLeft}
      <div
        className={
          "text-22px text-center text-caak-generalblack font-bold py-4 leading-7"
        }
      >
        {title}
      </div>
      {iconRight}
      {!hideDivider && <Divider />}
    </div>
  );
};

export default Header;
