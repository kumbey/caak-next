import FeedSortButtons from "../../navigation/FeedSortButtons";
import Divider from "../../divider";
import SideBarGroups from "../../navigation/SideBarGroups";
import FooterSidebar from "../../footer/FooterSidebar";
import AuraCard from "../../card/AuraCard";
import Index from "../../card/SuggestedGroupsCard/SuggestedGroupsCard";

const DefaultFeedLayout = ({ children }) => {
  return (
    <div className={"feedLayoutContainer"}>
      <div className={"leftSideBar"}>
        <FeedSortButtons direction={"column"} />
        <Divider color={"border-titaniumwhite"} className={"py-5"} />
        <SideBarGroups
          groupType={"ADMIN"}
          maxColumns={3}
          addGroup
          title={"Миний группүүд"}
        />
        <Divider color={"border-titaniumwhite"} className={"py-5"} />
        <SideBarGroups
          groupType={"MEMBER"}
          maxColumns={4}
          title={"Миний дагасан группүүд"}
        />
        <Divider color={"border-titaniumwhite"} className={"py-5"} />
        <FooterSidebar />
      </div>
      <div className={"feed"}>{children}</div>
      <div className={"rightSideBar"}>
        <AuraCard />
        <Index
          maxColumns={5}
          title={"Санал болгох группүүд"}
          className={"mt-[24px]"}
        />
      </div>
    </div>
  );
};

export default Layout;
