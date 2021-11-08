import { useState } from "react";

export default function TopMembers({ title, className }) {
  const [pro] = useState(new Array(10).fill(""));
  return (
    <div className="mt-c13">
      <p
        className={`${
          className ? className : "text-17px font-bold text-caak-generalblack"
        }`}
      >
        {title}
      </p>
      <div className="gap-px-10 2xl:w-c26 mt-px-10 md:w-c12 grid grid-cols-5">
        {pro.map((item, index) => {
          return (
            <img
              key={index}
              alt=""
              className="h-c25 w-c25 bg-caak-red rounded rounded-full cursor-pointer"
            />
          );
        })}
      </div>
    </div>
  );
}
