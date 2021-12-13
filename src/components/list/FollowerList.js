import React, { useState } from "react";
import Link from "next/link";
import Button from "../../components/button";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import { API, graphqlOperation } from "aws-amplify";
import Image from "next/image";
import { deleteFollowedUsers } from "../../graphql-custom/user/mutation";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext";

const FollowerList = ({
  imageSrc,
  followedUser,
  groupData,
  type,
  followedUsers,
  setFollowedUsers,
  ...props
}) => {
  const router = useRouter();
  const { user, isLogged, user: signedUser } = useUser();

  const [loading, setLoading] = useState(false);

  const deleteFollowFromUser = async () => {
    try {
      if (isLogged) {
        setLoading(true);

        await API.graphql({
          query: deleteFollowedUsers,
          variables: {
            input: {
              id: `${router.query.userId}#${followedUser.followed_user_id}`,
            },
          },
        });
        const res = followedUsers.filter(
          (item) => item.followed_user_id !== followedUser.followed_user_id
        );

        setFollowedUsers(res);
      }
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
                  ? getGenderImage(followedUser.follower_user.gender)
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
                pathname: `/user/${followedUser.followed_user_id}/profile`,
              }}
            >
              <a>
                <div className="text-16px text-caak-generalblack font-semibold font-inter">
                  @{followedUser.follower_user.nickname}
                </div>
              </a>
            </Link>
            <div className="flex items-center">
              <span className="icon-fi-rs-aura mr-1 text-20px" />
              <p>{followedUser.follower_user.aura} Аура</p>
            </div>
          </div>
        </div>
        <div className="flex mr-[6px]">
          <Button
            className="h-c13 w-28"
            icon={<span className="icon-fi-rs-add-friend mr-1" />}
            iconPosition="left"
            onClick={() => deleteFollowFromUser()}
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

export default FollowerList;
