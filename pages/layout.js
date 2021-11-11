import FeedSortButtons from "../src/components/navigation/FeedSortButtons";
import Divider from "../src/components/divider";
import SideBarGroups from "../src/components/navigation/SideBarGroups";
import FooterSidebar from "../src/components/footer/FooterSidebar";

const Layout = ({ children }) => {
  return (
    <div className={"feedLayoutContainer"}>
      <div className={"leftSideBar"}>
        <FeedSortButtons direction={"column"} />
        <Divider color={"border-titaniumwhite"} className={"py-5"} />
        <SideBarGroups groupType={"adminModerator"} maxColumns={3} addGroup title={"Миний группүүд"} />
        <Divider color={"border-titaniumwhite"} className={"py-5"} />
        <SideBarGroups grouptype={"member"} maxColumns={4} title={"Миний дагасан группүүд"} />
        <Divider color={"border-titaniumwhite"} className={"py-5"} />
        <FooterSidebar />
      </div>
      <div className={"feed"}>{children}</div>
      <div className={"rightSideBar"}>

      </div>
    </div>
  );
};

export default Layout;
