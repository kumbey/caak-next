import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { getFileUrl, getGenderImage, kFormatter } from "../../utility/Util";
import { getUserById } from "../../utility/ApiHelper";
import Loader from "../loader";
import { useRouter } from "next/router";
import Divider from "../divider";
import userVerifiedSvg from "../../../public/assets/images/fi-rs-awarded.svg";

export default function ProfileHoverCard({ userId }) {
  const { user, isLogged } = useUser();
  const [doRender, setDoRender] = useState(0);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            signInUp: "signIn",
            isModal: true,
            prevPath: router.asPath,
          },
        },
        `/signInUp/signIn`,
        { shallow: true, scroll: false }
      );
    }
  };
  return !loading && profileUser.id ? (
    <div
      className={`flex flex-col w-full max-w-[300px] rounded-square shadow-dropdown px-[18px] py-[16px] bg-white`}
    >
      <div className={"flex flex-row items-center w-full"}>
        <div className={"w-[48px] h-[48px] rounded-full w-full"}>
          <img
            className={"rounded-full object-cover w-full h-full"}
            alt={"user profile"}
            // objectFit={"cover"}
            src={
              profileUser.pic
                ? getFileUrl(profileUser.pic)
                : getGenderImage(profileUser.gender).src
            }
          />
        </div>
        <div className={"ml-[10px]"}>
          <div className={"flex flex-row self-start"}>
            <a href={`/user/${profileUser.id}/profile`}>
              <p
                className={
                  "font-bold text-caak-generalblack text-[16px] tracking-[0.24px] leading-[19px]"
                }
              >
                {profileUser.nickname}
              </p>
            </a>
            {profileUser.verified && (
              <div
                className={"flex items-center justify-center w-[17px] h-[17px]"}
              >
                <img
                  className={"w-[16.5px] h-[14.25px]"}
                  alt={""}
                  height={14.25}
                  width={16.5}
                  // quality={100}
                  // priority={true}
                  src={userVerifiedSvg.src}
                />
              </div>
            )}
          </div>
          <p
            className={
              "text-14px max-h-[60px] whitespace-normal truncate text-caak-generalblack w-[200px] "
            }
          >
            {profileUser.about ? profileUser.about : "???????? ??????????????????"}
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
            {kFormatter(profileUser.aura)}&nbsp;
          </p>
          <p
            className={
              "text-[14px] text-caak-darkBlue tracking-[0.21px] leading-[16px]"
            }
          >
            ????????
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
            ????????????????
          </p>
        </div>
      </div>
      {/*If no user is logged, show only follow button*/}
      {/*And If user is there show follow or unfollow button*/}
      {isLogged ? (
        user.id !== profileUser.id ? (
          <>
            <Divider className={"mb-[12px]"} color={"bg-caak-titaniumwhite"} />
            <button
              onClick={handleClick}
              className={`${
                profileUser?.followed
                  ? "bg-caak-titaniumwhite text-caak-shit"
                  : "bg-caak-primary text-white"
              }  button small  font-medium text-15px`}
            >
              {profileUser.followed ? "??????????????" : "??????????"}
            </button>
          </>
        ) : null
      ) : (
        <>
          <Divider className={"mb-[12px]"} color={"bg-caak-titaniumwhite"} />
          <button
            onClick={handleClick}
            className={
              "button small bg-caak-primary text-white font-medium text-15px"
            }
          >
            ??????????
          </button>
        </>
      )}
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
