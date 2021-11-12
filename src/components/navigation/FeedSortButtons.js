import Button from "../button";
import { useState } from "react";

const FeedSortButtons = ({ direction }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const feedType = [
    {
      id: 0,
      type: "Тренд",
      icon: "icon-fi-rs-trend",
    },
    {
      id: 1,
      type: "Шинэ",
      icon: "icon-fi-rs-new",
    },
    {
      id: 2,
      type: "Шилдэг",
      icon: "icon-fi-rs-caak",
    },
  ];
  return (
    <div
      className={`flex justify-center ${
        direction === "column" ? "flex-col" : "flex-row"
      }`}
    >
      {feedType.map(({ icon, type, id }) => {
        return (
          <Button
            key={id}
            onClick={() => setActiveIndex(id)}
            className={`${
              direction === "column" ? "w-full h-12" : "w-auto h-9"
            } min-w-max ${
              id === activeIndex
                ? "white shadow-button mb-1"
                : "transparent mb-1"
            }`}
            iconPosition={"left"}
            icon={
              <div className={"flex justify-center items-center w-[26px] h-[26px] mr-px-6 ph:w-4 ph:mr-2"}>
                <i
                  className={`${
                    id === activeIndex ? `${icon}-f` : `${icon}-o`
                  } text-[23px] ph:text-15px`}
                />
              </div>
            }
          >
            <p className="text-16px ph:text-15px font-bold">{type}</p>
          </Button>
        );
      })}
    </div>
  );
};

export default FeedSortButtons;
