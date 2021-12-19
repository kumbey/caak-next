import GroupTopMemberCardItem from "./GroupTopMemberCardItem";
import { API } from "aws-amplify";
import { listUsers } from "../../graphql-custom/user/queries";
import { getReturnData } from "../../utility/Util";
import { useEffect, useState } from "react";

const GroupTopMembersCard = ({ groupId, containerClassname }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    let resp = await API.graphql({
      query: listUsers,
      authMode: "AWS_IAM",
      variables: { limit: 5 },
    });
    resp = getReturnData(resp).items;
    return resp;
  };

  useEffect(() => {
    try {
      getUsers().then((data) => {
        setUsers(data);
        setLoading(false);
      });
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  return !loading ? (
    <div
      className={`${
        containerClassname ? containerClassname : ""
      } flex flex-col w-full max-w-[380px] py-[17px] rounded-square bg-white`}
    >
      <div className={"px-[18px] mb-[10px]"}>
        <p
          className={
            "text-caak-extraBlack text-[15px] tracking-[0.23px] leading-[18px] font-bold"
          }
        >
          Группын шилдэг гишүүд
        </p>
      </div>
      {users.map((user, index) => {
        return <GroupTopMemberCardItem color={"border-caak-flashoforange bg-caak-flashoforange"} user={user} key={index} />;
      })}
      {/*<GroupTopMemberCardItem*/}
      {/*  color={"border-caak-flashoforange bg-caak-flashoforange"}*/}
      {/*/>*/}
      {/*<GroupTopMemberCardItem*/}
      {/*  verified*/}
      {/*  color={"border-caak-fieryflamingo bg-caak-fieryflamingo"}*/}
      {/*/>*/}
      {/*<GroupTopMemberCardItem color={"border-caak-herablue bg-caak-herablue"} />*/}
      {/*<GroupTopMemberCardItem />*/}
      {/*<GroupTopMemberCardItem />*/}
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default GroupTopMembersCard;
