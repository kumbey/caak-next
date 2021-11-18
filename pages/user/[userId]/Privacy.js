import { useState } from "react";
import Switch from "./Switch";
import Consts from "/src/Utility/Consts";
import Auth from "@aws-amplify/auth";
import Validate from "/src/Utility/Validate";
import Input from "/src/components/input";

export default function Privacy() {
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

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
  };

  const clear = () => {
    setOldPassword("");
    setPassword("");
    setPasswordRepeat("");
    setShowInput(false);
  };

  const doConfirm = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();

      setLoading(true);
      await Auth.changePassword(authUser, oldPassword, password);
      setMessage("Нууц үг амжилттай солигдлоо!");
      setLoading(false);
      setShowInput(false);
      clear();
    } catch (ex) {
      setLoading(false);
      if (ex.code === "CodeMismatchException") {
        setErrors({ ...errors, code: "Баталгаажуулах код буруу байна" });
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

  return (
    <>
      <p
        className="font-medium"
        style={{
          marginLeft: "30px",
          marginTop: "30px",
          fontSize: "24px",
        }}
      >
        Нууцлал
      </p>
      <div style={{ marginTop: "21px" }} className="">
        <div
          style={{ paddingBlock: "14px" }}
          className="px-c3 flex items-center justify-between w-full border-b"
        >
          <p className="text-16px font-medium">Элссэн группуудыг ил харуулах</p>
          <Switch />
        </div>
        <div
          style={{ paddingBlock: "14px" }}
          className="px-c3 flex items-center justify-between w-full border-b"
        >
          <p className="text-16px font-medium">
            Миний үүсгэсэн группуудыг ил харуулах
          </p>
          <Switch />
        </div>
        <div
          style={{ paddingBlock: "14px" }}
          className="ph:ml-7 ph:flex-col md:flex-row flex items-center justify-between w-full border-b"
        >
          <p className="ph:w-full ph:mb-3 text-16px ph:pl-0 pl-c3 font-medium">
            Нууц үгээ шинэчлэх
          </p>
          {showInput ? (
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex w-full">
                <div className="flex flex-col w-full">
                  <p className="error">{error}</p>
                  <Input
                    value={oldPassword}
                    name={"oldPassword"}
                    type={"password"}
                    // errorMessage={errors.oldPassword}
                    onChange={handleChange}
                    placeholder={"Хуучин нууц үгээ оруулах"}
                    className={
                      "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                    }
                  />
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
                  loading={loading}
                  onClick={() => handleSubmit(doConfirm)}
                  className="ph:mr-10 pr-c3 icon-fi-rs-thick-check text-caak-algalfuel ml-4"
                />
              </div>
            </form>
          ) : (
            <>
              <p className="text-green-500">{message}</p>
              <span
                onClick={() => handleClick()}
                className="px-c3 icon-fi-rs-pencil text-caak-darkBlue cursor-pointer"
              />
            </>
          )}
        </div>
        <div
          style={{ marginTop: "60px", paddingBottom: "22px" }}
          className="text-caak-red px-c3 flex items-center justify-end cursor-pointer"
        >
          <span className="icon-fi-rs-delete text-15px" />
          <p className="text-15px ml-px-6 font-medium">Бүртгэлээ устгах</p>
        </div>
      </div>
    </>
  );
}
