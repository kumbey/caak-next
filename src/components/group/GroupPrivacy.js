import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Button from "/src/components/button";
import { updateGroup } from "../../graphql-custom/group/mutation";

import Input from "/src/components/input";
import Divider from "../divider";

export default function GroupPrivacy({ groupData }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState({});
  const [loading, setLoading] = useState(false);

  const [col, setCol] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [selectedOption, setSelectedOption] = useState("public");

  const handleSubmit = async (e) => {
    if (text !== e.target.value) {
      await API.graphql(
        graphqlOperation(updateGroup, {
          input: {
            id: groupData.id,
            ...text,
          },
        })
      );
      setText("");
    }
    setShowInput(false);
    setCol(false);
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
    setSelectedOption(e.target.value);
    // setText({ ...text, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col">
      <p
        className="font-semibold text-caak-aleutian font-inter text-22px"
        style={{ marginLeft: "30px", marginTop: "30px", fontSize: "24px" }}
      >
        Группын мэдээлэл
      </p>
      <div
        style={{ marginTop: "21px" }}
        className={`${
          currentIndex === 1 && col ? "flex-col" : ""
        } mx-c3 flex  justify-between`}
      >
        <p className="font-semibold font-inter text-15px text-caak-generalblack">
          Группын нууцлал
        </p>
        {currentIndex === 1 && showInput ? (
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col w-full">
              <div className={" mt-[12px]"}>
                <div className={"w-full relative block mt-[12px]"}>
                  <div
                    className={`radio flex items-center justify-between w-full h-[48px] px-[15px] rounded-lg ${
                      selectedOption === "public"
                        ? "bg-caak-liquidnitrogen"
                        : ""
                    }`}
                  >
                    <label className="flex items-center">
                      <span className="icon-fi-rs-globe text-18px mb-1 mr-[6px]" />
                      <p className="text-15px font-inter font-normal text-caak-generalblack">
                        Нээлттэй групп
                      </p>
                    </label>
                    <input
                      type="radio"
                      value="public"
                      checked={selectedOption === "public"}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`radio flex items-center justify-between w-full h-[48px] px-[15px] rounded-lg ${
                      selectedOption === "private"
                        ? "bg-caak-liquidnitrogen"
                        : ""
                    }`}
                  >
                    <label className="flex items-center">
                      <span className="icon-fi-rs-lock-o text-18px mb-1 mr-[6px]" />
                      <p className="text-15px font-inter font-normal text-caak-generalblack">
                        Хаалттай групп
                      </p>
                    </label>
                    <input
                      type="radio"
                      value="private"
                      checked={selectedOption === "private"}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
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
                  // onClick={handleSubmit}
                  className="border  rounded-lg text-white text-15px bg-caak-bleudefrance"
                >
                  Хадгалах
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex ">
            <span
              onClick={() => handleClick(1)}
              className="icon-fi-rs-edit-f text-caak-darkBlue ml-10 cursor-pointer"
            />
          </div>
        )}
      </div>
      <Divider className="mx-[30px] my-[15px]" />
    </div>
  );
}
