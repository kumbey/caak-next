import useModalLayout from "../../../src/hooks/useModalLayout";
import { useState } from "react";
import Button from "../../../src/components/button";
import Input from "../../../src/components/input";

const SignIn1 = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [error, setError] = useState("");
  const ModalLayout = useModalLayout();
  console.log("Sign In page");
  return (
    <ModalLayout
      className={"flex justify-center items-center"}
      // title={`Шинэ Саак-т ${type === "signUp" ? "бүртгүүлэх!" : "нэвтрэх!"}`}
    >
      <div className="px-c6 pt-c6 flex items-center justify-between cursor-pointer">
        <div
          onClick={() => history.replace({ pathname: "/login", state: state })}
          className="flex items-center"
        >
          <span className="icon-fi-rs-back text-15px text-caak-extraBlack pr-1" />
          <p className="text-caak-generalblack text-13px">Буцах</p>
        </div>
        <span
          onClick={() => closeModal(history, state)}
          className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer"
        />
      </div>
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center pt-c2 pb-c2 font-bold text-24px"
        }
      >
        Бүртгэл үүсгэх
      </div>
      <div className="flex mb-c2">
        <Button
          key={1}
          onClick={() => setActiveIndex(1)}
          className={`w-full text-15px h-c32  rounded-none hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  
                                    ${
                                      1 === activeIndex
                                        ? "bg-white text-caak-primary border-b-2 border-caak-primary "
                                        : "bg-transparent text-caak-aleutian"
                                    }
                                    `}
        >
          <span className="icon-fi-rs-phone text-20px mr-px-6" />
          <p className={`text-17px ml-px-10 font-medium `}>Утасны дугаар</p>
        </Button>

        <Button
          key={2}
          onClick={() => setActiveIndex(2)}
          className={`w-full text-15px h-c32 rounded-none  hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  
                                    ${
                                      2 === activeIndex
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
            label={"Таны утасны дугаар"}
            name={"username"}
            type={"text"}
            //   errorMessage={errors.username}
            //   onChange={handleChange}
            placeholder={"Имэйл хаяг эсвэл Утасны дугаар"}
            className={
              "border border-caak-titaniumwhite h-c9 bg-caak-liquidnitrogen"
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
          <Input
            label={"Нууц үг давтах"}
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
        <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => handleSubmit(doSignIn)}
            className={
              "rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary"
            }
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </form>
      {/*Footer*/}
      <div
        className={
          "signFooter mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
        }
      >
        <div className="text-caak-blue text-15px">
          <span>Шинэ хэрэглэгч бол </span>
          <span
            onClick={() =>
              history.replace({
                pathname: "/register/",
                state,
              })
            }
            className="text-caak-primary text-15px font-bold cursor-pointer"
          >
            Бүртгүүлэх
          </span>
        </div>
        <span className="icon-fi-rs-help text-18px text-caak-darkBlue" />
      </div>
    </ModalLayout>
  );
};

export default SignIn1;
