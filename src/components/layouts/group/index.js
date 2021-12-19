import FooterSidebar from "../../footer/FooterSidebar";
import Image from "next/image";
import SuggestedGroupsCard from "../../card/SuggestedGroupsCard/";
import { useUser } from "../../../context/userContext";
import useMediaQuery from "../../navigation/useMeduaQuery";
import GroupInfo from "../../group/GroupInfo";
import GroupRules from "../../card/GroupRules";
import GroupBadge from "../../group/GroupBadge";
import Dropzone from "react-dropzone";
import Button from "../../button";
import {
  getFileExt,
  getFileName,
  getFileUrl,
  getGenderImage,
  useClickOutSide,
} from "../../../utility/Util";
import { useCallback, useEffect, useState } from "react";
import awsExports from "../../../aws-exports";
import { ApiFileUpload } from "../../../utility/ApiHelper";
import { API, graphqlOperation } from "aws-amplify";
import { updateGroup } from "../../../graphql-custom/group/mutation";
import { deleteFile } from "../../../graphql-custom/file/mutation";

import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../../graphql-custom/GroupUsers/mutation";
import DropDown from "../../navigation/DropDown";
import GroupMoreMenu from "../../../components/group/GroupMoreMenu";
import GroupAdminPanel from "../../group/GroupAdminPanel";
import { useRouter } from "next/router";
import Loader from "../../loader";
import TopMembers from "../../Sidebar/TopMembers";
import GroupTopMembersCard from "../../card/GroupTopMembersCard";

const GroupLayout = ({
  children,
  groupData,
  totalMember,
  hideSuggestedGroups,
}) => {
  const { isLogged, user: signedUser } = useUser();
  const isLaptop = useMediaQuery("screen and (max-device-width: 1100px)");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const [forceRender, setForceRender] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        await API.graphql(
          graphqlOperation(deleteGroupUsers, {
            input: {
              id: `${groupData.id}#${signedUser.id}`,
            },
          })
        );
        groupData.followed = false;
        groupData.totals.member -= 1;
        setForceRender(forceRender + 1);
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
          },
        },
        `/signInUp/signIn`,
        { shallow: true }
      );
    }
  };

  const fileParams = (file) => {
    return {
      ext: getFileExt(file[0].name),
      name: getFileName(file[0].name),
      key: file[0].name,
      type: file[0].type,
      url: URL.createObjectURL(file[0]),
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      level: "public",
      obj: file[0],
    };
  };

  const onDrop = useCallback((file) => {
    setProfilePictureDropZone(fileParams(file));
  }, []);

  const onDropCover = useCallback((file) => {
    setCoverPictureDropZone(fileParams(file));
  }, []);

  const [profilePictureDropZone, setProfilePictureDropZone] = useState([]);
  const [coverPictureDropZone, setCoverPictureDropZone] = useState([]);

  const updateImage = async ({ type, array, setArray }) => {
    try {
      const resp = await ApiFileUpload(array);
      await API.graphql(
        graphqlOperation(updateGroup, {
          input: {
            id: groupData.id,
            ...(type === "cover"
              ? { groupCoverId: resp.id }
              : { groupProfileId: resp.id }),
          },
        })
      );
      if (groupData.cover.id)
        await API.graphql(
          graphqlOperation(deleteFile, {
            input: {
              ...(type === "cover"
                ? { id: groupData.cover.id }
                : { id: groupData.profile.id }),
            },
          })
        );

      if (type === "cover") {
        groupData.cover = resp;
      } else {
        groupData.profile = resp;
      }
      setArray({});
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (coverPictureDropZone.url) {
      setUploadingCover(true);
      updateImage({
        type: "cover",
        array: coverPictureDropZone,
        setArray: setCoverPictureDropZone,
      }).then(() => {
        setUploadingCover(false);
      });
    }

    // eslint-disable-next-line
  }, [coverPictureDropZone]);

  useEffect(() => {
    if (profilePictureDropZone.url) {
      setUploadingProfile(true);
      updateImage({
        type: "profile",
        array: profilePictureDropZone,
        setArray: setProfilePictureDropZone,
      }).then(() => {
        setUploadingProfile(false);
      });
    }
    // eslint-disable-next-line
  }, [profilePictureDropZone]);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return loaded ? (
    <div className={"flex flex-col relative"}>
      <div className={"flex flex-col"}>
        <div className={"relative w-full h-[240px]"}>
          <Image
            layout={"fill"}
            objectFit={"cover"}
            alt={groupData?.cover?.name}
            src={
              groupData?.cover
                ? getFileUrl(groupData.cover)
                : getGenderImage("default")
            }
          />
          {isLogged &&
            (groupData.role_on_group === "ADMIN" ||
              groupData.role_on_group === "MODERATOR") && (
              <Dropzone
                noKeyboard
                maxFiles={1}
                onDropRejected={(e) => console.log(e[0].errors[0].message)}
                accept={"image/jpeg, image/png, image/gif"}
                onDropAccepted={onDropCover}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className={
                      "cursor-pointer h-[32px] px-[12px] font-medium py-[8px] flex flex-row items-center justify-center absolute right-[40px] bottom-[20px] rounded-square bg-caak-liquidnitrogen"
                    }
                  >
                    {!uploadingCover ? (
                      <>
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
                        <p
                          className={
                            "text-[14px] text-caak-generalblack ml-[7px]"
                          }
                        >
                          Засах
                        </p>
                        <input {...getInputProps()} />
                      </>
                    ) : (
                      <p
                        className={
                          "text-[14px] text-caak-generalblack ml-[7px]"
                        }
                      >
                        Хадгалж байна...
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
            )}
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
                {uploadingProfile && (
                  <div
                    className={
                      "flex items-center justify-center w-full h-full bg-white absolute top-0 rounded-[34px] z-[1] bg-opacity-80"
                    }
                  >
                    <Loader
                      containerClassName={"w-full"}
                      className={`bg-caak-primary`}
                    />
                  </div>
                )}
                <Image
                  className={"rounded-[34px]"}
                  alt={"user profile"}
                  height={148}
                  width={148}
                  objectFit={"cover"}
                  src={
                    groupData?.profile
                      ? getFileUrl(groupData?.profile)
                      : getGenderImage("default")
                  }
                />
                {isLogged &&
                  (groupData.role_on_group === "ADMIN" ||
                    groupData.role_on_group === "MODERATOR") && (
                    <Dropzone
                      onDropRejected={(e) =>
                        console.log(e[0].errors[0].message)
                      }
                      accept={"image/jpeg, image/png, image/gif"}
                      onDropAccepted={onDrop}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className={
                            "flex items-center justify-center cursor-pointer w-[42px] h-[42px] bg-white rounded-full absolute bottom-[8px] right-[-8px] shadow-profileCamera"
                          }
                        >
                          <span
                            className={
                              "icon-fi-rs-camera-f text-caak-extraBlack text-[22px]"
                            }
                          />
                          <input {...getInputProps()} />
                        </div>
                      )}
                    </Dropzone>
                  )}
              </div>
              <div
                className={
                  "flex md:flex-row flex-col justify-between md:items-center w-full md:mb-[16px] ml-[24px]"
                }
              >
                <div className={"flex flex-col mb-[10px] md:mb-0"}>
                  <div>
                    <h1 className="text-[18px] md:text-24px font-bold">{groupData.name}</h1>
                  </div>
                  <div className="flex md:flex-row flex-col">
                    <div className="flex mr-[22px] items-center">
                      <span className={"icon-fi-rs-aura mr-1"} />
                      <p className="text-sm">2434 Аура</p>
                    </div>
                    <div className="flex mr-[22px] items-center">
                      <span className={"icon-fi-rs-globe mr-1"} />
                      <p className="text-sm">Нээлттэй бүлэг</p>
                    </div>
                    <div className="flex items-center">
                      <span className={"icon-fi-rs-group-o mr-1"} />
                      <p className="text-sm">{totalMember} Гишүүн</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-start md:justify-end">
                  <>
                    <Button
                      loading={loading}
                      className="h-[36px] w-[124px] rounded-lg text-white text-base font-medium font-inter"
                      icon={<span className="icon-fi-rs-add-group-f  mr-1" />}
                      iconPosition="left"
                      onClick={handleFollow}
                      skin={`${
                        groupData.followed
                          ? "bg-caak-titaniumwhite"
                          : "bg-caak-cardinal"
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
            {groupData.role_on_group === "ADMIN" ||
            groupData.role_on_group === "MODERATOR" ? (
              <GroupAdminPanel groupData={groupData} />
            ) : null}
            <GroupTopMembersCard groupId={groupData.id}/>
            <div className="mt-[16px]">
              {!hideSuggestedGroups && (
                <SuggestedGroupsCard
                  maxColumns={5}
                  title={"Санал болгох группүүд"}
                  className={"mb-[24px]"}
                />
              )}
            </div>
            <GroupRules />
            <GroupBadge />
            <FooterSidebar
              containerClassname={"mt-[16px] bg-white rounded-square p-[20px]"}
            />

            {!isLogged && <FooterSidebar />}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default GroupLayout;
