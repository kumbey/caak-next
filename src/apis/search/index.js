import { listGroupsSearch } from "../../graphql-custom/group/queries";
import { getReturnData } from "../../utility/Util";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import { listUsers } from "../../graphql-custom/user/queries";

export const searchApi = async ({ API, searchQuery, limit, Auth }) => {
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
          limit: limit,
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

    const posts = await fetchItemsNextToken({
      params: {
        query: getPostByStatus,
        variables: {
          status: "CONFIRMED",
          filter: {
            title: { contains: searchQuery },
          },
          limit: limit,
        },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      },
    });
    const groupsType = groups.map((obj) => ({
      ...obj,
      type: "GROUP",
      keyword: obj.name,
    }));
    const postsType = posts.map((obj) => ({
      ...obj,
      type: "POST",
      keyword: obj.title,
    }));
    const usersType = users.map((obj) => ({
      ...obj,
      type: "USER",
      keyword: obj.nickname,
    }));
    const concated = groupsType.concat(postsType, usersType);
    return concated;
  } catch (ex) {
    console.log(ex);
  }
};
