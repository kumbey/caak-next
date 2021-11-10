import useModalLayout from "../../../src/hooks/useModalLayout";
import { useState } from "react";
import Button from "../../../src/components/button";
import Input from "../../../src/components/input";

const SignIn1 = ({ type }) => {
  const [loading, setLoading] = useState(false);
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
        Нэвтрэх!
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c8">
          <p className="error">{error}</p>
          <Input
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
              onClick={() =>
                history.replace({
                  pathname: "/forgotpassword/",
                  state,
                })
              }
              className="ml- cursor-pointer"
            >
              Нууц үгээ мартсан уу?
            </span>
          </div>
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
