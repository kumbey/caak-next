import groupUsers0001 from "./fields/groupUsers0001";


export const getGroupUserRole = /* GraphQL */ `
    query GetUserGroupRole($user_id: ID!, $group_id: ID!) {
        getGroupUsers(user_id: $user_id, group_id: $group_id) ${groupUsers0001}
    }
`;
