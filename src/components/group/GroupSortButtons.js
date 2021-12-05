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
}) => {
  return (
    !hide && (
      <div className="flex justify-between">
        <div
          className={`flex mb-[19px] ${
            direction === "column" ? "flex-col" : "flex-row"
          } ${containerClassname ? containerClassname : ""}`}
        >
          {items.map(({ icon, type, id }) => {
            return (
              <Button
                key={id}
                onClick={() => setActiveIndex(id)}
                className={`mx-[2px] ${
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
                      } ${iconSize ? iconSize : "text-[26px] "} ph:text-15px`}
                    />
                  </div>
                }
              >
                <p
                  className={`${
                    textClassname ? textClassname : ""
                  } text-16px ph:text-15px font-bold`}
                >
                  {type}
                </p>
              </Button>
            );
          })}

          <div></div>
        </div>
        <div
          className={`flex mb-[19px] bg-white rounded-lg ${
            direction === "column" ? "flex-col" : "flex-row"
          } ${containerClassname ? containerClassname : ""}`}
        >
          {items2.map(({ icon, id }) => {
            return (
              <Button
                key={id}
                onClick={() => setActiveView(id)}
                className={`mx-[2px] ${
                  direction === "column" ? "w-[20px] h-12" : "w-auto h-9"
                } min-w-max transparent mb-1`}
                iconPosition={"left"}
                icon={
                  <div
                    className={`flex justify-center items-center ${
                      iconSize ? iconSize : "w-[26px] h-[26px]"
                    }  `}
                  >
                    <i
                      className={`${
                        id === activeView ? `${icon}-f` : `${icon}-o`
                      } ${iconSize ? iconSize : "text-[26px]"} ph:text-15px`}
                    />
                  </div>
                }
              ></Button>
            );
          })}
        </div>
      </div>
    )
  );
};

export default GroupSortButtons;
