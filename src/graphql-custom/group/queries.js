import group0002 from "./fields/group0002";
import group0001 from "./fields/group0001";
import group0003 from "./fields/group0003";
import group0004 from "./fields/group0004";
import group0005 from "./fields/group0005";
import group0006 from "./fields/group0006";
import group0007 from "./fields/group0007";
import group0009 from "./fields/group0009";
import file0001 from "../file/fields/file0001";
import post0004 from "../post/fields/post0004";
import group0010 from "./fields/group0010";
import group0011 from "./fields/group0011";

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

export const getGroupRules = /* GraphQL */ `
  query getGroup($id: ID!) {
    getGroup(id: $id) {
      id
      g_rules
    }
  }
`;

export const getGroupAttentions = /* GraphQL */ `
  query getGroup($id: ID!) {
    getGroup(id: $id) {
      id
      g_attentions
    }
  }
`;

export const getGroupCard = /* GraphQL */ `
    query getGroup($id: ID!) {
        getGroup(id: $id) ${group0006}
    }
`;

export const getGroupFollowed = /* GraphQL */ `
    query getGroup($id: ID!) {
        getGroup(id: $id) ${group0004}
    }
`;

export const getGroupUsersByGroup = /* GraphQL */ `
    query GetGroupUsersByGroup(
        $group_id: ID!,
        $filter: ModelGroupUsersFilterInput,
        $limit: Int,
        $nextToken: String
    ) {
        getGroupUsersByGroup(
            group_id: $group_id,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken) ${group0003}
    }
`;

export const listGroupUsersByGroup = /* GraphQL */ `
    query ListGroupUsersByGroup(
        $group_id: ID,
        $role: ModelStringKeyConditionInput,
        $sortDirection: ModelSortDirection,
        $filter: ModelGroupUsersFilterInput,
        $limit: Int,
        $nextToken: String
    ) {
        listGroupUsersByGroup(
            group_id: $group_id,
            role: $role,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        ) ${group0009}
    }
`;

export const listGroupsSearch = /* GraphQL */ `
    query listGroups($filter: ModelGroupFilterInput, $limit: Int, $nextToken: String) {
        listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items ${group0005} nextToken
        }
    }
`;

export const getGroupTotal = /* GraphQL */ `
    query GetGroupTotal($group_id: ID!) {
        getGroupTotal(group_id: $group_id) ${group0007}
    }
`;

export const listGroupTotals = /* GraphQL */ `
    query ListGroupTotals($group_id: ID) {
        listGroupTotals(group_id: $group_id) {items ${group0007}}
    }
`;

export const getGroupSearchView = /* GraphQL */ `
    query getGroup($id: ID!) {
        getGroup(id: $id) {
            id
            name
            profile ${file0001}
        }
    }
`;

export const listPostByGroupOrderByReactions = /* GraphQL */ `
    query ListPostByGroupOrderByReactions(
        $groupAndStatus: String,
        #    $total_reactions: ModelIntKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelPostTotalFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listPostByGroupOrderByReactions(
            groupAndStatus: $groupAndStatus
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                post
                ${post0004}

            }
            nextToken
        }
    }
`;

export const listGroupAdminMods = /* GraphQL */ `
    query ListGroupUsersByGroup(
        $group_id: ID,
        $role: ModelStringKeyConditionInput,
        $sortDirection: ModelSortDirection,
        $filter: ModelGroupUsersFilterInput,
        $limit: Int,
        $nextToken: String
    ) {
        listGroupUsersByGroup(
            group_id: $group_id,
            role: $role,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        ) ${group0010}
    }
`;

export const listGroupByFeatured = /* GraphQL */ `
    query ListGroupByFeatured(
        $featured: String,
        $name: ModelStringKeyConditionInput,
        $sortDirection: ModelSortDirection,
        $filter: ModelGroupFilterInput,
        $limit: Int,
        $nextToken: String
    ) {
        listGroupByFeatured(
            featured: $featured,
            name: $name,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        ) ${group0011}
    }
`;
export const listGroupByCategory = /* GraphQL */ `
     query ListGroupByCategory(
         $category_id: ID,
         $filter: ModelGroupFilterInput
         $limit: Int
         $nextToken: String
     ) {
         listGroupByCategory(category_id: $category_id, 
#             name: $name, 
             filter: $filter, limit: $limit, nextToken: $nextToken) 
             ${group0011}
         
     }
 `;
