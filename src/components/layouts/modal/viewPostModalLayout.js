import { useEffect, useRef } from "react";
import GroupInfoCard from "../../card/GroupInfoCard";
import FooterSidebar from "../../footer/FooterSidebar";
import GroupTrendPostsCard from "../../card/GroupTrendPostsCard";
import useScrollBlock from "../../../hooks/useScrollBlock";

const ViewPostModalLayout = ({ children, containerClassname, post }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const viewPostRef = useRef();
  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);


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
              <div className={"viewPostRightSideBar ml-0 md:ml-[20px]"}>
                <GroupInfoCard
                  containerClassname={"mb-[16px]"}
                  groupId={post.group_id}
                />
                <GroupTrendPostsCard maxItems={5} groupId={post.group_id} />
                <FooterSidebar
                  containerClassname={"bg-white p-[20px] rounded-square"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPostModalLayout;
