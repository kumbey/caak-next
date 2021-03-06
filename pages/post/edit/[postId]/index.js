import useAddPostLayout from "../../../../src/hooks/useAddPostLayout";
import { useRouter } from "next/router";
import { useUser } from "../../../../src/context/userContext";
import { useEffect, useState } from "react";
import { getReturnData } from "../../../../src/utility/Util";
import { withSSRContext } from "aws-amplify";
import {
  getGroupView,
  listGroupsForAddPost,
} from "../../../../src/graphql-custom/group/queries";
import { getPost } from "../../../../src/graphql-custom/post/queries";
import { pdtPost } from "../../../../src/apis/post";
import SelectGroup from "../../../../src/components/addpost/SelectGroup";
import UploadedMediaEdit from "../../../../src/components/input/UploadedMediaEdit";
import DropZoneWithCaption from "../../../../src/components/input/DropZoneWithCaption";
import Button from "../../../../src/components/button";
import WithAuth from "../../../../src/middleware/auth/WithAuth";
import API from "@aws-amplify/api";
import toast from "react-hot-toast";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import PostSuccessModal from "../../../../src/components/modals/postSuccessModal";
import Consts from "../../../../src/utility/Consts";
import Head from "next/head";
import { useWrapper } from "../../../../src/context/wrapperContext";
import { createGroupUsers } from "../../../../src/graphql-custom/GroupUsers/mutation";
import useUpdateEffect from "../../../../src/hooks/useUpdateEffect";

export async function getServerSideProps({ req, res, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user;
  let isSuperAdmin;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  if (!user) {
    return { notFound: true };
  }
  const getGroups = async () => {
    try {
      const grData = {
        adminModerator: [],
        unMember: [],
        member: [],
      };

      let resp = await API.graphql({
        query: listGroupsForAddPost,
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
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
      return grData;
    } catch (ex) {
      console.log(ex);
    }
  };

  const getPostById = async () => {
    let resp = await API.graphql({
      query: getPost,
      variables: {
        id: query.postId,
      },
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });
    resp = getReturnData(resp);
    return resp;
  };

  const post = await getPostById();
  if (!post) {
    return { notFound: true };
  }

  if (post.user.id !== user.attributes.sub) {
    isSuperAdmin =
      user?.signInUserSession.accessToken.payload["cognito:groups"].includes(
        "caak-admin"
      );
    if (
      isSuperAdmin &&
      (post.owned === "CAAK" ||
        Consts.translatorUserId.some((id) => post.user.id === id))
    ) {
      const groups = await getGroups();
      return {
        props: {
          ssrData: {
            post: post,
            groups: groups,
          },
        },
      };
    }
    return { notFound: true };
  }

  const groups = await getGroups();

  return {
    props: {
      ssrData: {
        post: post,
        groups: groups,
      },
    },
  };
}

const EditPost = ({ ssrData }) => {
  const router = useRouter();
  const AddPostLayout = useAddPostLayout();
  const { user } = useUser();
  const [isGroupVisible, setIsGroupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nestedToast, setNestedToast] = useState(false);
  const { setNavBarTransparent } = useWrapper();
  const [groupData] = useState(ssrData.groups);
  const [post, setPost] = useState({
    ...ssrData.post,
    items: ssrData.post.items.items,
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const getGroup = async ({ id }) => {
    try {
      let resp = await API.graphql(graphqlOperation(getGroupView, { id }));
      resp = getReturnData(resp);
      return resp;
    } catch (ex) {
      console.log(ex);
    }
  };
  const finish = (role) => {
    // if (role === "MEMBER") {
    //   router.push(
    //     {
    //       pathname: `/user/${user.id}/dashboard`,
    //       query: {
    //         activeIndex: 1,
    //       },
    //     },
    //     `/user/${user.id}/dashboard`
    //   );
    // } else {
    //   router.push(
    //     {
    //       pathname: `/post/view/${post.id}`,
    //     },
    //     `/post/view/${post.id}`,
    //     { shallow: true, scroll: false }
    //   );
    // }
    router.push(
      {
        pathname: `/post/view/${post.id}`,
      },
      `/post/view/${post.id}`,
      { shallow: true, scroll: false }
    );
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
    await uploadPost();
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
    if (param === "isPost") toast.success("???????? ???????????? ??????????.", toastIcon);
    if (param === "isTitle") {
      toast.success("???????????? ?????????? ????.", toastIcon);
    }

    if (param === "isFollow")
      toast((t) => (
        <div className={"flex flex-row items-center"}>
          <div className="flex items-center">
            <div className=" w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#ffcc00] mr-3">
              <span className="icon-fi-rs-warning text-white" />
            </div>
          </div>
          <span className={"text-[16px] text-[#363636] mr-[2px]"}>
            {`???? "${selectedGroup.name}" ???????????? ?????????????????? ??????????.`}
          </span>
          <div
            className={"cursor-pointer text-caak-primary"}
            onClick={() => {
              followGroup().then(() => {
                toast.success(
                  `???? "${selectedGroup.name}" ???????????? ?????????????????? ??????????????.`,
                  toastIcon
                );
                toast.dismiss(t.id);
                setNestedToast(!nestedToast);
              });
            }}
          >
            ????????????
          </div>
        </div>
      ));
    if (param === "isGroup") toast.success("?????????????? ?????????????? ????.", toastIcon);
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
    setSelectedGroupId(post.group_id);
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
      setPost({
        ...post,
        group_id: selectedGroup.id,
        category_id: selectedGroup.category_id,
      });
    }
    // eslint-disable-next-line
  }, [selectedGroup]);

  useEffect(() => {
    if (groupData !== undefined && selectedGroupId) {
      if (groupData.unMember) {
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

  const uploadPost = async () => {
    setLoading(true);
    if (post.items.length === 0) {
      handleToast({ param: "isPost" });
      setLoading(false);
      return;
    }
    if (!post.title) {
      handleToast({ param: "isTitle" });
      setLoading(false);
      return;
    }
    if (selectedGroup) {
      const resp = await getGroup({ id: selectedGroup.id });
      if (resp.role_on_group === "NOT_MEMBER") {
        handleToast({ param: "isFollow" });
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        await pdtPost(post, user.id, resp.role_on_group);
        setLoading(false);
        setIsSuccessModalOpen(true);
        setIsEditing(false);
      } catch (ex) {
        ex.errors.map((error) => {
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
    setNavBarTransparent(false);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>
          ???????? ?????????? - {post.title} - {Consts.siteMainTitle}
        </title>
      </Head>
      <div className={"addPostPadding"}>
        <AddPostLayout selectedGroup={selectedGroup}>
          {selectedGroup && (
            <PostSuccessModal
              isOpen={isSuccessModalOpen}
              setIsOpen={setIsSuccessModalOpen}
              finish={finish}
              role={selectedGroup.role_on_group}
              postStatus={post.status}
              messageTitle={"???????? ???????????? ?????????????????? ????????????????????????."}
            />
          )}

          <div
            className={`flex flex-col justify-center items-center pb-[38px]`}
          >
            <div
              className={`flex flex-col  bg-white  rounded-square shadow-card h-full w-full`}
            >
              <SelectGroup
                containerClassName={"mt-[28px] z-[4]"}
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
                  setPost={setPost}
                  post={post}
                  loading={loading}
                  uploadPost={uploadPost}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              ) : (
                <DropZoneWithCaption post={post} setPost={setPost} />
              )}

              <div
                className={`z-[3] sticky bottom-[48px] md:bottom-0 bg-white border-t-[1px] rounded-b-square flex flex-row pb-4 px-4 justify-end`}
              >
                <Button
                  className={
                    "font-medium text-[16px] mr-2 mt-4 text-17px border border-caak-titaniumwhite h-[44px]"
                  }
                >
                  ??????????
                </Button>
                <Button
                  loading={loading}
                  disabled={!isEditing || loading}
                  onClick={() => handleSubmit()}
                  skin={"primary"}
                  className={
                    "mr-2 mt-4 text-[16px] text-white border text-semibold border-caak-titaniumwhite w-[190px] h-[44px]"
                  }
                >
                  ????????????????
                </Button>
              </div>
            </div>
          </div>
          {/*</Backdrop>*/}
        </AddPostLayout>
      </div>
    </>
  );
};
export default WithAuth(EditPost);
