import { useUser } from "../../context/userContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Consts from "../../utility/Consts";
import {
  createGroupUsers,
  deleteGroupUsers,
} from "../../graphql-custom/GroupUsers/mutation";
import { useEffect, useState } from "react";
import { getGroupFollowed } from "../../graphql-custom/group/queries";
import Loader from "../loader";
import { useRouter } from "next/router";

export default function MemberMoreMenu({ postUser, postId, groupId }) {
  const { user, isLogged } = useUser();
  const history = useRouter();
  const [groupFollowed, setGroupFollowed] = useState(null);
  const [loading, setLoading] = useState(false);

  const getGroupFollow = async () => {
    setLoading(true);
    const resp = await API.graphql({
      query: getGroupFollowed,
      authMode: `${isLogged ? Consts.loggedUserAuth : Consts.publicUserAuth}`,
      variables: {
        id: groupId,
      },
    });
    setGroupFollowed(resp.data.getGroup.followed);
    setLoading(false);
  };

  // useEffect(() => {
  //   getGroupFollow();
  //   // eslint-disable-next-line
  // }, []);

  const joinGroup = async () => {
    await API.graphql(
      graphqlOperation(createGroupUsers, {
        input: {
          group_id: groupId,
          user_id: user.id,
          id: `${groupId}#${user.id}`,
          role: "MEMBER",
        },
      })
    );
    setGroupFollowed(true);
  };

  const leaveGroup = async () => {
    await API.graphql(
      graphqlOperation(deleteGroupUsers, {
        input: { id: `${groupId}#${user.id}` },
      })
    );
    setGroupFollowed(false);
  };

  return !loading ? (
    <div className={"dropdown-item-wrapper "}>
      {/* <div
        onClick={() =>
          !isLogged
            ? history.push({
                pathname: `/login`,
              })
            : groupFollowed
            ? leaveGroup()
            : joinGroup()
        }
        className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-add-group-f  mr-px-12 w-c1  text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">
          {groupFollowed ? "???????????????? ??????????" : "???????????? ??????????"}
        </p>
      </div> */}
      {isLogged && (
        // && postUser.id === user.id &&
        <div
          className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          // onClick={() =>
          //   history.push({
          //     pathname: `/post/edit/${postId}`,
          //   })
          // }
        >
          <span className={"icon-fi-rs-flag mr-px-12 w-c1  text-16px"} />
          <p className="text-14px text-caak-extraBlack font-roboto">????????????</p>
        </div>
      )}

      <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
        <span
          className={"icon-fi-rs-block-user mr-px-12 w-c1  w-c1 text-16px"}
        />
        <p className="text-14px text-caak-extraBlack font-roboto">???????? ????????</p>
      </div>
    </div>
  ) : (
    <div className={"dropdown-item-wrapper"}>
      <Loader
        containerClassName={"self-center px-4"}
        className={`bg-caak-primary ${loading ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
