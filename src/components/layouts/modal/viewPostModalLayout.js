import useScrollBlock from "../../../hooks/useScrollBlock";
import { useEffect } from "react";
import GroupInfoCard from "../../card/GroupInfoCard";
import GroupTopMembersCard from "../../card/GroupTopMembersCard";
import FooterSidebar from "../../footer/FooterSidebar";

const ViewPostModalLayout = ({ children, containerClassname }) => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);
  return (
    <div className={`backdrop bg-black bg-opacity-80`}>
      <div
        className={`rounded-lg relative ${
          containerClassname ? containerClassname : ""
        }`}
      >
        <div
          className={
            "flex items-center bg-caak-bluerhapsody cursor-pointer justify-center absolute top-[-54px] right-[20px] w-[40px] h-[40px] rounded-full"
          }
        >
          <span className={"icon-fi-rs-close text-white text-[13px]"} />
        </div>
        <div className={"viewPostLayoutContainer relative"}>
          <div className={"viewPostLeftSideBar"}>
            <div className={"flex flex-col items-center"}>
              <div className={"flex flex-col items-center mb-[22px]"}>
                <div className={"w-[28px] h-[28px]"}>
                  <span
                    className={"icon-fi-rs-rock-f text-white text-[27px]"}
                  />
                </div>
                <div>
                  <p
                    className={
                      "text-white text-[15px] tracking-[0.23px] leading-[18px]"
                    }
                  >
                    23
                  </p>
                </div>
              </div>
              <div className={"flex flex-col items-center mb-[22px]"}>
                <div className={"w-[28px] h-[28px]"}>
                  <span
                    className={"icon-fi-rs-comment text-white text-[27px]"}
                  />
                </div>
                <div>
                  <p
                    className={
                      "text-white text-[15px] tracking-[0.23px] leading-[18px]"
                    }
                  >
                    14
                  </p>
                </div>
              </div>
              <div className={"flex flex-col items-center mb-[22px]"}>
                <div className={"w-[28px] h-[28px]"}>
                  <span
                      className={"icon-fi-rs-save-f text-white text-[27px]"}
                  />
                </div>
              </div>
              <div className={"flex flex-col items-center mb-[22px]"}>
                <div className={"w-[28px] h-[28px]"}>
                  <span
                      className={"icon-fi-rs-share text-white text-[27px]"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"viewPostItem"}>{children}</div>
          <div className={"rightSideBar"}>
            <GroupInfoCard
              containerClassname={"mb-[16px]"}
              groupId={"e557d20a-b3d1-4e66-89a9-34814992ec2b"}
            />
            <GroupTopMembersCard
              containerClassname={"mb-[16px]"}
              groupId={"e557d20a-b3d1-4e66-89a9-34814992ec2b"}
            />
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
