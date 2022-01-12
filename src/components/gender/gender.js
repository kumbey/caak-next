import React, { useEffect } from "react";
import GenderCard from "./genderCard";
import maleImg from "/public/assets/images/Man-Avatar.svg";
import femaleImg from "/public/assets/images/Female-Avatar.svg";

const Gender = ({
  setText,
  setGender,
  gender,
  labelStyle,
  hideLabel,
  label,
  id,
}) => {
  useEffect(() => {
    if (typeof setText === "function")
      setText((prev) => ({ ...prev, gender: gender }));
    // eslint-disable-next-line
  }, [gender]);

  return (
    <div className={`w-full input  `}>
      {hideLabel ? null : (
        <label htmlFor={id} className={`${labelStyle} `}>
          {label}
        </label>
      )}
      <div className={"flex  h-32 mt-[8px]"}>
        <div
          onClick={() => setGender("MALE")}
          className={`cursor-pointer w-1/2 mr-1.5 rounded-lg border-2 border-caak-bleachedsilk hover:opacity-60 ${
            gender === "MALE"
              ? " text-caak-primaryHover border-b-2 border-caak-primary border-opacity-30 bg-caak-primaryLighter "
              : "bg-white text-caak-generalblack"
          }`}
        >
          <GenderCard sex={"Эрэгтэй"} src={maleImg.src} />
        </div>
        <div
          onClick={() => setGender("FEMALE")}
          className={`cursor-pointer w-1/2 ml-1.5 rounded-lg border-2  border-caak-bleachedsilk hover:opacity-60 ${
            gender === "FEMALE"
              ? " text-caak-primaryHover border-b-2 border-caak-primary border-opacity-30 bg-caak-primaryLighter "
              : "bg-white text-caak-generalblack"
          }`}
        >
          <GenderCard sex={"Эмэгтэй"} src={femaleImg.src} />
        </div>
      </div>
      <p className="text-12px pt-px-10 text-caak-aleutian">
        Таны хүйс олон нийтэд харагдахгүй.
      </p>
    </div>
  );
};

export default Gender;
