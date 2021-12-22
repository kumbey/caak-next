import useAddPostLayout from "../../../../src/hooks/useAddPostLayout";
import { useRouter } from "next/router";
import { useUser } from "../../../../src/context/userContext";
import { useEffect, useState } from "react";
import { getReturnData } from "../../../../src/utility/Util";
import { withSSRContext } from "aws-amplify";
import { listGroupsForAddPost } from "../../../../src/graphql-custom/group/queries";
import { getPost } from "../../../../src/graphql-custom/post/queries";
import { pdtPost } from "../../../../src/apis/post";
import SelectGroup from "../../../../src/components/addpost/SelectGroup";
import UploadedMediaEdit from "../../../../src/components/input/UploadedMediaEdit";
import DropZoneWithCaption from "../../../../src/components/input/DropZoneWithCaption";
import Button from "../../../../src/components/button";
import WithAuth from "../../../../src/middleware/auth/WithAuth";
import PostSuccessModal from "../../../../src/components/modals/postSuccessModal";

export async function getServerSideProps({ req, res, query }) {
  const { API, Auth } = withSSRContext({ req });
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  const getGroups = async () => {
    try {
      const grData = {
        adminModerator: [],
        unMember: [],
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
        } else {
          grData.adminModerator.push(item);
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
  if (post.user.id !== user.attributes.sub) {
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
  const [groupData] = useState(ssrData.groups);
  const [post, setPost] = useState({
    ...ssrData.post,
    items: ssrData.post.items.items,
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
    try {
      setLoading(true);
      await pdtPost(post, user.id);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const finish = () => {
    router.push(
      {
        pathname: `/user/${user.id}/dashboard`,
        query: {
          activeIndex: 1,
        },
      },
      `/user/${user.id}/dashboard`
    );
  };

  const handleSubmit = async () => {
    await uploadPost();
    if (!loading) setIsSuccessModalOpen(true);
  };

  return (
    <div className={"addPostPadding"}>
      <AddPostLayout selectedGroup={selectedGroup}>
        <PostSuccessModal
          isOpen={isSuccessModalOpen}
          setIsOpen={setIsSuccessModalOpen}
          finish={finish}
        />
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
                selectedGroup={selectedGroup}
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
                onClick={() => handleSubmit()}
                // disabled
                className={
                  "mr-2 mt-4 text-17px border border-caak-titaniumwhite w-[190px] h-[44px]"
                }
              >
                Хадгалах
              </Button>
            </div>
          </div>
        </div>
        {/*</Backdrop>*/}
      </AddPostLayout>
    </div>
  );
};
export default WithAuth(EditPost);
