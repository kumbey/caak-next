import { useState } from "react";
import Button from "../button";
import Input from "../input";

const ForgotPassword = ({ nextStep }) => {
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    if (nextStep) {
      nextStep();
    }
  };

  return (
    <>
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2 mt-9 font-bold text-24px"
        }
      >
        Нууц үг мартсан
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c8 ">
          <Input
            name="username"
            type="text"
            //   onChange={handleChange}
            placeholder={"Имэйл хаяг эсвэл Утасны дугаар"}
            className={
              "border border-caak-titaniumwhite h-c9 bg-caak-liquidnitrogen"
            }
          />
        </div>
        <div className="px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            loading={loading}
            //   onClick={() => handleSubmit(doSubmit)}
            className={
              "rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary"
            }
          >
            Сэргээх код авах
          </Button>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
