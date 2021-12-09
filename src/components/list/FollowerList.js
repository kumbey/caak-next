import React, { useState } from "react";
import Link from "next/link";
import API from "@aws-amplify/api";
import Button from "../../components/button";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import Image from "next/image";
import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext";

const FollowerList = ({ imageSrc, followedUser, ...props }) => {
  const router = useRouter();
  const { user, isLogged } = useUser();

  console.log(followedUser);
  const [doRender, setDoRender] = useState(0);
  const [loading, setLoading] = useState(false);

  const deleteFollowUser = async () => {
    try {
      if (isLogged) {
        setLoading(true);

        await API.graphql({
          query: deleteFollowedUsers,
          variables: {
            input: {
              id: `${followedUser.id}#${router.query.userId}`,
            },
          },
        });
        user.totals.followers -= 1;
        user.followed = false;
        setDoRender(doRender + 1);
        setLoading(false);
      }
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
                  ? getGenderImage(followedUser.gender)
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
                pathname: `/user/${followedUser.id}/profile`,
              }}
            >
              <a>
                <div className="text-16px text-caak-generalblack font-semibold font-inter">
                  @{followedUser.nickname}
                </div>
              </a>
            </Link>
            <div className="flex items-center">
              <span className="icon-fi-rs-aura mr-1 text-20px" />
              <p>{followedUser.aura} Аура</p>
            </div>
          </div>
        </div>
        <div className="flex mr-[6px]">
          <Button
            className="h-c13 w-28"
            icon={<span className="icon-fi-rs-add-friend mr-1" />}
            iconPosition="left"
            onClick={deleteFollowUser}
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
