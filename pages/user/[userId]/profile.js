import { withSSRContext } from "aws-amplify";
import { getUser } from "../../../src/graphql-custom/user/queries";
import { getReturnData } from "../../../src/utility/Util";
import { useEffect, useState } from "react";
import useModalLayout from "../../../src/hooks/useModalLayout";
import FeedSortButtons from "../../../src/components/navigation/FeedSortButtons";
import { userProfileType } from "../../../src/components/navigation/sortButtonTypes";
import UserPostsCard from "../../../src/components/card/UserProfile/UserPostsCard";
import { getPostByUser } from "../../../src/graphql-custom/post/queries";

export async function getServerSideProps({ req, query }) {
  const { API, Auth } = withSSRContext({ req });
  const userId = query.userId;

  let user = null
  try{
    user = await Auth.currentAuthenticatedUser()
  }catch(ex){
    user = null
  }

  const getPostByUserId = async () => {
    const resp = await API.graphql({
      query: getPostByUser,
      authMode: user
        ? "AMAZON_COGNITO_USER_POOLS"
        : "AWS_IAM",
      variables: {
        user_id: userId,
        sortDirection: "DESC",
        filter: { status: { eq: "CONFIRMED" } },
      },
    });
    return getReturnData(resp);
  };
  const getUserById = async () => {
    const resp = await API.graphql({
      query: getUser,
      authMode: user
        ? "AMAZON_COGNITO_USER_POOLS"
        : "AWS_IAM",
      variables: { id: userId },
    });
    return getReturnData(resp);
  };
  try {
    return {
      props: {
        ssrData: {
          user: await getUserById(),
          posts: await getPostByUserId(),
        },
      },
    };
  } catch (ex) {
    console.log(ex);
  }
}

const Profile = ({ ssrData }) => {
  const [fetchedUser, setFetchedUser] = useState(ssrData.user);
  const [posts, setPosts] = useState(ssrData.posts);
  const [sortType, setSortType] = useState("POST");

  useEffect(() => {
    setPosts(ssrData.posts);
  }, [ssrData.posts]);

  useEffect(() => {
    setFetchedUser(ssrData.user);
  }, [ssrData.user]);

  const ProfileLayout = useModalLayout({ layoutName: "userProfile" });
  return (
    <ProfileLayout user={fetchedUser}>
      <div className={"pt-[42px]"}>
        <FeedSortButtons
          iconSize={"text-[17px]"}
          iconContainerSize={"w-[20px] h-[20px]"}
          textClassname={"text-[15px] font-medium"}
          containerClassname={"mb-[20px]"}
          items={userProfileType}
          setSortType={setSortType}
          sortType={sortType}
          direction={"row"}
        />
        <div className={"userPostsContainer"}>
          {posts.items.map((items, index) => {
            if (
              items.items.items[0].file.type.startsWith("video") &&
              sortType === "VIDEO"
            ) {
              return <UserPostsCard key={index} post={items} />;
            } else if (sortType === "POST") {
              return <UserPostsCard key={index} post={items} />;
            }
          })}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
