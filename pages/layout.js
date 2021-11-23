import FeedSortButtons from "../src/components/navigation/FeedSortButtons";
import Divider from "../src/components/divider";
import SideBarGroups from "../src/components/card/SideBarGroups";
import FooterSidebar from "../src/components/footer/FooterSidebar";
import AuraCard from "../src/components/card/AuraCard";
import SuggestedGroupsCard from "../src/components/card/SuggestedGroupsCard";
import { useUser } from "../src/context/userContext";
import { feedType } from "../src/components/navigation/sortButtonTypes";

const DefaultFeedLayout = ({ children, columns, hideAura }) => {
    console.log(hideAura)
  const { isLogged } = useUser();
  //  If columns is undefined, columns is defaults to 3.
  if (columns !== (2 || 3)) {
    columns = 3;
  }
  return (
    <div className={"feedLayoutContainer"}>
      {columns === 3 && (
        <div className={"leftSideBar"}>
          <FeedSortButtons items={feedType} direction={"column"} />
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
          {isLogged && <FooterSidebar />}
        </div>
      )}
      <div className={"feed"}>{children}</div>
      <div className={"rightSideBar"}>
        <AuraCard hideAura={hideAura} />
        <SuggestedGroupsCard
          maxColumns={5}
          title={"Санал болгох группүүд"}
          className={"mt-[24px]"}
        />
        {!isLogged && <FooterSidebar />}
      </div>
    </div>
  );
};

export default DefaultFeedLayout;
