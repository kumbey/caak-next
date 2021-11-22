import { useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "/src/graphql-custom/user/mutation";
import Input from "/src/components/input";

export default function Informations({ currentUser }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState({});

  const [currentIndex, setCurrentIndex] = useState();

  const settings = [
    {
      id: 0,
      text: "Нэр",
      name: "firstname",
      placeholder: currentUser.firstname,
      type: "text",
      value: currentUser.firstname,
      isReadOnly: false,
    },
    {
      id: 1,
      text: "Хэрэглэгчийн ID",
      name: "user_id",
      placeholder: currentUser.username.id_name,
      type: "text",
      value: currentUser.username.id_name,
      isReadOnly: true,
    },
    {
      id: 2,
      text: "Тухай",
      name: "about",
      placeholder: currentUser.about,
      type: "text",
      value: currentUser.about,
      isReadOnly: false,
    },

    // {
    //   id: 4,
    // text: "Цахим хаяг",
    //   name: "email",
    //   placeholder: "Цахим хаяг",
    //   type: "text",
    //   value: currentUser.id,isReadOnly: false,
    // },
    // {
    //   id: 5,
    // text: "Утасны дугаар",
    //   name: "phone_number",
    //   placeholder: "Утасны дугаар",
    //   type: "text",
    //   value: currentUser.id,  isReadOnly: false,
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
    setShowInput(false);
  };

  const handleClick = (id) => {
    setCurrentIndex(id);
    setShowInput(true);
  };

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };
  return (
    <>
      <p
        className="font-medium"
        style={{ marginLeft: "30px", marginTop: "30px", fontSize: "24px" }}
      >
        Хувийн мэдээлэл
      </p>
      <div style={{ marginTop: "21px" }} className="mx-c3 ">
        {settings.map((setting, index) => {
          return (
            <div
              key={index}
              style={{ paddingBlock: "14px" }}
              className="text-16px flex items-center w-full border-b justify-between "
            >
              <div className="flex lg:mr-6 mr-4 ">
                <p className="my-px-9 pr-9 w-24 font-medium">{setting.text}</p>
              </div>
              {showInput && index === currentIndex ? (
                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex w-full">
                    <Input
                      name={setting.name}
                      className={
                        "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                      }
                      // readOnly={setting.isReadOnly}
                      autoFocus
                      id={setting.id}
                      onChange={handleChange}
                      placeholder={setting.placeholder}
                      defaultValue={currentUser[setting.name]}
                      value={text.value}
                      type={setting.type}
                    />

                    <button
                      onClick={() => setShowInput(false)}
                      className="icon-fi-rs-close font-bold text-caak-boilingmagma ml-10"
                    />
                    <button
                      onClick={handleSubmit}
                      className="icon-fi-rs-thick-check text-caak-algalfuel ml-4"
                    />
                  </div>
                </form>
              ) : (
                <>
                  {!setting.isReadOnly ? (
                    <div className="flex w-full">
                      <p className="w-full">{setting.value}</p>
                      <span
                        onClick={() => handleClick(index)}
                        className="icon-fi-rs-pencil text-caak-darkBlue ml-10 cursor-pointer"
                      />
                    </div>
                  ) : null}
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
