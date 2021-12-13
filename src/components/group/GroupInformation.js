import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateGroup } from "../../graphql-custom/group/mutation";
import Button from "/src/components/button";
import Input from "../input";
import Divider from "../divider";

export default function GroupInformation({
  categoryList,
  groupData,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState({});
  const [col, setCol] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  const maxLengths = {
    title: 200,
    description: 500,
  };
  function auto_grow(element) {
    element.target.style.height = "5px";
    element.target.style.height = element.target.scrollHeight + "px";
  }

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
      groupData.name = text.name;
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
    setText({ ...text, [e.target.name]: e.target.value });
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
          Нэр болон тайлбар
        </p>
        {currentIndex === 1 && showInput ? (
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col w-full">
              <div className={" mt-[12px]"}>
                <div className={"w-full  block relative"}>
                  <div className="absolute flex flex-row items-center text-12px font-inter font-normal text-caak-darkBlue left-[13px] top-[20px] -translate-y-1/2 ">
                    Нэр
                  </div>
                  <div className={"input"}>
                    <textarea
                      autoFocus
                      onInput={auto_grow}
                      maxLength={maxLengths.title}
                      style={{ resize: "none" }}
                      defaultValue={groupData.name}
                      name={"name"}
                      type={"text"}
                      onChange={handleChange}
                      className={
                        " overflow-hidden min-h-[63px] text-[15px] pt-[25px] pr-[55px] text-caak-generalblack font-inter font-normal w-full rounded-[6px] border-[1px] "
                      }
                    />
                  </div>

                  <span
                    className={
                      "absolute top-1/2 -translate-y-1/2 right-[12px] text-[12px] text-caak-darkBlue"
                    }
                  >
                    {groupData.name?.length || 0}/{maxLengths.title}
                  </span>
                </div>
                <div className={"w-full relative block mt-[12px]"}>
                  <div className="absolute flex flex-row items-center text-12px font-inter font-normal text-caak-darkBlue left-[13px] top-[20px] -translate-y-1/2 ">
                    Тайлбар
                  </div>
                  <div className={"input"}>
                    <textarea
                      //  overflow-y: scroll;
                      //  height: 100px;
                      //  resize: none;

                      onInput={auto_grow}
                      style={{ resize: "none" }}
                      defaultValue={groupData.about}
                      name={"about"}
                      type={"text"}
                      onChange={handleChange}
                      className={
                        "overflow-y-scroll resize-y min-h-[110px] text-[15px] pt-[25px] pr-[55px] text-caak-generalblack font-inter font-normal w-full rounded-[6px] border-[1px] "
                      }
                      rows={2}
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
                  onClick={handleSubmit}
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
              className="icon-fi-rs-pencil text-caak-darkBlue ml-10 cursor-pointer"
            />
          </div>
        )}
      </div>
      <Divider className="mx-[30px] my-[15px]" />
      <div
        className={`${
          currentIndex === 2 && col ? "flex-col" : ""
        } mx-c3 flex  justify-between`}
      >
        <p className="font-semibold font-inter text-15px text-caak-generalblack">
          Группын ID
        </p>
        {currentIndex === 2 && showInput ? (
          <form
            className="w-full mt-[10px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              name={"id"}
              defaultValue={groupData.id}
              readOnly
              type="text"
              // value={groupData.title}
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
                onClick={() => handler(post.id, "ARCHIVED")}
                className="border  rounded-lg text-white text-15px bg-caak-bleudefrance"
              >
                Хадгалах
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex ">
            <span
              onClick={() => handleClick(2)}
              className="icon-fi-rs-pencil text-caak-darkBlue ml-10 cursor-pointer"
            />
          </div>
        )}
      </div>
      <Divider className="mx-[30px] my-[15px]" />

      <div
        className={`${
          currentIndex === 3 && col ? "flex-col" : ""
        } mx-c3 flex  justify-between`}
      >
        <p className="font-semibold font-inter text-15px text-caak-generalblack">
          Төрөл
        </p>
        {currentIndex === 3 && showInput ? (
          <form
            className="flex w-full items-center justify-between mt-[10px]"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* <Input
              name={"category.name"}
              defaultValue={groupData.category.name}
              autoFocus
              type="text"
              // value={groupData.title}
              onChange={handleChange}
              className={
                "border border-caak-titaniumwhite  bg-caak-liquidnitrogen"
              }
            /> */}
            <select
              className="min-w-[150px] h-[36px] p-[0px] border-none rounded-lg text-15px font-inter font-normal text-caak-generalblack"
              // onChange={handleChange}
              name={"category"}
            >
              {categoryList.map((cat, index) => {
                return (
                  <option key={index} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

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
                onClick={handleSubmit}
                className="border  rounded-lg text-white text-15px bg-caak-bleudefrance"
              >
                Хадгалах
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex ">
            <span
              onClick={() => handleClick(3)}
              className="icon-fi-rs-pencil text-caak-darkBlue ml-10 cursor-pointer"
            />
          </div>
        )}
      </div>
      <Divider className="mx-[30px] mt-[15px] mb-[70px]" />
    </div>
  );
}
