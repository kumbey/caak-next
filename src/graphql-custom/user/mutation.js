import user0001 from "./fields/user0001";
import user0002 from "./fields/user0002";
// import user0003 from "./fields/user0003";

export const createUser = /* GraphQL */ `
    mutation CreateUse($input: CreateUserInput!) {
        createUser(input: $input) ${user0001}
    }
`;

export const createFollowedUsers = /* GraphQL */ `
    mutation createFollowedUsers($input: CreateFollowedUsersInput!) {
        createFollowedUsers(input: $input) ${user0002}
    }
`;
export const deleteFollowedUsers = /* GraphQL */ `
    mutation deleteFollowedUsers($input: DeleteFollowedUsersInput!) {
        deleteFollowedUsers(input: $input) ${user0002}
    }
`;

export const updateUser = /* GraphQL */ `
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) ${user0001}
    }
`;
