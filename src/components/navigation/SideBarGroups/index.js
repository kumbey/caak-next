import SideBarGroupItem from "./SideBarGroupItem";
import { useEffect, useState } from "react";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { listGroupsForAddPost } from "../../../graphql-custom/group/queries";
import { getReturnData } from "../../../utility/Util";

const SideBarGroups = ({ title, addGroup, maxColumns, groupType }) => {
  const [groupData, setGroupData] = useState({
    // groupType: [],
  });

  const listGroups = async () => {
    try {
      const grData = {
        adminModerator: [],
        member: [],
        unMember: [],
      };

      let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));

      resp = getReturnData(resp).items;

      for (let i = 0; i < resp.length; i++) {
        const item = resp[i];
        if (item.role_on_group === "NOT_MEMBER") {
          grData.unMember.push(item);
        } else if (item.role_on_group === "MEMBER") {
          grData.member.push(item);
        } else {
          grData.adminModerator.push(item);
        }
      }

      setGroupData(grData);
      console.log(grData);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    listGroups();
    // eslint-disable-next-line
  }, []);

  const groups = [1, 2, 3, 4, 5];
  return groups.length > 0 ? (
    <div className={"flex flex-col px-[6px]"}>
      <div className={"flex flex-row justify-between items-center mb-[6px]"}>
        <div className={"font-semibold text-caak-generalblack text-15px "}>
          {title}
        </div>
        {addGroup && (
          <div
            className={
              "flex justify-center items-center w-[18px] h-[18px] p-[3px]"
            }
          >
            <span className={"text-18px icon-fi-rs-add-l text-darkblue"} />
          </div>
        )}
      </div>
      {groups.map((_, index) => {
        if (index < maxColumns) {
          return (
            <SideBarGroupItem
              key={index}
              notification={15}
              name={"Mongolian NUDE"}
            />
          );
        } else {
          return null;
        }
      })}

      {groups.length > maxColumns ? (
        <div className={"flex flex-row items-center cursor-pointer"}>
          <div className={"text-13px text-caak-primary my-[6px]"}>
            Илүү ихийг үзэх
          </div>
          <div
            className={
              "flex justify-center items-center ml-[4.5px] w-[12px] h-[12px] rotate-90"
            }
          >
            <span className={"icon-fi-rs-next text-[11px] text-caak-primary"} />
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default SideBarGroups;
