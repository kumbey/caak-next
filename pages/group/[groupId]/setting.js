import { useEffect, useState } from "react";
import { withSSRContext } from "aws-amplify";
import { getReturnData } from "../../../src/utility/Util";
import { getPostByGroup } from "../../../src/graphql-custom/post/queries";
import { getGroupView } from "../../../src/graphql-custom/group/queries";
import GroupHeader from "../../../src/components/group/GroupHeader";
import GroupLayout from "../../../src/components/layouts/group";
import Button from "../../../src/components/button";
import { useUser } from "../../../src/context/userContext";
import { useRouter } from "next/router";
import GroupPostItem from "../../../src/components/group/GroupPostItem";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user = null;

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }

  const resp = await API.graphql({
    query: getPostByGroup,
    variables: {
      group_id: query.groupId,
      sortDirection: "DESC",
      filter: { status: { eq: "PENDING" } },
      limit: 6,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  const groupView = await API.graphql({
    query: getGroupView,
    variables: {
      id: query.groupId,
    },
    authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  });

  return {
    props: {
      ssrData: {
        posts: getReturnData(resp),
        groupData: getReturnData(groupView),
      },
    },
  };
}

const Setting = ({ ssrData, ...props }) => {
  const router = useRouter();
  const { isLogged, user, signedUser } = useUser();

  const [posts, setPosts] = useState(ssrData.posts.items);
  const [groupData, setGroupData] = useState(ssrData.groupData);

  const [activeIndex, setActiveIndex] = useState(0);



  return (
    <>
      <GroupHeader groupData={groupData} />
      <GroupLayout groupData={groupData} columns={2}>
        <div className="mt-c2 flex items-center  justify-around w-full">
          <div className="md:flex-row flex flex-col">
            {isLogged ? (
              <>
                <span className="icon-fi-rs-pending text-22px" />
                <p className="text-17px ml-px-10 font-medium">
                  Хүлээгдэж буй постууд
                </p>
              </>
            ) : null}
          </div>
          <select className="md:block text-15px w-c132 text-caak-generalblack hidden font-semibold bg-transparent border-0 cursor-pointer">
            <option>Илүү ихийг</option>
            {/* <option>Илүү ихийг</option>
          <option>Илүү ихийг</option> */}
          </select>
        </div>
        <div className=" flex flex-col items-center justify-center">
          {posts.length > 0 &&
            posts.map((post, index) => {
              return (
                <GroupPostItem
                  key={index}
                  imageSrc={post?.items?.items[0]?.file}
                  video={post?.items?.items[0]?.file?.type?.startsWith("video")}
                  post={post}
                  className="ph:mb-4 sm:mb-4"
                />
              );
            })}
        </div>
      </GroupLayout>
    </>
  );
};
export default Setting;
