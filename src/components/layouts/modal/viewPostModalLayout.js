import { useEffect, useRef, useState } from "react";
import GroupInfoCard from "../../card/GroupInfoCard";
import GroupTrendPostsCard from "../../card/GroupTrendPostsCard";
import useScrollBlock from "../../../hooks/useScrollBlock";
import ModalBanner from "../../modalBanner";
import Banner from "../../banner";

const ViewPostModalLayout = ({ children, containerClassname, post }) => {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const modalRef = useRef(null)
  const viewPostRef = useRef();

  const onClickScrollTop = ()=> {
    if(modalRef.current){
      modalRef.current.scrollTo({
        behavior: "smooth",
        top: 0
      })
    }
  }

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  useEffect(() => {
    setTimeout(() => {
      setBannerOpen(true);
    }, 2500);
  }, []);

  return (
    <div ref={modalRef} className="popup_modal">
      <div className="popup_modal-viewPost">
        <div className={`h-full bg-black bg-opacity-80`}>
          <div
            className={`rounded-lg relative ${
              containerClassname ? containerClassname : ""
            }`}
          >
            <div
              className={
                "viewPostLayoutContainer relative items-center lg:items-start md:px-[20px] lg:px-0"
              }
            >
              <div ref={viewPostRef} className={"viewPostItem"}>
                {children}
              </div>
              <div
                className={
                  "viewPostRightSideBar h-full flex items-center ml-0 md:ml-[20px] flex-col-reverse md:flex-col"
                }
              >
                <div className={"flex flex-col w-full"}>
                  <GroupInfoCard
                    containerClassname={"mb-[16px]"}
                    groupId={post.group_id}
                  />
                  <GroupTrendPostsCard onClickItem={onClickScrollTop} maxItems={5} groupId={post.group_id} />
                </div>
                <Banner location={"post"} />
              </div>
            </div>
          </div>
          <ModalBanner setBannerOpen={setBannerOpen} bannerOpen={bannerOpen} />
        </div>
      </div>
    </div>
  );
};

export default ViewPostModalLayout;
