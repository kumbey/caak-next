import Button from "../../components/button";
import { useState } from "react";

const GroupSortButtons = ({
  direction,
  containerClassname,
  hide,
  items,
  items2,
  iconSize,
  textClassname,
  activeIndex,
  activeView,
  setActiveIndex,
  setActiveView,
  setSortType,
}) => {
  return (
    !hide && (
      <div className="justify-center flex md:justify-between max-w-[616px] mx-auto">
        <div
          className={`flex mb-[19px] ${
            direction === "column" ? "flex-col" : "flex-row"
          } ${containerClassname ? containerClassname : ""}`}
        >
          {items.map(({ icon, type,title, id }) => {
            return (
              <Button
                key={id}
                onClick={() => {
                  setSortType(type);
                  setActiveIndex(id);
                }}
                className={`mx-[2px] py-[7px] px-[20px] ${
                  direction === "column" ? "w-full h-12" : "w-auto h-9"
                } min-w-max ${
                  id === activeIndex
                    ? "white shadow-button mb-1"
                    : "transparent mb-1"
                }`}
                iconPosition={"left"}
                icon={
                  <div
                    className={`flex justify-center items-center ${
                      iconSize ? iconSize : "w-[26px] h-[26px]"
                    }  mr-px-6 ph:w-4 ph:mr-2`}
                  >
                    <i
                      className={`${
                        id === activeIndex ? `${icon}-f` : `${icon}-o`
                      } ${iconSize ? iconSize : "text-[22px] "} ph:text-15px`}
                    />
                  </div>
                }
              >
                <p
                  className={`${
                    textClassname ? textClassname : ""
                  } text-16px ph:text-15px font-bold`}
                >
                  {title}
                </p>
              </Button>
            );
          })}
        </div>
        <div className="hidden md:flex w-[80px] h-[36px] px-[5px] py-[4px] mb-[19px]  items-center justify-center bg-white rounded-lg">
          <div
            className={`flex flex-nowrap items-center w-full justify-between ${
              direction === "column" ? "flex-col" : "flex-row"
            }`}
          >
            {items2.map(({ icon, id }) => {
              return (
                <div
                  className={`flex items-center justify-center w-[32px] h-[28px] rounded-[5px] ${
                    id === activeView ? "bg-caak-titaniumwhite" : ""
                  }`}
                  key={id}
                >
                  <div
                    className={`w-[20px] h-[20px] flex items-center justify-center cursor-pointer`}
                    onClick={() => setActiveView(id)}
                  >
                    <span
                      className={`${
                        id === activeView ? `${icon}-f` : `${icon}-o`
                      } text-[16.67px] ph:text-15px`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default GroupSortButtons;
