import GroupTips from "../../card/GroupTips";
import FooterSidebar from "../../footer/FooterSidebar";
import GroupInfoCard from "../../card/GroupInfoCard";
import GroupRules from "../../card/GroupRules";
import useMediaQuery from "../../navigation/useMeduaQuery";
import { useEffect, useState } from "react";

const DefaultAddPostLayout = ({ children, selectedGroup }) => {
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <div className={"flex flex-col max-w-[1080px] px-[20px] mx-auto"}>
        <p
          className={
            "self-start text-caak-extraBlack text-[20px] font-semibold tracking-[0.3px] leading-[24px] mb-[12px]"
          }
        >
            Таны өнөөдрийн саак мэдрэмж юу вэ?
        </p>
        <div
          className={`flex ${
            isTablet ? "flex-col max-w-[740px]" : "flex-row"
          } justify-center`}
        >
          <div
            style={{
              flexBasis: `${!isTablet ? "740px" : ""}`,
              maxWidth: "740px",
            }}
            className={"h-auto"}
          >
            {children}
          </div>
          <div
            style={{ flexBasis: "320px" }}
            className={`w-full ${isTablet ? "" : "ml-[20px]"}`}
          >
            {selectedGroup && (
              <>
                <GroupInfoCard
                  containerClassname={"mb-[16px]"}
                  groupId={selectedGroup.id}
                />
                <GroupRules groupId={selectedGroup.id}/>
                <GroupTips groupId={selectedGroup.id}/>
              </>
            )}

            <FooterSidebar
              containerClassname={"mt-[16px] bg-white rounded-square p-[20px]"}
            />
          </div>
        </div>
      </div>
    )
  );
};
export default DefaultAddPostLayout;
