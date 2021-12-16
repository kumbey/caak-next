import { useEffect, useState } from "react";
import Divider from "../divider";
import { getReturnData } from "../../utility/Util";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { getGroupTotal } from "../../../src/graphql-custom/group/queries";

const GroupAdminPanel = ({ groupData, totalMember, ...props }) => {
  const router = useRouter();
  const [groupTotals, setGroupTotals] = useState();
  const totalPending = groupTotals?.pending;

  const adminMenu = [
    {
      id: 0,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending-posts",
      path: "dashboard",
      length: totalPending,
    },
    {
      id: 1,
      name: "Дашбоард",
      icon: "icon-fi-rs-statistic-o",
      path: "dashboard",
      length: "",
    },
    {
      id: 2,
      name: "Тохиргоо",
      icon: "icon-fi-rs-settings",
      path: "settings",
      length: "",
    },
    // {
    //   id: 3,
    //   name: "Дүрэм",
    //   icon: "icon-fi-rs-desc",
    //   path: "rule",
    // },
  ];
  const getGroupTotals = async () => {
    const resp = await API.graphql({
      query: getGroupTotal,
      variables: {
        group_id: router.query.groupId,
      },
    });
    setGroupTotals(getReturnData(resp));
  };

  useEffect(() => {
    getGroupTotals();
  }, []);
  return (
    <div className=" flex flex-col relative rounded-lg bg-white mb-[16px]">
      <div className={"p-[18px] "}>
        <div className={""}>
          <p
            className={
              "text-15px text-caak-extraBlack font-semibold font-inter tracking-[0.23px] leading-[18px] truncate-2"
            }
          >
            Админ цэс
          </p>
        </div>

        <Divider
          className={"h-[1px] mt-[15px] mb-[15px]"}
          color={"border-caak-titaniumwhite"}
        />
        <div className="flex flex-col ">
          {adminMenu.map((menu, index) => {
            return (
              <div
                onClick={() => {
                  router.push(
                    {
                      pathname: `${router.pathname}/${menu.path}`,
                      query: {
                        activeIndex: menu.id === 0 ? 2 : 0,
                      },
                    },
                    `${router.asPath}/${menu.path}`
                  );
                }}
                className="flex text-caak-generalblack hover:text-caak-primary text-[14px] font-normal font-inter items-center cursor-pointer mb-[10px]"
                key={index}
              >
                <div
                  className={
                    "h-[24px] w-[24px] flex items-center justify-center  mr-2"
                  }
                >
                  <span className={` ${menu.icon}  text-[22px]`} />
                </div>

                {menu.id !== 0 ? (
                  <>
                    <p className={` text-[14px] font-medium  `}>{menu.name}</p>
                  </>
                ) : (
                  <div className="flex items-center">
                    <p
                      className={` text-[14px] font-inter tracking-[0.21px] leading-[16px] font-medium mr-[10px] `}
                    >
                      {menu.name}
                    </p>
                    <div className="flex justify-center items-center text-13px h-[16px] w-[35px] bg-opacity-20 bg-caak-bleudefrance  font-inter font-medium rounded-lg ">
                      <p className="text-caak-bleudefrance text-opacity-100 ">
                        {menu.length}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupAdminPanel;
