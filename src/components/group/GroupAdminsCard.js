import {useEffect, useState} from "react";
import {API} from "aws-amplify";
import {listGroupAdminMods} from "../../graphql-custom/group/queries";
import {generateFileUrl, getGenderImage, getReturnData,} from "../../utility/Util";
import Image from "next/image";
import Tooltip from "../tooltip/Tooltip";
import ProfileHoverCard from "../card/ProfileHoverCard";
import Link from "next/link";
import {useUser} from "../../context/userContext";

const GroupAdminsCard = ({groupId}) => {
  const [groupMods, setGroupMods] = useState({});
  const [loading, setLoading] = useState(true);
  const {isLogged} = useUser()
  const colors = {
    adminText: "#2196F3",
    adminBackground: "rgba(33, 150, 243, 0.1)",
    moderatorText: "#2FC474",
    moderatorBackground: "rgba(47, 196, 116, 0.1)",
  };
  const fetchMods = async () => {
    setLoading(true);
    try {
      let resp = await API.graphql({
        query: listGroupAdminMods,
        variables: {
          group_id: groupId,
          role: { eq: "ADMIN" },
          limit: 5,
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM"
      });
      resp = getReturnData(resp);
      setGroupMods(resp);
      setLoading(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchMods();
    // eslint-disable-next-line
  }, [groupId]);

  return (!loading && groupMods.items.length > 0) ? (
    <div className={"flex flex-col w-[320px] bg-white rounded-[8px] p-[18px] mb-[16px]"}>
      <div>
        <p className={"text-caak-extraBlack text-[15px] font-semibold"}>
          Группын удирдагчид
        </p>
      </div>
      {groupMods.items.map((mod, index) => {
        return (
          <div
            key={index}
            className={"mt-[20px] flex flex-row justify-between"}
          >
            <div className={"flex flex-row"}>
              <div className={"w-[42px] h-[42px] rounded-full relative"}>
                <Image
                  src={
                    mod.user.pic
                      ? generateFileUrl(mod.user.pic)
                      : getGenderImage(mod.user.gender).src
                  }
                  alt={""}
                  objectFit={"cover"}
                  width={42}
                  height={42}
                  className={"rounded-full"}
                />
              </div>
              <div className={"flex flex-col ml-[12px] justify-center"}>
                <div className={"flex flex-row"}>
                  <Link
                    href={{
                      pathname: `/user/${mod.user.id}/profile`,
                    }}
                  >
                    <a>
                      <Tooltip
                        className={"-left-14"}
                        content={<ProfileHoverCard userId={mod.user.id} />}
                      >
                        <p
                          className={
                            "text-[15px] text-caak-generalblack tracking-[0.23px] font-medium leading-[18px]"
                          }
                        >
                          @{mod.user.nickname}
                        </p>
                      </Tooltip>
                    </a>
                  </Link>

                  {mod.user.verified && (
                    <div
                      className={
                        "flex items-center justify-center w-[16px] h-[16px] ml-[2px]"
                      }
                    >
                      <span className={"icon-fi-rs-verified text-[13px]"} />
                    </div>
                  )}

                  <div
                    style={{
                      backgroundColor:
                        mod.role === "ADMIN"
                          ? colors.adminBackground
                          : colors.moderatorBackground,
                    }}
                    className={
                      "ml-[4px] h-[18px] rounded-[4px] pt-[1px] pb-[2px] px-[8px]"
                    }
                  >
                    <p
                      style={{
                        color:
                          mod.role === "ADMIN"
                            ? colors.adminText
                            : colors.moderatorText,
                      }}
                      className={"text-[12px] tracking-[0.18px] leading-[15px]"}
                    >
                      Админ
                    </p>
                  </div>
                </div>
                <p
                  className={
                    "text-[13px] tracking-[0.2px] leading-[16px] font-medium text-caak-extraBlack text-opacity-[0.6] mt-[2px]"
                  }
                >
                  {mod.user.totals.followers} дагагчид
                </p>
              </div>
            </div>
            <div className={"flex flex-col justify-center"}>
              <p
                className={
                  "text-caak-extraBlack text-[16px] tracking-[0.24px] leading-[19px] font-medium"
                }
              >
                {mod.user.aura}
              </p>
              <p
                className={
                  "text-caak-extraBlack text-[12px] tracking-[0.18px] leading-[15px] text-opacity-[0.6]"
                }
              >
                Аура
              </p>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default GroupAdminsCard;
