import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button";
import OtpInput from "../input/OtpInput";
import { mailNumber } from "../../utility/Util";
import Consts from "/src/utility/Consts";
import Validate from "/src/utility/Validate";

const Confirmation = ({ activeType, nextStep }) => {
  const router = useRouter();
  const username = router.query.username;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

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

  const doConfirm = async () => {
    try {
      setLoading(true);
      await Auth.confirmSignUp(username, code);
      await Auth.signIn(username, password);
      setLoading(false);
      router.replace(
        `?signInUp=stepIn&isModal=true&username=${username}&code=${code}`,
        `signInUp/stepIn`
      );
    } catch (ex) {
      setLoading(false);
      if (ex.code === "CodeMismatchException") {
        setErrors({ ...errors, code: "Баталгаажуулах код буруу байна" });
      } else if (ex.code === "NotAuthorizedException") {
        history.replace({
          pathname: "/login/main/",
          state: { ...state, errors: { password: "Нууц үг буруу байна" } },
        });
      } else {
        console.log(ex);
      }
    }
  };

  const submitHandler = () => {
    handleSubmit(doConfirm());
    if (nextStep) {
      nextStep();
    }
  };

  console.log("***", router);

  return (
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
        {activeType === "phone"
          ? "Таны утасны дугаар болох "
          : "Таны имэйл хаяг болох "}
        {username ? mailNumber(username.replace("+976", "")) : null} руу <br />
        баталгаажуулах код илгээгдлээ!
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-c11">
          <OtpInput
            errorMessage={errors.code}
            name={"code"}
            onChange={handleChange}
          />
        </div>
        <div className={" flex flex-col "}>
          <div className=" flex justify-center text-14px text-caak-darkBlue mt-7">
            Баталгаажуулах код дахин авах
          </div>
          <div className=" flex justify-center items-center text-14px text-caak-primary font-bold cursor-pointer">
            <span className={"icon-fi-rs-resend text-13px mr-1"} />
            Дахин илгээх
          </div>
        </div>
        <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            disabled={isValid ? false : true}
            loading={loading}
            onClick={() => submitHandler()}
            className={`rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary  ${
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
  );
};

export default Confirmation;
