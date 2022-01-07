import group0008 from "./fields/group0008";
import groupSetField from "./fields/groupSetField";

export const updateGroup = /* GraphQL */ `
    mutation updateGroup($input: UpdateGroupInput!) {
        updateGroup(input: $input) ${group0008}
    }
`;

export const createGroup = /* GraphQL */ `
    mutation createGroup($input: CreateGroupInput!) {
        createGroup(input: $input) ${groupSetField}
    }
`;

