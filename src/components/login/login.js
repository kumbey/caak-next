import { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";

import Input from "../input";
import Button from "../button";
import { useRouter } from "next/router";
import Validate from "/src/utility/Validate";
import Consts from "/src/utility/Consts";
import { checkUsername, closeModal } from "../../utility/Util";

const Login = ({ nextStep }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = {
    username: {
      value: username,
      type: Consts.typeUsername,
      onChange: setUsername,
      ignoreOn: true,
    },
    password: {
      value: password,
      type: Consts.typePassword,
      onChange: setPassword,
      ignoreOn: true,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit } = Validate(validate);

  const submitHandler = () => {
    if (nextStep) {
      nextStep();
    }
  };

  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
    // eslint-disable-next-line
  }, []);

  async function doSignIn() {
    try {
      setLoading(true);

      await Auth.signIn(checkUsername(username), password);
      setLoading(false);
      router.replace(`/?isModal=false`, `/`);
    } catch (ex) {
      console.log(ex);
      setLoading(false);
      if (ex.code === "UserNotConfirmedException") {
        router.replace(
          `?signInUp=confirmation&isModal=true&username${username}`,
          `/signInUp/confirmation`
        );
        // router.replace({
        //   pathname: "/register/confirmation/",
        //   state: {
        //     ...state,
        //     username: checkUsername(username),
        //     password: password,
        //   },
        // });
      } else if (ex.code === "NotAuthorizedException") {
        setError("Нэвтрэх нэр эсвэл нууц үг буруу байна");
      } else if (ex.code === "UserNotFoundException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      }
    }
  }

  return (
    <>
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2  font-bold text-24px"
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
            errorMessage={errors.username}
            onChange={handleChange}
            placeholder={"Имэйл хаяг эсвэл Утасны дугаар"}
            className={
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
            }
          />
          <Input
            label={"Нууц үг"}
            name={"password"}
            type={"password"}
            errorMessage={errors.password}
            onChange={handleChange}
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
