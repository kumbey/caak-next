import postHistory0001 from "./fields/postHistory0001";

export const createPostHistory = /* GraphQL */ `
    mutation CreatePostHistory($input: CreatePostHistoryInput!) {
        createPostHistory(input: $input) ${postHistory0001}
    }
`;

export const createPostStatusHistory = /* GraphQL */ `
    mutation CreatePostStatusHistory($input: CreatePostStatusHistoryInput!) {
        createPostStatusHistory(input: $input) {
            id
        }
    }
`;

export const updatePostStatusHistory = /* GraphQL */ `
    mutation UpdatePostStatusHistory($input: UpdatePostStatusHistoryInput!) {
        updatePostStatusHistory(input: $input) {
            id
        }
    }
`;