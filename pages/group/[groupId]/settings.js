import { useEffect, useState } from "react";
import Image from "next/image";

import Dummy from "dummyjs";
import { getUserById } from "/src/utility/ApiHelper";
import { useUser } from "/src/context/userContext";
import { withSSRContext } from "aws-amplify";
import { getFileUrl } from "/src/utility/Util";
import { getCategoryList } from "../../../src/graphql-custom/category/queries";
import {
  getGroupUsersByGroup,
  listGroupUsersByGroup,
} from "../../../src/graphql-custom/group/queries";
import {
  getGroupTotal,
  getGroupView,
} from "../../../src/graphql-custom/group/queries";
import { useRouter } from "next/router";
import { getReturnData } from "../../../src/utility/Util";
import GroupInformation from "../../../src/components/group/GroupInformation";
import GroupPrivacy from "../../../src/components/group/GroupPrivacy";
import GroupMemberConfig from "../../../src/components/group/GroupMemberConfig";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  const groupView = await API.graphql({
    query: getGroupView,
    variables: {
      id: query.groupId,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });
  // const resp = await API.graphql({
  //   query: getPostByGroup,
  //   variables: {
  //     group_id: query.groupId,
  //     sortDirection: "DESC",
  //     filter: { status: { eq: "CONFIRMED" } },
  //     limit: 6,
  //   },
  // });

  // const pendingPosts = await API.graphql({
  //   query: getPostByGroup,
  //   variables: {
  //     group_id: query.groupId,
  //     sortDirection: "DESC",
  //     filter: { status: { eq: "PENDING" } },
  //     limit: 6,
  //   },
  // });

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
    query: getCategoryList,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      limit: 6,
      filter: { role: { eq: "MEMBER" } },
    },
  });

  console.log(adminList);

  // const userComments = await API.graphql({
  //   query: listCommentByUser,
  //   variables: {
  //     user_id: userId,
  //     sortDirection: "DESC",
  //   },
  // });

  // const groupTotals = await API.graphql({
  //   query: getGroupTotal,
  //   variables: {
  //     group_id: query.groupId,
  //   },
  // });
  // console.log(groupTotals);

  return {
    props: {
      ssrData: {
        // posts: getReturnData(resp),
        // pendingPosts: getReturnData(pendingPosts),
        groupView: getReturnData(groupView),
        adminList: getReturnData(adminList),
        // userComment: getReturnData(userComments),
        // groupTotals: getReturnData(groupTotals),
      },
    },
  };
}

export default function Settings({ ssrData, ...props }) {
  const data = [
    {
      id: 1,
      icon: <span className="icon-fi-rs-settings text-24px" />,
      title: "Группын тохиргоо",
    },
    {
      id: 2,
      icon: <span className="icon-fi-rs-group-o text-22px" />,
      title: "Гишүүдын тохиргоо",
    },
    {
      id: 3,
      icon: <span className="icon-fi-rs-locker text-22px" />,
      title: "Нууцлал",
    },
  ];
  const router = useRouter();
  const [user, setUser] = useState();
  const { user: signedUser, isLogged } = useUser();
  const [activeIndex, setActiveIndex] = useState(1);

  const [groupData, setGroupData] = useState(ssrData.groupView);
  const [adminList, setAdminList] = useState(ssrData.adminList.items);
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

  useEffect(() => {
    console.log(adminList);
  }, []);

  return user ? (
    <div
      style={{ marginTop: "36px" }}
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
            <Image
              className=" bg-white rounded-[10px]"
              src={
                groupData?.cover
                  ? getFileUrl(groupData?.cover)
                  : getGenderImage(groupData?.gender)
              }
              width={52}
              height={52}
              layout="fixed"
              //   objectFit={"cover"}
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
            className="settingsMenuPanel px-c3  bg-white rounded-lg"
          >
            {data.map(({ icon, title, id }) => (
              <div
                key={id}
                onClick={() => setActiveIndex(id)}
                style={{ marginTop: "30px", marginBottom: "24px" }}
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
            {activeIndex === 1 ? (
              <GroupInformation groupData={groupData} />
            ) : activeIndex === 2 ? (
              <GroupMemberConfig adminList={adminList} />
            ) : activeIndex === 3 ? (
              <GroupPrivacy groupData={groupData} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
