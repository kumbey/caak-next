import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import SelectGroup from "./SelectGroup";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useRouter } from "next/router";
import { useUser } from "../../src/context/userContext";
import {
  getGroupView,
  listGroupsForAddPost,
} from "../../src/graphql-custom/group/queries";
import { closeModal, getReturnData } from "../../src/utility/Util";
import { getPost } from "../../src/graphql-custom/post/queries";
import { crtPost, pdtPost } from "../../src/apis/post";
import Backdrop from "../../src/components/backdrop";
import UploadedMediaEdit from "../../src/components/input/UploadedMediaEdit";
import EditNewPostCaption from "../../src/components/input/EditNewPostCaption";
import DropZoneWithCaption from "../../src/components/input/DropZoneWithCaption";

const AddPost = () => {
  const history = useRouter();
  // const { state } = useLocation();
  const { postId, groupId } = history.query;
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(0);
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

  // const addPostClickOutSideRef = useClickOutSide(() => {
  //   history.goBack();
  // });
  const [post, setPost] = useState({
    id: postId,
    title: "",
    commentType: true,
    status: "PENDING",
    user_id: user.attributes.sub,
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
      if (data.user_id === user.sysUser.id) {
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
        await crtPost(post, user.sysUser.id);
      } else if (postId) {
        await pdtPost(post, user.sysUser.id);
      } else {
        await crtPost(post, user.sysUser.id);
      }

      setLoading(false);
      // closeModal(history, state);

      history.push(
        { pathname: `/user/${user.sysUser.id}/profile` },
        { index: 2 }
      );
      // setActiveIndex(2)
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  return !permissionDenied ? (
    <Backdrop>
      <div
        className={`flex justify-center items-center h-screen md:h-auto md:mt-10 md:mb-10 h-full`}
      >
        <div
          // ref={addPostClickOutSideRef}
          className={`flex flex-col w-screen md:max-w-xl bg-white mx-auto rounded-square shadow-card h-full md:h-auto`}
        >
          {post.items.length !== 0 ? (
            !isEditing ? (
              <Fragment>
                <Header
                  hideDivider
                  iconRight={
                    <Fragment>
                      <span
                        onClick={() => closeModal(history)}
                        className={
                          "hidden md:block icon-fi-rs-close absolute right-4 text-12px cursor-pointer bg-caak-titaniumwhite p-2 rounded-full"
                        }
                      />
                      <span
                        className={
                          "md:hidden absolute right-4 font-medium text-15px text-caak-bleudefrance"
                        }
                      >
                        Дараах
                      </span>
                    </Fragment>
                  }
                  title={postId ? "Пост засах" : "Пост нэмэх"}
                  iconLeft={
                    <span
                      onClick={() => closeModal(history)}
                      className={
                        "icon-fi-rs-back absolute left-4 md:invisible text-20px cursor-pointer rounded-full"
                      }
                    />
                  }
                />
                <SelectGroup
                  containerClassName={"mt-2"}
                  groupData={groupData}
                  isGroupVisible={isGroupVisible}
                  setIsGroupVisible={setIsGroupVisible}
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                  setPost={setPost}
                  post={post}
                />
                <UploadedMediaEdit
                  setPost={setPost}
                  post={post}
                  setIsEditing={setIsEditing}
                  setCurrentEditingIndex={setCurrentEditingIndex}
                  loading={loading}
                  uploadPost={uploadPost}
                />
              </Fragment>
            ) : (
              <Fragment>
                <Header
                  iconLeft={
                    <span
                      onClick={() => setIsEditing(false)}
                      className={
                        "icon-fi-rs-back absolute text-12px w-7 h-7 left-3 top-1/4 cursor-pointer text-center bg-caak-titaniumwhite p-2 rounded-full"
                      }
                    />
                  }
                  title={"Зураг/Видеоний тайлбар"}
                />
                <EditNewPostCaption
                  setPost={setPost}
                  post={post}
                  setCurrentEditingIndex={setCurrentEditingIndex}
                  currentEditingIndex={currentEditingIndex}
                  setIsEditing={setIsEditing}
                />
              </Fragment>
            )
          ) : (
            <Fragment>
              <Header
                hideDivider
                iconRight={
                  <span
                    onClick={() => closeModal(history, state)}
                    className={
                      "icon-fi-rs-close absolute text-12px right-3 top-1/4 cursor-pointer bg-caak-titaniumwhite p-2 rounded-full"
                    }
                  />
                }
                title={"Пост нэмэх"}
              />
              <SelectGroup
                containerClassName={"mt-2"}
                groupData={groupData}
                isGroupVisible={isGroupVisible}
                setIsGroupVisible={setIsGroupVisible}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                setPost={setPost}
                post={post}
              />
              <DropZoneWithCaption post={post} setPost={setPost} />
            </Fragment>
          )}

          <div className={"flex flex-row pb-4 px-4"}>
            {/*<Button*/}
            {/*  icon={*/}
            {/*    <span*/}
            {/*      className={*/}
            {/*        "icon-fi-rs-draft mr-1.5 text-caak-generalblack text-20px"*/}
            {/*      }*/}
            {/*    />*/}
            {/*  }*/}
            {/*  iconPosition={"left"}*/}
            {/*  className={*/}
            {/*    "white text-caak-generalblack py-3 w-1/6 ml-1 mt-4 justify-center text-15px mr-2"*/}
            {/*  }*/}
            {/*>*/}
            {/*  Ноорог*/}
            {/*</Button>*/}
            {/* <Button
              icon={
                <span
                  className={
                    "icon-fi-rs-scheduled mr-1.5 text-caak-generalblack text-20px "
                  }
                />
              }
              iconPosition={"left"}
              className={
                "white  text-caak-generalblack py-3 w-4/5 ml-1 mt-4 justify-center text-15px mr-2"
              }
            >
              Хугацаа оруулах
            </Button> */}
            {/*<Button className={"mr-2 mt-4 w-full text-17px"}>Нийтлэх</Button>*/}
          </div>
        </div>
      </div>
    </Backdrop>
  ) : null;
};
export default AddPost;
