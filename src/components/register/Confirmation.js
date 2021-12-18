import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../button";
import OtpInput from "../input/OtpInput";
import Consts from "/src/utility/Consts";
import Validate from "../../utility/Validate";
import useLocalStorage from "../../hooks/useLocalStorage";
import Auth from "@aws-amplify/auth";

const Confirmation = ({ usr }) => {
  const router = useRouter();

  const { lsRemove } = useLocalStorage("session");

  const [username] = useState(usr ? usr.user.username : "");
  const [password] = useState(usr ? usr.password : "");

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState();
  const [reset, setReset] = useState(false);

  const validate = {
    code: {
      value: code,
      type: Consts.typeConfirmationCode,
      onChange: setCode,
      ignoreOn: true,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit, isValid } =
    Validate(validate);

  const doGetCode = async () => {
    setCounter(60);
    setReset(true);

    try {
      setLoading(true);
      await Auth.resendSignUp(username);

      setLoading(false);
      setReset(false);
    } catch (ex) {
      if (ex.code === "LimitExceededException") {
        setErrors({ ...errors, reset: "Дахин код авах лимит хэтэрсэн" });
      } else {
        console.log(ex);
      }
    }
  };

  const doSubmit = async () => {
    try {
      setLoading(true);
      await Auth.confirmSignUp(username, code);
      await Auth.signIn(username, password);
      lsRemove(Consts.SS_UserSignUp);

      if (router.query.isModal) {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              signInUp: "information",
            },
          },
          "/signInUp/information",
          { shallow: true, scroll: false }
        );
      } else {
        router.replace("/signInUp/information", undefined, {
          shallow: true,
          scroll: false,
        });
      }

      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(JSON.stringify(ex));
      if (ex.code === "CodeMismatchException") {
        setErrors({
          ...errors,
          code: "Баталгаажуулах код буруу байна",
        });
      } else if (ex.code === "NotAuthorizedException") {
        router.replace(`?signInUp=stepIn&isModal=true`, `signInUp/stepIn`);
        setErrors({ ...errors, password: "Нууц үг буруу байна" });
      } else {
        console.log(ex);
      }
    }
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return usr ? (
    <div className="ph:w-full ">
      {" "}
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2 mt-9 font-bold text-24px"
        }
      >
        Баталгаажуулах
      </div>
      <div className="text-center text-15px text-caak-darkBlue ">
        {usr && usr.codeDeliveryDetails.AttributeName === "email"
          ? "Таны имэйл хаяг болох "
          : "Таны утасны дугаар болох "}
        {usr.codeDeliveryDetails.Destination} руу <br />
        баталгаажуулах код илгээгдлээ!
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-c11">
          <OtpInput
            errorMessage={errors.code}
            name={"code"}
            onChange={handleChange}
            reset={reset}
          />
        </div>
        <div className={" flex flex-col "}>
          {counter > 0 ? (
            <>
              <p className="text-green-600 text-14px flex justify-center text-center mt-7">
                Сэргээх код амжилттай илгээгдлээ
              </p>
              <div
                className="                 
                 w-full flex justify-center items-center  text-14px   bg-transparent shadow-none  "
              >
                <p className="flex justify-center">{counter}</p>
              </div>
            </>
          ) : (
            <>
              <div className=" flex justify-center text-14px text-caak-darkBlue mt-7">
                Баталгаажуулах код дахин авах
              </div>{" "}
              <div
                onClick={() => doGetCode()}
                className=" flex justify-center items-center text-14px text-caak-primary font-bold cursor-pointer"
              >
                <span className={"icon-fi-rs-resend text-13px mr-1"} />
                Дахин илгээх
              </div>
            </>
          )}
        </div>
        <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            disabled={isValid ? false : true}
            loading={loading}
            onClick={() => handleSubmit(doSubmit)}
            className={`rounded-md w-full h-c9 text-17px font-bold bg-caak-primary  ${
              isValid
                ? "bg-caak-primary text-white"
                : "bg-caak-titaniumwhite text-caak-shit"
            }`}
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </form>
    </div>
  ) : null;
};

export default Confirmation;
