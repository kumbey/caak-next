import { listGroupsSearch } from "../../graphql-custom/group/queries";
import { getReturnData } from "../../utility/Util";
import {
  getPostByStatus,
  searchPosts,
} from "../../graphql-custom/post/queries";
import { listUsers } from "../../graphql-custom/user/queries";

export const searchApi = async ({ API, searchQuery, Auth, postLimit }) => {
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (ex) {
    user = null;
  }
  try {
    async function fetchItemsNextToken({
      params,
      items = [],
      callback = undefined,
    }) {
      let data = await API.graphql(params);
      data = getReturnData(data);

      items.push(...data.items);

      if (callback) {
        callback(data.items);
      }
      if (!data.nextToken) return items;

      // eslint-disable-next-line no-param-reassign
      params.variables.nextToken = data.nextToken;
      return fetchItemsNextToken({ params, items, callback });
    }

    const groups = await fetchItemsNextToken({
      params: {
        query: listGroupsSearch,
        variables: {
          filter: { name: { contains: searchQuery } },
        },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      },
    });

    const users = await fetchItemsNextToken({
      params: {
        query: listUsers,
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        sortDirection: "DESC",
        variables: {
          filter: { nickname: { contains: searchQuery } },
        },
      },
    });
    const getPosts = async () => {
      let post = await API.graphql({
        query: searchPosts,
        variables: {
          filter: {
            title: { wildcard: `*${searchQuery}*` }
          },
          limit: postLimit ? postLimit : 10
        },
      });
      post = getReturnData(post);
      return post;
    };
    const posts = await getPosts()

    const groupsType = groups.map((obj) => ({
      ...obj,
      type: "GROUP",
      keyword: obj.name,
    }));

    const usersType = users.map((obj) => ({
      ...obj,
      type: "USER",
      keyword: obj.nickname,
    }));

    // const concated = groupsType.concat(usersType);
    return {
      groups: groupsType,
      users: usersType,
      posts: posts,
    };
  } catch (ex) {
    console.log(ex);
  }
};
