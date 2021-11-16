import FeedSortButtons from "../../navigation/FeedSortButtons";
import Divider from "../../divider";
import SideBarGroups from "../../card/SideBarGroups";
import FooterSidebar from "../../footer/FooterSidebar";
import AuraCard from "../../card/AuraCard";
import SuggestedGroupsCard from "../../card/SuggestedGroupsCard/";
import { useUser } from "../../../context/userContext";
import { checkUser } from "../../../utility/Util";
import useMediaQuery from "../../navigation/useMeduaQuery";

const DefaultFeedLayout = ({ children, columns }) => {
  const { user } = useUser();
  const isTablet = useMediaQuery("(max-width: 767px)");
  const isLaptop = useMediaQuery("(max-width: 1100px");
  //  If columns is undefined, columns is defaults to 3.
  if (columns !== (2 || 3)) {
    columns = 3;
  }
  return (
    <div className={"feedLayoutContainer"}>
      {columns === 3 && (
        <div className={`leftSideBar ${isTablet ? "hidden" : "block"}`}>
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
          {checkUser(user) && <FooterSidebar />}
        </div>
      )}
      <div className={"feed"}>{children}</div>
      <div className={`rightSideBar ${isLaptop ? "hidden" : "block"}`}>
        <AuraCard />
        <SuggestedGroupsCard
          maxColumns={5}
          title={"Санал болгох группүүд"}
          className={"mt-[24px]"}
        />
        {!checkUser(user) && <FooterSidebar />}
      </div>
    </div>
  );
};

export default DefaultFeedLayout;
