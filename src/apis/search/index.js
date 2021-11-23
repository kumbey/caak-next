import { listGroupsSearch } from "../../graphql-custom/group/queries";
import { getReturnData } from "../../utility/Util";
import { getPostByStatus } from "../../graphql-custom/post/queries";
import { listUsers } from "../../graphql-custom/user/queries";

export const searchApi = async ({ API, searchQuery, limit }) => {
  try {
    let groups = await API.graphql({
      query: listGroupsSearch,
      authMode: "AWS_IAM",
      variables: { limit: limit, filter: { name: { contains: searchQuery } } },
    });
    groups = getReturnData(groups).items;

    let posts = await API.graphql({
      query: getPostByStatus,
      authMode: "AWS_IAM",
      sortDirection: "DESC",
      variables: {
        status: "CONFIRMED",
        filter: { title: { contains: searchQuery } },
        limit: limit,
      },
    });

    posts = getReturnData(posts).items;

    let users = await API.graphql({
      query: listUsers,
      authMode: "AWS_IAM",
      sortDirection: "DESC",
      variables: {
        filter: { nickname: { contains: searchQuery } },
      },
    });
    users = getReturnData(users).items;
    return groups.concat(posts, users);
  } catch (ex) {
    console.log(ex);
  }
};
