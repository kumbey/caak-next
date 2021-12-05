import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { getFileUrl } from "../../utility/Util";
import { getUserById } from "../../utility/ApiHelper";
import Loader from "../loader";
import { useRouter } from "next/router";
import Image from "next/image";
import Divider from "../divider";

export default function ProfileHoverCard({ userId }) {
  const { user, isLogged } = useUser();
  const [doRender, setDoRender] = useState(0);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   console.log("FOLLOW: ", postUser.followed);
  // }, [postUser.followed]);

  useEffect(() => {
    setLoading(true);
    if (userId)
      if (isLogged) {
        getUserById({ id: userId, setUser: setProfileUser }).then(() =>
          setLoading(false)
        );
      } else {
        getUserById({
          id: userId,
          setUser: setProfileUser,
          authMode: "AWS_IAM",
        }).then(() => setLoading(false));
      }

    // eslint-disable-next-line
  }, [userId]);

  const createFollowUser = async () => {
    await API.graphql({
      query: createFollowedUsers,
      variables: {
        input: {
          followed_user_id: user.id,
          user_id: profileUser.id,
          id: `${profileUser.id}#${user.id}`,
        },
      },
    });
    profileUser.totals.followers += 1;
    profileUser.followed = true;
    setDoRender(doRender + 1);
  };

  useEffect(() => {
    return () => {
      setProfileUser(null);
    };
  }, []);

  const deleteFollowUser = async () => {
    await API.graphql({
      query: deleteFollowedUsers,
      variables: {
        input: {
          id: `${profileUser.id}#${user.id}`,
        },
      },
    });
    profileUser.totals.followers -= 1;
    profileUser.followed = false;
    setDoRender(doRender + 1);
  };

  const handleClick = () => {
    if (isLogged) {
      if (!profileUser.followed) {
        createFollowUser();
      } else if (profileUser.followed) {
        deleteFollowUser();
      }
    } else {
      router.push({
        pathname: `/login`,
        // state: { background: location },
      });
    }
  };
  return !loading && profileUser.id ? (
    <div
      className={`min-w-[300px] min-h-[175px] rounded-square shadow-dropdown px-[18px] py-[16px] bg-white`}
      // style={{ top: "45px" }}
    >
      <div className={"flex flex-col"}>
        <div className={"flex flex-row flex-nowrap max-h-[48px]"}>
          <div className={"w-[48px] h-[48px] rounded-full"}>
            <Image
              className={"rounded-full"}
              width={48}
              height={48}
              alt={"user profile"}
              objectFit={"cover"}
              src={
                profileUser.pic
                  ? getFileUrl(profileUser.pic)
                  : "https://picsum.photos/50x50"
              }
            />
          </div>
          <div
            className={"flex flex-col justify-center items-center ml-[10px]"}
          >
            <div className={"flex flex-row items-center"}>
              <p
                className={
                  "font-bold text-caak-generalblack text-16px tracking-[0.24px] leading-[19px]"
                }
              >
                {profileUser.nickname}
              </p>
              <div
                className={"flex items-center justify-center w-[17px] h-[17px]"}
              >
                <span className="icon-fi-rs-verified text-[14px] text-caak-buttonblue" />
              </div>
            </div>
            <p
              className={
                "text-14px text-caak-generalblack self-start tracking-[0.21px] leading-[16px]"
              }
            >
              {profileUser.about}
            </p>
          </div>
        </div>
        <div className={"flex flex-row items-center py-[15px]"}>
          <div className={"flex flex-row items-center"}>
            <p
              className={
                "text-[17px] text-caak-generalblack font-medium tracking-[0.26px] leading-[20px]"
              }
            >
              {profileUser.aura}&nbsp;
            </p>
            <p
              className={
                "text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[16px]"
              }
            >
              Аура
            </p>
          </div>
          <div className={"flex flex-row items-center ml-[14px]"}>
            <p
              className={
                "text-[17px] text-caak-generalblack font-medium tracking-[0.26px] leading-[20px]"
              }
            >
              {profileUser.totals.followers}&nbsp;
            </p>
            <p
              className={
                "text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[16px]"
              }
            >
              Дагагчид
            </p>
          </div>
        </div>
        <Divider className={"mb-[12px]"} color={"bg-caak-titaniumwhite"} />
        {/*If no user is logged, show only follow button*/}
        {/*And If user is there show follow or unfollow button*/}
        {isLogged ? (
          user.id !== profileUser.id ? (
            <button
              onClick={handleClick}
              className={
                "button small bg-caak-primary text-white font-medium text-15px"
              }
            >
              {profileUser.followed ? "Дагасан" : "Дагах"}
            </button>
          ) : null
        ) : (
          <button
            onClick={handleClick}
            className={
              "button small bg-caak-primary text-white font-medium text-15px"
            }
          >
            Дагах
          </button>
        )}
      </div>
    </div>
  ) : (
    <Loader
      containerClassName={
        "flex items-center justify-center w-[300px] h-[175px] rounded-square shadow-dropdown pl-7 z-50 pt-3 pb-3 pr-6 bg-white"
      }
      className={`bg-caak-primary`}
    />
  );
}
