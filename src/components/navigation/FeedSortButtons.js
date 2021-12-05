import Button from "../button";
import { useState } from "react";

const FeedSortButtons = ({ direction, containerClassname, hide, items, iconSize, iconContainerSize, textClassname }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return !hide && (
    <div
      className={`flex ${
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
                className={
                  `flex justify-center items-center ${iconContainerSize ? iconContainerSize : "w-[26px] h-[26px]"}  mr-px-6 ph:w-4 ph:mr-2`
                }
              >
                <i
                  className={`${
                    id === activeIndex ? `${icon}-f` : `${icon}-o`
                  } ${iconSize ? iconSize : "text-[26px] text-[26px]"} ph:text-15px`}
                />
              </div>
            }
          >
            <p className={`${textClassname ? textClassname : ""} text-16px ph:text-15px font-bold`}>{type}</p>
          </Button>
        );
      })}
    </div>
  );
};

export default FeedSortButtons;
