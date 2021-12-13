import React, { useState } from "react";
import Link from "next/link";
import Button from "../button";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import { API, graphqlOperation } from "aws-amplify";
import Image from "next/image";
import { deleteGroupUsers } from "../../graphql-custom/GroupUsers/mutation";

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
    <div className="flex rounded-lg border border-caak-titaniumwhite  w-[390px] h-[108px] mb-[18px] mr-[16px]">
      <div className="flex w-full mx-[16px] my-[16px] items-center justify-between">
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
              layout="fixed"
              alt="#"
            />
          </div>
          <div className="flex flex-col">
            <Link
              href={{
                pathname: `/user/${followedUser.user_id}/profile`,
              }}
            >
              <a>
                <div className="text-16px text-caak-generalblack font-semibold font-inter">
                  @{followedUser?.user?.nickname}
                </div>
              </a>
            </Link>
            <div className="flex items-center">
              <span className="icon-fi-rs-aura mr-1 text-20px" />
              <p>{followedUser?.user?.aura} Аура</p>
            </div>
          </div>
        </div>
        <div className="flex mr-[6px]">
          <Button
            className="h-c13 w-28"
            icon={<span className="icon-fi-rs-add-friend mr-1" />}
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
