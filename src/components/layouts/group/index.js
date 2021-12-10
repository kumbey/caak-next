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
} from "../../../utility/Util";
import { useCallback, useEffect, useState } from "react";
import awsExports from "../../../aws-exports";
import { ApiFileUpload } from "../../../utility/ApiHelper";
import { API, graphqlOperation } from "aws-amplify";
import { updateGroup } from "../../../graphql-custom/group/mutation";
import { updateUser } from "../../../graphql-custom/user/mutation";
import { deleteFile } from "../../../graphql-custom/file/mutation";

import { useClickOutSide } from "../../../utility/Util";

import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../../graphql-custom/GroupUsers/mutation";
import DropDown from "../../navigation/DropDown";
import PostMoreMenu from "../../card/PostMoreMenu";
import Link from "next/link";
import GroupMoreMenu from "../../../components/group/GroupMoreMenu";

const GroupLayout = ({
  children,
  groupData,
  totalMember,
  hideSuggestedGroups,
}) => {
  const { isLogged, user: signedUser } = useUser();
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const isLaptop = useMediaQuery("screen and (max-device-width: 1100px)");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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
              id: `${groupData.id}#${cognitoUser.attributes.sub}`,
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
              id: `${groupData.id}#${cognitoUser.attributes.sub}`,
              group_id: groupData.id,
              user_id: cognitoUser.attributes.sub,
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
      // router.push(`?signInUp=signIn&isModal=true`, `/signInUp/signIn`, {
      //   shallow: true,
      // });
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

  const updateImage = async ({ type, array, setArray, signedUser }) => {
    try {
      setUploading(true);
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
      if (groupData.cover_pic_id)
        await API.graphql(
          graphqlOperation(deleteFile, {
            input: {
              ...(type === "cover"
                ? { id: groupData.cover_pic_id }
                : { id: groupData.pic_id }),
            },
          })
        );
      if (type === "cover") {
        groupData.cover_pic_id = resp;
      } else {
        groupData.pic_id = resp;
      }
      setArray({});
      setUploading(false);
    } catch (ex) {
      setUploading(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    if (coverPictureDropZone.name)
      updateImage({
        type: "cover",
        array: coverPictureDropZone,
        setArray: setCoverPictureDropZone,
        signedUser,
      });
    // eslint-disable-next-line
  }, [coverPictureDropZone]);

  useEffect(() => {
    if (profilePictureDropZone.name)
      updateImage({
        type: "profile",
        array: profilePictureDropZone,
        setArray: setProfilePictureDropZone,
        signedUser,
      });
    // eslint-disable-next-line
  }, [profilePictureDropZone]);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <div className={"flex flex-col"}>
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
            {isLogged && (
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
                    {!uploading ? (
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
                      <p>Uploading...</p>
                    )}
                  </div>
                )}
              </Dropzone>
            )}
          </div>
        </div>
        <div className="w-full flex items-center mb-[20px]">
          <div className={"bg-white w-full h-[110px] relative"}>
            <div className="absolute left-1/2 -translate-x-1/2 top-[-58px] flex flex-row w-full bg-transparent max-w-[966px] mx-auto">
              <div className="flex flex-row items-end w-full">
                <div
                  className={
                    "w-[148px] h-[148px] flex-shrink-0 relative rounded-[34px] border-[6px] bg-white border-white"
                  }
                >
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
                  {isLogged && (
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
                          {!uploading && (
                            <>
                              <span
                                className={
                                  "icon-fi-rs-camera-f text-caak-extraBlack text-[22px]"
                                }
                              />
                              <input {...getInputProps()} />
                            </>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  )}
                </div>
                <div
                  className={
                    "flex flex-row justify-between items-center w-full mb-[16px] ml-[24px]"
                  }
                >
                  <div className={"flex flex-col"}>
                    <div>
                      <h1 className="text-24px font-bold">{groupData.name}</h1>
                    </div>
                    <div className="flex">
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
                  <div className="flex justify-end">
                    {groupData.role_on_group === "ADMIN" ||
                    groupData.role_on_group === "MODERATOR" ? (
                      <>
                        <Link href={`/group/${groupData.id}/dashboard`}>
                          <a className={"w-full"}>
                            <Button
                              className={
                                "rounded-[8px] w-[147px] h-[36px]  text-caak-generalblack shadow-none mr-2"
                              }
                              skin={"bg-caak-titaniumwhite"}
                              iconPosition={"left"}
                              icon={
                                <div
                                  className={
                                    "flex items-center justify-center w-[20px] h-[20px] mr-[8px]"
                                  }
                                >
                                  <span
                                    className={
                                      "icon-fi-rs-pie-chart text-caak-generalblack  text-[19px]"
                                    }
                                  />
                                </div>
                              }
                            >
                              Дашбоард
                            </Button>
                          </a>
                        </Link>
                        <Link href={`/group/${groupData.id}/settings`}>
                          <a className={"w-full"}>
                            <Button
                              className={
                                "rounded-[8px] w-[147px] h-[36px]  text-white shadow-none"
                              }
                              skin={"bg-caak-cardinal"}
                              iconPosition={"left"}
                              icon={
                                <div
                                  className={
                                    "flex items-center justify-center w-[20px] h-[20px] mr-[8px]"
                                  }
                                >
                                  <span
                                    className={
                                      "icon-fi-rs-settings-f text-white text-[19px]"
                                    }
                                  />
                                </div>
                              }
                            >
                              Тохиргоо
                            </Button>
                          </a>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Button
                          loading={loading}
                          className="h-[36px] w-[124px] rounded-lg text-caak-generalblack text-base font-medium font-inter"
                          icon={
                            <span className="icon-fi-rs-add-group-f  mr-1" />
                          }
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
                    )}
                    <div
                      ref={menuRef}
                      onClick={toggleMenu}
                      className={`flex justify-center flex-shrink-0 ml-3 w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-titaniumwhite rounded-full`}
                    >
                      <span className="icon-fi-rs-dots text-22px" />
                      <DropDown
                        open={isMenuOpen}
                        onToggle={toggleMenu}
                        content={
                          <GroupMoreMenu />
                          // <PostMoreMenu
                          //   groupId={groupData.id}
                          //   postId={post.id}
                          //   postUser={post.user}
                          // />
                        }
                        className={"top-[36px] -right-0"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "feedLayoutContainer flex-col max-w-[966px] w-full mx-auto"
          }
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
              <GroupInfo groupData={groupData} totalMember={totalMember} />

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
                containerClassname={
                  "mt-[16px] bg-white rounded-square p-[20px]"
                }
              />

              {!isLogged && <FooterSidebar />}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default GroupLayout;
