import { useEffect, useState } from "react";
import SelectGroup from "../../../src/components/addpost/SelectGroup";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useRouter } from "next/router";
import { useUser } from "../../../src/context/userContext";
import {
  getGroupView,
  listGroupsForAddPost,
} from "../../../src/graphql-custom/group/queries";
import { getReturnData } from "../../../src/utility/Util";
import { getPost } from "../../../src/graphql-custom/post/queries";
import { crtPost, pdtPost } from "../../../src/apis/post";
import UploadedMediaEdit from "../../../src/components/input/UploadedMediaEdit";
import DropZoneWithCaption from "../../../src/components/input/DropZoneWithCaption";
import useAddPostLayout from "../../../src/hooks/useAddPostLayout";
import Button from "../../../src/components/button";
import WithAuth from "../../../src/middleware/auth/WithAuth";
import Post from "../view/[id]";

const AddPost = () => {
  const AddPostLayout = useAddPostLayout();
  const history = useRouter();
  // const { state } = useLocation();
  const { postId, groupId } = history.query;
  const { user } = useUser();

  const [isGroupVisible, setIsGroupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [loading, setLoading] = useState(false);
  const [groupData, setGroupData] = useState({
    adminModerator: [],
    member: [],
    unMember: [],
  });
  const [permissionDenied, setPermissionDenied] = useState(true);

  const [post, setPost] = useState({
    id: postId,
    title: "",
    description: "",
    commentType: true,
    status: "PENDING",
    user_id: user.id,
    group_id: "",
    category_id: "",
    items: [],
  });

  useEffect(() => {
    if (postId) {
      getGroups();
      loadPost(postId);
    } else if (groupId) {
      getGroup(groupId);
      setSelectedGroupId(groupId);
      setPermissionDenied(false);
    } else {
      getGroups();
      setSelectedGroupId(groupId);
      setPermissionDenied(false);
    }

    console.log(user)

    const handler = (e) => {
      if (e.keyCode === 27) {
        history.back();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      post.group_id = selectedGroup.id;
      post.category_id = selectedGroup.category_id;
    }
    // eslint-disable-next-line
  }, [selectedGroup]);

  useEffect(() => {
    if (groupData !== undefined && selectedGroupId) {
      if (groupData.member) {
        const grData = [];
        for (const key in groupData) {
          grData.push(...groupData[key]);
        }
        setSelectedGroup(grData.find((item) => item.id === selectedGroupId));
      } else {
        setSelectedGroup(groupData);
      }
    }
    // eslint-disable-next-line
  }, [groupData, selectedGroupId]);

  const getGroup = async (id) => {
    try {
      let resp = await API.graphql(graphqlOperation(getGroupView, { id }));
      resp = getReturnData(resp);
      setGroupData(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getGroups = async () => {
    try {
      const grData = {
        adminModerator: [],
        member: [],
      };

      let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));

      resp = getReturnData(resp).items;

      for (let i = 0; i < resp.length; i++) {
        const item = resp[i];
        if (item.role_on_group === "MEMBER") {
          grData.member.push(item);
        } else if (
          item.role_on_group === "ADMIN" ||
          item.role_on_group === "MODERATOR"
        ) {
          grData.adminModerator.push(item);
        }
      }

      setGroupData(grData);
    } catch (ex) {
      console.log(ex);
    }
  };

  const loadPost = async (id) => {
    try {
      const resp = await API.graphql(graphqlOperation(getPost, { id: id }));
      const { items, ...data } = resp.data.getPost;
      if (data.user_id === user.id) {
        setPermissionDenied(false);
        setSelectedGroupId(data.group_id);
        setPost({ ...data, items: items.items });
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const uploadPost = async () => {
    try {
      setLoading(true);
      if (groupId === "new") {
        await crtPost(post, user.id);
      } else if (postId) {
        await pdtPost(post, user.id);
      } else {
        await crtPost(post, user.id);
      }

      setLoading(false);
      // closeModal(history, state);

      history.push({ pathname: `/user/${user.id}/profile` }, { index: 2 });
      // setActiveIndex(2)
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  return !permissionDenied ? (
    <div className={"addPostPadding"}>
      <AddPostLayout selectedGroup={selectedGroup}>
        <div className={`flex flex-col justify-center items-center pb-[38px]`}>
          <div
            className={`flex flex-col  bg-white  rounded-square shadow-card h-full w-full`}
          >
            <SelectGroup
              containerClassName={"mt-[28px]"}
              groupData={groupData}
              isGroupVisible={isGroupVisible}
              setIsGroupVisible={setIsGroupVisible}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              setPost={setPost}
              post={post}
            />
            {post.items.length !== 0 ? (
              <UploadedMediaEdit
                setPost={setPost}
                post={post}
                loading={loading}
                uploadPost={uploadPost}
              />
            ) : (
              <DropZoneWithCaption post={post} setPost={setPost} />
            )}

            <div className={"flex flex-row pb-4 px-4 justify-end"}>
              <Button
                className={
                  "font-medium text-[16px] mr-2 mt-4 text-17px border border-caak-titaniumwhite h-[44px]"
                }
              >
                Болих
              </Button>
              <Button
                onClick={() => uploadPost()}
                // disabled
                className={
                  "mr-2 mt-4 text-17px border border-caak-titaniumwhite w-[190px] h-[44px]"
                }
              >
                Нийтлэх
              </Button>
            </div>
          </div>
        </div>
        {/*</Backdrop>*/}
      </AddPostLayout>
    </div>
  ) : null;
};
export default WithAuth(AddPost)
