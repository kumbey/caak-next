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
import GroupInfo from "../../group/GroupInfo";
import GroupRules from "../../card/GroupRules";
import GroupBadge from "../../group/GroupBadge";

const GroupLayout = ({
  children,
  groupData,
  totalMember,
  hideSuggestedGroups,
}) => {
  const { isLogged } = useUser();
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const isLaptop = useMediaQuery("screen and (max-device-width: 1100px)");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <div className={"feedLayoutContainer"}>
        <div className={"feed"}>{children}</div>
        <div
          className={`rightSideBar bg-none  ${isLaptop ? "hidden" : "block"}`}
        >
          <GroupInfo groupData={groupData} totalMember={totalMember} />
          <div className="mt-[16px]">
            {!hideSuggestedGroups && (
              <SuggestedGroupsCard
                maxColumns={5}
                title={"Санал болгох группүүд"}
                className={"mb-[24px]"}
              />
            )}
          </div>
          <GroupRules />
          <GroupBadge />
          <FooterSidebar
            containerClassname={"mt-[16px] bg-white rounded-square p-[20px]"}
          />

          {!isLogged && <FooterSidebar />}
        </div>
      </div>
    )
  );
};

export default GroupLayout;
