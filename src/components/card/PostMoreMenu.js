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
import {
  createSavedPost,
  deleteSavedPost,
} from "../../graphql-custom/post/mutation";
import { updatePost } from "../../graphql-custom/post/mutation";

export default function PostMoreMenu({
  postUser,
  post,
  groupId,
  handleToast,
  setIsOpen,
  setOpen
}) {
  const { user, isLogged } = useUser();
  const router = useRouter();
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

  useEffect(() => {
    getGroupFollow();
    // eslint-disable-next-line
  }, []);

  const savePost = async () => {
    await API.graphql(
      graphqlOperation(createSavedPost, {
        input: {
          post_id: post.id,
          user_id: user.id,
          id: `${post.id}#${user.id}`,
        },
      })
    );
    post.isSaved = true;
    handleToast({ param: "saved" });
  };

  const unSavePost = async () => {
    await API.graphql(
      graphqlOperation(deleteSavedPost, {
        input: {
          id: `${post.id}#${user.id}`,
        },
      })
    );
    post.isSaved = false;
    handleToast({ param: "unSaved" });
  };

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
    handleToast({ param: "follow" });
  };

  const leaveGroup = async () => {
    await API.graphql(
      graphqlOperation(deleteGroupUsers, {
        input: { id: `${groupId}#${user.id}` },
      })
    );
    setGroupFollowed(false);
    handleToast({ param: "unfollow" });
  };

  return !loading ? (
    <div className={"dropdown-item-wrapper"}>    
      {!groupFollowed && (
        <div
          onClick={() =>
            !isLogged
              ? router.push(
                  {
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      signInUp: "signIn",
                      isModal: true,
                      prevPath: router.asPath,
                    },
                  },
                  `/signInUp/signIn`,
                  { shallow: true }
                )
              : groupFollowed
              ? leaveGroup()
              : joinGroup()
          }
          className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
        >
          <span
            className={"icon-fi-rs-add-group-f  mr-px-12 w-c1  text-16px"}
          />
          <p className="text-14px text-caak-extraBlack">
            {groupFollowed ? "Группээс гарах" : "Группт нэгдэх"}
          </p>
        </div>
      )}

      {isLogged && postUser.id === user.id && (
        <div
          className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          onClick={() =>
            router.push({
              pathname: `/post/edit/${post.id}`,
            })
          }
        >
          <span className={"icon-fi-rs-edit-f mr-px-12 w-c1  text-16px"} />
          <p className="text-14px text-caak-extraBlack">Постыг засах</p>
        </div>
      )}

      {isLogged && postUser.id === user.id && (
        <div
          className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          onClick={() =>
            // postHandler({
            //     id: post.id,
            //     status: "ARCHIVED",
            // })
            setOpen(true)
        } 
        >
          <span className={"icon-fi-rs-delete-f mr-px-12 w-c1  text-16px"} />
          <p className="text-14px text-caak-extraBlack">Постыг устгах</p>
        </div>
      )}

      {isLogged &&
        postUser.id !== user.id &&
        (post.isSaved ? (
          <div
            onClick={() => unSavePost()}
            className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          >
            <span className={"icon-fi-rs-save-f mr-px-12 w-c1  text-16px"} />
            <p className="text-14px text-caak-extraBlack">Хадгалагдсан</p>
          </div>
        ) : (
          <div
            onClick={() => savePost()}
            className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
          >
            <span className={"icon-fi-rs-save-o mr-px-12 w-c1  text-16px"} />
            <p className="text-14px text-caak-extraBlack">Хадгалах</p>
          </div>
        ))}
      <div
        onClick={() => {
          isLogged
            ? setIsOpen(true)
            : router.push(
                {
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    signInUp: "signIn",
                    isModal: true,
                    prevPath: router.asPath,
                  },
                },
                `/signInUp/signIn`,
                { shallow: true }
              );
        }}
        className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
      >
        <span className={"icon-fi-rs-flag mr-px-12 w-c1  text-16px"} />
        <p className="text-14px text-caak-extraBlack">Репорт</p>
      </div>
      {/* <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
        <span className={"icon-fi-rs-hide mr-px-12 w-c1  text-16px"} />
        <p className="text-14px text-caak-extraBlack">
          Дахин харагдуулахгүй
        </p>
      </div> */}
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
