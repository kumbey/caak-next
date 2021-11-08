import group0002 from "./fields/group0002";
import group0001 from "./fields/group0001";
import group0003 from "./fields/group0003";
import group0004 from "./fields/group0004";

export const listGroupsForAddPost = /* GraphQL */ `
    query listGroups($filter: ModelGroupFilterInput, $limit: Int, $nextToken: String) {
        listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items ${group0002}
        }
    }
`;

export const getGroupView = /* GraphQL */ `
  query getGroup($id: ID!) {
    getGroup(id: $id) ${group0001}
  }
`;

export const getGroupFollowed = /* GraphQL */ `
    query getGroup($id: ID!) {
        getGroup(id: $id) ${group0004}
    }
`;

export const getGroupUsersByGroup = /* GraphQL */ `
    query GetGroupUsersByGroup($group_id: ID!) {
        getGroupUsersByGroup(group_id: $group_id) ${group0003}
    }
`;
