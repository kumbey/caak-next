import SideBarGroupItem from "./SideBarGroupItem";
import { useEffect, useState } from "react";
import { getFileUrl, getReturnData } from "../../../utility/Util";
import ViewMoreText from "./ViewMoreText";
import { useUser } from "../../../context/userContext";
import { API, graphqlOperation } from "aws-amplify";
import { listGroupByUserAndRole } from "../../../graphql-custom/GroupUsers/queries";

const SideBarGroups = ({
  title,
  addGroup,
  maxColumns,
  role,
  initialData,
  userId,
}) => {
  const [groupData, setGroupData] = useState(initialData ? initialData : []);
  const { isLogged, user } = useUser();
  const listGroups = async () => {
    try {
      let groups = await API.graphql(
        graphqlOperation(listGroupByUserAndRole, {
          user_id: userId ? userId : user.id,
          role: { eq: role },
        })
      );
      groups = getReturnData(groups).items;

      if (role === "ADMIN") {
        let moderatorGroups = await API.graphql(
          graphqlOperation(listGroupByUserAndRole, {
            user_id: user.id,
            role: { eq: "MODERATOR" },
          })
        );
        moderatorGroups = getReturnData(moderatorGroups).items;
        setGroupData(groups.concat(moderatorGroups));
      } else {
        setGroupData(groups);
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    if (!initialData && isLogged) listGroups();
    // eslint-disable-next-line
  }, [isLogged]);

  return groupData && groupData.length > 0 ? (
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
              name={group.group.name}
              image={getFileUrl(group.group.profile)}
              groupId={group.group_id}
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
