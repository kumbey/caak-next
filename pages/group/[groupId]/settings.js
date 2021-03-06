import { useEffect, useState } from "react";
import Image from "next/image";
import tipsSvg from "/public/assets/images/lifebuoy.svg";

import { getUserById } from "/src/utility/ApiHelper";
import { useUser } from "/src/context/userContext";
import { withSSRContext } from "aws-amplify";
import {checkAdminModerator, getFileUrl, getGenderImage} from "/src/utility/Util";
import { listCategorys } from "../../../src/graphql-custom/category/queries";
import {
  getGroupView,
  listGroupUsersByGroup,
} from "../../../src/graphql-custom/group/queries";
import { useRouter } from "next/router";
import { getReturnData } from "../../../src/utility/Util";
import GroupInformation from "../../../src/components/group/GroupInformation";
import GroupPrivacy from "../../../src/components/group/GroupPrivacy";
import GroupMemberConfig from "../../../src/components/group/GroupMemberConfig";
import GroupRule from "../../../src/components/group/GroupRule";
import Consts from "../../../src/utility/Consts";
import Head from "next/head";
import {useWrapper} from "../../../src/context/wrapperContext";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }

  if (!user) return { notFound: true };

  const groupView = await API.graphql({
    query: getGroupView,
    variables: {
      id: query.groupId,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  const grpData = getReturnData(groupView);
  if (!checkAdminModerator(grpData?.role_on_group)) return { notFound: true };

  const adminList = await API.graphql({
    query: listGroupUsersByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      limit: 6,
      role: { eq: "ADMIN" },
    },
  });
  const moderatorList = await API.graphql({
    query: listGroupUsersByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      limit: 6,
      role: { eq: "MODERATOR" },
    },
  });
  const memberList = await API.graphql({
    query: listGroupUsersByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      limit: 6,
      role: { eq: "MEMBER" },
    },
  });
  const categoryList = await API.graphql({
    query: listCategorys,
    variables: {
      sortDirection: "DESC",
    },
  });


  return {
    props: {
      ssrData: {
        groupView: grpData,
        adminList: getReturnData(adminList),
        moderatorList: getReturnData(moderatorList),
        memberList: getReturnData(memberList),
        categoryList: getReturnData(categoryList),
      },
    },
  };
}

export default function Settings({ ssrData }) {
  const data = [
    {
      id: 0,
      icon: <span className="icon-fi-rs-settings-o text-[24px]" />,
      title: "?????????????? ????????????????",
    },
    {
      id: 1,
      icon: <span className="icon-fi-rs-rule text-24px" />,
      title: "??????????",
    },
    {
      id: 2,
      icon: <span className="icon-fi-rs-group-o text-22px" />,
      title: "???????????????? ????????????????",
    },
    {
      id: 3,
      icon: <span className="icon-fi-rs-locker text-22px" />,
      title: "??????????????",
    },
  ];
  const router = useRouter();
  const [user, setUser] = useState();
  const { user: signedUser, isLogged } = useUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const {setNavBarTransparent} = useWrapper()

  const [groupData] = useState(ssrData.groupView);
  const [memberList] = useState(ssrData.memberList.items);
  const [adminModeratorList] = useState([
    ...ssrData.adminList.items,
    ...ssrData.moderatorList.items,
  ]);

  const [categoryList] = useState(ssrData.categoryList.items);

  useEffect(() => {
    try {
      if (isLogged) {
        getUserById({
          id: signedUser.id,
          setUser,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
      } else {
        router.back();
      }
    } catch (ex) {
      console.log(ex);
    }
    // eslint-disable-next-line
  }, [user, signedUser.id]);

  useEffect(()=> {
    setNavBarTransparent(false)
  },[setNavBarTransparent])

  return user ? (
    <>
      <Head>
        <title>
          {groupData.name} / ???????????????? - {Consts.siteMainTitle}
        </title>
      </Head>
      <div
        style={{ marginTop: "90px" }}
        className="flex justify-center  items-center w-full px-4 md:px-6 max-w-4xl mx-auto"
      >
        <div className="flex flex-col w-full settingsPanel">
          <div className="flex items-center bg-transparent">
            <span
              onClick={() => router.back()}
              className="icon-fi-rs-back bg-caak-titaniumwhite flex items-center justify-center rounded-full cursor-pointer mr-5 text-18px"
              style={{ height: "48px", width: "48px" }}
            />
            <div className={"w-[52px] h-[52px] mr-[8px] relative"}>
              <img
                className=" bg-white rounded-[10px] object-cover w-full h-full"
                src={
                  groupData?.cover
                    ? getFileUrl(groupData?.cover)
                    : getGenderImage(groupData?.gender).src
                }
                width={52}
                height={52}
                // objectFit={"cover"}
                alt="#"
              />
            </div>

            <p className="text-22px font-inter font-semibold to-caak-generalblack">
              {groupData.name}
            </p>
            {/* {groupData.verified && (
            <div
              className={
                "w-[18px] h-[18px] flex items-center justify-center ml-[5px]"
              }
            >
              <span className={"icon-fi-rs-verified text-[16px]"} />
            </div>
          )} */}
          </div>
          <div className=" sm:justify-between md:justify-between lg:justify-center  2xl:justify-start 3xl:justify-center  flex flex-col md:flex-row  w-full">
            <div
              style={{ marginTop: "24px" }}
              className="settingsMenuPanel px-c3 bg-white rounded-lg py-[30px]"
            >
              {data.map(({ icon, title, id }) => (
                <div
                  key={id}
                  onClick={() => setActiveIndex(id)}
                  style={{ marginBottom: "20px" }}
                  className={`flex items-center cursor-pointer 
                                    ${
                                      id === activeIndex
                                        ? "text-caak-primary"
                                        : "text-caak-generalblack"
                                    }`}
                >
                  {icon}
                  <p className="text-17px ml-px-10 font-medium">{title}</p>
                </div>
              ))}
            </div>
            <div
              style={{ marginTop: "24px" }}
              className="md:ml-c11 sm:ml-0 mb-c11 bg-white rounded-lg settingsDiv"
            >
              {activeIndex === 0 ? (
                <GroupInformation
                  categoryList={categoryList}
                  groupData={groupData}
                />
              ) : activeIndex === 1 ? (
                <GroupRule groupData={groupData} />
              ) : // ) : activeIndex === 2 ? (
              //     <GroupCaution groupData={groupData} />
              activeIndex === 2 ? (
                <GroupMemberConfig
                  adminModeratorList={adminModeratorList}
                  memberList={memberList}
                />
              ) : activeIndex === 3 ? (
                <GroupPrivacy groupData={groupData} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
