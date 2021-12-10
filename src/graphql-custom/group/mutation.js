import group0008 from "./fields/group0008";

export const updateGroup = /* GraphQL */ `
    mutation updateGroup($input: UpdateGroupInput!) {
        updateGroup(input: $input) ${group0008}
    }
`;
