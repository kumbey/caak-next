import { getReturnData } from "../utility/Util";
import { getPostView } from "../graphql-custom/post/queries";

export const ssrDataViewPost = async ({ API, Auth, query, host }) => {
  let user = null;
  let isSuperAdmin = null;
  try {
    user = await Auth.currentAuthenticatedUser();
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    if (groups.includes("caak-admin")) {
      isSuperAdmin = true;
    }
  } catch (ex) {
    user = null;
  }
  const postId = query.id;
  const getPostById = async () => {
    const resp = await API.graphql({
      query: getPostView,
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      variables: { id: postId },
    });
    if (!getReturnData(resp)) {
      return { notFound: true };
    }
    if (
      getReturnData(resp).status === "ARCHIVED" ||
      getReturnData(resp).status === "PENDING"
    ) {
      if (!isSuperAdmin) {
        if (user) {
          if (user.attributes.sub !== getReturnData(resp).user.id) {
            return { notFound: true };
          }
        } else {
          return { notFound: true };
        }
      }
    }
    return {
      props: {
        ssrData: {
          post: getReturnData(resp),
          host
        },
      },
    };
  };
  try {
    return getPostById();
  } catch (ex) {
    console.log(ex);
  }
};

export const ssrDataViewPostItem = async ({ API, Auth, query, host }) => {
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  const postId = query.id;
  const getPostById = async () => {
    const resp = await API.graphql({
      query: getPostView,
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      variables: { id: postId },
    });
    if (!getReturnData(resp)) {
      return { notFound: true };
    }
    if (getReturnData(resp).onlyBlogView === "TRUE") {
      return { notFound: true };
    }
    return {
      props: {
        ssrData: {
          post: getReturnData(resp),
          host
        },
      },
    };
  };
  try {
    return getPostById();
  } catch (ex) {
    console.log(ex);
  }
};
