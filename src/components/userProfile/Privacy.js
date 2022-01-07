import { useState } from "react";
import Switch from "./Switch";
import Consts from "/src/utility/Consts";
import Auth from "@aws-amplify/auth";
import Validate from "/src/utility/Validate";
import Input from "/src/components/input";
import { useUser } from "../../context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "../../graphql-custom/user/mutation";

export default function Privacy() {
  const { user } = useUser();

  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [isFollowedGroup, setIsFollowedGroup] = useState(
    typeof JSON.parse(user.meta)?.settings?.showFollowedGroup === "boolean"
      ? JSON.parse(user.meta)?.settings?.showFollowedGroup
      : true
  );
  const [isCreatedGroup, setIsCreatedGroup] = useState(
    typeof JSON.parse(user.meta)?.settings?.showCreatedGroup === "boolean"
      ? JSON.parse(user.meta)?.settings?.showCreatedGroup
      : true
  );
  const [col, setCol] = useState(false);

  const validate = {
    oldPassword: {
      value: oldPassword,
      type: Consts.typePassword,
      onChange: setOldPassword,
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

  const { handleChange, errors, setErrors, handleSubmit } = Validate(validate);

  const handleClick = () => {
    setShowInput(true);
    setCol(true);
  };

  const clear = () => {
    setOldPassword("");
    setPassword("");
    setPasswordRepeat("");
    setShowInput(false);
    setCol(false);
  };

  const doConfirm = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();

      setLoading(true);
      await Auth.changePassword(authUser, oldPassword, password);
      setMessage("Нууц үг амжилттай солигдлоо!");
      setLoading(false);
      setShowInput(false);
      setCol(false);

      clear();
    } catch (ex) {
      setLoading(false);
      if (ex.code === "CodeMismatchException") {
        setErrors({ ...errors, code: "Баталгаажуулах код буруу байна" });
      } else if (ex.code === "LimitExceededException") {
        setError("Түр хугацааны дараа дахин оролдоно уу");
      } else if (ex.code === "UserNotFoundException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      } else if (ex.code === "InvalidParameterException") {
        setError("Имэйл хаяг буруу байна");
      } else if (ex.code === "NotAuthorizedException") {
        setError("Хуучин нууц үг буруу байна");
      } else {
        console.log(ex);
      }
    }
  };

  const updateUserData = async (res) => {
    await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: user.id,
          meta: res,
        },
      })
    );
  };

  const toggleFollowedGroup = async () => {
    setIsFollowedGroup(!isFollowedGroup);
    const temp = JSON.parse(user.meta);

    const res1 = {
      ...temp,
      settings: {
        autoPlay: temp.settings.autoPlay,
        showFollowedGroup: !isFollowedGroup,
        showCreatedGroup: temp.settings.showCreatedGroup,
      },
    };

    const res = JSON.stringify(res1);
    await updateUserData(res);
  };
  const toggleCreatedGroup = async () => {
    setIsCreatedGroup(!isCreatedGroup);
    const temp = JSON.parse(user.meta);

    const res1 = {
      ...temp,
      settings: {
        autoPlay: temp.settings.autoPlay,
        showFollowedGroup: temp.settings.showFollowedGroup,
        showCreatedGroup: !isCreatedGroup,
      },
    };

    const res = JSON.stringify(res1);
    await updateUserData(res);
  };

  return (
    <div className="flex flex-col mt-[30px] mb-[70px] mx-[30px]">
      <p className="font-semibold text-caak-aleutian font-inter text-22px mb-[10px]">
        Нууцлал
      </p>
      <div
        style={{ paddingBlock: "14px" }}
        className=" flex items-center justify-between w-full border-b"
      >
        <p className="text-15px font-inter font-normal">
          Нэгдсэн группуудыг ил харуулах
        </p>
        <Switch toggle={toggleFollowedGroup} active={isFollowedGroup} />
      </div>
      <div
        style={{ paddingBlock: "14px" }}
        className=" flex items-center justify-between w-full border-b"
      >
        <p className="text-15px font-inter font-normal">
          Миний үүсгэсэн группуудыг ил харуулах
        </p>
        <Switch toggle={toggleCreatedGroup} active={isCreatedGroup} />
      </div>
      <div
        className={`${
          col ? "flex-col mt-[12px]" : "justify-between items-center h-[48px]"
        }  flex  border-b`}
      >
        <p className=" text-15px   font-normal font-inter">
          Нууц үгээ шинэчлэх
        </p>
        {showInput ? (
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex w-full">
              <div className="flex flex-col w-full">
                <Input
                  value={oldPassword}
                  name={"oldPassword"}
                  type={"password"}
                  errorMessage={errors.oldPassword}
                  onChange={handleChange}
                  placeholder={"Хуучин нууц үгээ оруулах"}
                  className={
                    "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen mt-[10px]"
                  }
                />
                <p className="text-13px text-caak-red">{error}</p>

                <Input
                  value={password}
                  name={"password"}
                  type={"password"}
                  errorMessage={errors.password}
                  onChange={handleChange}
                  placeholder={"Шинэ нууц үг"}
                  className={
                    "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                  }
                />
                <Input
                  value={passwordRepeat}
                  name={"passwordRepeat"}
                  type={"password"}
                  errorMessage={errors.passwordRepeat}
                  onChange={handleChange}
                  placeholder={"Шинэ нууц үг давтах"}
                  className={
                    "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                  }
                />
              </div>
              <button
                onClick={() => clear()}
                className="icon-fi-rs-close font-bold text-caak-boilingmagma ml-10"
              />
              <button
                onClick={() => handleSubmit(doConfirm)}
                className="icon-fi-rs-thick-check text-caak-algalfuel ml-4"
              />
            </div>
          </form>
        ) : (
          <>
            <p className="text-green-500">{message}</p>
            <span
              onClick={() => handleClick()}
              className=" icon-fi-rs-edit-f text-caak-darkBlue cursor-pointer"
            />
          </>
        )}
      </div>
      <div className="flex justify-end">
        <div className="text-caak-red mt-[60px] pb-[22px] flex items-center j cursor-pointer">
          <span className="icon-fi-rs-delete-o text-18px" />
          <p className="text-14px ml-px-6 font-normal font-inter">
            Бүртгэлээ устгах
          </p>
        </div>
      </div>
    </div>
  );
}
