import Image from "next/image";
import { useState } from "react";
import { useClickOutSide } from "../../utility/Util";
import clipboardImg from "../../../public/assets/images/clipboard.svg";
import Button from "../button";
import { useRouter } from "next/router";
import GroupRuleEdit from "./GroupRuleEdit";

import GroupRuleItem from "./GroupRuleItem";

const GroupRule = ({ userList, ...props }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilled, setIsFilled] = useState(true);

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex ">
      {isFilled ? (
        <div className="flex flex-col w-full items-center py-[25px] px-[30px]">
          <div className="flex w-full items-center justify-between">
            <p className="font-inter font-semibold text-20px text-caak-generalblack">
              Дүрэм
            </p>
            <Button
              round
              className={
                "text-white font-medium font-inter text-15px py-7px px-5 bg-caak-generalblack "
              }
              skin={"secondary"}
              onClick={() => handleClick()}
            >
              <span className="icon-fi-rs-add-l mr-[10px] text-20px" />
              Нэмэх
            </Button>
          </div>
          <GroupRuleItem setIsModalOpen={setIsModalOpen} />
          <GroupRuleItem />
          <GroupRuleItem />
          <GroupRuleItem />
        </div>
      ) : (
        <div className="flex justify-between items-center py-[70px] px-[100px]">
          <div className="flex flex-col items-center ">
            <div className="flex mb-[20px]">
              <div className="mr-[10px] h-[28px] w-[23px]">
                <Image
                  src={clipboardImg}
                  height={28}
                  width={23}
                  objectFit="cover"
                />
              </div>
              <p className="font-inter font-semibold text-20px text-caak-generalblack">
                Дүрэм
              </p>
            </div>
            <div className="mb-[20px]">
              <p className="text-15px font-inter font-normal text-caak-aleutian">
                Группын дүрэм хараахан бичигдээгүй байна.
              </p>
            </div>
            <div className="">
              <Button
                round
                className={
                  "text-white font-medium font-inter text-15px py-7px px-5 bg-caak-generalblack "
                }
                skin={"secondary"}
                onClick={() => handleClick()}
              >
                <span className="icon-fi-rs-add-l mr-[10px] text-20px" />
                Үүсгэх
              </Button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <GroupRuleEdit setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default GroupRule;
