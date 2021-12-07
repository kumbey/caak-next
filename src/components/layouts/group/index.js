import FooterSidebar from "../../footer/FooterSidebar";
import Image from "next/image";
import SuggestedGroupsCard from "../../card/SuggestedGroupsCard/";
import { useUser } from "../../../context/userContext";
import useMediaQuery from "../../navigation/useMeduaQuery";
import { useEffect, useState } from "react";
import GroupInfo from "../../group/GroupInfo";
import GroupRules from "../../card/GroupRules";
import GroupBadge from "../../group/GroupBadge";
import { getFileUrl, getGenderImage } from "../../../utility/Util";

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
      <div className={"flex flex-col"}>
        <div className={"relative w-full h-[240px]"}>
          <Image
            layout={"fill"}
            objectFit={"cover"}
            alt={groupData?.cover?.name}
            src={
              groupData?.cover
                ? getFileUrl(groupData.cover)
                : getGenderImage("default")
            }
          />
        </div>
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
      </div>
    )
  );
};

export default GroupLayout;
