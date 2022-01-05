import Image from "next/image";

const GenderCard = ({ onClick, sex, className, src, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center mt-5 ${
        className ? className : ""
      }`}
    >
      <img width={60} height={60} src={src} alt={sex} />
      <p className="mt-2.5 font-medium ">{sex}</p>
    </div>
  );
};

export default GenderCard;
