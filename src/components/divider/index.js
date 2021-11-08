import React from "react";

const Divider = ({ color, className, textColor, text, textSize }) => {
  return (
    <div className={`relative ${className ? className : ""}`}>
      <div className="absolute inset-0 flex items-center">
        <div className={`w-full border-t ${color}`} />
      </div>
      <div className="relative flex justify-center">
        <span className={`px-2 bg-white ${textSize} ${textColor}`}>{text}</span>
      </div>
    </div>
  );
};

export default Divider;
