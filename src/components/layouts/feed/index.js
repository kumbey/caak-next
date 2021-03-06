import FeedSortButtons from "../../navigation/FeedSortButtons";
import SideBarGroups from "../../card/SideBarGroups";
import FooterSidebar from "../../footer/FooterSidebar";
import AuraCard from "../../card/AuraCard";
import SuggestedGroupsCard from "../../card/SuggestedGroupsCard/";
import { useUser } from "../../../context/userContext";
import useMediaQuery from "../../navigation/useMeduaQuery";
import { useEffect, useState } from "react";
import { feedType } from "../../navigation/sortButtonTypes";
import { useWrapper } from "../../../context/wrapperContext";
import AuraModal from "../../modals/auraModal";
import Banner from "../../banner";
import SimpleBar from "simplebar-react";

import TopBanner from "../../topBanner";

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
  const { isLogged, user } = useUser();
  const isTablet = useMediaQuery("screen and (max-device-width: 900px)");
  const isLaptop = useMediaQuery("screen and (max-device-width: 1100px)");
  const [loaded, setLoaded] = useState(false);
  const { feedSortType, setNavBarTransparent } = useWrapper();
  const [isAuraModalOpen, setIsAuraModalOpen] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // setNavBarTransparent(false);
  }, [setNavBarTransparent, setLoaded]);

  //  If columns is undefined, columns is defaults to 3.
  if (columns !== (2 || 3)) {
    columns = 3;
  }
  return (
    loaded && (
      <div className={"flex flex-col w-full"}>
        <div className="flex justify-center ">
          <TopBanner className={"pt-[80px]"} />
        </div>
        <div className="feedLayoutContainer pb-[200px] md:pb-0">
          <AuraModal setIsOpen={setIsAuraModalOpen} isOpen={isAuraModalOpen} />
          {columns === 3 && (
            <div className={`leftSideBar ${isTablet ? "hidden" : "block"}`}>
              <SimpleBar className={"leftScroll pr-[12px]"}>
                <FeedSortButtons
                  feed
                  items={feedType}
                  initialSort={feedSortType}
                  direction={"column"}
                  containerClassname={"w-full"}
                />
                <SideBarGroups
                  userId={user.id}
                  role={["ADMIN"]}
                  addGroup
                  initialData={adminModeratorGroups}
                  title={"?????????? ????????????????"}
                  setIsAuraModalOpen={setIsAuraModalOpen}
                />
                <SideBarGroups
                  userId={user.id}
                  role={["MEMBER", "MODERATOR"]}
                  maxColumns={13}
                  initialData={myGroups}
                  title={"?????????????? ????????????????"}
                  setIsAuraModalOpen={setIsAuraModalOpen}
                />
                <SideBarGroups
                  userId={user.id}
                  role={["NOT_MEMBER"]}
                  initialData={allGroups}
                  maxColumns={13}
                  title={
                    myGroups !== null && myGroups?.length === 0
                      ? "?????? ??????????"
                      : "?????????? ??????????"
                  }
                  setIsAuraModalOpen={setIsAuraModalOpen}
                />
                {isLogged && <FooterSidebar />}
              </SimpleBar>
            </div>
          )}

          <div className={"feed"}>{children}</div>
          <div
            className={`rightSideBar ${
              isLogged && !search ? "" : "pt-[60px]"
            } ${isLaptop ? "hidden" : "block"}`}
          >
            {!hideAura && <AuraCard />}

            {!hideSuggestedGroups && (
              <SuggestedGroupsCard
                maxColumns={10}
                title={"?????????? ???????????? ????????????????"}
                className={"mb-[24px]"}
              />
            )}

            {/* {!isLogged && <FooterSidebar />} */}
            <Banner />
          </div>
        </div>
      </div>
    )
  );
};

export default DefaultFeedLayout;
