import { useState } from "react";
import Button from "../button";
import Input from "../input";

const Register = ({ activeType, setActiveStep, activeStep }) => {
  const [error, setError] = useState("");

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c8">
          <p className="error">{error}</p>
          <Input
            label={`Таны ${
              activeType === "phone" ? "утасны дугаар" : "имэйл хаяг"
            }`}
            name={"username"}
            type={"text"}
            //   errorMessage={errors.username}
            //   onChange={handleChange}
            placeholder={`${
              activeType === "phone" ? "Утасны дугаар" : "Имэйл хаяг"
            }`}
            className={
              "border border-caak-titaniumwhite bg-caak-liquidnitrogen"
            }
          />
          <Input
            lengthCounter
            label={"Нууц үг"}
            name={"password"}
            type={"password"}
            //   errorMessage={errors.password}
            //   onChange={handleChange}
            placeholder={"Нууц үг"}
            className={
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
            }
          />
          <Input
            label={"Нууц үг давтах"}
            name={"password"}
            type={"password"}
            //   errorMessage={errors.password}
            //   onChange={handleChange}
            placeholder={"Нууц үг давтах"}
            className={
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
            }
          />
        </div>
      </form>
    </>
  );
};

export default Register;
