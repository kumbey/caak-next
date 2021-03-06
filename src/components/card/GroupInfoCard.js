import Image from "next/image";
import Divider from "../divider";
import { API, graphqlOperation } from "aws-amplify";
import { getGroupCard } from "../../graphql-custom/group/queries";
import {
  extractDate,
  generateFileUrl,
  getReturnData,
  kFormatter,
} from "../../utility/Util";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "../../context/userContext";
import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../graphql-custom/GroupUsers/mutation";
import { useRouter } from "next/router";
import groupVerifiedSvg from "../../../public/assets/images/fi-rs-verify.svg";
import LeaveGroup from "../group/LeaveGroup";

const GroupInfoCard = ({ groupId, containerClassname }) => {
  const [group, setGroup] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(true);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const [open, setOpen] = useState(false);

  const { isLogged, user } = useUser();
  const router = useRouter();

  const followGroup = async () => {
    try {
      if (isLogged) {
        setLoading(true);
        if (group.followed) {
          setOpen(true);
          // await API.graphql(
          //   graphqlOperation(deleteGroupUsers, {
          //     input: {
          //       id: `${group.id}#${user.id}`,
          //     },
          //   })
          // );
          // group.followed = false;
          // group.totals.member -= 1;
          // setForceRender(forceRender + 1);
        } else {
          await API.graphql(
            graphqlOperation(createGroupUsers, {
              input: {
                id: `${group.id}#${user.id}`,
                group_id: group.id,
                user_id: user.id,
                role: "MEMBER",
              },
            })
          );
          group.followed = true;
          group.totals.member += 1;
          setForceRender(forceRender + 1);
        }
        setLoading(false);
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
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const getGroupData = async () => {
    let resp = await API.graphql({
      query: getGroupCard,
      authMode: `${isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM"}`,
      variables: { id: groupId },
    });
    resp = getReturnData(resp);
    return resp;
  };

  useEffect(() => {
    setIsDataFetched(true);
    try {
      getGroupData().then((data) => {
        setGroup(data);
        setIsDataFetched(false);
      });
    } catch (ex) {
      console.log(ex);
    }
    // eslint-disable-next-line
  }, [groupId, isLogged]);

  return !isDataFetched ? (
    <div
      className={`${
        containerClassname ? containerClassname : ""
      } flex flex-col bg-white rounded-square relative mb-[24px]`}
    >
      <div className={"h-[34px] w-full relative"}>
        <img
          alt={"group cover"}
          src={generateFileUrl(group.cover)}
          // layout={"fill"}
          // objectFit={"cover"}
          className={"rounded-t-square object-cover w-full h-full"}
        />
      </div>
      <div className={"flex flex-row px-[18px] items-end"}>
        <Link href={`/group/${group.id}`}>
          <a>
            <div
              className={
                "flex relative top-[-12px] items-center w-[48px] h-[48px] relative flex-shrink-0 border border-caak-titaniumwhite rounded-[6px]"
              }
            >
              <img
                // quality={100}
                alt={"profile picture"}
                src={generateFileUrl(group.profile)}
                // objectFit={"cover"}
                height={48}
                width={48}
                className={"rounded-[6px] object-cover w-full h-full"}
              />
            </div>
          </a>
        </Link>
        <div
          className={
            "ml-[11px] flex items-center pb-[10px] self-start mt-[11px]"
          }
        >
          <Link href={`/group/${group.id}`}>
            <a>
              <p
                className={
                  "text-[15px] font-semibold text-caak-generalblack tracking-[0.23px] leading-[18px]"
                }
              >
                {group.name}
              </p>
            </a>
          </Link>

          {group.verified && (
            <img
              alt={""}
              height={14.25}
              width={16.5}
              // quality={100}
              // priority={true}
              src={groupVerifiedSvg}
            />
          )}
        </div>
      </div>
      <div className={"p-[18px] pt-0"}>
        <div className={"mb-[24px]"}>
          <p
            className={
              "text-15px text-caak-generalblack tracking-[0.23px] leading-[18px]"
            }
          >
            {group.about}
          </p>
        </div>
        <div className={"flex flex-row mb-[20px]"}>
          <div className={"flex flex-col"}>
            <p
              className={
                "text-[17px] text-caak-generalblack font-medium tracking-[0.26px] leading-[20px]"
              }
            >
              {kFormatter(group.aura)}
            </p>
            <p
              className={
                "text-[14px] tracking-[0.21px] leading-[16px] text-caak-darkBlue"
              }
            >
              ????????
            </p>
          </div>
          <div className={"flex flex-col ml-[65px]"}>
            <p
              className={
                "text-[17px] text-caak-generalblack font-medium tracking-[0.26px] leading-[20px]"
              }
            >
              {group.totals.member +
                group.totals.moderator +
                group.totals.admin}
            </p>
            <p
              className={
                "text-[14px] tracking-[0.21px] leading-[16px] text-caak-darkBlue"
              }
            >
              ????????????
            </p>
          </div>
        </div>
        <Divider
          className={"h-[1px] mb-[21px]"}
          color={"border-caak-titaniumwhite"}
        />
        <div
          className={
            "flex flex-col justify-between text-caak-generalblack mb-[23px]"
          }
        >
          <div
            className={"flex flex-row items-center mb-[5px] text-caak-darkBlue"}
          >
            <div
              className={"flex justify-center items-center w-[22px] h-[22px]"}
            >
              <span className={"icon-fi-rs-birth text-[20px]"} />
            </div>
            <div className={"ml-[8px]"}>
              <p className={"text-[14px] tracking-[0.21px]  leading-[16px]"}>
                {`${extractDate(group.createdAt).year}.${
                  extractDate(group.createdAt).month
                }.${extractDate(group.createdAt).day}`}
              </p>
            </div>
          </div>
          <div className={"flex flex-row items-center text-caak-darkBlue"}>
            <div
              className={"flex justify-center items-center w-[22px] h-[22px]"}
            >
              <span className={"icon-fi-rs-globe text-[18px]"} />
            </div>
            <div className={"ml-[8px]"}>
              <p className={"text-[14px] tracking-[0.21px] leading-[16px]"}>
                ???????????????? ??????????
              </p>
            </div>
          </div>
        </div>
        <Divider
          className={"h-[1px] mb-[21px]"}
          color={"border-caak-titaniumwhite"}
        />
        <div className={"relative"}>
          <button
            disabled={loading}
            onClick={followGroup}
            className={`button white ${
              group.followed
                ? "text-caak-extraBlack bg-[#E4E4E5]"
                : "bg-caak-primary text-white"
            }  w-full max-w-[284px] justify-center h-[44px] text-[16px] font-medium tracking-[0.24px] leading-[19px] rounded-[6px] shadow-none  border-caak-titaniumwhite`}
          >
            {group.followed ? `??????????????` : `????????????`}
          </button>
        </div>
        <LeaveGroup
          open={open}
          setOpen={setOpen}
          groupData={group}
          setForceRender={setForceRender}
          forceRender={forceRender}
        />
      </div>
    </div>
  ) : null;
};

export default GroupInfoCard;
