import SuggestedGroupsCard from "../../card/SuggestedGroupsCard/";
import { useUser } from "../../../context/userContext";
import useMediaQuery from "../../navigation/useMeduaQuery";
import GroupRules from "../../card/GroupRules";
import Button from "../../button";
import LeaveGroup from "../../group/LeaveGroup";
import {
  getFileUrl,
  getGenderImage,
  kFormatter,
  useClickOutSide,
} from "../../../utility/Util";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { createGroupUsers } from "../../../graphql-custom/GroupUsers/mutation";
import DropDown from "../../navigation/DropDown";
import GroupMoreMenu from "../../../components/group/GroupMoreMenu";
import GroupAdminPanel from "../../group/GroupAdminPanel";
import { useRouter } from "next/router";
import GroupAdminsCard from "../../group/GroupAdminsCard";
import Banner from "../../banner";
import GroupInfoCard from "../../card/GroupInfoCard";
import { usePreserveScroll } from "../../../hooks/useScroll";
import UploadCoverImageModal from "../../modals/uploadCoverImageModal";
import UploadProfileImageModal from "../../modals/uploadProfileImageModal";

const GroupLayout = ({
  children,
  groupData,
  totalMember,
  hideSuggestedGroups,
}) => {
  usePreserveScroll();

  const { isLogged, user: signedUser } = useUser();
  const isLaptop = useMediaQuery("screen and (max-device-width: 1100px)");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCoverUploadModalOpen, setIsCoverUploadModalOpen] = useState(false);
  const [isProfileUploadModalOpen, setIsProfileUploadModalOpen] =
    useState(false);
  const router = useRouter();
  const [forceRender, setForceRender] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const followGroup = async () => {
    try {
      setLoading(true);
      if (groupData.followed) {
        setOpen(true);
      } else {
        await API.graphql(
          graphqlOperation(createGroupUsers, {
            input: {
              id: `${groupData.id}#${signedUser.id}`,
              group_id: groupData.id,
              user_id: signedUser.id,
              role: "MEMBER",
            },
          })
        );
        groupData.followed = true;
        groupData.totals.member += 1;
        setForceRender(forceRender + 1);
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
  const handleFollow = () => {
    if (isLogged) {
      followGroup();
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
        { shallow: true }
      );
    }
  };

  useEffect(() => {
    setLoaded(true);
  }, []);
  return loaded ? (
    <div className={"flex flex-col relative pb-[200px] md:pb-0"}>
      {isCoverUploadModalOpen && (
        <UploadCoverImageModal
          groupData={groupData}
          setIsOpen={setIsCoverUploadModalOpen}
          img={getFileUrl(groupData.cover)}
        />
      )}
      {isProfileUploadModalOpen && (
        <UploadProfileImageModal
          groupData={groupData}
          setIsOpen={setIsProfileUploadModalOpen}
          img={getFileUrl(groupData.profile)}
        />
      )}

      <LeaveGroup
        open={open}
        setOpen={setOpen}
        groupData={groupData}
        setForceRender={setForceRender}
        forceRender={forceRender}
      />
      <div className={"flex flex-col"}>
        <div className={"relative w-full max-h-[240px] h-full"}>
          <div className={"w-full h-[120px] navbarGradient absolute top-0"} />
          <img
            className={
              "object-cover h-full max-h-[240px] min-h-[120px] w-full groupCoverImage"
            }
            alt={groupData?.cover?.name}
            src={
              groupData?.cover
                ? getFileUrl(groupData.cover)
                : getGenderImage("default").src
            }
          />
          {isLogged &&
            (groupData.role_on_group === "ADMIN" ? (
              <div
                onClick={() => setIsCoverUploadModalOpen(true)}
                className={
                  "cursor-pointer h-[32px] px-[12px] font-medium py-[8px] flex flex-row items-center justify-center absolute right-[40px] bottom-[20px] rounded-square bg-caak-liquidnitrogen"
                }
              >
                <div
                  className={
                    "w-[24p] h-[24px] flex items-center justify-center"
                  }
                >
                  <span
                    className={
                      "icon-fi-rs-camera-f text-caak-extraBlack text-[22px]"
                    }
                  />
                </div>
                <p className={"text-[14px] text-caak-generalblack ml-[7px]"}>
                  Засах
                </p>
              </div>
            ) : null)}
        </div>
      </div>
      <div className="w-full flex items-center mb-[20px] relative">
        <div className={"bg-white w-full p-[10px] md:h-[110px] relative"}>
          <div className="relative md:absolute z-[1] px-[2px] md:px-[20px] md:left-1/2 md:-translate-x-1/2 md:top-[-58px] flex flex-row w-full bg-white md:bg-transparent max-w-[966px] mx-auto">
            <div className="flex flex-row items-start md:items-end w-full">
              <div
                className={
                  "w-[100px] h-[100px] md:w-[148px] md:h-[148px] flex-shrink-0 relative rounded-[34px] border-[6px] bg-white border-white"
                }
              >
                <img
                  className={"object-cover w-full h-full rounded-[26px]"}
                  alt={"user profile"}
                  height={148}
                  width={148}
                  // objectFit={"cover"}
                  src={
                    groupData?.profile
                      ? getFileUrl(groupData?.profile)
                      : getGenderImage("default").src
                  }
                />
                {isLogged &&
                  (groupData.role_on_group === "ADMIN" ? (
                    // groupData.role_on_group === "MODERATOR") && (
                    <div
                      onClick={() => setIsProfileUploadModalOpen(true)}
                      className={
                        "flex items-center justify-center cursor-pointer w-[42px] h-[42px] bg-white rounded-full absolute bottom-[8px] right-[-8px] shadow-profileCamera"
                      }
                    >
                      <span
                        className={
                          "icon-fi-rs-camera-f text-caak-extraBlack text-[22px]"
                        }
                      />
                    </div>
                  ) : null)}
              </div>
              <div
                className={
                  "flex md:flex-row flex-col justify-between md:items-center w-full md:mb-[16px] ml-[24px]"
                }
              >
                <div className={"flex flex-col mb-[10px] md:mb-0"}>
                  <div>
                    <h1 className="text-[18px] md:text-24px font-bold">
                      {groupData.name}
                    </h1>
                  </div>
                  <div className="flex md:flex-row flex-col">
                    <div className="flex mr-[22px] items-center">
                      <span
                        className={
                          "icon-fi-rs-aura-o text-[23.5px] auroGradient mr-1"
                        }
                      />
                      <p className={"text-[14px] text-caak-generalblack"}>
                        {kFormatter(groupData.aura ? groupData.aura : 0)} Аура
                      </p>
                    </div>
                    {/*<div className="flex mr-[22px] items-center">*/}
                    {/*  <span className={"icon-fi-rs-globe mr-1"} />*/}
                    {/*  <p className="text-sm">Нээлттэй групп</p>*/}
                    {/*</div>*/}
                    <div className="flex items-center">
                      <span
                        className={
                          "icon-fi-rs-group-o mr-1 text-[20.17px] text-caak-darkBlue"
                        }
                      />
                      <p className={"text-[14px] text-caak-generalblack"}>
                        {totalMember} гишүүн
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-start md:justify-end">
                  <>
                    <Button
                      loading={loading}
                      className="h-[36px] w-[124px] rounded-lg text-base font-medium font-inter"
                      icon={<span className="icon-fi-rs-add-group-f  mr-1" />}
                      iconPosition="left"
                      onClick={handleFollow}
                      skin={`${
                        groupData.followed
                          ? "bg-caak-titaniumwhite text-caak-generalBlack"
                          : "bg-caak-primary text-white"
                      }`}
                    >
                      {groupData.followed ? "Нэгдсэн" : "Нэгдэх"}
                    </Button>
                  </>
                  <div
                    ref={menuRef}
                    onClick={toggleMenu}
                    className={`flex justify-center flex-shrink-0 ml-3 w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-titaniumwhite rounded-full`}
                  >
                    <span className="icon-fi-rs-dots text-22px" />
                    <DropDown
                      open={isMenuOpen}
                      onToggle={toggleMenu}
                      content={<GroupMoreMenu />}
                      className={"top-[36px] z-[20000]"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={"feedLayoutContainer flex-col max-w-[966px] w-full mx-auto"}
      >
        <div className={"flex flex-row justify-between"}>
          <div className="flex flex-col w-full">
            <div>{children}</div>
          </div>
          <div
            className={`rightSideBar ml-[30px] bg-none  ${
              isLaptop ? "hidden" : "block"
            }`}
          >
            {groupData.role_on_group === "ADMIN" ? (
              <GroupAdminPanel
                groupRole={groupData.role_on_group}
                groupId={groupData.id}
              />
            ) : null}
            {/*<GroupTopMembersCard groupId={groupData.id}/>*/}
            {!hideSuggestedGroups && (
              <div className="mt-[16px]">
                <SuggestedGroupsCard
                  maxColumns={5}
                  title={"Санал болгох группүүд"}
                  className={"mb-[24px]"}
                />
              </div>
            )}
            <GroupInfoCard groupId={groupData.id} />
            <GroupRules groupId={groupData.id} />
            {/*<GroupBadge />*/}
            <GroupAdminsCard groupId={groupData.id} />
            <Banner />
            {/*<FooterSidebar*/}
            {/*  containerClassname={"bg-white rounded-square p-[20px]"}*/}
            {/*/>*/}

            {/*{!isLogged && <FooterSidebar />}*/}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default GroupLayout;
