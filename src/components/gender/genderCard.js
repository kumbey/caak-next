const GenderCard = ({ onClick, sex, className, src, name, gender }) => {
  return (
    <div
      onClick={onClick}
      className={`flex group flex-col items-center mt-5 ${
        gender === name ? "text-caak-primary" : "text-caak-naturallycalm"
      } ${className ? className : ""}`}
    >
      <div className="w-full relative ">
        <span
          className={`${
            gender === name ? "block text-caak-primary" : ""
          }hidden group-hover:block  w-[16px] h-[16px]  icon-fi-rs-check-filled absolute -top-2.5 right-2.5 `}
        />
      </div>
      <img width={60} height={60} src={src} alt={sex} />
      <p
        className={`${
          gender === name ? "text-caak-primary" : "text-caak-generalblack"
        } mt-2.5 font-medium `}
      >
        {sex}
      </p>
    </div>
  );
};

export default GenderCard;
