import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "../../../src/graphql-custom/user/mutation";
import Input from "../../components/input";
import Button from "../button";
import DateInput from "../input/MaskedInput";
import toast, { Toaster } from "react-hot-toast";
import Gender from "../gender/gender";

export default function Informations({ currentUser }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState({
    ...text,
    birthdate: currentUser.birthdate,
  });
  const [gender, setGender] = useState(currentUser.gender);

  const [loading, setLoading] = useState(false);
  const [col, setCol] = useState(false);

  const [currentIndex, setCurrentIndex] = useState();
  const settings = [
    {
      id: 0,
      text: "Нэр",
      name: "firstname",
      type: "text",
      value: currentUser.firstname,
      isReadOnly: false,
    },
    {
      id: 1,
      text: "Хэрэглэгчийн ID",
      name: "nickname",
      type: "text",
      value: currentUser.nickname,
      isReadOnly: false,
    },
    {
      id: 2,
      text: "Тухай",
      name: "about",
      type: "text",
      value: currentUser.about,
      isReadOnly: false,
    },
    {
      id: 3,
      text: "Төрсөн огноо",
      name: "birthdate",
      type: "date",
      value: currentUser.birthdate,
      isReadOnly: false,
    },
    {
      id: 4,
      text: "Хүйс",
      name: "gender",
      type: "gender",
      value: currentUser.gender,
      isReadOnly: false,
    },
    // {
    //   id: 3,
    //   text: "Цахим хаяг",
    //   name: "email",
    //   placeholder: "Цахим хаяг",
    //   type: "text",
    //   value: currentUser.email,
    //   isReadOnly: false,
    // },
    // {
    //   id: 4,
    //   text: "Утасны дугаар",
    //   name: "phone_number",
    //   placeholder: "Утасны дугаар",
    //   type: "text",
    //   value: currentUser.phone,
    //   isReadOnly: false,
    // },
  ];
  const handleSubmit = async (e) => {
    if (text !== e.target.value) {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: currentUser.id,
            ...text,
          },
        })
      );
      // setText("");
      toast.success("Амжилттай хадгалагдлаа.");
    }
    setCol(false);

    setShowInput(false);
  };

  const handleClick = (id) => {
    setCurrentIndex(id);
    setCol(true);
    setShowInput(true);
  };
  const handleCancel = () => {
    setCol(false);
    setShowInput(false);
  };

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col mt-[30px] mb-[70px] mx-[30px]">
      <Toaster
        toastOptions={{
          className: "toastOptions",
          duration: 5000,
        }}
      />
      <p className="font-semibold text-caak-aleutian font-inter text-22px mb-[10px]">
        Хувийн мэдээлэл
      </p>
      {settings.map((setting, index) => {
        return (
          <div
            key={index}
            className={`${
              currentIndex === index && col
                ? "flex-col mt-[12px]"
                : "justify-between h-[48px] items-center"
            }  flex   border-b-[1px]`}
          >
            <p className="font-normal font-inter text-15px text-caak-generalblack">
              {setting.text}
            </p>
            {currentIndex === index && showInput ? (
              <form
                className="w-full mt-[10px]"
                onSubmit={(e) => e.preventDefault()}
              >
                {setting.type === "text" ? (
                  <Input
                    maxLength={80}
                    name={setting.name}
                    defaultValue={setting.value}
                    type="text"
                    // value={currentUser.title}
                    onChange={handleChange}
                    className={
                      "border border-caak-titaniumwhite hover:bg-white bg-caak-liquidnitrogen"
                    }
                  />
                ) : setting.type === "gender" ? (
                  <Gender
                    setText={setText}
                    setGender={setGender}
                    gender={gender}
                  />
                ) : setting.type === "date" ? (
                  <>
                    <DateInput
                      format={"YYYY-MM-DD"}
                      defaultValue={setting.value || ""}
                      value={text.birthdate}
                      text={text}
                      onChange={(e) => {
                        setText({ ...text, birthdate: e.target.value });
                        setting.birthdate = text.birthdate;
                      }}
                      className={
                        "py-3 border border-caak-titaniumwhite h-c9 bg-caak-liquidnitrogen hover:bg-white mt-[8px]"
                      }
                    />
                    <p className="text-12px pt-[5px] text-caak-aleutian">
                      Таны насыг олон нийтэд харуулахгүй.
                    </p>
                  </>
                ) : null}

                <div className="justify-end mt-[10px] flex items-center pb-3">
                  <Button
                    loading={loading}
                    onClick={() => handleCancel()}
                    className="bg-white text-15px border border-caak-unicornsilver rounded-lg text-caak-generalblack mr-[10px]  px-[24px] "
                  >
                    Болих
                  </Button>
                  <Button
                    loading={loading}
                    onClick={(e) => handleSubmit(e)}
                    className="border  rounded-lg text-white text-15px bg-caak-bleudefrance"
                  >
                    Хадгалах
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex ">
                <span
                  onClick={() => handleClick(setting.id)}
                  className="icon-fi-rs-edit-f text-caak-darkBlue ml-10 cursor-pointer"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
