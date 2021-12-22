import { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";

import Input from "../input";
import Button from "../button";
import { useRouter } from "next/router";
import Validate from "/src/utility/Validate";
import Consts from "/src/utility/Consts";
import {
  checkUsername,
  closeModal,
  _objectWithoutKeys,
} from "../../utility/Util";

const Login = ({ nextStep }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = {
    username: {
      value: username,
      type: Consts.typeName,
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

  async function doSignIn() {
    try {
      setLoading(true);
      await Auth.signIn(checkUsername(username), password);
      if (router.query.prevPath && router.query.prevPath !== router.asPath) {
        router.replace(
          router.query.prevPath,
          undefined,
          { shallow: false, scroll: false }
        );
      } else {
        router.replace("/");
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      if (ex.code === "NotAuthorizedException") {
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
          "flex text-caak-generalblack justify-center text-center align-center mb-[16px]  font-bold text-24px"
        }
      >
        Нэвтрэх
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c8">
          <p className="error ">{error}</p>
          <Input
            label={"Имэйл хаяг/Утасны дугаар"}
            labelStyle={"text-16px font-inter font-medium"}
            name={"username"}
            type={"text"}
            errorMessage={errors.username}
            onChange={handleChange}
            placeholder={"Имэйл хаяг/Утасны дугаар"}
            className={
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen h-[44px] mt-2"
            }
          />
          <Input
            label={"Нууц үг"}
            labelStyle={"text-16px font-inter font-medium"}
            name={"password"}
            type={"password"}
            errorMessage={errors.password}
            onChange={handleChange}
            placeholder={"Нууц үг"}
            className={
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen h-[44px] mt-2"
            }
          />
        </div>
        <div className="px-c8 ph:px-c2 text-white text-14px flex flex-col items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => handleSubmit(doSignIn)}
            className={
              "rounded-md w-full h-c9 text-16px font-medium font-inter mb-[16px] bg-caak-primary"
            }
          >
            Нэвтрэх
          </Button>
          <div
            className="text-caak-bleudefrance text-14px"
            onClick={() =>
              router.push(
                {
                  pathname: `/signInUp/forgotpassword`,
                  query: { isModal: true },
                },
                `/signInUp/forgotpassword`,
                { shallow: true, scroll: false }
              )
            }
          >
            <span className="ml- cursor-pointer border-b border-caak-bleudefrance border-dashed">
              Нууц үгээ мартсан уу?
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
