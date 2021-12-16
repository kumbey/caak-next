import FeedSortButtons from "../../navigation/FeedSortButtons";
import Divider from "../../divider";
import SideBarGroups from "../../card/SideBarGroups";
import FooterSidebar from "../../footer/FooterSidebar";
import AuraCard from "../../card/AuraCard";
import SuggestedGroupsCard from "../../card/SuggestedGroupsCard/";
import { useUser } from "../../../context/userContext";
import useMediaQuery from "../../navigation/useMeduaQuery";
import { useEffect, useState } from "react";
import { feedType } from "../../navigation/sortButtonTypes";

const DefaultFeedLayout = ({
  children,
  columns,
  myGroups,
  adminModeratorGroups,
  allGroups,
  hideAura,
  hideSuggestedGroups,
  search,
}) => {
  const { isLogged } = useUser();
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const isLaptop = useMediaQuery("screen and (max-device-width: 1100px)");
  const [loaded, setLoaded] = useState(false);
  const [sortType, setSortType] = useState("DEFAULT");
  useEffect(() => {
    setLoaded(true);
  }, []);

  //  If columns is undefined, columns is defaults to 3.
  if (columns !== (2 || 3)) {
    columns = 3;
  }
  return (
    loaded && (
      <div className={"feedLayoutContainer"}>
        {columns === 3 && (
          <div
            className={`leftSideBar pr-[10px] overflow-hidden hover:overflow-y-scroll ${
              isTablet ? "hidden" : "block"
            }`}
          >
            <FeedSortButtons
              items={feedType}
              direction={"column"}
              sortType={sortType}
              setSortType={setSortType}
            />
            <SideBarGroups
              role={["ADMIN","MODERATOR"]}
              // maxColumns={3}
              addGroup
              initialData={adminModeratorGroups}
              title={"Миний группүүд"}
            />
            <SideBarGroups
              role={["MEMBER"]}
              // maxColumns={0}
              initialData={myGroups}
              title={"Дагасан группүүд"}
            />
            <SideBarGroups
              role={["NOT_MEMBER"]}
              initialData={allGroups}
              title={"Бүх групп"}
            />
            {isLogged && <FooterSidebar />}
          </div>
        )}

        <div className={"feed"}>{children}</div>
        <div
          className={`rightSideBar ${isLogged && !search ? "" : "pt-[60px]"} ${
            isLaptop ? "hidden" : "block"
          }`}
        >
          {!hideAura && <AuraCard />}

          {!hideSuggestedGroups && (
            <SuggestedGroupsCard
              maxColumns={5}
              title={"Санал болгох группүүд"}
              className={"mb-[24px]"}
            />
          )}

          {!isLogged && <FooterSidebar />}
        </div>
      </div>
    )
  );
};

export default DefaultFeedLayout;
