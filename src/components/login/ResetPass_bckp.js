import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../button";
import Validate from "/src/utility/Validate";
import Consts from "/src/utility/Consts";
import Auth from "@aws-amplify/auth";
import Input from "../input";

const ResetPass = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [code, setCode] = useState(router.query.code);
  console.log("code state: ", code);

  const [username, setUsername] = useState(router.query.username);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [loading, setLoading] = useState(false);

  const validate = {
    code: {
      value: code,
      type: Consts.typeConfirmationCode,
      onChange: setCode,
      ignoreOn: true,
    },
    password: {
      value: password,
      type: Consts.typePassword,
      onChange: setPassword,
      // ignoreOn: true,
    },
    passwordRepeat: {
      value: passwordRepeat,
      type: Consts.typePasswordRepeat,
      onChange: setPasswordRepeat,
      // ignoreOn: true,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit, isValid } =
    Validate(validate);

  const doConfirm = async () => {
    console.log(code, "at do confirm resetpassword");
    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(username, code, password);
      setLoading(false);
      router.replace(`?signInUp=completed&isModal=true`, `/signInUp/completed`);
    } catch (ex) {
      setLoading(false);
      if (ex.code === "CodeMismatchException") {
        setErrors({ ...errors, code: "Баталгаажуулах код буруу байна" });
      } else if (ex.code === "UserNotFoundException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      } else if (ex.code === "InvalidParameterException") {
        setError("Имэйл хаяг буруу байна");
      } else {
        console.log(ex);
      }
    }
  };
  console.log("code : ", code);
  return (
    <>
      <div
        className={
          "text-caak-generalblack text-center font-bold text-24px mt-c3 mb-[30px]"
        }
      >
        Нууц үгээ сэргээх
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className={" flex flex-col "}>
          <div className="px-c8">
            <p className="error">{error}</p>
            <Input
              value={password}
              name={"password"}
              type={"password"}
              errorMessage={errors.password}
              onChange={handleChange}
              placeholder={"Шинэ нууц үг"}
              className={
                "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
              }
            />
            <Input
              value={passwordRepeat}
              name={"passwordRepeat"}
              type={"password"}
              errorMessage={errors.passwordRepeat}
              onChange={handleChange}
              placeholder={"Нууц үг давтах"}
              className={
                "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
              }
            />
            <Button
              disabled={isValid ? false : true}
              loading={loading}
              onClick={() => handleSubmit(doConfirm)}
              round
              className={`font-bold 
                      ${
                        isValid
                          ? "bg-caak-primary text-white"
                          : "bg-caak-titaniumwhite text-caak-shit"
                      }
                      mt-c6 w-full
                      h-c9 
                      text-17px`}
            >
              Баталгаажуулах
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPass;
