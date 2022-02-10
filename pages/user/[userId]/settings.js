import { useEffect, useState } from "react";
import { useUser } from "/src/context/userContext";
import { getFileUrl, getGenderImage } from "/src/utility/Util";
import Informations from "../../../src/components/userProfile/Informations";
import SocialLink from "../../../src/components/userProfile/SocialLink";
import SiteConfiguration from "../../../src/components/userProfile/SiteConfiguration";
import Privacy from "../../../src/components/userProfile/Privacy";
import { data } from "../../../src/components/settingsMenuData";
import { useRouter } from "next/router";
import Consts from "../../../src/utility/Consts";
import { useWrapper } from "../../../src/context/wrapperContext";
import Head from "next/head";
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import UserInterests from "../../../src/components/userProfile/UserInterests";
import { listUserCategoryByUser } from "../../../src/graphql-custom/category/queries";
import { getReturnData } from "../../../src/utility/Util";
import toast from "react-hot-toast";
import UserGroups from "../../../src/components/userProfile/groups/UserGroups";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  if (user?.attributes.sub !== query.userId) return { notFound: true };
  return { props: {} };
}

export default function Settings() {
  const router = useRouter();
  const { user } = useUser();
  const { setNavBarTransparent } = useWrapper();
  const [activeIndex, setActiveIndex] = useState(1);
  const [categories, setCategories] = useState([]);
  const [showInterest, setShowInterest] = useState();
  const [showGroup, setShowGroup] = useState();
  const [userCategories, setUserCategories] = useState([]);

  const handleToast = ({ param }) => {
    if (param === "changed") toast.success("Амжилттай солигдлоо.");
  };

  const setSelectedUserCats = async () => {
    userCategories.length = 0;
    categories.map((cat) => {
      userCategories.push(cat.category.id);
    });
  };

  const fetchCat = async () => {
    const resp = await API.graphql(
      graphqlOperation(listUserCategoryByUser, {
        user_id: user.id,
      })
    );

    setCategories(getReturnData(resp).items);
  };

  useEffect(() => {
    setNavBarTransparent(false);
  }, [setNavBarTransparent]);

  useEffect(() => {
    fetchCat();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSelectedUserCats();
    //eslint-disable-next-line
  }, [categories]);

  useEffect(() => {
    fetchCat();
    setSelectedUserCats();
    //eslint-disable-next-line
  }, [showGroup]);

  return user ? (
    <>
      <Head>
        <title>Профайл тохиргоо - {Consts.siteMainTitle}</title>
      </Head>
      {showInterest && (
        <UserInterests
          setShowInterest={setShowInterest}
          showInterest={showInterest}
          selectedCats={userCategories}
          setShowGroup={setShowGroup}
        />
      )}
      {showGroup && (
        <div className="popup_modal">
          <div className="popup_modal-groups flex items-center justify-center w-full">
            <UserGroups setShowGroup={setShowGroup} handleToast={handleToast} />
          </div>
        </div>
      )}

      <div
        style={{ marginTop: "36px" }}
        className="flex justify-center  items-center w-full px-4 md:px-6 max-w-4xl mx-auto pt-[54px]"
      >
        <div className="flex flex-col w-full settingsPanel">
          <div className="flex items-center bg-transparent">
            <span
              onClick={() => router.back()}
              className="icon-fi-rs-back bg-caak-titaniumwhite text-20px flex items-center justify-center rounded-full cursor-pointer"
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
              src={
                user.pic
                  ? getFileUrl(user.pic)
                  : getGenderImage(user.gender).src
              }
            />
            <div className="flex-row flex items-center">
              {/* <p
                style={{ marginRight: "8px" }}
                className=" text-[22px] font-semibold"
              >
                {user.firstname}
              </p> */}
              <p className="text-[22px] font-semibold text-[#21293C]">
                @{user.nickname}
              </p>
            </div>
          </div>
          <div className=" sm:justify-between md:justify-between lg:justify-center  2xl:justify-start 3xl:justify-center  flex flex-col md:flex-row  w-full">
            <div className="settingsMenuPanel  bg-white drop-shadow rounded-lg mt-[24px]">
              <div className="my-[30px] mx-[30px]">
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
                    <span
                      style={{ marginRight: "3px" }}
                      className={`${icon} text-24px`}
                    />
                    <p className="text-[16px] ml-px-10 font-medium">{title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{ marginTop: "24px" }}
              className="md:ml-c11 sm:ml-0 mb-c11 bg-white drop-shadow rounded-lg settingsDiv"
            >
              {activeIndex === 1 ? (
                <Informations
                  currentUser={user}
                  setShowInterest={setShowInterest}
                  categories={categories}
                />
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
    </>
  ) : null;
}
