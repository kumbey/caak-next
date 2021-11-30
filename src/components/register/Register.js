import { useState, useEffect } from "react";
import Button from "../button";
import Input from "../input";
import Validate from "../../utility/Validate";
import Auth from "@aws-amplify/auth";
import { useUser } from "../../context/userContext";
import Consts from "/src/utility/Consts";
import { nanoid } from 'nanoid'

import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";

const Register = ({ nextStep }) => {
  const { user, setUser, isLogged } = useUser();
  const { lsSet } = useLocalStorage("session");

  const [error, setError] = useState("");
  const [activeType, setActiveType] = useState("phone");
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  let condition = activeType === "phone";

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
      let usr = {};

      usr.username = nanoid(10);
      usr.attributes = {
        profile: `https://caak.mn/u/${usr.username}`
        // preferred_username: usr.username
      }
      if(condition){
          usr.attributes.phone_number = "+976" + phoneNumber
      }else{
        usr.attributes.email = email
      }
      usr.password = password;
      console.log(usr)
      let usrData = {};

      usrData.status = "ACTIVE";
      usrData.status = true;
      usrData.verified = false;

      //do not sign up when its federated sign in
      if (!isLogged) {
        let resp = await Auth.signUp(usr);
        usrData.id = resp.userSub;
      } else {
        usrData.id = user.attributes.sub;
      }
      let localUsr = { usr: usr, usrData: usrData };

      if (!isLogged) {
        lsSet(Consts.SS_UserSignUp, localUsr);
        // router.replace(
        //   `?signInUp=stepUp&isModal=true&username=${username}`,
        //   `/signInUp/stepUp`
        // );
      } else {
        isLogged(user, setUser);
        router.replace(
          `?signInUp=completed&isModal=true`,
          `/signInUp/completed`
        );
      }
      if (nextStep) {
        nextStep();
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
          className={`w-full text-15px h-c32  rounded-none hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  
                                    ${
                                      "phone" === activeType
                                        ? "bg-white text-caak-primary border-b-2 border-caak-primary "
                                        : "bg-transparent text-caak-aleutian"
                                    }
                                    `}
        >
          <span className="icon-fi-rs-phone text-20px " />
          <p className={`text-17px ml-px-10 font-medium `}>Утасны дугаар</p>
        </Button>

        <Button
          key={2}
          onClick={() => setActiveType("mail")}
          className={`w-full text-15px h-c32 rounded-none  hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  
                                    ${
                                      "mail" === activeType
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
            label={`Таны ${condition ? "утасны дугаар" : "имэйл хаяг"}`}
            name={`${condition ? "phoneNumber" : "email"}`}
            value={`${condition ? phoneNumber : email}`}
            type={"text"}
            errorMessage={condition ? errors.phoneNumber : errors.email}
            onChange={handleChange}
            placeholder={`${condition ? "Утасны дугаар" : "Имэйл хаяг"}`}
            className={
              "border border-caak-titaniumwhite bg-caak-liquidnitrogen"
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
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
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
              "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
            }
          />
        </div>
        <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            disabled={isValid ? false : true}
            loading={loading}
            onClick={() => handleSubmit(doSubmit)}
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
    </>
  );
};

export default Register;
