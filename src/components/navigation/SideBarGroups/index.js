import SideBarGroupItem from "./SideBarGroupItem";
import { useEffect, useState } from "react";
import {getFileUrl, getReturnData} from "../../../utility/Util";
import ViewMoreText from "./ViewMoreText";
import API from "@aws-amplify/api";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {listGroupsForAddPost} from "../../../graphql-custom/group/queries";

const SideBarGroups = ({ title, addGroup, maxColumns, groupType }) => {

  const [groupData, setGroupData] = useState([]);

  const listGroups = async () => {
    try {
      const grData = []

      let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));

      resp = getReturnData(resp).items;

      for (let i = 0; i < resp.length; i++) {
        const item = resp[i];
        if (item.role_on_group === groupType) {
          grData.push(item);
        }
      }

      setGroupData([...grData]);

    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    listGroups();
    // eslint-disable-next-line
  }, []);

  return groupData.length > 0 ? (
    <div className={"flex flex-col px-[6px]"}>
      <div className={"flex flex-row justify-between items-center mb-[6px]"}>
        <div className={"font-semibold text-caak-generalblack text-15px "}>
          {title}
        </div>
        {addGroup && (
          <div
            className={
              "flex justify-center cursor-pointer items-center w-[18px] h-[18px] p-[3px]"
            }
          >
            <span className={"text-18px icon-fi-rs-add-l text-darkblue"} />
          </div>
        )}
      </div>
      {groupData.map((group, index) => {
        if (index < maxColumns) {
          return (
            <SideBarGroupItem
              key={index}
              notification={15}
              name={group.name}
              image={getFileUrl(group.profile)}
            />
          );
        } else {
          return null;
        }
      })}

      {groupData.length > maxColumns ? (
        <ViewMoreText text={"Илүү ихийг үзэх"} />
      ) : null}
    </div>
  ) : null;
};

export default SideBarGroups;
