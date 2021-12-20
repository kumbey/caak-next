import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "/src/graphql-custom/user/mutation";
import Input from "../input";
import Divider from "../divider";
import GroupMemberList from "./GroupMemberList";

export default function GroupMemberConfig({ adminModeratorList, memberList }) {
  const [text, setText] = useState({});

  //   const handleSubmit = async (e) => {
  //     if (text !== e.target.value) {
  //       await API.graphql(
  //         graphqlOperation(updateUser, {
  //           input: {
  //             id: currentUser.id,
  //             ...text,
  //           },
  //         })
  //       );
  //       setText("");
  //     }
  //     setShowInput(false);
  //   };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    console.log(text);
  }, [text]);
  return (
    <div className="mx-[30px]">
      <p className="font-semibold font-inter text-22px text-caak-aleutian mt-[32px] mb-[20px]">
        Гишүүдийн тохиргоо
      </p>
      <p className="font-semibold font-inter text-15px text-caak-generalblack mt-[32px] mb-[11px]">
        Нийт гишүүдын тоо{" "}
        <span className="text-caak-darkBlue">
          · {adminModeratorList?.length + memberList?.length}
        </span>
      </p>

      <Input
        hideLabel
        className={
          "pl-[40px] border mr-2 h-[38px] border-caak-titaniumwhite  bg-caak-liquidnitrogen"
        }
        placeholder={"Гишүүн хайх"}
        hideError
        onChange={handleChange}
      >
        <span
          className={
            "icon-fi-rs-search absolute left-4 top-[10px] text-[20px] text-caak-darkBlue "
          }
        />
      </Input>
      <Divider className="my-[18px]" />
      <p className="font-semibold font-inter text-15px text-caak-generalblack  mb-[11px]">
        Админ & Засварлагч
        <span className="text-caak-darkBlue">
          · {adminModeratorList.length}
        </span>
      </p>
      {adminModeratorList.map((userList, index) => {
        return <GroupMemberList key={index} userList={userList} />;
      })}
    </div>
  );
}
