import SuggestedGroupsCardItem from "./SuggestedGroupsCardItem";
import ViewMoreText from "../../navigation/SideBarGroups/ViewMoreText";

const Index = ({ className, title, maxColumns }) => {
  const groups = [1, 2, 3, 4, 5, 6];
  return (
    <div
      className={`suggestedGroupsCard p-[18px] ${
        className ? className : ""
      } flex flex-col bg-white w-[320px] h-[371px] rounded-square shadow-card`}
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
  );
};

export default Index;
