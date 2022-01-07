import React, { useState } from "react";
import Link from "next/link";
import Button from "../../components/button";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import { API } from "aws-amplify";
import { deleteFollowedUsers } from "../../graphql-custom/user/mutation";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext";

const FollowerList = ({
  imageSrc,
  followedUser,
  followedUsers,
  setFollowedUsers,
}) => {
  const router = useRouter();
  const { isLogged } = useUser();
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
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        const tempArr = followedUsers.items;
        const userIndex = tempArr.findIndex(
          (item) => item.followed_user_id === followedUser.followed_user_id
        );
        tempArr.splice(userIndex, 1);

        setFollowedUsers({ ...followedUsers, items: [...tempArr] });
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  return (
    <div className="flex rounded-lg border border-caak-titaniumwhite mb-[18px] w-full max-w-[430px]">
      <div className="flex flex-col sm:flex-row w-full mx-[20px] my-[20px] items-start justify-between">
        <div className="flex items-center">
          <div className={"w-[68px] h-[68px] mr-[12px] relative"}>
            <img
              className=" bg-white rounded-full"
              src={
                !imageSrc
                  ? getGenderImage(followedUser.follower_user.gender).src
                  : getFileUrl(imageSrc)
              }
              width={68}
              height={68}
              // layout="fixed"
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
                <div className="text-15px text-caak-generalblack font-semibold font-inter">
                  @{followedUser.follower_user.nickname}
                </div>
              </a>
            </Link>
            <div className="flex items-center">
              <span className="icon-fi-rs-aura mr-1 text-20px" />
              <p className="font-inter font-medium text-14px text-caak-darkBlue">
                {followedUser.follower_user.aura} Аура
              </p>
            </div>
          </div>
        </div>
        <div className="flex self-end md:self-center mr-[6px] ml-[6px]">
          <Button
            className="h-c13 w-28 text-14px font-inter font-medium text-caak-generalblack"
            icon={
              <span className="icon-fi-rs-remove-friend-f text-20px mr-1" />
            }
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
