import user0001 from "./fields/user0001";
import user0006 from "./fields/user0006";
import user0004 from "./fields/user0004";
import user0005 from "./fields/user0005";

export const getUser = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) ${user0001}
    }
`;
export const getUserTotal = /* GraphQL */ `
    query GetUserTotal($user_id: ID!) {
        getUserTotal(user_id: $user_id) ${user0006}
    }
`;

export const getUserAura = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) ${user0004}
    }
`;

export const listUsers = /* GraphQL */ `
    query ListUsers(
        $filter: ModelUserFilterInput,
        $limit: Int,
        $nextToken: String) {
        listUsers(
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken) {
            items ${user0001}
            nextToken
        }
    }
`;
export const listUsersbyFollowing = /* GraphQL */ `
    query ListUsersbyFollowing(
            $followed_user_id: ID,
            $sortDirection: ModelSortDirection,
            $filter: ModelFollowedUsersFilterInput,
            $limit: Int,
            $nextToken: String
        ) {
            listUsersbyFollowing
            (
                followed_user_id: $followed_user_id,
		        sortDirection: $sortDirection,
		        filter: $filter,
		        limit: $limit,
		        nextToken: $nextToken
            )
        {
            items ${user0005}
            nextToken
        }
    }
`;
