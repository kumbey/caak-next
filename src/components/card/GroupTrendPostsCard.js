import GroupTrendPostsCardItem from "./GroupTrendPostsCardItem";
import { API } from "aws-amplify";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import { getReturnData } from "../../utility/Util";
import Loader from "../loader";

const GroupTrendPostsCard = ({ groupId }) => {
  // const [group, setGroup] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLogged } = useUser();

  const getPostsByStatus = async () => {
    try {
      let resp = await API.graphql({
        query: getPostByStatus,
        sortDirection: "DESC",
        variables: {
          status: "CONFIRMED",
          limit: 5
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setPosts(resp);
    } catch (ex) {
      console.log(ex);
    }
  };
  // const getGroupById = async () => {
  //   let resp = await API.graphql({
  //     query: getGroupView,
  //     variables: { id: groupId },
  //     authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
  //   });
  //   resp = getReturnData(resp);
  //   setGroup(resp);
  // };

  useEffect(() => {
    getPostsByStatus().then(() => setLoading(false));
    // getGroupById();
  }, [groupId]);

  return !loading ? (
    <div className={"flex flex-col bg-white rounded-square p-[18px] mb-[16px]"}>
      <p className={"text-caak-extraBlack font-semibold text-[15px] mb-[18px]"}>
        Тренд болж буй постууд
      </p>
      {posts.items.map((item, index) => {
        return <GroupTrendPostsCardItem item={item} key={index} />;
      })}
    </div>
  ) : (
    <Loader className={"bg-caak-primary"} />
  );
};

export default GroupTrendPostsCard;
