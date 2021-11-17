import { useEffect, useState } from "react";

import Dummy from "dummyjs";
import { getUserById } from "/src/Utility/ApiHelper";
import { checkUser } from "/src/Utility/Util";
import { useUser } from "/src/context/userContext";
import { getFileUrl } from "/src/Utility/Util";
import Informations from "./Informations";
import SocialLink from "./SocialLink";
import SiteConfiguration from "./SiteConfiguration";
import Privacy from "./Privacy";
import data from "./settingsMenuData";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();
  const userId = router.query.userId;
  const [user, setUser] = useState();
  const { user: signedUser } = useUser();

  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    try {
      if (checkUser(signedUser))
        getUserById({
          id: userId,
          setUser,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
      else {
        router.back();
      }
    } catch (ex) {
      console.log(ex);
    }
    // eslint-disable-next-line
  }, [user, userId]);

  return user ? (
    <div
      style={{ marginTop: "36px" }}
      className="flex justify-center  items-center w-full px-4 md:px-6 max-w-4xl mx-auto"
    >
      <div className="flex flex-col w-full settingsPanel">
        <div className="flex items-center bg-transparent">
          <span
            onClick={() => router.back()}
            className="icon-fi-rs-back bg-caak-titaniumwhite flex items-center justify-center rounded-full cursor-pointer"
            style={{ height: "48px", width: "48px" }}
          />
          <img
            className="w-c28 h-c28 rounded-full"
            alt=""
            style={{
              marginLeft: "20px",
              marginRight: "8px",
            }}
            data-dummy="200x200"
            src={user.pic ? getFileUrl(user.pic) : Dummy.img("200x200")}
          />
          <div className="flex-row flex items-center">
            <p
              style={{ marginRight: "8px" }}
              className=" text-24px  font-medium"
            >
              {user.firstname}
            </p>
            <p className="text-18px">@{user.nickname}</p>
          </div>
        </div>
        <div className=" sm:justify-between md:justify-between lg:justify-center  2xl:justify-start 3xl:justify-center  flex flex-col md:flex-row  w-full">
          <div
            style={{ marginTop: "24px" }}
            className="settingsMenuPanel px-c3  bg-white rounded-lg"
          >
            {data.map(({ icon, title, id }) => (
              <div
                key={id}
                onClick={() => setActiveIndex(id)}
                style={{ marginTop: "24px", marginBottom: "24px" }}
                className={`flex items-center cursor-pointer 
                                    ${
                                      id === activeIndex
                                        ? "text-caak-primary"
                                        : "text-caak-generalblack"
                                    }`}
              >
                {icon}
                <p className="text-17px ml-px-10 font-medium">{title}</p>
              </div>
            ))}
          </div>
          <div
            style={{ marginTop: "24px" }}
            className="md:ml-c11 sm:ml-0 mb-c11 bg-white rounded-lg settingsDiv"
          >
            {activeIndex === 1 ? (
              <Informations currentUser={user} />
            ) : activeIndex === 2 ? (
              <SocialLink />
            ) : activeIndex === 3 ? (
              <SiteConfiguration />
            ) : activeIndex === 4 ? (
              <Privacy />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
