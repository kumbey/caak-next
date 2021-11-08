import groupUsers0001 from "./fields/groupUsers0001";


export const createGroupUsers = /* GraphQL */ `
    mutation CreateGroupUsers($input: CreateGroupUsersInput!) {
        createGroupUsers(input: $input) ${groupUsers0001}
    }
`;

export const deleteGroupUsers = /* GraphQL */ `
    mutation DeleteGroupUsers($input: DeleteGroupUsersInput!) {
        deleteGroupUsers(input: $input) ${groupUsers0001}
    }
`;

