import React from "react";
import Loader from "../loader";

const Button = ({
  skin,
  round,
  circular,
  iconPosition,
  icon,
  loading,
  roundedSquare,
  disabled,
  small,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button ${small ? "small" : ""} ${skin ? skin : ""} ${round ? "round" : ""} ${
        disabled && "bg-caak-titaniumwhite text-caak-shit cursor-not-allowed"
      } ${circular ? "circular" : ""} ${
        roundedSquare ? "rounded-square" : ""
      } ${props.className}`}
      disabled={disabled || loading}
    >
      {iconPosition === "left" ? icon : ""}
      {circular || roundedSquare ? icon : ""}
      {loading ? <Loader className={"bg-white"} /> : props.children}
      {iconPosition === "right" ? icon : ""}
    </button>
  );
};
export default Button;
