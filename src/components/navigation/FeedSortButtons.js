import Button from "../button";
import { useState } from "react";
import { useWrapper } from "../../context/wrapperContext";
import { useRouter } from "next/router";

const FeedSortButtons = ({
  direction,
  containerClassname,
  hide,
  items,
  items2,
  iconSize,
  iconContainerSize,
  textClassname,
  initialSort,
  activeView,
  setActiveView,
  setSortType,
  feed,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    items.findIndex((item) => item.type === initialSort)
  );
  const { setFeedSortType } = useWrapper();
  const router = useRouter();

  return (
    !hide && (
      <div className="justify-center flex md:justify-between max-w-[976px] mx-auto">
        <div
          className={`flex ${
            direction === "column" ? "flex-col" : "flex-row"
          } ${containerClassname ? containerClassname : ""}`}
        >
          {items.map(({ icon, type, id, title, route }) => {
            return (
              <Button
                key={id}
                onClick={() => {
                  setFeedSortType(type);
                  setSortType && setSortType(type);
                  setActiveIndex(id);
                  feed && router.replace(route);
                }}
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
                      iconContainerSize
                        ? iconContainerSize
                        : "w-[26px] h-[26px]"
                    }  mr-px-6 ph:w-4 ph:mr-2`}
                  >
                    <i
                      className={`${
                        id === activeIndex ? `${icon}-f` : `${icon}-o`
                      } ${iconSize ? iconSize : "text-[26px]"} ph:text-20px`}
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
                      } ${iconSize ? iconSize : "text-[16.67px]"} ph:text-15px`}
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

export default FeedSortButtons;
