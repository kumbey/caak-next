import { useEffect, useRef, useState } from "react";
import GroupInfoCard from "../../card/GroupInfoCard";
import FooterSidebar from "../../footer/FooterSidebar";
import GroupTrendPostsCard from "../../card/GroupTrendPostsCard";
import useScrollBlock from "../../../hooks/useScrollBlock";
import ModalBanner from "../../modalBanner";
import Banner from "../../banner";

const ViewPostModalLayout = ({ children, containerClassname, post }) => {
  const [bannerOpen, setBannerOpen] = useState(false)
  const [blockScroll, allowScroll] = useScrollBlock();
  
  const viewPostRef = useRef();
  
  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  useEffect(() => {
    setTimeout(() => {
      setBannerOpen(true)
    }, 2500)
  }, [])

  return (
    <div className="popup_modal">
      <div className="popup_modal-viewPost">
        <div className={`h-full bg-black bg-opacity-80`}>
          <div
            className={`rounded-lg relative ${
              containerClassname ? containerClassname : ""
            }`}
          >
            <div
              className={
                "viewPostLayoutContainer relative items-center sm:items-start md:px-[20px] lg:px-0"
              }
            >
              <div ref={viewPostRef} className={"viewPostItem"}>
                {children}
              </div>
              {/* <div className={"viewPostRightSideBar ml-0 md:ml-[20px]"}>
                <GroupInfoCard
                  containerClassname={"mb-[16px]"}
                  groupId={post.group_id}
                />
                <GroupTrendPostsCard maxItems={5} groupId={post.group_id} />
                <Banner/>
              </div> */}
            </div>
          </div>
        <ModalBanner setBannerOpen={setBannerOpen} bannerOpen={bannerOpen}/>
        </div>
      </div>
    </div>
  );
};

export default ViewPostModalLayout;
