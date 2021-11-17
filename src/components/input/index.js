import React, { useState } from "react";

const Input = ({
  labelStyle,
  hideLabel,
  label,
  className,
  errorMessage,
  hideError,
  id,
  type,
  containerStyle,
  children,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`w-full input relative ${containerStyle}`}>
      {hideLabel ? null : (
        <label htmlFor={id} className={`${labelStyle}`}>
          {label}
        </label>
      )}

      <div className={"relative"}>
        {type === "password" ? (
          <div className="absolute flex flex-row items-center right-2 top-1/2 -translate-y-1/2">
            {lengthCounter ? (
              <span className="text-caak-darkBlue transform  mr-2.5">6/10</span>
            ) : null}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={`${
                showPassword ? "icon-fi-rs-view text-sm" : "icon-fi-rs-hide"
              }   text-caak-darkBlue transform cursor-pointer`}
            />
          </div>
        ) : null}
        <input
          type={showPassword ? "text" : type}
          {...props}
          className={` ${className} ${
            errorMessage ? `border border-caak-red` : ``
          }`}
        />
        {children}
      </div>

      {!hideError && (
        <p className=" text-13px error text-left" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
