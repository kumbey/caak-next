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
import { crtPost } from "../../../src/apis/post";
import UploadedMediaEdit from "../../../src/components/input/UploadedMediaEdit";
import DropZoneWithCaption from "../../../src/components/input/DropZoneWithCaption";
import useAddPostLayout from "../../../src/hooks/useAddPostLayout";
import Button from "../../../src/components/button";
import WithAuth from "../../../src/middleware/auth/WithAuth";
import Head from "next/head";
import Consts from "../../../src/utility/Consts";

const AddPost = () => {
  const AddPostLayout = useAddPostLayout();
  const router = useRouter();
  const { postId, groupId } = router.query;
  const { user } = useUser();

  const [isGroupVisible, setIsGroupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [loading, setLoading] = useState(false);
  const [groupData, setGroupData] = useState({
    adminModerator: [],
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

  const getGroup = async ({ id, setGroupData }) => {
    try {
      let resp = await API.graphql(graphqlOperation(getGroupView, { id }));
      resp = getReturnData(resp);
      if (setGroupData) {
        setGroupData(resp);
      } else {
        return resp;
      }
      return resp;
    } catch (ex) {
      console.log(ex);
    }
  };

  const getGroups = async () => {
    try {
      const grData = {
        adminModerator: [],
        unMember: [],
      };

      let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));

      resp = getReturnData(resp).items;

      for (let i = 0; i < resp.length; i++) {
        const item = resp[i];
        if (item.role_on_group === "NOT_MEMBER") {
          grData.unMember.push(item);
        } else {
          grData.adminModerator.push(item);
        }
      }

      setGroupData(grData);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (postId) {
      getGroups();
      loadPost(postId);
    } else if (groupId) {
      getGroup({ id: groupId, setGroupData });
      setSelectedGroupId(groupId);
      setPermissionDenied(false);
    } else {
      getGroups({ id: groupId, setGroupData });
      setSelectedGroupId(groupId);
      setPermissionDenied(false);
    }

    const handler = (e) => {
      if (e.keyCode === 27) {
        router.back();
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
      if (groupData.adminModerator) {
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
    if (post.items.length === 0) {
      alert("Пост хоосон байна");
      return;
    }
    if (!post.title) {
      alert("Гарчиг бичнэ үү");
      return;
    }
    if (selectedGroup) {
      const resp = await getGroup({ id: selectedGroup.id });
      if (resp.role_on_group === "NOT_MEMBER") {
        alert("Та уг группт нэгдээгүй байна");
        return;
      }
      try {
        setLoading(true);
        await crtPost(post, user.id);

        setLoading(false);

        router.push(
          {
            pathname: `/user/${user.id}/dashboard`,
            query: {
              activeIndex: 1,
            },
          },
          `/user/${user.id}/dashboard`,
          { shallow: true }
        );
      } catch (ex) {
        ex.errors.map((error) => {
          if (error.message.includes("IndexKey: group_id")) {
            alert("Группээ сонгоно уу");
          }
        });

        setLoading(false);
        console.log(ex);
      }
    } else {
      alert("Группээ сонгоно уу");
    }
  };
  return !permissionDenied ? (
    <>
      <Head>
        <title>Шинэ пост нэмэх - {Consts.siteMainTitle}</title>
      </Head>
      <div className={"addPostPadding"}>
        <AddPostLayout selectedGroup={selectedGroup}>
          <div
            className={`flex flex-col justify-center items-center pb-[38px]`}
          >
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
                  selectedGroup={selectedGroup}
                  add
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
                  onClick={() => router.back()}
                  className={
                    "font-medium text-[16px] mr-2 mt-4 text-17px border border-caak-titaniumwhite h-[44px]"
                  }
                >
                  Болих
                </Button>
                <Button
                  onClick={() => uploadPost()}
                  loading={loading}
                  skin={"white"}
                  className={
                    "mr-2 mt-4 shadow-sm text-black text-[17px] font-medium border border-caak-titaniumwhite w-[190px] h-[44px] justify-center"
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
    </>
  ) : null;
};
export default WithAuth(AddPost);
