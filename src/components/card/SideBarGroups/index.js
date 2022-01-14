import SideBarGroupItem from "./SideBarGroupItem";
import { useEffect, useState } from "react";
import {
  getFileUrl,
  getGenderImage,
  getReturnData,
} from "../../../utility/Util";
import ViewMoreText from "./ViewMoreText";
import { useUser } from "../../../context/userContext";
import { API, graphqlOperation } from "aws-amplify";
import { listGroupByUserAndRole } from "../../../graphql-custom/GroupUsers/queries";
import { listGroups } from "../../../graphql/queries";
import { listGroupTotals } from "../../../graphql-custom/group/queries";
import { useRouter } from "next/router";

const SideBarGroups = ({
  title,
  addGroup,
  maxColumns,
  role,
  initialData,
  userId,
  setIsAuraModalOpen,
}) => {
  const [groupData, setGroupData] = useState(initialData ? initialData : []);
  const [groupTotals, setGroupTotals] = useState([]);
  const { isLogged, user } = useUser();
  const router = useRouter()
  const fetchGroups = async (user, role) => {
    try {
      if (!user) {
        return null;
      }

      let retData = [];
      for (let i = 0; i < role.length; i++) {
        if (role[i] === "NOT_MEMBER") {
          const resp = await API.graphql(graphqlOperation(listGroups));
          const followed = getReturnData(resp).items.filter(
            (item) => !item.followed
          );
          retData = [...retData, ...followed];
        } else {
          const resp = await API.graphql(
            graphqlOperation(listGroupByUserAndRole, {
              user_id: userId ? userId : user.id,
              role: { eq: role[i] },
            })
          );
          retData = [...retData, ...getReturnData(resp).items];
        }
      }
      return retData;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  };
  const getGroups = async () => {
    const groups = await fetchGroups(user, [...role]);
    setGroupData(groups);
  };

  const getGroupTotal = async () => {
    const resp = await API.graphql({
      query: listGroupTotals,
    });
    setGroupTotals(getReturnData(resp).items);
  };

  const getGroupPending = (id) => {
    const res = groupTotals.find((item) => item.group_id === id);
    return res;
  };

  useEffect(() => {
    if (!initialData && isLogged) {
      getGroups();
    }
    // eslint-disable-next-line
  }, [isLogged, userId]);

  useEffect(() => {
    getGroupTotal();
  }, []);

  return groupData && groupData.length > 0 ? (
    <div
      className={
        "flex flex-col px-[6px] py-[18px] border-t-[1px] border-caak-titaniumwhite overflow-x-hidden"
      }
    >
      <div className={"flex flex-row justify-between items-center mb-[6px]"}>
        <div className={"font-semibold text-caak-generalblack text-15px "}>
          {title}
        </div>
        {addGroup && (
          <div
            onClick={() => user.aura < 5000 ? setIsAuraModalOpen(true) : router.push({
              pathname: '/group/create'
            })}
            className={
              "flex justify-center cursor-pointer items-center w-[18px] h-[18px] p-[3px]"
            }
          >
            <span className={"text-18px icon-fi-rs-add-l text-darkblue"} />
          </div>
        )}
      </div>
      {groupData.map((group, index) => {
        let params = {};

        if (group.group) {
          params = {
            name: group.group.name,
            image: group.group.profile
              ? getFileUrl(group.group.profile)
              : getGenderImage("default").src,
            groupId: group.group_id,
          };
        } else {
          params = {
            name: group.name,
            image: group.profile
              ? getFileUrl(group.profile)
              : getGenderImage("default").src,
            groupId: group.id,
          };
        }
        if (maxColumns) {
          if (index < maxColumns) {
            return (
              <SideBarGroupItem
                key={index}
                {...params}
                notification={getGroupPending(group.group_id)?.pending}
              />
            );
          } else return null;
        } else {
          return (
            <SideBarGroupItem
              key={index}
              {...params}
              notification={
                role[0] === "ADMIN"
                  ? getGroupPending(group.group_id)?.pending
                  : null
              }
            />
          );
        }
      })}

      {groupData.length > maxColumns ? (
        <ViewMoreText text={"Илүү ихийг үзэх"} />
      ) : null}
    </div>
  ) : null;
};

export default SideBarGroups;
