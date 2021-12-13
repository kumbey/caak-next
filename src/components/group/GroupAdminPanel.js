import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Divider from "../divider";
import { extractDate, generateFileUrl } from "../../utility/Util";
import Button from "../button";
import { useRouter } from "next/router";

const GroupAdminPanel = ({ groupData, totalMember, ...props }) => {
  const router = useRouter();
  const createdAt = extractDate(groupData.createdAt);
  const [activeIndex, setActiveIndex] = useState(0);
  const adminMenu = [
    {
      id: 0,
      name: "Хүлээгдэж буй постууд",
      icon: "icon-fi-rs-pending",
      path: "dashboard",
    },
    {
      id: 1,
      name: "Дашбоард",
      icon: "icon-fi-rs-statistic-o",
      path: "dashboard",
    },
    {
      id: 2,
      name: "Тохиргоо",
      icon: "icon-fi-rs-settings",
      path: "settings",
    },
    // {
    //   id: 3,
    //   name: "Дүрэм",
    //   icon: "icon-fi-rs-desc",
    //   path: "rule",
    // },
  ];
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
                      pathname: `${router.asPath}/${menu.path}`,
                      //   query: {
                      //     keyword: 2,
                      //   },
                    }
                    // `${router.asPath}/${menu.path}`
                  );
                }}
                className="flex text-caak-generalblack hover:text-caak-primary text-14px font-normal font-inter items-center cursor-pointer mb-[10px]"
                key={index}
              >
                <span className={` ${menu.icon}  text-xl mr-2`} />
                <p
                  className={`ml-3 text-14px font-inter hover:text-caak-primary font-medium text-caak-generalblack `}
                >
                  {menu.name}
                </p>
              </div>
            );
          })}
          {activeIndex === 1
            ? router.push({ pathname: `/group/${groupData.id}/dashboard` })
            : null}
          {activeIndex === 2
            ? router.push(
                { pathname: `/group/${groupData.id}/settings` },
                { shallow: true, scroll: false }
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default GroupAdminPanel;
