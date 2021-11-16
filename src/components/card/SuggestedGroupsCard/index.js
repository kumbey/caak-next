import SuggestedGroupsCardItem from "./SuggestedGroupsCardItem";
import ViewMoreText from "../SideBarGroups/ViewMoreText";
import { useUser } from "../../../context/userContext";
import { checkUser } from "../../../utility/Util";
import { useEffect, useState } from "react";

const SuggestedGroupsCard = ({ className, title, maxColumns }) => {
  const groups = [1, 2, 3, 4, 5, 6];
  const { user } = useUser();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (checkUser(user)) {
      setLogged(true);
    }
  }, [user]);

  return logged ? (
    <div
      className={`suggestedGroupsCard ${
        user?.sysUser
          ? "bg-white shadow-card p-[18px]"
          : "py-[18px] bg-transparent shadow-none"
      } ${
        className ? className : ""
      } flex flex-col bg-white w-ci rounded-square `}
    >
      <div className={"text-15px pb-[7px] text-caak-extraBlack font-semibold"}>
        {title}
      </div>
      <SuggestedGroupsCardItem
        members={"13.2k"}
        name={"COREX хэрэглэгчдийн групп"}
      />
      <SuggestedGroupsCardItem
        members={"32.4k"}
        name={"Дизайнеруудын бригад"}
      />
      <SuggestedGroupsCardItem
        verified
        members={"58.1k"}
        name={"Тархи цэнэглэгч номын клубын өрөө"}
      />
      <SuggestedGroupsCardItem members={"13.2k"} name={"Computer Land"} />
      <SuggestedGroupsCardItem
        members={"1k"}
        name={"Taste it. Энийг хар даа!"}
      />
      {groups.length > maxColumns ? (
        <ViewMoreText text={"Илүү ихийг үзэх"} />
      ) : null}
    </div>
  ) : null;
};

export default SuggestedGroupsCard;
