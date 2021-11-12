import { useState } from "react";
import Input from "../input";
import Button from "../button";

const Login = ({ nextStep }) => {
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
        Нэвтрэх
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c8">
          <p className="error">{error}</p>
          <Input
            label={"Хэрэглэгчийн нэр"}
            name={"username"}
            type={"text"}
            //   errorMessage={errors.username}
            //   onChange={handleChange}
            placeholder={"Имэйл хаяг эсвэл Утасны дугаар"}
            className={
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
            }
          />
          <Input
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
        </div>
        <div className="px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => handleSubmit(doSignIn)}
            className={
              "rounded-md w-c10 h-c9 text-17px font-bold bg-caak-secondprimary"
            }
          >
            Нэвтрэх
          </Button>
          <div className="text-caak-blue text-15px">
            <span
              onClick={() => submitHandler()}
              className="ml- cursor-pointer"
            >
              Нууц үгээ мартсан уу?
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
