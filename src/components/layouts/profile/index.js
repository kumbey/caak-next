import {
  getFileUrl,
  getGenderImage,
  getURLUserName,
  kFormatter,
} from "../../../utility/Util";
import Button from "../../button";
import SideBarGroups from "../../card/SideBarGroups";
import { useUser } from "../../../context/userContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "../../../graphql-custom/user/mutation";
import AuraModal from "../../modals/auraModal";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import userVerifiedSvg from "../../../../public/assets/images/fi-rs-awarded.svg";
import UploadCoverImageModal from "../../modals/uploadCoverImageModal";
import UploadProfileImageModal from "../../modals/uploadProfileImageModal";

const DefaultUserProfileLayout = ({ user, children }) => {
  const [isAuraModalOpen, setIsAuraModalOpen] = useState(false);
  const router = useRouter();
  const userId = router.query.userId;
  const { user: signedUser, isLogged } = useUser();

  const [doRender, setDoRender] = useState(0);
  const [isCoverUploadModalOpen, setIsCoverUploadModalOpen] = useState(false);
  const [isProfileUploadModalOpen, setIsProfileUploadModalOpen] =
    useState(false);

  const meta = JSON.parse(user?.meta);
  const [loading, setLoading] = useState(false);

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
            prevPath: router.asPath,
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
          followed_user_id: signedUser.id,
          user_id: user.id,
          id: `${user.id}#${signedUser.id}`,
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
          id: `${user.id}#${signedUser.id}`,
        },
      },
    });
    user.totals.followers -= 1;
    user.followed = false;
    setDoRender(doRender + 1);
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return loading ? (
    <>
      <div className={"flex flex-col"}>
        <AuraModal setIsOpen={setIsAuraModalOpen} isOpen={isAuraModalOpen} />
        {isCoverUploadModalOpen && (
          <UploadCoverImageModal
            groupData={user}
            type={"USER"}
            setIsOpen={setIsCoverUploadModalOpen}
          />
        )}
        {isProfileUploadModalOpen && (
          <UploadProfileImageModal
            groupData={user}
            type={"USER"}
            setIsOpen={setIsProfileUploadModalOpen}
          />
        )}

        <div className={"relative w-full h-[240px]"}>
          <div className={"w-full h-[120px] navbarGradient absolute top-0"} />
          <img
            alt={user?.cover_pic?.name}
            className={"object-cover w-full h-full"}
            src={
              user?.cover_pic
                ? getFileUrl(user?.cover_pic)
                : getGenderImage("default").src
            }
          />
          {isLogged && user?.id === signedUser?.id && (
            <div
              onClick={() => setIsCoverUploadModalOpen(true)}
              className={
                "cursor-pointer h-[32px] px-[12px] font-medium py-[8px] flex flex-row items-center justify-center absolute right-[10px] md:right-[40px] bottom-[10px] md:bottom-[20px] rounded-square bg-caak-liquidnitrogen"
              }
            >
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
                <p className={"text-[14px] text-caak-generalblack ml-[7px]"}>
                  ??????????
                </p>
              </>
            </div>
          )}
        </div>
        <div
          className={
            "profileLayoutContainer flex-col md:flex-row relative z-[2]"
          }
        >
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
                <img
                  className={"rounded-full object-cover w-full h-full"}
                  alt={"user profile"}
                  src={
                    user?.pic
                      ? getFileUrl(user?.pic)
                      : getGenderImage(user.gender).src
                  }
                />
                {isLogged && user.id === signedUser?.id && (
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
                    <img
                      alt={""}
                      className={"w-[16.5px] h-[14.25px] object-contain"}
                      height={14.25}
                      width={16.5}
                      src={userVerifiedSvg.src}
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
                      "text-caak-generalblack font-semibold text-center text-[16px] tracking-[0.24px] leading-[19px]"
                    }
                  >
                    {kFormatter(user?.aura)}
                  </p>
                  <p
                    className={
                      "text-caak-darkBlue text-[14px] tracking-[0.21px] leading-[16px] mt-[4px]"
                    }
                  >
                    ????????
                  </p>
                </div>
                <div className={"flex flex-col"}>
                  <p
                    className={
                      "text-caak-generalblack font-semibold text-center text-[16px] tracking-[0.24px] leading-[19px]"
                    }
                  >
                    {user?.totals?.followers}
                  </p>
                  <p
                    className={
                      "text-caak-darkBlue text-[14px] tracking-[0.21px] leading-[16px] mt-[4px]"
                    }
                  >
                    ????????????????
                  </p>
                </div>
                <div className={"flex flex-col"}>
                  <p
                    className={
                      "text-caak-generalblack font-semibold text-center text-[16px] tracking-[0.24px] leading-[19px]"
                    }
                  >
                    {kFormatter(user?.totals?.confirmed)}
                  </p>
                  <p
                    className={
                      "text-caak-darkBlue text-[14px] tracking-[0.21px] leading-[16px] mt-[4px]"
                    }
                  >
                    ????????
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
                          ????????????????
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
                          ????????????????
                        </Button>
                      </a>
                    </Link>
                  </>
                ) : (
                  <Button
                    className={`${
                      user.followed
                        ? "text-gray-400 border-gray-400 bg-caak-titaniumwhite"
                        : "text-white border-caak-primary"
                    } rounded-[100px] h-[44px] shadow-none`}
                    onClick={() => handleClick()}
                    skin={"primary"}
                    iconPosition={"left"}
                    icon={
                      <div
                        className={`flex items-center justify-center w-[20px] h-[20px] mr-[8px] `}
                      >
                        <span
                          className={`${
                            user.followed ? "text-gray-400" : "text-white"
                          } icon-fi-rs-thick-add-friend text-[16px]`}
                        />
                      </div>
                    }
                  >
                    {user?.followed ? "??????????????" : "??????????"}
                  </Button>
                )}
              </div>

              {/*Social addresses*/}
              <div className={"flex flex-col w-full"}>
                {meta?.facebook && (
                  <a
                    rel={"noreferrer"}
                    href={
                      getURLUserName(meta.facebook, "CHECK")
                        ? meta.facebook
                        : `https://www.facebook.com/${meta.facebook}`
                    }
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
                            "icon-fi-rs-facebook path1  rounded-full text-[22px]"
                          }
                        />
                      </div>
                      <p
                        className={
                          "ml-[8px] text-caak-generalblack text-[15px] font-medium tracking-[0.23px] leading-[18px]"
                        }
                      >
                        {getURLUserName(meta.facebook, "CHECK")
                          ? getURLUserName(meta.facebook)
                          : meta.facebook}
                      </p>
                    </div>
                  </a>
                )}
                {meta?.twitter && (
                  <a
                    rel={"noreferrer"}
                    href={
                      getURLUserName(meta.twitter, "CHECK")
                        ? meta.twitter
                        : `https://www.twitter.com/${meta.twitter}`
                    }
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
                        {getURLUserName(meta.twitter, "CHECK")
                          ? getURLUserName(meta.twitter)
                          : meta.twitter}
                      </p>
                    </div>
                  </a>
                )}
                {meta?.instagram && (
                  <a
                    rel={"noreferrer"}
                    href={
                      getURLUserName(meta.instagram, "CHECK")
                        ? meta.instagram
                        : `https://www.instagram.com/${meta.instagram}`
                    }
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
                        {getURLUserName(meta.instagram, "CHECK")
                          ? getURLUserName(meta.instagram)
                          : meta.instagram}
                      </p>
                    </div>
                  </a>
                )}
                {meta?.tiktok && (
                  <a
                    rel={"noreferrer"}
                    href={
                      getURLUserName(meta.tiktok, "CHECK")
                        ? meta.tiktok
                        : `https://www.tiktok.com/${meta.tiktok}`
                    }
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
                        {getURLUserName(meta.tiktok, "CHECK")
                          ? getURLUserName(meta.tiktok)
                          : meta.tiktok}
                      </p>
                    </div>
                  </a>
                )}
              </div>
              {/* <div className={"w-full my-[20px]"}>
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
              </div> */}
              <div className={"hidden md:block overflow-y-auto w-full"}>
                {meta?.settings?.showCreatedGroup ? (
                  // && user.id === signedUser?.id
                  <SideBarGroups
                    authMode={"AWS_IAM"}
                    role={["ADMIN", "MODERATOR"]}
                    userId={user.id}
                    maxColumns={13}
                    title={"???????????????? ????????????????"}
                    setIsAuraModalOpen={setIsAuraModalOpen}
                  />
                ) : null}
              </div>
              <div className={"hidden md:block overflow-y-auto w-full"}>
                {meta?.settings?.showFollowedGroup ? (
                  // && user.id === signedUser?.id
                  <SideBarGroups
                    authMode={"AWS_IAM"}
                    role={["MEMBER"]}
                    userId={user.id}
                    maxColumns={13}
                    title={"?????????????? ????????????????"}
                    setIsAuraModalOpen={setIsAuraModalOpen}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div
            className={
              "profileLayoutPosts relative justify-center top-[-74px] sm:top-0 mt-[10px] ml-0 md:ml-[40px]"
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
