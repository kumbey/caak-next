import Image from "next/image";
import {getFileExt, getFileName, getFileUrl, getGenderImage,} from "../../../utility/Util";
import Button from "../../button";
import SideBarGroups from "../../card/SideBarGroups";
import {useUser} from "../../../context/userContext";
import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import {createFollowedUsers, deleteFollowedUsers, updateUser,} from "../../../graphql-custom/user/mutation";
import {ApiFileUpload} from "../../../utility/ApiHelper";

import awsExports from "../../../aws-exports";
import Dropzone from "react-dropzone";
import {API, graphqlOperation} from "aws-amplify";
import {deleteFile} from "../../../graphql-custom/file/mutation";
import Loader from "../../loader";
import {useRouter} from "next/router";
import userVerifiedSvg from "../../../../public/assets/images/fi-rs-awarded.svg";

const DefaultUserProfileLayout = ({user, children}) => {
  const router = useRouter();
  const userId = router.query.userId;
  const {user: signedUser, isLogged} = useUser();
  const [doRender, setDoRender] = useState(0);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

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
  const [loading, setLoading] = useState(false);

  const updateImage = async ({ type, array, setArray, user, signedUser }) => {
    try {
      const resp = await ApiFileUpload(array);
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            ...(type === "cover"
              ? { cover_pic_id: resp.id }
              : { pic_id: resp.id }),
          },
        })
      );
      if (user.cover_pic_id)
        await API.graphql(
          graphqlOperation(deleteFile, {
            input: {
              ...(type === "cover"
                ? { id: user.cover_pic_id }
                : { id: user.pic_id }),
            },
          })
        );
      if (type === "cover") {
        signedUser.cover_pic = resp;
        user.cover_pic = resp;
      } else {
        signedUser.pic = resp;
        user.pic = resp;
      }
      setArray({});
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleClick = () => {
    if (isLogged) {
      if (!user.followed) {
        createFollowUser();
      } else if (user.followed) {
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
            prevPath: router.asPath
          },
        },
        `/signInUp/signIn`,
        { shallow: true, scroll: false }
      );
    }
  };

  const createFollowUser = async () => {
    await API.graphql({
      query: createFollowedUsers,
      variables: {
        input: {
          followed_user_id: user.id,
          user_id: user.id,
          id: `${user.id}#${user.id}`,
        },
      },
    });
    user.totals.followers += 1;
    user.followed = true;
    setDoRender(doRender + 1);
  };

  const deleteFollowUser = async () => {
    await API.graphql({
      query: deleteFollowedUsers,
      variables: {
        input: {
          id: `${user.id}#${user.id}`,
        },
      },
    });
    user.totals.followers -= 1;
    user.followed = false;
    setDoRender(doRender + 1);
  };

  useEffect(() => {
    if (coverPictureDropZone.name) {
      setUploadingCover(true);
      updateImage({
        type: "cover",
        array: coverPictureDropZone,
        setArray: setCoverPictureDropZone,
        user,
        signedUser,
      }).then(() => {
        setUploadingCover(false);
      });
    }

    // eslint-disable-next-line
  }, [coverPictureDropZone]);

  useEffect(() => {
    if (profilePictureDropZone.name) {
      setUploadingProfile(true);
      updateImage({
        type: "profile",
        array: profilePictureDropZone,
        setArray: setProfilePictureDropZone,
        user,
        signedUser,
      }).then(() => {
        setUploadingProfile(false);
      });
    }

    // eslint-disable-next-line
  }, [profilePictureDropZone]);

  useEffect(() => {
    setLoading(true);
  }, []);

  return loading ? (
    <>
      <div className={"flex flex-col"}>
        <div className={"relative w-full h-[240px]"}>
          {uploadingCover && (
            <div
              className={
                "flex items-center justify-center absolute top-0 bg-white w-full h-full z-[1]"
              }
            >
              <Loader
                containerClassName={"w-full"}
                className={`bg-caak-primary`}
              />
            </div>
          )}
          <div className={"w-full h-[120px] navbarGradient absolute top-0"} />
          <Image
            priority={true}
            quality={100}
            layout={"fill"}
            objectFit={"cover"}
            alt={user?.cover_pic?.name}
            src={
              user?.cover_pic
                ? getFileUrl(user?.cover_pic)
                : getGenderImage("default")
            }
          />
          {isLogged && user?.id === signedUser?.id && (
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
                    "cursor-pointer h-[32px] px-[12px] font-medium py-[8px] flex flex-row items-center justify-center absolute right-[10px] md:right-[40px] bottom-[10px] md:bottom-[20px] rounded-square bg-caak-liquidnitrogen"
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
                      className={"text-[14px] text-caak-generalblack ml-[7px]"}
                    >
                      Хадгалж байна
                    </p>
                  )}
                </div>
              )}
            </Dropzone>
          )}
        </div>
        <div
          className={
            "profileLayoutContainer flex-col md:flex-row relative z-[2]"
          }
        >
          {/*Profile badges*/}
          {/*<div*/}
          {/*  className={*/}
          {/*    "hidden md:flex flex-row items-center h-[50px] bg-white rounded-[100px] py-[8px] px-[24px] bg-white absolute userProfileBadge"*/}
          {/*  }*/}
          {/*>*/}
          {/*  <p className={"text-caak-extraBlack text-[15px] font-medium"}>*/}
          {/*    Шагналууд*/}
          {/*  </p>*/}
          {/*  <div className={"ml-[12px] flex flex-row"}>*/}
          {/*    <div*/}
          {/*      className={*/}
          {/*        "flex items-center justify-center w-[34px] h-[34px] ml-[6px]"*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <span className={"icon-fi-rs-triangle text-[34px]"} />*/}
          {/*    </div>*/}
          {/*    <div*/}
          {/*      className={*/}
          {/*        "flex items-center justify-center w-[34px] h-[34px] ml-[6px]"*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <span className={"icon-fi-rs-triangle text-[34px]"} />*/}
          {/*    </div>*/}
          {/*    <div*/}
          {/*      className={*/}
          {/*        "flex items-center justify-center w-[34px] h-[34px] ml-[6px]"*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <span className={"icon-fi-rs-triangle text-[34px]"} />*/}
          {/*    </div>*/}
          {/*    <div*/}
          {/*      className={*/}
          {/*        "flex items-center justify-center w-[34px] h-[34px] ml-[6px]"*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <span className={"icon-fi-rs-triangle text-[34px]"} />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className={"profileLayoutLeftSideBar relative"}>
            <div
              className={
                "flex flex-col w-full items-center relative top-[-74px]"
              }
            >
              <div
                className={
                  "w-[148px] h-[148px] relative rounded-full border-[7px] border-caak-liquidnitrogen bg-white"
                }
              >
                {uploadingProfile && (
                  <div
                    className={
                      "flex items-center justify-center w-full h-full bg-white absolute top-0 rounded-full z-[1] bg-opacity-80"
                    }
                  >
                    <Loader
                      containerClassName={"w-full"}
                      className={`bg-caak-primary`}
                    />
                  </div>
                )}

                <Image
                  className={"rounded-full"}
                  alt={"user profile"}
                  layout={"fill"}
                  objectFit={"cover"}
                  src={
                    user?.pic
                      ? getFileUrl(user?.pic)
                      : getGenderImage(user.gender).src
                  }
                />
                {isLogged && user.id === signedUser.id && !uploadingProfile && (
                  <Dropzone
                    onDropRejected={(e) => console.log(e[0].errors[0].message)}
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
              <div className={"flex flex-row items-center"}>
                <p
                  className={
                    "text-caak-extraBlack text-[18px] font-semibold my-[8px]"
                  }
                >
                  @{user?.nickname}
                </p>
                {user?.verified && (
                  <div
                    className={
                      "w-[18px] h-[18px] flex items-center justify-center ml-[5px]"
                    }
                  >
                    <Image
                      alt={""}
                      height={14.25}
                      width={16.5}
                      quality={100}
                      priority={true}
                      src={userVerifiedSvg}
                    />
                  </div>
                )}
              </div>

              <p className={"text-caak-generalblack text-[15px] my-[4px]"}>
                {user?.about}
              </p>
              {/*Aura, followers, post*/}
              <div
                className={
                  "flex flex-row w-full justify-between my-[20px] px-[18px]"
                }
              >
                <div className={"flex flex-col"}>
                  <p
                    className={
                      "text-caak-generalblack font-semibold text-[16px] tracking-[0.24px] leading-[19px]"
                    }
                  >
                    {user?.aura}
                  </p>
                  <p
                    className={
                      "text-caak-darkBlue text-[14px] tracking-[0.21px] leading-[16px] mt-[4px]"
                    }
                  >
                    Аура
                  </p>
                </div>
                <div className={"flex flex-col"}>
                  <p
                    className={
                      "text-caak-generalblack font-semibold text-[16px] tracking-[0.24px] leading-[19px]"
                    }
                  >
                    {user?.totals?.followers}
                  </p>
                  <p
                    className={
                      "text-caak-darkBlue text-[14px] tracking-[0.21px] leading-[16px] mt-[4px]"
                    }
                  >
                    Дагагчид
                  </p>
                </div>
                <div className={"flex flex-col"}>
                  <p
                    className={
                      "text-caak-generalblack font-semibold text-[16px] tracking-[0.24px] leading-[19px]"
                    }
                  >
                    {user?.totals?.confirmed}
                  </p>
                  <p
                    className={
                      "text-caak-darkBlue text-[14px] tracking-[0.21px] leading-[16px] mt-[4px]"
                    }
                  >
                    Пост
                  </p>
                </div>
              </div>

              {/*  Dashboard, Settings*/}

              <div
                className={
                  "flex flex-col w-full text-[16px] font-medium tracking-[0.24px] leading-[19px] mb-[20px]"
                }
              >
                {signedUser?.id === userId ? (
                  <>
                    <Link href={`/user/${userId}/settings`}>
                      <a className={"w-full"}>
                        <Button
                          className={
                            "rounded-[100px] w-full h-[44px] shadow-none"
                          }
                          skin={"primary"}
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
                    <Link href={`/user/${userId}/dashboard`}>
                      <a className={"w-full"}>
                        <Button
                          className={
                            "bg-caak-pinkmirage shadow-none border-[1px] border-caak-lightmaidensblush w-full rounded-[100px] h-[44px] mt-[10px] text-caak-primary"
                          }
                          skin={"primary"}
                          iconPosition={"left"}
                          icon={
                            <div
                              className={
                                "flex items-center justify-center w-[20px] h-[20px] mr-[8px]"
                              }
                            >
                              <span
                                className={
                                  "icon-fi-rs-pie-chart text-caak-primary text-[17px]"
                                }
                              />
                            </div>
                          }
                        >
                          Дашбоард
                        </Button>
                      </a>
                    </Link>
                  </>
                ) : (
                  <Button
                    className={"rounded-[100px] h-[44px] shadow-none"}
                    onClick={() => handleClick()}
                    skin={"primary"}
                    iconPosition={"left"}
                    icon={
                      <div
                        className={
                          "flex items-center justify-center w-[20px] h-[20px] mr-[8px]"
                        }
                      >
                        <span
                          className={
                            "icon-fi-rs-thick-add-friend text-white text-[16px]"
                          }
                        />
                      </div>
                    }
                  >
                    {user?.followed ? "Дагасан" : "Дагах"}
                  </Button>
                )}
              </div>

              {/*Social addresses*/}
              <div className={"flex flex-col w-full"}>
                {JSON.parse(user?.meta)?.facebook && (
                  <a
                    rel={"noreferrer"}
                    href={`https://www.facebook.com/${
                      JSON.parse(user?.meta).facebook
                    }`}
                    target="_blank"
                  >
                    <div
                      className={
                        "flex flex-row items-center mb-[10px] cursor-pointer"
                      }
                    >
                      <div
                        className={
                          "flex items-center justify-start w-[24px] h-[24px]"
                        }
                      >
                        <span
                          className={
                            "icon-fi-rs-facebook path1 bg-caak-generalblack rounded-full text-[22px]"
                          }
                        />
                      </div>
                      <p
                        className={
                          "ml-[8px] text-caak-generalblack text-[15px] font-medium tracking-[0.23px] leading-[18px]"
                        }
                      >
                        {JSON.parse(user?.meta).facebook}
                      </p>
                    </div>
                  </a>
                )}
                {JSON.parse(user?.meta)?.twitter && (
                  <a
                    rel={"noreferrer"}
                    href={`https://www.twitter.com/${
                      JSON.parse(user?.meta).twitter
                    }`}
                    target="_blank"
                  >
                    <div className={"flex flex-row items-center mb-[10px]"}>
                      <div
                        className={
                          "flex items-center justify-start w-[24px] h-[24px]"
                        }
                      >
                        <span
                          className={
                            "icon-fi-rs-twitter text-caak-generalblack text-[22px]"
                          }
                        />
                      </div>
                      <p
                        className={
                          "ml-[8px] text-caak-generalblack text-[15px] font-medium tracking-[0.23px] leading-[18px]"
                        }
                      >
                        {JSON.parse(user?.meta).twitter}
                      </p>
                    </div>
                  </a>
                )}
                {JSON.parse(user?.meta)?.instagram && (
                  <a
                    rel={"noreferrer"}
                    href={`https://www.instagram.com/${
                      JSON.parse(user?.meta).instagram
                    }`}
                    target="_blank"
                  >
                    <div className={"flex flex-row items-center mb-[10px]"}>
                      <div
                        className={
                          "flex items-center justify-start w-[24px] h-[24px]"
                        }
                      >
                        <span
                          className={
                            "icon-fi-rs-ig text-caak-generalblack text-[20px]"
                          }
                        />
                      </div>
                      <p
                        className={
                          "ml-[8px] text-caak-generalblack text-[15px] font-medium tracking-[0.23px] leading-[18px]"
                        }
                      >
                        {JSON.parse(user?.meta).instagram}
                      </p>
                    </div>
                  </a>
                )}
                {JSON.parse(user?.meta)?.tiktok && (
                  <a
                    rel={"noreferrer"}
                    href={`https://www.tiktok.com/@${
                      JSON.parse(user?.meta).tiktok
                    }`}
                    target="_blank"
                  >
                    <div className={"flex flex-row items-center"}>
                      <div
                        className={
                          "flex items-center justify-start w-[24px] h-[24px]"
                        }
                      >
                        <span
                          className={
                            "icon-fi-rs-tiktok text-caak-generalblack text-[20px]"
                          }
                        />
                      </div>
                      <p
                        className={
                          "ml-[8px] text-caak-generalblack text-[15px] font-medium tracking-[0.23px] leading-[18px]"
                        }
                      >
                        {JSON.parse(user?.meta).tiktok}
                      </p>
                    </div>
                  </a>
                )}
              </div>
              <div className={"w-full my-[20px]"}>
                <div
                  className={
                    "flex items-center justify-center w-[35px] h-[35px] rounded-full hover:bg-caak-titaniumwhite"
                  }
                >
                  <span
                    className={
                      "icon-fi-rs-dots text-caak-generalblack text-[20px]"
                    }
                  />
                </div>
              </div>
              <div className={"hidden md:block h-screen overflow-y-auto"}>
                <SideBarGroups
                  role={["ADMIN", "MODERATOR"]}
                  userId={user.id}
                  title={"Группүүд"}
                />
              </div>
            </div>
          </div>
          <div
            className={
              "profileLayoutPosts relative top-[-74px] sm:top-0 mt-[10px] ml-0 md:ml-[40px]"
            }
          >
            {children}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default DefaultUserProfileLayout;
