import { useState, useEffect } from "react";
import Button from "../button";
import Input from "../input";
import Validate from "../../utility/Validate";
import Auth from "@aws-amplify/auth";
import Consts from "/src/utility/Consts";
import { nanoid } from "nanoid";

import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";

const Register = () => {
  const { lsSet } = useLocalStorage("session");

  const [error] = useState("");
  const [activeType, setActiveType] = useState("phone");
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  const condition = activeType === "phone";

  const validate = {
    ...(condition
      ? {
          phoneNumber: {
            value: phoneNumber,
            type: Consts.typePhoneNumber,
            onChange: setPhoneNumber,
            // ignoreOn: true,
          },
        }
      : {
          email: {
            value: email,
            type: Consts.typeEmail,
            onChange: setEmail,
            // ignoreOn: true,
          },
        }),

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

  const doSubmit = async () => {
    try {
      setLoading(true);
      const usr = {};

      usr.username = nanoid(10);
      usr.attributes = {
        profile: `https://caak.mn/u/${usr.username}`,
        // preferred_username: usr.username
      };
      if (condition) {
        usr.attributes.phone_number = "+976" + phoneNumber;
      } else {
        usr.attributes.email = email;
      }
      usr.password = password;

      const resp = await Auth.signUp(usr);

      lsSet(Consts.SS_UserSignUp, { ...resp, password });

      if (router.query.isModal) {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              signInUp: "confirm",
            },
          },
          "/signInUp/confirmation",
          { shallow: true, scroll: false }
        );
      } else {
        router.replace("/signInUp/confirm", undefined, {
          shallow: true,
        });
      }
    } catch (ex) {
      setLoading(false);
      if (ex.code === "UsernameExistsException") {
        setErrors({
          ...errors,
          phoneNumber: "Дээрхи хэрэглэгч бүртгэлтэй байна",
        });
      } else {
        console.log(ex);
      }
    }
  };

  useEffect(() => {
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setPasswordRepeat("");
    setErrors({});
    // eslint-disable-next-line
  }, [activeType]);

  useEffect(() => {
    if (errors) {
      setErrors(errors);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2 mt-9 font-bold text-24px"
        }
      >
        Бүртгэл үүсгэх
      </div>
      <div className="flex mb-c2">
        <Button
          key={1}
          onClick={() => setActiveType("phone")}
          className={`w-full text-15px h-c32  rounded-none hover:text-opacity-60 flex items-center justify-center font-bold  
                                    ${
                                      "phone" === activeType
                                        ? "bg-white text-caak-primary border-b-2 border-caak-primary "
                                        : "bg-transparent text-caak-darkBlue"
                                    }
                                    `}
        >
          <span className="icon-fi-rs-phone-1 text-24px " />
          <p className={`text-15pxpx ml-px-10 font-medium `}>Утасны дугаар</p>
        </Button>

        <Button
          key={2}
          onClick={() => setActiveType("mail")}
          className={`w-full text-15px h-c32 rounded-none  hover:text-opacity-60 flex items-center justify-center font-bold  
                                    ${
                                      "mail" === activeType
                                        ? "bg-white text-caak-primary border-b-2 border-caak-primary "
                                        : "bg-transparent text-caak-darkBlue"
                                    }
                                    `}
        >
          <span className="icon-fi-rs-mail-1 text-24px px mr-px-6" />
          <p className="text-15px ml-px-10 font-medium">Имэйл хаяг</p>
        </Button>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c8">
          <p className="error">{error}</p>
          <Input
            label={`Таны ${condition ? "утасны дугаар" : "имэйл хаяг"}`}
            name={`${condition ? "phoneNumber" : "email"}`}
            value={`${condition ? phoneNumber : email}`}
            type={"text"}
            errorMessage={condition ? errors.phoneNumber : errors.email}
            onChange={handleChange}
            placeholder={`${condition ? "Утасны дугаар" : "Имэйл хаяг"}`}
            className={
              "border border-caak-titaniumwhite h-[44px] mt-[8px] bg-caak-liquidnitrogen hover:bg-white"
            }
          />
          <Input
            value={password}
            label={"Нууц үг"}
            name={"password"}
            type={"password"}
            errorMessage={errors.password}
            onChange={handleChange}
            placeholder={"Нууц үг"}
            className={
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen hover:bg-white h-[44px] mt-[8px]"
            }
          />
          <Input
            label={"Нууц үг давтах"}
            value={passwordRepeat}
            name={"passwordRepeat"}
            type={"password"}
            errorMessage={errors.passwordRepeat}
            onChange={handleChange}
            placeholder={"Нууц үг давтах"}
            className={
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen hover:bg-white  h-[44px] mt-[8px]"
            }
          />
        </div>
        <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => handleSubmit(doSubmit)}
            className={`rounded-md w-full h-c9 text-16px font-medium  ${
              isValid
                ? "bg-caak-primary text-white"
                : "bg-caak-titaniumwhite text-caak-shit"
            }`}
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </form>
    </>
  );
};

export default Register;
