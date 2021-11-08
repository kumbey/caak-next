import React from "react";
import Dummy from "dummyjs";
import Button from "../button";
import Divider from "../divider";

const CardRecommend = () => {
  return (
    <div className={"w-96 bg-white rounded-xl"}>
      <div className={"flex flex-col py-3.5 px-5 pb-3"}>
        <div className={"text-caak-generalblack font-bold text-18px"}>
          Танд санал болгох бүлгүүд
        </div>
      </div>
      <Divider />
      <div className={"flex flex-col py-3.5 px-5"}>
        <div className={"flex flex-row items-center justify-between mb-3"}>
          <div className={"flex flex-row "}>
            <img
              data-dummy="100x100"
              src={Dummy.img("100x100")}
              className={"w-15 h-15 rounded-md object-cover mr-2"}
              alt={""}
            />
            <div className={"flex flex-col justify-center"}>
              <div className={"text-15px font-bold text-caak-generalblack"}>
                Mongolian Gamers
              </div>
              <div className={"text-14px text-caak-darkBlue"}>25 Гишүүн</div>
            </div>
          </div>
          <div>
            <Button
              round
              className={
                "text-caak-primary font-bold text-15px py-7px px-5 bg-caak-boilingmagma bg-opacity-5"
              }
              skin={"secondary"}
            >
              Нэгдэх
            </Button>
          </div>
        </div>
        <div className={"flex flex-row items-center justify-between"}>
          <div className={"flex flex-row "}>
            <img
              data-dummy="100x100"
              src={Dummy.img("100x100")}
              className={"w-15 h-15 rounded-md object-cover mr-2"}
              alt={""}
            />
            <div className={"flex flex-col justify-center"}>
              <div className={"text-15px font-bold text-caak-generalblack"}>
                Mongolian Gamers
              </div>
              <div className={"text-14px text-caak-darkBlue"}>25 Гишүүн</div>
            </div>
          </div>
          <div>
            <Button
              round
              className={
                "text-caak-primary font-bold text-15px py-7px px-5 bg-caak-boilingmagma bg-opacity-5"
              }
              skin={"secondary"}
            >
              Нэгдэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRecommend;
