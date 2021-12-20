import Image from "next/image";
import { useState, useEffect } from "react";
import { useClickOutSide } from "../../utility/Util";
import clipboardImg from "../../../public/assets/images/clipboard.svg";
import Button from "../button";
import { useRouter } from "next/router";
import GroupRuleEdit from "./GroupRuleEdit";
import API from "@aws-amplify/api";
import { updateGroup } from "../../graphql-custom/group/mutation";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import GroupRuleItem from "./GroupRuleItem";

const GroupRule = ({ groupData, ...props }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [text, setText] = useState();
  const [type, setType] = useState();

  const close = () => {
    setIsModalOpen(false);
  };
  const handleClick = () => {
    setType("new");
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async (index) => {
    let parsed =
      groupData?.g_rules !== "" ? JSON.parse(groupData?.g_rules) : "";
    parsed.splice(index, 1);
    groupData.g_rules = JSON.stringify([...parsed]);
    if (parsed.length === 0) {
      groupData.g_rules = "";
      parsed = "";
    }
    await API.graphql(
      graphqlOperation(updateGroup, {
        input: {
          id: router.query.groupId,
          g_rules: parsed.length === 0 ? parsed : JSON.stringify(parsed),
        },
      })
    );
  };

  const handleSubmit = async () => {
    if (groupData.g_rules !== "") {
      let parsed = JSON.parse(groupData?.g_rules);

      if (type === "edit") {
        parsed[activeIndex].title = text?.title;
        parsed[activeIndex].description = text?.description;
        groupData.g_rules = JSON.stringify([...parsed]);
      } else if (type === "new") {
        parsed = [...parsed, text];
        groupData.g_rules = JSON.stringify([...parsed]);
      }
      await API.graphql(
        graphqlOperation(updateGroup, {
          input: {
            id: router.query.groupId,
            g_rules: JSON.stringify(parsed),
          },
        })
      );
    } else {
      try {
        await API.graphql(
          graphqlOperation(updateGroup, {
            input: {
              id: router.query.groupId,
              g_rules: JSON.stringify([text]),
            },
          })
        );
        groupData.g_rules = JSON.stringify([text]);
      } catch (ex) {
        console.log(ex);
      }
    }
    close();
  };

  const fetch = async () => {
    await API.graphql(
      graphqlOperation(updateGroup, {
        input: {
          id: router.query.groupId,
          g_rules: "",
        },
      })
    );
  };
  useEffect(() => {
    // fetch();
  }, []);
  return (
    <div className="flex ">
      {groupData?.g_rules !== "" ? (
        <div className="flex flex-col w-full items-center py-[25px] px-[30px]">
          <div className="flex w-full items-center justify-between">
            <p className="font-semibold text-caak-aleutian font-intertext-20px text-22px">
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
          {groupData?.g_rules !== "" &&
            JSON.parse(groupData?.g_rules).map((rule, index) => {
              return (
                <GroupRuleItem
                  setActiveIndex={setActiveIndex}
                  description={rule?.description}
                  title={rule?.title}
                  key={index}
                  index={index}
                  setType={setType}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                  setIsModalOpen={setIsModalOpen}
                />
              );
            })}
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
                loading={loading}
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
      {isModalOpen && (
        <GroupRuleEdit
          activeIndex={activeIndex}
          setIsModalOpen={setIsModalOpen}
          groupData={groupData}
          type={type}
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          close={close}
        />
      )}
    </div>
  );
};

export default GroupRule;
