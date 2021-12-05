import Image from "next/image";
import { getFileUrl } from "../../../utility/Util";
import Button from "../../button";
import SideBarGroups from "../../card/SideBarGroups";
import { useUser } from "../../../context/userContext";
import Link from "next/link";

const DefaultUserProfileLayout = ({ user, children }) => {
  const { user: signedUser } = useUser();

  return (
    <div className={"flex flex-col"}>
      <div className={"relative w-full h-[240px]"}>
        <Image
          layout={"fill"}
          alt={user?.cover_pic?.name}
          src={
            user.cover_pic
              ? getFileUrl(user.cover_pic.file)
              : "https://picsum.photos/1920/240"
          }
        />
      </div>
      <div className={"profileLayoutContainer relative"}>
        <div
          className={
            "flex flex-row items-center h-[50px] bg-white rounded-[100px] py-[8px] px-[24px] bg-white absolute userProfileBadge"
          }
        >
          <p className={"text-caak-extraBlack text-[15px] font-medium"}>
            Цолнууд
          </p>
          <div className={"ml-[12px] flex flex-row"}>
            <div
              className={
                "flex items-center justify-center w-[34px] h-[34px] ml-[6px]"
              }
            >
              <span className={"icon-fi-rs-triangle text-[34px]"} />
            </div>
            <div
              className={
                "flex items-center justify-center w-[34px] h-[34px] ml-[6px]"
              }
            >
              <span className={"icon-fi-rs-triangle text-[34px]"} />
            </div>
            <div
              className={
                "flex items-center justify-center w-[34px] h-[34px] ml-[6px]"
              }
            >
              <span className={"icon-fi-rs-triangle text-[34px]"} />
            </div>
            <div
              className={
                "flex items-center justify-center w-[34px] h-[34px] ml-[6px]"
              }
            >
              <span className={"icon-fi-rs-triangle text-[34px]"} />
            </div>
          </div>
        </div>
        <div className={"profileLayoutLeftSideBar relative"}>
          <div className={"flex flex-col items-center absolute top-[-74px]"}>
            <div
              className={
                "w-[148px] h-[148px] relative rounded-full border-[7px] border-caak-liquidnitrogen"
              }
            >
              <Image
                className={"rounded-full"}
                alt={"user profile"}
                layout={"fill"}
                src={
                  user.pic
                    ? getFileUrl(user.pic.file)
                    : "https://picsum.photos/200"
                }
              />
              {signedUser.id === user.id && (
                <div
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
                @{user.nickname}
              </p>
              {user.verified && (
                <div
                  className={
                    "w-[18px] h-[18px] flex items-center justify-center ml-[5px]"
                  }
                >
                  <span className={"icon-fi-rs-verified text-[16px]"} />
                </div>
              )}
            </div>

            <p className={"text-caak-generalblack text-[15px] my-[4px]"}>
              {user.about}
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
                  {user.aura}
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
                  {user.totals.followers}
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
                  {user.totals.confirmed}
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
              {signedUser.id === user.id ? (
                <>
                  <Link href={`/user/${user.id}/settings`}>
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
                  <Link href={`/user/${user.id}/dashboard`}>
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
                  Дагах
                </Button>
              )}
            </div>

            {/*Social addresses*/}
            <div className={"flex flex-col w-full"}>
              <div className={"flex flex-row items-center mb-[10px]"}>
                <div
                  className={
                    "flex items-center justify-start w-[24px] h-[24px]"
                  }
                >
                  <span
                    className={
                      "icon-fi-rs-facebook path2 text-caak-generalblack text-[22px]"
                    }
                  />
                </div>
                <p
                  className={
                    "ml-[8px] text-caak-generalblack text-[15px] font-medium tracking-[0.23px] leading-[18px]"
                  }
                >
                  undercoverosh
                </p>
              </div>
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
                  chewyu
                </p>
              </div>
              <div className={"flex flex-row items-center"}>
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
                  chewyu
                </p>
              </div>
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
            <div
              className={
                "border-t-[1px] border-b-[1px] border-caak-titaniumwhite py-[18px]"
              }
            >
              <SideBarGroups
                role={"ADMIN"}
                maxColumns={3}
                userId={user.id}
                // initialData={adminModeratorGroups}
                title={"Үүсгэсэн группүүд"}
              />
            </div>
          </div>
        </div>
        <div className={"profileLayoutPosts ml-[40px]"}>{children}</div>
      </div>
    </div>
  );
};

export default DefaultUserProfileLayout;
