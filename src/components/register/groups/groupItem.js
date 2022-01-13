import { getFileUrl, getGenderImage } from "../../../utility/Util";
import Link from "next/link";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../../graphql-custom/GroupUsers/mutation";
import { useUser } from "../../../context/userContext";
import { useState } from "react";

const GroupItem = ({
  item,
  followedGroupsCounter,
  setFollowedGroupsCounter,
}) => {
  const { user } = useUser();
  const [followed, setFollowed] = useState(item.followed);
  const [totalUsers, setTotalUsers] = useState(
    item.totals.member + item.totals.admin + item.totals.moderator
  );

  const joinGroup = async () => {
    try {
      setFollowed(true);
      await API.graphql(
        graphqlOperation(createGroupUsers, {
          input: {
            group_id: item.id,
            user_id: user.id,
            id: `${item.id}#${user.id}`,
            role: "MEMBER",
          },
        })
      );
      setFollowedGroupsCounter(followedGroupsCounter + 1);
      setTotalUsers(totalUsers + 1);
    } catch (ex) {
      setFollowed(false);
      console.log(ex);
    }
  };

  const leaveGroup = async () => {
    try {
      setFollowed(false);
      await API.graphql(
        graphqlOperation(deleteGroupUsers, {
          input: { id: `${item.id}#${user.id}` },
        })
      );
      totalUsers !== 0 && setTotalUsers(totalUsers - 1);
      followedGroupsCounter !== 0 &&
        setFollowedGroupsCounter(followedGroupsCounter - 1);
    } catch (ex) {
      setFollowed(true);
      console.log(ex);
    }
  };

  const followHandler = async () => {
    if (followed) {
      await leaveGroup();
    } else {
      await joinGroup();
    }
  };

  return (
    <div className={"w-full flex flex-row justify-between items-center"}>
      <div className={"flex flex-row"}>
        <Link href={`/group/${item.id}`}>
          <a>
            <img
              alt={""}
              src={
                item.profile
                  ? getFileUrl(item.profile)
                  : getGenderImage("default").src
              }
              className={
                "w-[48px] h-[48px] object-cover rounded-[8px] border-[3px] border-[#0000000F]"
              }
            />
          </a>
        </Link>

        <div className={"flex flex-col justify-center mx-[10px]"}>
          <Link href={`/group/${item.id}`}>
            <a>
              <p
                className={
                  "text-[15px] font-semibold text-caak-generalblack tracking-[0.24px] leading-[18px]"
                }
              >
                {item.name}
              </p>
            </a>
          </Link>
          <p
            className={
              "text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[16px] mt-[5px]"
            }
          >
            {totalUsers} гишүүн
          </p>
        </div>
      </div>
      <div
        onClick={() => followHandler()}
        className={`${
          followed ? "bg-caak-titaniumwhite" : "bg-[#257CEE]"
        } cursor-pointer flex items-center justify-center w-[28px] h-[28px] rounded-[6px]  bg-opacity-10`}
      >
        {followed ? (
          <span
            className={
              "icon-fi-rs-check w-[18px] text-[18px] text-caak-generalblack"
            }
          />
        ) : (
          <span
            className={
              "icon-fi-rs-add-l w-[20px] h-[20px] text-[20px] text-[#257CEE]"
            }
          />
        )}
      </div>
    </div>
  );
};

export default GroupItem;
