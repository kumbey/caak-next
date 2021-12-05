import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../button";
import profImg from "../../../public/assets/images/logo.png";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import API from "@aws-amplify/api";
import { useUser } from "../../context/userContext";
import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../graphql-custom/GroupUsers/mutation";
import DropDown from "../navigation/DropDown";
import PostMoreMenu from "../card/PostMoreMenu";
import { getFileUrl } from "../../utility/Util";
import { useRouter } from "next/router";
import Link from "next/link";

const GroupHeader = ({ groupData, ...props }) => {
  const { isLogged, cognitoUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(0);

  const followGroup = async () => {
    try {
      setLoading(true);
      if (groupData.followed) {
        await API.graphql(
          graphqlOperation(deleteGroupUsers, {
            input: {
              id: `${groupData.id}#${cognitoUser.attributes.sub}`,
            },
          })
        );
        groupData.followed = false;
        groupData.totals.member -= 1;
        setForceRender(forceRender + 1);
      } else {
        await API.graphql(
          graphqlOperation(createGroupUsers, {
            input: {
              id: `${groupData.id}#${cognitoUser.attributes.sub}`,
              group_id: groupData.id,
              user_id: cognitoUser.attributes.sub,
              role: "MEMBER",
            },
          })
        );
        groupData.followed = true;
        groupData.totals.member += 1;
        setForceRender(forceRender + 1);
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const handleFollow = () => {
    if (isLogged) {
      followGroup();
    } else {
      // router.push(`?signInUp=signIn&isModal=true`, `/signInUp/signIn`, {
      //   shallow: true,
      // });
    }
  };
  groupData.role_on_group = "ADMIN";
  return (
    <div className={"flex flex-col items-center justify-center  bg-white"}>
      <div className="lg:w-[966px] w-auto sm:flex sm:justify-between justify-evenly mb-[20px]">
        <div className="flex">
          <div className="w-[148px] h-[148px] rounded-3xl border-8 border-white mr-[20px]">
            <Image
              className=" bg-white rounded-3xl"
              src={getFileUrl(groupData.cover)}
              width={148}
              height={148}
              layout="responsive"
              //   objectFit={"cover"}
              alt="#"
            />
          </div>
          <div className="flex flex-col mt-[73px]">
            <div>
              <h1 className="text-24px font-bold">{groupData.name}</h1>
            </div>
            <div className="flex">
              <div className="flex mr-[22px] items-center">
                <span className={"icon-fi-rs-aura mr-1"} />
                <p className="text-sm">2434 Аура</p>
              </div>
              <div className="flex mr-[22px] items-center">
                <span className={"icon-fi-rs-globe mr-1"} />
                <p className="text-sm">Нээлттэй бүлэг</p>
              </div>
              <div className="flex items-center">
                <span className={"icon-fi-rs-group-o mr-1"} />
                <p className="text-sm">{groupData.totals.member} Гишүүн</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-[10px] sm:mt-[73px]">
          {groupData.role_on_group === "ADMIN" ? (
            <Link href={`/group/${groupData.id}/setting`}>
              <a className={"w-full"}>
                <Button
                  className={
                    "rounded-[100px] w-full h-[44px] text-white shadow-none"
                  }
                  skin={"bg-caak-cardinal"}
                  iconPosition={"left"}
                  icon={
                    <div
                      className={
                        "flex items-center justify-center w-[20px] h-[20px] mr-[8px]"
                      }
                    >
                      <span
                        className={
                          "icon-fi-rs-settings-f text-white text-[19px]"
                        }
                      />
                    </div>
                  }
                >
                  Тохиргоо
                </Button>
              </a>
            </Link>
          ) : (
            <>
              <Button
                loading={loading}
                className="h-[36px] w-[124px] rounded-lg text-white text-base font-medium font-inter"
                icon={<span className="icon-fi-rs-add-group-f  mr-1" />}
                iconPosition="left"
                onClick={handleFollow}
                skin={`${
                  groupData.followed
                    ? "bg-caak-generalblack"
                    : "bg-caak-cardinal"
                }`}
              >
                {groupData.followed ? "Нэгдсэн" : "Нэгдэх"}
              </Button>
              <div
                // ref={menuRef}
                // onClick={toggleMenu}
                className={`flex justify-center flex-shrink-0 ml-3 w-[35px] h-[35px] transition ease-linear duration-100 items-center cursor-pointer relative bg-caak-extraLight hover:bg-caak-titaniumwhite rounded-full`}
              >
                <span className="icon-fi-rs-dots text-22px" />
                {/* <DropDown
                // open={isMenuOpen}
                // onToggle={toggleMenu}
                content={
                  <PostMoreMenu
                    groupId={groupData.id}
                    // postId={post.id}
                    // postUser={post.user}
                  />
                }
                className={"top-6 -right-3"}
              /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
