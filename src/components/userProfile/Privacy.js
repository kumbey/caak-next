import { useState } from "react";
import Switch from "./Switch";
import Consts from "/src/utility/Consts";
import Auth from "@aws-amplify/auth";
import Validate from "/src/utility/Validate";
import Input from "/src/components/input";
import { useUser } from "../../context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Button from "../button";
import toast from "react-hot-toast";
import { updateUser } from "../../graphql-custom/user/mutation";

export default function Privacy() {
  const { user } = useUser();

  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [isFollowedGroup, setIsFollowedGroup] = useState(
    typeof JSON.parse(user.meta)?.settings?.showFollowedGroup === "boolean"
      ? JSON.parse(user.meta)?.settings?.showFollowedGroup
      : false
  );

  const [isCreatedGroup, setIsCreatedGroup] = useState(
    typeof JSON.parse(user.meta)?.settings?.showCreatedGroup === "boolean"
      ? JSON.parse(user.meta)?.settings?.showCreatedGroup
      : false
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
    setError("");
    setErrors("");
  };

  const doConfirm = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();

      setLoading(true);
      await Auth.changePassword(authUser, oldPassword, password);
      // setMessage("???????? ???? ?????????????????? ??????????????????!");
      setLoading(false);
      setShowInput(false);
      setCol(false);
      toast.success("???????? ???? ?????????????????? ??????????????????!");

      clear();
    } catch (ex) {
      setLoading(false);
      if (ex.code === "CodeMismatchException") {
        setErrors({ ...errors, code: "???????????????????????????? ?????? ?????????? ??????????" });
      } else if (ex.code === "LimitExceededException") {
        setError("?????? ?????????????????? ?????????? ?????????? ???????????????? ????");
      } else if (ex.code === "UserNotFoundException") {
        setError("???????????????????? ?????????????????? ??????????????????");
      } else if (ex.code === "InvalidParameterException") {
        setError("?????????? ???????? ?????????? ??????????");
      } else if (ex.code === "NotAuthorizedException") {
        setError("???????????? ???????? ???? ?????????? ??????????");
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
        autoPlay: temp?.settings?.autoPlay,
        showFollowedGroup: !isFollowedGroup,
        showCreatedGroup: temp?.settings?.showCreatedGroup,
      },
    };

    const res = JSON.stringify(res1);
    setLoading(true);
    await updateUserData(res);
    setLoading(false);
  };
  const toggleCreatedGroup = async () => {
    setIsCreatedGroup(!isCreatedGroup);
    const temp = JSON.parse(user.meta);

    const res1 = {
      ...temp,
      settings: {
        autoPlay: temp?.settings?.autoPlay,
        showFollowedGroup: temp?.settings?.showFollowedGroup,
        showCreatedGroup: !isCreatedGroup,
      },
    };

    const res = JSON.stringify(res1);
    setLoading(true);
    await updateUserData(res);
    setLoading(false);
  };

  return (
    <div className="flex flex-col mt-[30px] mb-[70px] mx-[30px]">
      <p className="font-semibold text-[#21293C] text-22px mb-[10px]">
        ??????????????
      </p>
      <div
        style={{ paddingBlock: "14px" }}
        className=" flex items-center justify-between w-full border-b"
      >
        <p className="text-15px font-inter font-normal">
          ?????????????? ???????????????????? ???? ????????????????
        </p>
        <Switch
          toggle={toggleFollowedGroup}
          active={isFollowedGroup}
          loading={loading}
        />
      </div>
      <div
        style={{ paddingBlock: "14px" }}
        className=" flex items-center justify-between w-full border-b"
      >
        <p className="text-15px font-inter font-normal">
          ?????????? ???????????????? ???????????????????? ???? ????????????????
        </p>
        <Switch
          toggle={toggleCreatedGroup}
          active={isCreatedGroup}
          loading={loading}
        />
      </div>
      <div
        className={`${
          col ? "flex-col mt-[12px]" : "justify-between items-center h-[48px]"
        }  flex  border-b`}
      >
        <p className=" text-15px   font-normal font-inter">
          ???????? ???????? ????????????????
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
                  placeholder={"???????????? ???????? ???????? ??????????????"}
                  className={
                    "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen hover:bg-white mt-[10px]"
                  }
                />
                <p className="text-13px text-caak-red">{error}</p>

                <Input
                  value={password}
                  name={"password"}
                  type={"password"}
                  errorMessage={errors.password}
                  onChange={handleChange}
                  placeholder={"???????? ???????? ????"}
                  className={
                    "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen hover:bg-white"
                  }
                />
                <Input
                  value={passwordRepeat}
                  name={"passwordRepeat"}
                  type={"password"}
                  errorMessage={errors.passwordRepeat}
                  onChange={handleChange}
                  placeholder={"???????? ???????? ???? ????????????"}
                  className={
                    "w-full border border-caak-titaniumwhite  bg-caak-liquidnitrogen hover:bg-white"
                  }
                />
              </div>
            </div>
            <div className="justify-end mt-[10px] flex items-center pb-3">
              <Button
                loading={loading}
                onClick={() => clear()}
                className="bg-white text-15px border border-caak-unicornsilver rounded-lg text-caak-generalblack mr-[10px]  px-[24px] "
              >
                ??????????
              </Button>

              <Button
                loading={loading}
                onClick={() => handleSubmit(doConfirm)}
                className="border  rounded-lg text-white text-15px bg-caak-bleudefrance"
              >
                ??????????
              </Button>
            </div>
          </form>
        ) : (
          <>
            {/* <p className="text-green-500">{message}</p> */}
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
            ?????????????????? ????????????
          </p>
        </div>
      </div>
    </div>
  );
}
