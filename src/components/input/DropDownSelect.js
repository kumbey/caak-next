import Input from "./index";
import { generateFileUrl } from "../../utility/Util";
import { useEffect, useState } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";

const DropDownSelect = ({
  groupData,
  open,
  onToggle,
  className,
  onSelect,
  setPost,
  setIsAuraModalOpen,
  userAura,
}) => {
  const [filteredData, setFilteredData] = useState({
    adminModerator: [],
    unMember: [],
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setFilteredData(groupData);
  }, [groupData]);

  //Only runs when inputValue changes, ignoring first render.
  useUpdateEffect(() => {
    const adminModerator = groupData.adminModerator.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );
    const unMember = groupData.unMember.filter((item) =>
      item.name.toLowerCase().includes(inputValue)
    );
    setFilteredData({ unMember, adminModerator });

    // eslint-disable-next-line
  }, [inputValue]);

  const selectGroup = (item) => {
    onSelect(item);
    setPost((prev) => ({
      ...prev,
      group_id: item.id,
      category_id: item.category_id,
    }));
  };

  return (
    <div
      onClick={onToggle}
      className={`dropdown p-1 shadow-dropdown ${open ? "" : "hidden"} ${
        className && className
      }`}
    >
      <div className={""}>
        <div
          onClick={onToggle}
          className={
            "relative flex flex-row items-center cursor-pointer bg-white text-16px text-caak-generalblack w-full pl-3 pr-10  block h-[44px] rounded-[3px] text-base  border border-caak-primary placeholder-gray-400 ring-2 ring-caak-primary ring-opacity-20 sm:text-sm hover:border-caak-primary"
          }
        >
          <span
            className={
              "icon-fi-rs-search text-caak-darkBlue flex items-center justify-center border-2 border-dashed border-caak-darkBlue w-6.5 h-6.5 rounded-square p-1"
            }
          />
          <Input
            onClick={(e) => e.stopPropagation()}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            hideLabel
            placeholder={"Хайлт хийх"}
            className={
              "py-2 pl-[10px] text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] ml-0 border-transparent hover:border-transparent focus:ring-transparent"
            }
            hideError
            containerStyle={"w-full"}
          />
          <div
            className={
              "flex items-center justify-center w-[12px] h-[12px] absolute right-[12px]"
            }
          >
            <span
              className={"icon-fi-rs-triangle text-caak-generalblack text-10px"}
            />
          </div>
          <span />
        </div>
        <div className={"z-50 max-h-[400px] overflow-y-scroll "}>
          {filteredData.adminModerator.length > 0 ? (
            <>
              <div className={"flex flex-row justify-between px-3.5 pt-2"}>
                <span className={"text-15px text-caak-darkBlue"}>
                  Миний группүүд
                </span>
                <span
                  onClick={() => userAura && setIsAuraModalOpen(true)}
                  className={"text-15px font-medium text-caak-primary"}
                >
                  Групп үүсгэх
                </span>
              </div>
              <div className={"px-2"}>
                {filteredData.adminModerator.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => selectGroup(item)}
                      className={"flex flex-col"}
                    >
                      <div
                        className={
                          "flex flex-row items-center p-1.5 my-px rounded-square hover:bg-caak-liquidnitrogen"
                        }
                      >
                        <img
                          src={generateFileUrl(item.profile)}
                          className={"w-8 h-8 rounded-md object-cover mr-2"}
                          alt={""}
                        />
                        <span
                          className={
                            "text-caak-generalblack font-medium text-16px"
                          }
                        >
                          {item.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <p>Пост оруулахын тулд группд нэгдээрэй</p>
            </div>
          )}

          <div
            className={
              "flex flex-row justify-between border-t border-caak-liquidnitrogen px-3.5"
            }
          >
            <span className={"text-15px text-caak-darkBlue pt-2"}>
              Бүх группүүд
            </span>
          </div>
          <div className={"px-2"}>
            {filteredData.unMember.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => selectGroup(item)}
                  className={"flex flex-col"}
                >
                  <div
                    className={
                      "flex flex-row items-center p-1.5 my-px rounded-square hover:bg-caak-liquidnitrogen"
                    }
                  >
                    <img
                      src={generateFileUrl(item.profile)}
                      className={"w-8 h-8 rounded-md object-cover mr-2"}
                      alt={""}
                    />
                    <span
                      className={"text-caak-generalblack font-medium text-16px"}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DropDownSelect;
