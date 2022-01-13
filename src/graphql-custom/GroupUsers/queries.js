import groupUsers0001 from "./fields/groupUsers0001";
import groupUsers0002 from "./fields/groupUsers0002";


export const getGroupUserRole = /* GraphQL */ `
    query GetUserGroupRole($user_id: ID!, $group_id: ID!) {
        getGroupUsers(user_id: $user_id, group_id: $group_id) ${groupUsers0001}
    }
`;


export const listGroupByUserAndRole = /* GraphQL */ `
    query ListGroupByUserAndRole(
            $user_id: ID,
		    $role: ModelStringKeyConditionInput,
            $sortDirection: ModelSortDirection,
            $filter: ModelGroupUsersFilterInput,
            $limit: Int,
            $nextToken: String
        ) {
        listGroupByUserAndRole(
                user_id: $user_id
                role: $role
                sortDirection: $sortDirection
                filter: $filter, 
                limit: $limit, 
                nextToken: $nextToken, 
                ) {
            items ${groupUsers0002}
        }
    }
`;

export const listGroupsByUser = /* GraphQL */ `
    query ListGroupByUserAndRole(
        $user_id: ID,
        $role: ModelStringKeyConditionInput,
        $sortDirection: ModelSortDirection,
        $filter: ModelGroupUsersFilterInput,
        $limit: Int,
        $nextToken: String
    ) {
        listGroupByUserAndRole(
            user_id: $user_id
            role: $role
            sortDirection: $sortDirection
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken,
        ) {
            items {
                id
            }
        }
    }
`;