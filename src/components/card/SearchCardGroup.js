import { useState } from "react";
import Button from "../button";
import { getFileUrl, getGenderImage } from "../../utility/Util";
import { API, graphqlOperation } from "aws-amplify";
import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../graphql-custom/GroupUsers/mutation";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import groupVerifiedSvg from "../../../public/assets/images/fi-rs-verify.svg";
import DropDown from "../navigation/DropDown";
import { useClickOutSide } from "../../utility/Util";
import ReportModal from "../modals/reportModal";
import GroupMoreMenu from "./GroupMoreMenu";
import Link from "next/link";

const SearchCardGroup = ({ result, sortType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, isLogged } = useUser();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  const followGroup = async () => {
    try {
      setLoading(true);
      if (result.followed) {
        await API.graphql(
          graphqlOperation(deleteGroupUsers, {
            input: {
              id: `${result.id}#${user.id}`,
            },
          })
        );
        result.followed = false;
        result.totals.member -= 1;
        setForceRender(forceRender + 1);
      } else {
        await API.graphql(
          graphqlOperation(createGroupUsers, {
            input: {
              id: `${result.id}#${user.id}`,
              group_id: result.id,
              user_id: user.id,
              role: "MEMBER",
            },
          })
        );
        result.followed = true;
        result.totals.member += 1;
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

  return sortType !== "DEFAULT" ? (
    <div
      className={
        "bg-white flex flex-col w-full rounded-square relative"
      }
    >
      {isLogged && (
        <ReportModal
          setIsOpen={setIsReportModalOpen}
          isOpen={isReportModalOpen}
          userId={user.id}
        />
      )}
      <div className={"w-full h-[74px]"}>
        {/* <div
          className={
            "flex flex-row items-center absolute top-[10px] right-[10px] z-[1]"
          }
        >
          <div
            ref={menuRef}
            onClick={toggleMenu}
            className={`flex justify-center mr-[5px] flex-shrink-0 w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative hover:bg-caak-liquidnitrogen rounded-full`}
          >
            <span className="icon-fi-rs-dots text-22px" />
            <DropDown
              arrow={"topRight"}
              open={isMenuOpen}
              onToggle={toggleMenu}
              content={<GroupMoreMenu setIsOpen={setIsReportModalOpen} />}
              className={"top-6 -right-3"}
            />
          </div>
        </div> */}
        <div className={"relative w-full h-full"}>
          <img
            className={"rounded-t-square object-cover w-full h-[74px]"}
            alt={""}
            src={
              result.cover
                ? getFileUrl(result.cover)
                : getGenderImage("default").src
            }
            width={300}
            height={58}
          />
        </div>
      </div>
      <div className={"flex flex-col w-full px-[16px]"}>
        <Link href={`/group/${result.id}`}>
          <a>
            <div className={"absolute top-[36px]"}>
              <div
                className={
                  "relative flex-shrink-0 w-[58px] h-[58px] border-[3px] border-white rounded-square"
                }
              >
                <img
                  className={"rounded-square object-cover w-full h-full"}
                  src={
                    result.profile
                      ? getFileUrl(result.profile)
                      : getGenderImage("default").src
                  }
                  alt={""}
                  width={58}
                  height={58}
                  // objectFit={"cover"}
                />
              </div>
            </div>
          </a>
        </Link>
        <div className={"flex flex-col mt-[20px]"}>
          <div className={"mt-[12px] flex flex-row items-center"}>
            <Link href={`/group/${result.id}`}>
              <a>
                <p
                  className={
                    "text-[16px] truncate-3 font-semibold text-caak-generalblack"
                  }
                >
                  {result.name}
                  {result.verified && (
                    <img
                      alt={""}
                      height={14.25}
                      width={16.5}
                      // quality={100}
                      // priority={true}
                      src={groupVerifiedSvg}
                    />
                  )}
                </p>
              </a>
            </Link>
          </div>
          <div className={"flex flex-row mt-[12px]"}>
            <div className={"flex flex-row items-center"}>
              <p className={"font-medium text-caak-generalblack text-[17px]"}>
                {result.aura ? result.aura : 0}
              </p>
              <p className={"text-[14px] text-caak-darkBlue ml-[5px]"}>Аура</p>
            </div>
            <div className={"flex flex-row items-center ml-[24px]"}>
              <p className={"font-medium text-caak-generalblack text-[17px]"}>
                {result.totals.member}
              </p>
              <p className={"text-[14px] text-caak-darkBlue ml-[5px]"}>
                Гишүүн
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "flex flex-row text-caak-darkBlue items-center px-[16px]"
        }
      >
        <div className={"flex justify-center items-center w-[16px] h-[16px]"}>
          <span className={"icon-fi-rs-globe text-[14px]"} />
        </div>
        <div className={"ml-[4px]"}>
          <p className={"text-[14px]"}>Нээлттэй групп</p>
        </div>
      </div>
      <Button
        onClick={handleFollow}
        iconPosition={"left"}
        loading={loading}
        className={`${result.followed ? 'bg-[#FF6600] text-white' : 'bg-[#E4E4E5] text-[#21293C]'} h-[36px] rounded-[6px] m-[16px] w-[248px] uppercase font-semibold text-[12px] tracking-[0.18px] leading-[15px]`}
      >
        {result.followed ? `Нэгдсэн` : `Нэгдэх`}
      </Button>
    </div>
  ) : (
    <div
      className={
        "flex flex-row bg-white shadow-card rounded-square mb-[20px] p-[16px] h-[90px] justify-between"
      }
    >
      <div className={"flex flex-row"}>
        <div className={"w-[60px] h-[60px] rounded-full bg-red-200"}>
          <img
            className={"rounded-square object-cover"}
            width={60}
            height={60}
            // objectFit={"cover"}
            alt={"sda"}
            src={getFileUrl(result.profile)}
          />
        </div>
        <div className={"flex flex-col justify-evenly ml-[10px]"}>
          <p
            className={
              "text-caak-generalblack text-[17px] tracking-[0.26px] leading-[19px] font-medium"
            }
          >
            {result.name}
          </p>
          <div
            className={
              "flex flex-row text-darkblue text-[14px] tracking-[0.21px] leading-[17px]"
            }
          >
            <div className={"flex flex-row items-center text-caak-"}>
              <div className={"flex items-center  w-[14px] h-[14px]"}>
                <span className={"icon-fi-rs-globe text-[13px]"} />
              </div>
              <p className={"ml-[5px] text-14px"}>Нээлттэй групп</p>
              <p className={"ml-[14px]"}>{result.totals.member} гишүүн</p>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex flex-row items-center"}>
        <div
          className={
            "flex items-center rounded-full justify-center w-[40px] h-[40px] bg-caak-liquidnitrogen"
          }
        >
          <span
            className={`icon-fi-rs-add-group-f text-caak-generalblack-f text-[16px]`}
          />
        </div>
        <div
          className={
            "ml-[10px] flex items-center justify-center w-[35px] h-[35px] flex-shrink-0 w-[35px] h-[35px] transition ease-linear duration-100 cursor-pointer relative hover:bg-caak-liquidnitrogen rounded-full"
          }
        >
          <span className="icon-fi-rs-dots text-22px" />
        </div>
      </div>
    </div>
  );
};

export default SearchCardGroup;
