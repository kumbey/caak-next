import React, { useState } from "react";
import Link from "next/link";
import Button from "../button";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import { API, graphqlOperation } from "aws-amplify";
import Image from "next/image";
import { deleteGroupUsers } from "../../graphql-custom/GroupUsers/mutation";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "../card/ProfileHoverCard";

const GroupFollowerList = ({
  imageSrc,
  followedUser,
  groupData,
  followedUsers,
  setFollowedUsers,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const deleteFollowFromGroup = async () => {
    try {
      setLoading(true);

      await API.graphql(
        graphqlOperation(deleteGroupUsers, {
          input: {
            id: `${groupData.id}#${followedUser.user_id}`,
          },
        })
      );
      groupData.followed = false;
      groupData.totals.member -= 1;
      const res = followedUsers.filter(
        (item) => item.user_id !== followedUser.user_id
      );
      setFollowedUsers(res);

      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
  return (
    <div className="flex rounded-lg border border-caak-titaniumwhite  w-[430px] h-[108px] mb-[18px] ">
      <div className="flex w-full mx-[20px] my-[20px] items-center justify-between">
        <div className="flex items-center">
          <div className={"w-[68px] h-[68px] mr-[12px] relative"}>
            <Image
              className=" bg-white rounded-full"
              src={
                !imageSrc
                  ? getGenderImage(followedUser?.user?.gender)
                  : getFileUrl(imageSrc)
              }
              width={68}
              height={68}
              objectFit="cover"
              alt="#"
            />
          </div>
          <div className="flex flex-col">
            <Tooltip
              className={"-left-14"}
              content={<ProfileHoverCard userId={followedUser.user_id} />}
            >
              <Link
                href={{
                  pathname: `/user/${followedUser.user_id}/profile`,
                }}
              >
                <a>
                  <div className="text-15px text-caak-generalblack font-semibold font-inter">
                    @{followedUser?.user?.nickname}
                  </div>
                </a>
              </Link>
            </Tooltip>
            <div className="flex items-center">
              <span className="icon-fi-rs-aura mr-1 text-20px" />
              <p className="font-inter font-medium text-14px text-caak-darkBlue">
                {followedUser?.user?.aura} Аура
              </p>
            </div>
          </div>
        </div>
        <div className="flex mr-[6px]">
          <Button
            className="h-c13 w-28 text-14px font-inter font-medium text-caak-generalblack"
            icon={
              <span className="icon-fi-rs-remove-friend-f text-20px mr-1" />
            }
            iconPosition="left"
            onClick={() => deleteFollowFromGroup()}
            skin={`bg-caak-titaniumwhite`}
            loading={loading}
          >
            Хасах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupFollowerList;
