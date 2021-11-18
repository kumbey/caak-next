import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../graphql-custom/user/mutation";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { checkUser, getFileUrl } from "../../utility/Util";
import { getUserById } from "../../utility/ApiHelper";
import Loader from "../loader";
import Link from "next/link";

export default function ProfileHoverCard({ userId }) {
  const { user } = useUser();
  const [doRender, setDoRender] = useState(0);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  // useEffect(() => {
  //   console.log("FOLLOW: ", postUser.followed);
  // }, [postUser.followed]);

  useEffect(() => {
    setLoading(true);
    if (userId)
      if (checkUser(user)) {
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
        input: { followed_user_id: user.sysUser.id, user_id: profileUser.id },
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
          followed_user_id: user.sysUser.id,
          user_id: userId,
        },
      },
    });
    profileUser.totals.followers -= 1;
    profileUser.followed = false;
    setDoRender(doRender + 1);
  };

  const handleClick = () => {
    if (checkUser(user)) {
      if (!profileUser.followed) {
        createFollowUser();
      } else if (profileUser.followed) {
        deleteFollowUser();
      }
    } else {
      history.push({
        pathname: `/login`,
        state: { background: location },
      });
    }
  };
  return !loading && profileUser.id ? (
    <div
      className={`pl-7 w-ch h-px-154 rounded-square shadow-dropdown pt-3 pb-3 pr-6 bg-white`}
      // style={{ top: "45px" }}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <Link href={`/user/${profileUser.id}/profile`}>
          <img
            className="object-cover w-12 h-12 border-2 border-white rounded-full"
            alt=""
            src={
              profileUser.pic
                ? getFileUrl(profileUser.pic)
                : "https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"
            }
          />
        </Link>
        {/*If no user is logged, show only follow button*/}
        {/*And If user is there show follow or unfollow button*/}
        {checkUser(user) ? (
          user.sysUser.id !== profileUser.id ? (
            <button
              onClick={handleClick}
              className={"button small  bg-caak-titaniumwhite text-black"}
            >
              {profileUser.followed ? "Дагасан" : "Дагах"}
            </button>
          ) : null
        ) : (
          <button onClick={handleClick} className={"button small"}>
            Дагах
          </button>
        )}
      </div>
      <div className="mb-px-10">
        <div className="flex items-center">
          <Link
            className="flex items-center"
            href={`/user/${profileUser.id}/profile`}
          >
            <p className="text-17px mr-0.5 font-bold">{profileUser.nickname}</p>
            <span className="icon-fi-rs-verified w-3.5 h-3.5 text-caak-buttonblue " />
          </Link>
        </div>
        <p className="text-15px font-light">{profileUser.about}</p>
      </div>
      <div className="pr-14 flex flex-row items-center justify-between">
        <div className="flex items-center" style={{ marginRight: "22px" }}>
          <p className="text-18px mr-1 font-medium">{profileUser.aura}</p>
          <p className="text-15px text-caak-darkBlue font-roboto font-light">
            Аура
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-18px mr-1 font-medium">
            {profileUser.totals?.followers}
          </p>
          <p className="text-15px text-caak-darkBlue font-light"> дагагчид</p>
        </div>
      </div>
    </div>
  ) : (
    <Loader
      containerClassName={
        "flex items-center justify-center w-ch h-px-154 rounded-square shadow-dropdown pl-7 z-50 pt-3 pb-3 pr-6 bg-white"
      }
      className={`bg-caak-primary`}
    />
  );
}
