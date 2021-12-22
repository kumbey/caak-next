import { Accordion } from "../accordion/Accordion";
import Image from "next/image";
import ruleSvg from "../../../public/assets/images/clipboard.svg";
import { API } from "aws-amplify";
import { getGroupRules } from "../../graphql-custom/group/queries";
import { getReturnData } from "../../utility/Util";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";

const GroupRules = ({ groupId }) => {
  const [groupRules, setGroupRules] = useState([]);
  const { isLogged } = useUser();

  const getGroupRule = async () => {
    let resp = await API.graphql({
      query: getGroupRules,
      variables: { id: groupId },
      authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });
    resp = getReturnData(resp);
    if (resp.g_rules?.length > 0) {
      setGroupRules(JSON.parse(resp.g_rules));
    } else {
      setGroupRules(null);
    }
  };

  useEffect(() => {
    getGroupRule();
    // eslint-disable-next-line
  }, [groupId]);

  return groupRules ? (
    <div
      className={"flex flex-col bg-white rounded-square pb-[20px] mb-[16px]"}
    >
      <div
        className={
          "flex flex-row items-center border-b border-caak-titaniumwhite px-[12px] py-[10px]"
        }
      >
        <div className={"flex items-center justify-center w-[24px] h-[24px]"}>
          <Image alt={""} src={ruleSvg} height={24} width={24} />
        </div>
        <p
          className={
            "ml-[8px] text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] font-semibold"
          }
        >
          Группын дүрэм
        </p>
      </div>
      <div className={"flex flex-col"}>
        <ol
          style={{ counterReset: "section", listStyleType: "none" }}
          className={
            "text-caak-extraBlack text-[14px] tracking-[0.21px] leading-[16px] tracking-[0.21px] leading-[16px] px-[18px]"
          }
        >
          {groupRules.map((rule, index) => {
            return (
              <li
                key={index}
                className={
                  "py-[12px] border-b border-caak-titaniumwhite orderedAccordion flex flex-row"
                }
              >
                <Accordion
                  contentClassname={
                    "text-caak-extrablack text-[14px] tracking-[0.21px] leading-[16px] pt-[8px] break-words"
                  }
                  titleClassname={"text-caak-extrablack text-[15px] break-all"}
                  content={rule.description}
                  title={rule.title}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  ) : null;
};

export default GroupRules;
