import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button";
import Input from "../input";
import Consts from "../../utility/Consts";
import Validate from "../../utility/Validate";
import Gender from "../gender/gender";
import API from "@aws-amplify/api";
import { createUser } from "../../graphql-custom/user/mutation";
import useLocalStorage from "../../hooks/useLocalStorage";
import DateInput from "../input/MaskedInput";
import { useUser } from "../../context/userContext";

const UserInformation = ({ nextStep }) => {
  const router = useRouter();
  const { cognitoUser, isLoginValid } = useUser();

  const [loading, setLoading] = useState(false);

  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const validate = {
    nickname: {
      value: nickname,
      type: Consts.typeRequired,
      onChange: setNickname,
      ignoreOn: true,
    },
    gender: {
      value: gender,
      type: Consts.typeRequired,
      onChange: setGender,
      ignoreOn: true,
    },
    birthdate: {
      value: birthdate,
      type: Consts.typeDate,
      onChange: setBirthdate,
      ignoreOn: true,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit, isValid } =
    Validate(validate);

  const doSubmit = async () => {
    try {
      setLoading(true);

      const usr = {
        id: cognitoUser.attributes.sub,
        nickname: nickname,
        gender: gender,
        birthdate: birthdate,
        status: "ACTIVE",
      };

      await saveUserData(usr);
      try {
        isLoginValid();
        router.replace("/");
      } catch (ex) {
        console.log(ex);
      }

      // if (router.query.isModal) {
      //   router.replace(
      //     {
      //       pathname: router.pathname,
      //       query: {
      //         ...router.query,
      //         signInUp: "complete",
      //       },
      //     },
      //     "/signInUp/complete",
      //     { shallow: true, scroll: false }
      //   );
      // } else {
      //   router.replace("/signInUp/complete", undefined, {
      //     shallow: true,
      //     scroll: false,
      //   });
      // }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const saveUserData = async (data) => {
    await API.graphql({
      query: createUser,
      variables: { input: data },
      authMode: "AWS_IAM",
    });
  };

  return router.query.isModal ? (
    <>
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2 mt-9 font-bold text-24px"
        }
      >
        Хувийн мэдээлэл
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c13 xs:px-2">
          <Input
            maxLength={30}
            label={"Профайл нэр"}
            value={nickname || ""}
            name={"nickname"}
            errorMessage={errors.nickname}
            onChange={handleChange}
            placeholder={"Профайл нэр"}
            className={
              "py-3 border border-caak-titaniumwhite h-c9 bg-caak-lynxwhite hover:bg-white mt-[8px]"
            }
          />
          <DateInput
            format={"YYYY-MM-DD"}
            label={"Таны төрсөн өдөр"}
            value={birthdate || ""}
            name={"birthdate"}
            errorMessage={errors.birthdate}
            onChange={handleChange}
            className={
              "py-3 border border-caak-titaniumwhite h-c9 bg-caak-lynxwhite hover:bg-white mt-[8px]"
            }
          />
          {/* <Input
            label={"Таны нас"}
            value={date || ""}
            name={"date"}
            errorMessage={errors.date}
            onChange={handleChange}
            placeholder={"Нас"}
            className={
              "py-3 border border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"
            }
          /> */}

          <Gender setGender={setGender} gender={gender} label={"Таны хүйс"} />
        </div>
        <div className=" px-c8 ph:px-c2 text-white text-14px flex items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => handleSubmit(doSubmit)}
            className={
              "rounded-md w-full h-c9 text-17px font-bold bg-caak-primary"
            }
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </form>
    </>
  ) : null;
};

export default UserInformation;
