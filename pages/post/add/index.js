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
import toast from "react-hot-toast";
import Consts from "../../../src/utility/Consts";
import PostSuccessModal from "../../../src/components/modals/postSuccessModal";
import AuraModal from "../../../src/components/modals/auraModal";
import { createGroupUsers } from "../../../src/graphql-custom/GroupUsers/mutation";
import { useWrapper } from "../../../src/context/wrapperContext";
import useUpdateEffect from "../../../src/hooks/useUpdateEffect";

const AddPost = () => {
  const AddPostLayout = useAddPostLayout();
  const router = useRouter();
  const { postId, groupId } = router.query;
  const { user } = useUser();

  const [isAuraModalOpen, setIsAuraModalOpen] = useState(false);
  const [isGroupVisible, setIsGroupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [videoDurationError, setVideoDurationError] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [loading, setLoading] = useState(false);
  const [newPostId, setNewPostId] = useState();
  const [nestedToast, setNestedToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [groupData, setGroupData] = useState({
    adminModerator: [],
    unMember: [],
    member: [],
  });
  const [permissionDenied, setPermissionDenied] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { setNavBarTransparent, setIsMobileMenuOpen } = useWrapper();
  const [valid, setValid] = useState(true);
  const [uploadValidation, setUploadValidation] = useState(false);
  const [post, setPost] = useState({
    id: postId,
    title: "",
    description: "",
    commentType: true,
    onlyBlogView: "FALSE",
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
        member: [],
      };

      let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));

      resp = getReturnData(resp).items;

      for (let i = 0; i < resp.length; i++) {
        const item = resp[i];
        if (item.role_on_group === "NOT_MEMBER") {
          grData.unMember.push(item);
        } else if (item.role_on_group === "ADMIN") {
          grData.adminModerator.push(item);
        } else if (item.role_on_group === "ADMIN") {
          grData.adminModerator.push(item);
        } else {
          grData.member.push(item);
        }
      }

      setGroupData(grData);
    } catch (ex) {
      console.log(ex);
    }
  };

  const finish = (role) => {
    if (role === "MEMBER") {
      router.push(
        {
          pathname: `/user/${user.id}/dashboard`,
          query: {
            activeIndex: 1,
          },
        },
        `/user/${user.id}/dashboard`
      );
    } else {
      router.push(
        {
          pathname: `/post/view/${newPostId}`,
        },
        `/post/view/${newPostId}`,
        { shallow: true, scroll: false }
      );
    }
  };

  const followGroup = async () => {
    await API.graphql(
      graphqlOperation(createGroupUsers, {
        input: {
          id: `${selectedGroup.id}#${user.id}`,
          group_id: selectedGroup.id,
          user_id: user.id,
          role: "MEMBER",
        },
      })
    );
  };

  const handleSubmit = async () => {
    await uploadPost(); setLoading(false);
    // setIsEditing(false);
  };
  const toastIcon = {
    icon: (
      <div className="flex items-center">
        <div className=" w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#ffcc00] mr-3">
          <span className="icon-fi-rs-warning text-white" />
        </div>
      </div>
    ),
  };
  const handleToast = ({ param }) => {
    if (param === "isPost") toast.success("Пост хоосон байна.", toastIcon);
    if (param === "isTitle") toast.success("Гарчиг бичнэ үү.", toastIcon);
    if (param === "isFollow")
      toast((t) => (
        <div className={"flex flex-row items-center"}>
          <div className="flex items-center">
            <div className=" w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#ffcc00] mr-3">
              <span className="icon-fi-rs-warning text-white" />
            </div>
          </div>
          <span className={"text-[16px] text-[#363636] mr-[2px]"}>
            {`Та "${selectedGroup.name}" группт нэгдээгүй байна.`}
          </span>
          <div
            className={"cursor-pointer text-caak-primary"}
            onClick={() => {
              followGroup().then(() => {
                toast.success(
                  `Та "${selectedGroup.name}" группт амжилттай нэгдлээ.`,
                  toastIcon
                );
                toast.dismiss(t.id);
                setNestedToast(!nestedToast);
              });
            }}
          >
            нэгдэх
          </div>
        </div>
      ));
    if (param === "isGroup") toast.success("Группээ сонгоно уу.", toastIcon);
  };

  useUpdateEffect(() => {
    const timer = setTimeout(() => {
      toast.dismiss();
    }, 3 * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [nestedToast]);

  useEffect(() => {
    setNavBarTransparent(false);
    if (postId) {
      getGroups();
      loadPost(postId);
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
    if (
      !selectedGroup ||
      !post.title ||
      post.items.length <= 0 ||
      loading ||
      !isEditing
    ) {
      setUploadValidation(true);
    } else {
      setUploadValidation(false);
    }
  }, [selectedGroup, post.title, post.items, loading, isEditing]);

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
    setLoading(true);
    if (post.items.length === 0) {
      handleToast({ param: "isPost" });
      setLoading(false);
      return;
    }
    if (!post.title) {
      handleToast({ param: "isTitle" });
      setValid(false);
      setLoading(false);
      return;
    }

    if (selectedGroup) {
      const resp = await getGroup({ id: selectedGroup.id });
      setSelectedGroup(resp);
      if (resp.role_on_group === "NOT_MEMBER") {
        handleToast({ param: "isFollow" });
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        await crtPost(post, user.id, resp.role_on_group).then((resp) => {
          setNewPostId(getReturnData(resp).id);
        });
        setLoading(false);
        setValid(true);

        setIsSuccessModalOpen(true);
        setIsEditing(false)
      } catch (ex) {
        ex?.errors?.map((error) => {
          if (error.message.includes("IndexKey: group_id")) {
            handleToast({ param: "isGroup" });
          }
        });
        setLoading(false);

        console.log(ex);
      }
    } else {
      handleToast({ param: "isGroup" });
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false)
    //eslint-disable-next-line
  }, [])

  return !permissionDenied ? (
    <>
      <Head>
        <title>Шинэ пост нэмэх - {Consts.siteMainTitle}</title>
      </Head>
      <AuraModal setIsOpen={setIsAuraModalOpen} isOpen={isAuraModalOpen} />
      <div className={"addPostPadding"}>
        <AddPostLayout selectedGroup={selectedGroup}>
          {selectedGroup && (
            <PostSuccessModal
              isOpen={isSuccessModalOpen}
              setIsOpen={setIsSuccessModalOpen}
              role={selectedGroup.role_on_group}
              finish={finish}
              messageTitle={`${
                selectedGroup.role_on_group === "ADMIN" ||
                selectedGroup.role_on_group === "MODERATOR"
                  ? `Таны пост "${selectedGroup.name}" группт амжилттай нийтлэгдлээ.`
                  : `Таны пост "${selectedGroup.name}" группт амжилттай илгээгдлээ.`
              }`}
            />
          )}

          <div
            className={`flex flex-col justify-center items-center pb-[38px]`}
          >
            <div
              className={`flex flex-col  bg-white  rounded-square shadow-card h-full w-full`}
            >
              {/* <div className="flex justify-end mt-[10px] mr-[10px] sm:hidden">
                <p
                  onClick={() => handleSubmit()}
                  className=" font-medium text-white bg-caak-primary p-[5px] rounded-[8px]"
                >
                  Нийтлэх
                </p>
              </div> */}
              <SelectGroup
                containerClassName={"mt-[28px] z-[4]"}
                groupData={groupData}
                isGroupVisible={isGroupVisible}
                setIsGroupVisible={setIsGroupVisible}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                setPost={setPost}
                post={post}
                setIsAuraModalOpen={setIsAuraModalOpen}
                userAura={user.aura}
              />
              {post.items.length !== 0 ? (
                <UploadedMediaEdit
                  selectedGroup={selectedGroup}
                  add
                  setPost={setPost}
                  post={post}
                  loading={loading}
                  uploadPost={uploadPost}
                  valid={valid}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  setVideoDurationError={setVideoDurationError}
                />
              ) : (
                <DropZoneWithCaption setVideoDurationError={setVideoDurationError} post={post} setPost={setPost} />
              )}
              {
                videoDurationError
                ?
                <div className="text-[16px] mx-[22px] my-[5px] text-[#ff0000]">Уучлаарай, таны бичлэг 5 минутаас хэтэрсэн байна</div>
                :
                null
              }
              <div className={"flex flex-row pb-4 px-4 justify-end"}>
                <Button
                  onClick={() => router.back()}
                  className={
                    "font-medium text-[16px] mr-2 mt-4 text-17px w-[116px] border border-caak-titaniumwhite h-[44px]"
                  }
                >
                  Болих
                </Button>
                <Button
                  onClick={() => handleSubmit()}
                  loading={loading}
                  skin={"primary"}
                  disabled={uploadValidation}
                  className={
                    "mr-2 mt-4 shadow-sm text-white text-[16px] font-semibold border border-caak-titaniumwhite w-[190px] h-[44px] justify-center"
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
