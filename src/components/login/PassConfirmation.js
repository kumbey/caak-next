import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "../button";
import Validate from "../../utility/Validate";
import Consts from "/src/utility/Consts";
import Auth from "@aws-amplify/auth";
import Input from "../input";
import { mailNumber } from "/src/utility/Util";
import OtpInput from "/src/components/input/OtpInput";

const PassConfirmation = () => {
  const router = useRouter();
  const username = router.query.username;

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [counter, setCounter] = useState();
  const [reset, setReset] = useState(false);

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

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const doGetCode = async () => {
    setCounter(60);
    setReset(!reset);

    try {
      setLoading(true);
      console.log(username);
      await Auth.forgotPassword(username);

      setLoading(false);
    } catch (ex) {
      if (ex.code === "LimitExceededException") {
        setError("Дахин код авах лимит хэтэрсэн");
      } else {
        console.log(ex);
      }
    }
  };

  const doConfirm = async () => {
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

  return (
    <>
      <div
        className={
          "text-caak-generalblack text-center font-bold text-24px mt-c3 mb-[30px]"
        }
      >
        Нууц үгээ сэргээх
      </div>

      <div className="text-center text-15px text-caak-darkBlue mt-c3">
        {/* Таны {username ? mailNumber(username.replace("+976", "")) : null} руу{" "} */}
        <br /> баталгаажуулах код илгээгдсэн болно.
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-c11 ">
          <OtpInput
            errorMessage={errors.code}
            name={"code"}
            onChange={handleChange}
            reset={reset}
          />
        </div>
        <div className={" flex flex-col "}>
          <div className="px-c8 ">
            <div className=" flex justify-center text-14px text-caak-darkBlue mt-8"></div>
            {counter > 0 ? (
              <>
                <p className="text-green-600 text-center">
                  Сэргээх код амжилттай илгээгдлээ
                </p>
                <div
                  className="                 
                   mb-8 w-full flex justify-center items-center  text-14px   bg-transparent shadow-none  "
                >
                  <p className="flex justify-center">{counter}</p>
                </div>
              </>
            ) : (
              <>
                <p className="text-center">Баталгаажуулах код ирсэнгүй</p>
                <div
                  onClick={() => doGetCode()}
                  className="cursor-pointer mb-8 w-full flex justify-center items-center  text-14px text-caak-primary bg-transparent shadow-none font-bold "
                >
                  <span className={"icon-fi-rs-resend text-13px mr-1"} />
                  Дахин илгээх
                </div>
              </>
            )}
          </div>

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
              Өөрчлөх
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PassConfirmation;
