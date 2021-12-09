import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "/src/graphql-custom/user/mutation";
import Input from "/src/components/input";
import SearchInput from "../input/SearchInput";
import Divider from "../divider";
import GroupMemberList from "./GroupMemberList";

export default function GroupMemberConfig({ adminList, ...props }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState({});

  const [currentIndex, setCurrentIndex] = useState();

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

  const handleClick = (id) => {
    setCurrentIndex(id);
    setShowInput(true);
  };

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-[30px]">
      <p className="font-semibold font-inter text-22px text-caak-aleutian mt-[32px] mb-[20px]">
        Гишүүдийн тохиргоо
      </p>
      <p className="font-semibold font-inter text-15px text-caak-generalblack mt-[32px] mb-[11px]">
        Нийт гишүүдын тоо <span className="text-caak-darkBlue">· 17</span>
      </p>

      <SearchInput
        containerStyle={"h-[36px] "}
        hideLabel
        placeholder={"Гишүүн хайх"}
      />
      <Divider className="my-[18px]" />
      <p className="font-semibold font-inter text-15px text-caak-generalblack  mb-[11px]">
        Админ & Засварлагч<span className="text-caak-darkBlue">· 3</span>
      </p>
      {adminList.map((admin, index) => {
        return <GroupMemberList key={index} admin={admin} />;
      })}
    </div>
  );
}
