import { useState } from "react";
import Button from "../button";
import Input from "../input";

const Register = ({ nextStep }) => {
  const [error, setError] = useState("");
  const [activeType, setActiveType] = useState("phone");

  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    if (nextStep) {
      nextStep();
    }
  };

  return (
    <>
      {" "}
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2 mt-9 font-bold text-24px"
        }
      >
        {" "}
        Бүртгэл үүсгэх
      </div>
      <div className="flex mb-c2">
        <Button
          key={1}
          onClick={() => setActiveType("phone")}
          className={`w-full text-15px h-c32  rounded-none hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  
                                    ${
                                      "phone" === activeType
                                        ? "bg-white text-caak-primary border-b-2 border-caak-primary "
                                        : "bg-transparent text-caak-aleutian"
                                    }
                                    `}
        >
          <span className="icon-fi-rs-phone text-20px " />
          <p className={`text-17px ml-px-10 font-medium `}>Утасны дугаар</p>
        </Button>

        <Button
          key={2}
          onClick={() => setActiveType("mail")}
          className={`w-full text-15px h-c32 rounded-none  hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  
                                    ${
                                      "mail" === activeType
                                        ? "bg-white text-caak-primary border-b-2 border-caak-primary "
                                        : "bg-transparent text-caak-aleutian"
                                    }
                                    `}
        >
          <span className="icon-fi-rs-mail text-20px mr-px-6" />
          <p className="text-17px ml-px-10 font-medium">Имэйл хаяг</p>
        </Button>
      </div>
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
        <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => submitHandler()}
            className={
              "rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary"
            }
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </form>
    </>
  );
};

export default Register;
