import useScrollBlock from "../../../hooks/useScrollBlock";
import { useEffect, useRef } from "react";
import GroupInfoCard from "../../card/GroupInfoCard";
import FooterSidebar from "../../footer/FooterSidebar";
import GroupTrendPostsCard from "../../card/GroupTrendPostsCard";
import { useRouter } from "next/router";

const ViewPostModalLayout = ({ children, containerClassname, post }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const viewPostRef = useRef();

  // useEffect(() => {
  //   blockScroll();
  //   return () => allowScroll();
  // }, [allowScroll, blockScroll]);

  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 27) {
        router.back();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div id={"backdrop"} className={`backdrop bg-black bg-opacity-80`}>
      <div
        className={`rounded-lg relative ${
          containerClassname ? containerClassname : ""
        }`}
      >
        <div className={"viewPostLayoutContainer relative flex-col items-center  px-[20px] lg:items-start lg:px-0 lg:flex-row"}>
          <div ref={viewPostRef} className={"viewPostItem"}>
            {children}
          </div>
          <div className={"rightSideBar"}>
            <GroupInfoCard
              containerClassname={"mb-[16px]"}
              groupId={post.group_id}
            />
            <GroupTrendPostsCard groupId={post.group_id} />
            <FooterSidebar
              containerClassname={"bg-white p-[20px] rounded-square"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPostModalLayout;
