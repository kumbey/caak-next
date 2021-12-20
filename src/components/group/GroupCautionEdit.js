import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useEffect, useState } from "react";
import { updateGroup } from "../../graphql-custom/group/mutation";
import { useRouter } from "next/router";
import Button from "../button";

const GroupCautionEdit = ({
  groupData,
  activeIndex,
  type,
  handleSubmit,
  setCaution,
  caution,
  close,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const maxLengths = {
    title: 200,
    description: 500,
  };

  function auto_grow(element) {
    element.target.style.height = "5px";
    element.target.style.height = element.target.scrollHeight + "px";
  }

  const handleChange = (e) => {
    setCaution({ ...caution, [e.target.name]: e.target.value });
  };

  return (
    <div className="popup_modal ">
      <div className="popup_modal-content rounded-xl">
        <div className="flex flex-col  py-[20px] ">
          <div className="flex justify-center relative border-b-2">
            <p className="font-inter font-semibold text-20px text-caak-generalblack mb-[20px]">
              Дүрэм үүсгэх
            </p>
            <div className="absolute right-4 -top-2" onClick={close}>
              <span className="icon-fi-rs-close  text-caak-generalblack text-14px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex flex-col  px-[24px] pb-[20px] ">
          <div className="">
            <p className="font-inter font-semibold text-15px text-caak-generalblack">
              Гарчиг
            </p>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col w-full">
                <div className={" mt-[10px]"}>
                  <div className={"w-full  block relative"}>
                    <div className="absolute flex flex-row items-center text-12px font-inter font-normal text-caak-darkBlue left-[13px] top-[20px] -translate-y-1/2 ">
                      Гарчиг
                    </div>
                    <div className={"input"}>
                      <textarea
                        autoFocus
                        onInput={auto_grow}
                        maxLength={maxLengths.title}
                        style={{ resize: "none" }}
                        defaultValue={
                          groupData?.g_rules
                            ? JSON.parse(groupData?.g_rules)[activeIndex]?.title
                            : ""
                        }
                        name={"title"}
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
                      {/* {groupData.name?.length || 0}/{maxLengths.title} */}
                    </span>
                  </div>
                </div>
                <div className="justify-end mt-[10px] flex items-center pb-3">
                  <Button
                    loading={loading}
                    onClick={() => close()}
                    className="bg-white text-15px border border-caak-unicornsilver rounded-lg text-caak-generalblack mr-[10px]  px-[24px] "
                  >
                    Болих
                  </Button>
                  <Button
                    loading={loading}
                    onClick={handleSubmit}
                    className="border  rounded-lg text-white text-15px bg-caak-bleudefrance"
                  >
                    {type === "new" ? "Нэмэх" : "Засах"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCautionEdit;
