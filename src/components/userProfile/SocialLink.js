import { useEffect, useState } from "react";
import Button from "/src/components/button";
import Input from "/src/components/input";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "../../graphql-custom/user/mutation";
import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";
import { getURLUserName } from "../../utility/Util";

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
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState();
  const menus = [
    {
      id: 0,
      text: "Instagram",
      name: "instagram",
      value: text?.instagram ? text.instagram : "",
      icon: "icon-fi-rs-ig",
      mnText: "инстаграм",
    },
    {
      id: 1,
      text: "Facebook",
      name: "facebook",
      value: text?.facebook ? text.facebook : "",
      icon: "icon-fi-rs-facebook path2",
      mnText: "фэйсбүүк",
    },
    {
      id: 2,
      text: "Tiktok",
      name: "tiktok",
      value: text?.tiktok ? text.tiktok : "",
      icon: "icon-fi-rs-tiktok",
      mnText: "тикток",
    },
    {
      id: 3,
      text: "Twitter",
      name: "twitter",
      value: text?.twitter ? text.twitter : "",
      icon: "icon-fi-rs-twitter",
      mnText: "твиттер",
    },
  ];
  const saveSocial = async () => {
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
    toast.success("Амжилттай хадгалагдлаа.");

    setShowInput(false);
    setError("");
  };

  const handleSubmit = async (name, id) => {
    console.log(text[id]);
    if (text[name].length > 0) {
      if (text[name].includes(name)) {
        saveSocial();
      } else {
        setError(`Уучлаарай ${menus[id].mnText} хаяг биш байна`);
      }
    } else {
      saveSocial();
    }
  };

  const handleClick = (id) => {
    setCurrentIndex(id);
    setCol(true);
    setShowInput(true);
    setError("");
  };
  const handleCancel = () => {
    setCol(false);
    setShowInput(false);
    setError("");
  };

  const handleChange = (e) => {
    if (getURLUserName(e.target.value, "CHECK")) {
      setText({ ...text, [e.target.name]: e.target.value });
    } else {
      if (e.target.value.length > 0) {
        setText({
          ...text,
          [e.target.name]: `https://www.${e.target.name}.com/${e.target.value}`,
        });
      } else {
        setText({ ...text, [e.target.name]: e.target.value });
      }
    }
  };

  useEffect(() => {
    setText(user.meta ? JSON.parse(user.meta) : "");
  }, [user]);

  return (
    <div className="flex flex-col mx-[30px]">
      <p
        className="font-semibold text-[#21293C] text-22px"
        style={{
          marginTop: "30px",
          fontSize: "24px",
        }}
      >
        Сошиал холболтууд
      </p>
      <div style={{ marginTop: "10px" }} className="flex flex-col pb-c60">
        {menus.map((menu, index) => {
          return (
            <div
              key={index}
              style={{ paddingBlock: "14px" }}
              className={`${
                currentIndex === index && col ? "flex-col" : ""
              } flex   justify-between w-full border-b  `}
            >
              <div className="flex items-center">
                <div
                  className={
                    "w-[24px] h-[24px] flex items-center justify-center"
                  }
                >
                  <span
                    className={`${menu.icon} text-caak-darkBlue text-[20px]`}
                  />
                </div>

                <p className="text-[15px] ml-[14px] font-normal  ">
                  {menu.text}
                </p>
              </div>
              {currentIndex === index && showInput ? (
                <form
                  className={`flex w-full mt-[10px]  flex-col`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex items-center ">
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

                  <div className="flex items-center justify-between">
                    <p className="text-13px text-caak-red pb-3">{error}</p>

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
                        onClick={() => handleSubmit(menu.name, menu.id)}
                        className="border  rounded-lg text-white text-15px bg-caak-bleudefrance"
                      >
                        Хадгалах
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex  items-center">
                  {
                    <Button
                      onClick={() => handleClick(menu.id)}
                      className={`${
                        menu.value.length > 0
                          ? "bg-caak-titaniumwhite text-caak-generalblack"
                          : "bg-caak-bleudefrance text-white "
                      } text-12px h-c2 rounded-full font-medium  w-[101px]`}
                    >
                      {menu.value.length > 0 ? "Холбогдсон" : "Холбох"}
                    </Button>
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
