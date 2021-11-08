import postHistory0001 from "./fields/postHistory0001";

export const createPostHistory = /* GraphQL */ `
    mutation CreatePostHistory($input: CreatePostHistoryInput!) {
        createPostHistory(input: $input) ${postHistory0001}
    }
`;
