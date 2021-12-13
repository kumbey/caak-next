import { useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "/src/graphql-custom/user/mutation";
import Input from "/src/components/input";
import Divider from "../divider";
import Button from "../button";

export default function Informations({ currentUser }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState({});
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
      name: "user_id",
      type: "text",
      value: currentUser.id,
      isReadOnly: true,
    },
    {
      id: 2,
      text: "Тухай",
      name: "about",
      type: "text",
      value: currentUser.about,
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
      setText("");
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
    <div className="flex flex-col">
      <p
        className="font-semibold text-caak-aleutian font-inter text-22px"
        style={{ marginLeft: "30px", marginTop: "30px", fontSize: "24px" }}
      >
        Хувийн мэдээлэл
      </p>
      {settings.map((setting, index) => {
        return (
          <div
            key={index}
            className={`${
              currentIndex === index && col ? "flex-col" : ""
            } mx-c3 flex mt-[20px]  justify-between`}
          >
            <p className="font-semibold font-inter text-15px text-caak-generalblack">
              {setting.text}
            </p>
            {currentIndex === index && showInput ? (
              <form
                className="w-full mt-[10px]"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  name={setting.name}
                  defaultValue={setting.value}
                  type="text"
                  // value={currentUser.title}
                  onChange={handleChange}
                  className={
                    "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                  }
                />
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
                  className="icon-fi-rs-pencil text-caak-darkBlue ml-10 cursor-pointer"
                />
              </div>
            )}
          </div>
        );
      })}
      <Divider className="mx-[30px] mt-[15px] mb-[70px]" />
    </div>
  );
}
