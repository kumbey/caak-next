import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../button";
import Validate from "/src/utility/Validate";
import Consts from "/src/utility/Consts";
import Auth from "@aws-amplify/auth";
import Input from "../input";

const ForgotPass = ({ nextStep }) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);

  const validate = {
    username: {
      value: username,
      type: Consts.typeUsername,
      onChange: setUsername,
    },
  };

  const { handleChange, errors, handleSubmit } = Validate(validate);

  async function doSubmit() {
    try {
      setLoading(true);
      await Auth.forgotPassword(username);
      setLoading(false);

      router.replace(
        {
          query: {
            ...router.query,
            signInUp: "resetPassword",
            username: username
          }
        }, "/signInUp/resetPassword", {shallow: true, scroll: false}
      );

    } catch (ex) {
      setLoading(false);
      if (ex.code === "UserNotFoundException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      } else if (ex.code === "InvalidParameterException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      } else if (ex.code === "LimitExceededException") {
        setError("Дахин код авах лимит хэтэрсэн");
      } else {
        console.log(ex);
      }
    }
  }

  const submitHandler = () => {
    handleSubmit(doSubmit);
    if (nextStep) {
      nextStep();
    }
  };

  return (
    <>
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2 font-bold text-24px"
        }
      >
        Нууц үг мартсан
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c8 ">
          <Input
            name="username"
            type="text"
            errorMessage={errors.username}
            onChange={handleChange}
            placeholder={"Имэйл хаяг эсвэл Утасны дугаар"}
            className={
              "border border-caak-titaniumwhite h-c9 bg-caak-liquidnitrogen"
            }
          />
        </div>
        <div className="px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => submitHandler()}
            className={
              "rounded-md w-full h-c9 text-17px font-bold bg-caak-primary"
            }
          >
            Сэргээх код авах
          </Button>
        </div>
      </form>
    </>
  );
};

export default ForgotPass;
