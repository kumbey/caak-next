import useScrollBlock from "../../../hooks/useScrollBlock";
import { useEffect } from "react";
import GroupInfoCard from "../../card/GroupInfoCard";
import FooterSidebar from "../../footer/FooterSidebar";
import ViewPostLeftReaction from "../../viewpost/ViewPostLeftReaction";
import GroupTrendPostsCard from "../../card/GroupTrendPostsCard";
import { useRouter } from "next/router";
import Image from 'next/image'

const ViewPostModalLayout = ({ children, containerClassname, post }) => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

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
  }, []);

  return (
    <div className={`backdrop bg-black bg-opacity-80`}>
      <div
        className={`rounded-lg relative ${
          containerClassname ? containerClassname : ""
        }`}
      >

        <div className={"viewPostLayoutContainer"}>
          <div className={"viewPostLeftSideBar z-1"}>
            <ViewPostLeftReaction post={post} />
          </div>
          <div className={"viewPostItem"}>{children}</div>
          <div className={"rightSideBar"}>
            <GroupInfoCard
              containerClassname={"mb-[16px]"}
              groupId={post.group_id}
            />
            <GroupTrendPostsCard groupId={post.group_id} />
            {/*<GroupTopMembersCard*/}
            {/*  containerClassname={"mb-[16px]"}*/}
            {/*  groupId={post.group_id}*/}
            {/*/>*/}
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
