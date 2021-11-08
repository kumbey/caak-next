import React, { useState, useRef, useEffect, createRef } from "react";

export default function Test({ name, onChange, errorMessage, reset }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const refs = useRef(otp.map(() => createRef()));
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    let arr = [...otp];
    arr[pointer] = "";
    setOtp(arr);
    refs.current[pointer].current.focus();

    // eslint-disable-next-line
  }, [pointer]);

  useEffect(() => {
    onChange({
      target: {
        name: name,
        value: otp.join(""),
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
    setOtp(["", "", "", "", "", ""]);
    setPointer(0);
  };

  const handleChange = (value, index) => {
    if (isNaN(value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);

    if (value) {
      if (pointer < otp.length - 1) {
        setPointer(pointer + 1);
      }
    } else {
      if (pointer > 0) {
        setPointer(pointer - 1);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      if (pointer > 0) {
        setPointer(pointer - 1);
      }
    }
    return true;
  };

  return (
    <div className="mx-c13">
      <div className="flex justify-between w-full">
        {otp.map((data, index) => {
          return (
            <input
              disabled={pointer === index ? false : true}
              ref={refs.current[index]}
              value={data}
              key={index}
              onKeyUp={(e) => handleKeyDown(e)}
              onChange={(e) => handleChange(e.target.value, index)}
              id={index}
              type="text"
              maxLength="1"
              className="w-11 mr-1 h-14 text-28px text-caak-generalblack text-center bg-caak-liquidnitrogen border border-caak-titaniumwhite rounded-lg"
            />
          );
        })}
      </div>
      <p className="error">{errorMessage}</p>
    </div>
  );
}
