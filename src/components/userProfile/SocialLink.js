import { useEffect, useState } from "react";
import Button from "/src/components/button";
import Input from "/src/components/input";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "../../graphql-custom/user/mutation";
import { useUser } from "../../context/userContext";

export default function SocialLink() {
  const { user } = useUser();
  const [showInput, setShowInput] = useState(false);
  const initialData = {
    facebook: "",
    instagram: "",
    tiktok: "",
    twitter: "",
  };
  const [text, setText] = useState(
    user?.meta ? JSON.parse(user.meta) : initialData
  );
  const [loading, setLoading] = useState(false);
  const [col, setCol] = useState(false);

  const [currentIndex, setCurrentIndex] = useState();
  const menus = [
    {
      id: 0,
      text: "Instagram",
      name: "instagram",
      value: text?.instagram ? text.instagram : "",
      icon: "icon-fi-rs-ig",
    },
    {
      id: 1,
      text: "Facebook",
      name: "facebook",
      value: text?.facebook ? text.facebook : "",
      icon: "icon-fi-rs-fb",
    },
    {
      id: 2,
      text: "Tiktok",
      name: "tiktok",
      value: text?.tiktok ? text.tiktok : "",
      icon: "icon-fi-rs-tiktok",
    },
    {
      id: 3,
      text: "Twitter",
      name: "twitter",
      value: text?.twitter ? text.twitter : "",
      icon: "icon-fi-rs-twitter",
    },
  ];

  const handleSubmit = async (e) => {
    const res = JSON.stringify(text);

    await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: user.id,
          meta: res,
        },
      })
    );
    setText("");
    user.meta = res;
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

  useEffect(() => {
    setText(JSON.parse(user.meta));
  }, [user]);

  return (
    <div className="flex flex-col">
      <p
        className="font-medium"
        style={{
          marginLeft: "30px",
          marginTop: "30px",
          fontSize: "24px",
        }}
      >
        Сошиал холболтууд
      </p>
      <div style={{ marginTop: "21px" }} className="flex flex-col pb-c60">
        {menus.map((menu, index) => {
          return (
            <div
              key={index}
              style={{ paddingBlock: "14px" }}
              className={`${
                currentIndex === index && col ? "flex-col" : ""
              } px-c3 flex   justify-between w-full border-b  `}
            >
              <div className="flex items-center ">
                <span
                  className={`${
                    menu.icon ? menu.icon : "mr-5"
                  } text-caak-darkBlue text-20px`}
                />
                <p
                  style={{ marginLeft: "22px" }}
                  className="text-16px font-medium  "
                >
                  {menu.text}
                </p>
              </div>
              {currentIndex === index && showInput ? (
                <form
                  className={`flex w-full mt-[10px]  flex-col`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex items-center ">
                    <div className="text-caak-darkBlue text-sm pb-2">
                      www.{menu.name}.com/
                    </div>
                    <div className="w-full">
                      <Input
                        name={menu.name}
                        defaultValue={menu.value}
                        type="text"
                        // value={currentUser.title}
                        onChange={handleChange}
                        className={
                          "border mr-2 border-caak-titaniumwhite  bg-caak-liquidnitrogen"
                        }
                      />
                    </div>
                  </div>

                  <div className=" my-auto flex items-center justify-end pb-3">
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
                <div className="flex  items-center">
                  <Button
                    onClick={() => handleClick(menu.id)}
                    style={{ width: "75px" }}
                    className="bg-caak-bleudefrance text-white font-inter font-medium text-12px h-c2 rounded-full"
                  >
                    Холбох
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
