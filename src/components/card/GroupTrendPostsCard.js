import GroupTrendPostsCardItem from "./GroupTrendPostsCardItem";
import { API } from "aws-amplify";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { getReturnData } from "../../utility/Util";
import { listPostByGroupOrderByReactions } from "../../graphql-custom/group/queries";

const GroupTrendPostsCard = ({ groupId, maxItems }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLogged } = useUser();

  const fetchTrendPosts = async (nextToken) => {
    try {
      let resp = await API.graphql({
        query: listPostByGroupOrderByReactions,
        variables: {
          groupAndStatus: `${groupId}#CONFIRMED`,
          sortDirection: "DESC",
          limit: maxItems,
        },
        nextToken: nextToken,
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setPosts(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchTrendPosts().then(() => {
      setLoading(false)
    });
    // eslint-disable-next-line
  }, [groupId]);

  return !loading ? (
    <div className={"flex flex-col bg-white rounded-square p-[18px] mb-[16px]"}>
      <p className={"text-caak-extraBlack font-semibold text-[15px] mb-[18px]"}>
        Тренд постууд
      </p>
      {posts.items.map((item, index) => {
        if (index < maxItems)
          return <GroupTrendPostsCardItem item={item.post} key={index} />;
      })}
    </div>
  ) : null;
};

export default GroupTrendPostsCard;
