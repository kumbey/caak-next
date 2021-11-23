import SuggestedGroupsCardItem from "./SuggestedGroupsCardItem";
import ViewMoreText from "../SideBarGroups/ViewMoreText";
import { useUser } from "../../../context/userContext";

const SuggestedGroupsCard = ({ className, title, maxColumns }) => {
  const groups = [1, 2, 3, 4, 5, 6];
  const { isLogged } = useUser();

  return isLogged ? (
    <div
      className={`suggestedGroupsCard ${
        isLogged
          ? "bg-white shadow-card py-[18px]"
          : "py-[18px] bg-transparent shadow-none"
      } ${
        className ? className : ""
      } flex flex-col bg-white w-ci rounded-square `}
    >
      <div
        className={
          "text-15px pb-[7px] px-[18px] text-caak-extraBlack font-semibold"
        }
      >
        {title}
      </div>
      <div
        className={
          "bg-caak-primary bg-opacity-[0.06] px-[18px] py-[4px] border-l-[3px] border-opacity-[0.6] border-caak-primary"
        }
      >
        <SuggestedGroupsCardItem
          members={"13.2k"}
          name={"COREX хэрэглэгчдийн групп"}
          verified
        />
        <SuggestedGroupsCardItem
          members={"32.4k"}
          name={"Дизайнеруудын бригад"}
          verified
        />
        <SuggestedGroupsCardItem
          verified
          members={"58.1k"}
          name={"Тархи цэнэглэгч номын клубын өрөө"}
        />
      </div>
      <div className={"px-[18px] py-[4px]"}>
        <SuggestedGroupsCardItem members={"13.2k"} name={"Computer Land"} />
        <SuggestedGroupsCardItem
          members={"1k"}
          name={"Taste it. Энийг хар даа!"}
        />
      </div>

      {groups.length > maxColumns ? (
        <div className={"px-[18px]"}>
          <ViewMoreText text={"Илүү ихийг үзэх"} />
        </div>
      ) : null}
    </div>
  ) : null;
};

export default SuggestedGroupsCard;
