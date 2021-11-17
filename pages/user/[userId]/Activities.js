import React, { useState } from "react";
import ProfileBack from "../../components/Sidebar/ProfileBack";
import PostPending from "../Group/PostPending";
import { types } from "./data";
import { useHistory } from "react-router";

export default function Activities() {
  const history = useHistory();

  const [selected, setSelected] = useState();

  const handleColor = (row) => {
    setSelected(row.title);
  };
  return (
    <div>
      <div
        style={{ height: "220px" }}
        className="ph:h-c22 flex items-center justify-center bg-white border-t"
      >
        <div className="ph:grid ph:justify-center 2xl:px-cf xl:px-ch lg:px-c12 md:px-c30 flex justify-between w-full">
          <div className="ph:text-center">
            <div className="ph:grid flex">
              <div className="ph:grid ph:justify-center">
                <img
                  style={{ height: "120px", width: "120px" }}
                  src={
                    "https://d238m8ukn6hkhb.cloudfront.net/file/brand/305/blackpink-jisoo-profile-image.jpeg"
                  }
                  alt=""
                  className="ph:w-c31 ph:h-c31 rounded-full"
                />
              </div>
              <div className="ph:grid ph:justify-center ph:mt-3 sm:ml-c6">
                <p
                  style={{ marginBlockStart: "13px" }}
                  className="text-26px ph:hidden font-bold"
                >
                  Blackpink Jisoo
                </p>
                <p className="text-18px text-caak-generalblack flex justify-center font-normal">
                  @sooyaaa__{" "}
                  <span
                    style={{ marginInlineStart: "4px" }}
                    className="icon-fi-rs-verified text-13px text-caak-buttonblue"
                  />
                </p>
                <div className="mt-b4 flex">
                  <span className="flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      2434
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      Аура
                    </p>
                  </span>
                  <span className="mx-c11 ph:mx-px-8 flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      47.2 сая
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      дагагчид
                    </p>
                  </span>
                  <span className="flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      715
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      пост
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <p className="text-15px text-caak-generalblack mt-px-8 sm:mt-c11">
              energy never lies 🍓
            </p>
          </div>
          <div style={{ marginTop: "10px" }}>
            <div className="ph:hidden flex">
              <div
                onClick={() => history.push({ pathname: "/profile/settings" })}
                className="h-c13 px-c1 flex items-center rounded-lg shadow cursor-pointer"
              >
                <span className="pr-px-6 icon-fi-rs-settings text-18px" />
                <p className="text-15px font-medium">Тохиргоо</p>
              </div>
              <span
                style={{ width: "49px", marginInlineStart: "10px" }}
                className="h-c13 text-4px icon-fi-rs-dots text-caak-generalblack flex items-center justify-center rounded-lg shadow cursor-pointer"
              />
            </div>
            <div className="ph:mt-4 sm:mt-10 ph:justify-center flex justify-end">
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-ig text-caak-blue cursor-pointer"
              />
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-fb text-caak-blue cursor-pointer"
              />
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-tiktok text-caak-blue cursor-pointer"
              />
              <span className="icon-fi-rs-tw text-caak-blue cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="2xl:flex sm:grid md:grid lg:flex xl:flex md:flex ph:grid">
        {/* sideBar */}
        <div className="mt-b5 ml-c3 2xl:w-c22 md:w-c17 ph:hidden">
          {/*profile*/}
          <ProfileBack title={"Профайл руу буцах"} />

          {/*my rate*/}
          <div style={{ marginTop: "23px" }}>
            <p className="text-17px text-caak-generalblack font-bold">
              Миний идэвхи
            </p>
            <div>
              {types.map((list) => (
                <div
                  className="py-px-6 flex items-center rounded-lg cursor-pointer"
                  key={list.title}
                  onClick={() => handleColor(list)}
                  style={{
                    backgroundColor: list.title === selected ? "white" : "",
                    boxShadow:
                      list.title === selected ? "0px 1px 2px #9E9E9E" : "",
                  }}
                >
                  {list.icon}
                  <p>{list.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* post */}
        <div className="mt-c11 2xl:absolute 2xl:left-cf 2xl:right-cf xl:absolute xl:left-c18 xl:right-c18 lg:left-c12 lg:right-c12 sm:left-px-10 sm:right-px-10 bg-white border rounded-lg">
          <p
            style={{ margin: "28px" }}
            className="text-18px text-caak-generalblack font-medium"
          >
            Нийтэд оруулсан фостууд
          </p>
          <PostPending settt />
        </div>
      </div>
    </div>
  );
}
