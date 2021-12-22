import Image from "next/image";
import tipsSvg from "/public/assets/images/lifebuoy.svg";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import {
  getGroupAttentions,
  getGroupRules,
} from "../../graphql-custom/group/queries";
import { getReturnData } from "../../utility/Util";
import tips from "../group/tips";

const GroupTips = ({ groupId }) => {
  const [groupTips, setGroupTips] = useState(tips);
  const getGroupAttention = async () => {
    let resp = await API.graphql({
      query: getGroupAttentions,
      variables: { id: groupId },
    });
    resp = getReturnData(resp);
    if (resp.g_attentions?.length > 0) {
      setGroupTips(JSON.parse(resp.g_attentions));
    } else {
      setGroupTips(null);
    }
  };

  useEffect(() => {
    // getGroupAttention();
    // eslint-disable-next-line
  }, [groupId]);
  return groupTips ? (
    <div className={"flex flex-col bg-white rounded-square pb-[20px]"}>
      <div
        className={
          "flex flex-row items-center border-b border-caak-titaniumwhite px-[12px] py-[10px]"
        }
      >
        <div className={"flex items-center justify-center w-[24px] h-[24px]"}>
          <Image alt={""} src={tipsSvg} height={24} width={24} />
        </div>
        <p
          className={
            "ml-[8px] text-caak-generalblack text-[15px] tracking-[0.23px] leading-[18px] font-semibold"
          }
        >
          Анхаарах зүйлс
        </p>
      </div>
      <div className={"flex flex-col"}>
        <ol
          type={"1"}
          className={
            "text-caak-extraBlack text-[14px] tracking-[0.21px] leading-[16px] px-[18px]"
          }
        >
          {groupTips.map((tip, index) => {
            return (
              <li
                key={index}
                style={{ listStyle: "inside decimal none" }}
                className={
                  "py-[12px] border-b border-caak-titaniumwhite py-[12px]"
                }
              >
                {tip.title}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  ) : null;
};

export default GroupTips;
