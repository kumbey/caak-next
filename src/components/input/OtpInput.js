import { IMaskInput } from "react-imask";

import { useEffect, useState } from "react";

const OtpInput = ({
  className,
  errorMessage,
  name,
  onChange,
  reset,
  autoFocus,
  ...props
}) => {
  const [otp, setOtp] = useState("");

  const seperator = "     ";

  useEffect(() => {
    onChange({
      target: {
        name: name,
        value: otp.replaceAll("     ", ""),
      },
    });
    // eslint-disable-next-line
  }, [otp]);

  useEffect(() => {
    if (reset) {
      clearOtp();
    }
  }, [reset]);

  const clearOtp = () => {
    setOtp("");
  };
  return (
    <div className="mx-c13">
      <div className="flex flex-col items-center justify-center w-full">
        <IMaskInput
          {...props}
          className={`w-[350px] justify-center rounded-lg  h-[42px] text-28px text-caak-generalblack text-center bg-caak-liquidnitrogen border border-caak-titaniumwhite  ${className}   ${
            errorMessage ? ` border border-caak-red` : ``
          }`}
          onInput={(e) => setOtp(e.target.value)}
          mask={`0${seperator}0${seperator}0${seperator}0${seperator}0${seperator}0`}
          lazy={false}
          placeholderChar={"_"}
        />

        <p className="error">{errorMessage}</p>
      </div>
    </div>
  );
};

export default OtpInput;
