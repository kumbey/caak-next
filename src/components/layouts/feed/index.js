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
import { useWrapper } from "../../../context/wrapperContext";
import useWindowSize from "../../../hooks/useWindowSize";
import AuraModal from "../../modals/auraModal";
import Banner from "../../banner";

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
  const { feedSortType } = useWrapper();
  const [isAuraModalOpen, setIsAuraModalOpen] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  //  If columns is undefined, columns is defaults to 3.
  if (columns !== (2 || 3)) {
    columns = 3;
  }
  return (
    loaded && (
      <div
        className={"feedLayoutContainer pb-[200px] md:pb-0"}
        // style={{ paddingBottom: size.height / 3 }}
      >
        <AuraModal setIsOpen={setIsAuraModalOpen} isOpen={isAuraModalOpen} />

        {columns === 3 && (
          <div
            className={`leftSideBar pr-[10px] overflow-hidden hover:overflow-y-scroll ${
              isTablet ? "hidden" : "block"
            }`}
          >
            <FeedSortButtons
              feed
              items={feedType}
              initialSort={feedSortType}
              direction={"column"}
            />
            <SideBarGroups
              role={["ADMIN", "MODERATOR"]}
              // maxColumns={3}
              addGroup
              initialData={adminModeratorGroups}
              title={"Миний группүүд"}
              setIsAuraModalOpen={setIsAuraModalOpen}
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
              maxColumns={10}
              title={"Санал болгох группүүд"}
              className={"mb-[24px]"}
            />
          )}

          {/* {!isLogged && <FooterSidebar />} */}
          <Banner/>
        </div>
      </div>
    )
  );
};

export default DefaultFeedLayout;
