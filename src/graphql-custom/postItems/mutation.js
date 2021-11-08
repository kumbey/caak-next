import postItems0001 from "./fields/fileItems0001";

export const createPostItems = /* GraphQL */ `
    mutation CreatePostItems($input: CreatePostItemsInput!) {
        createPostItems(input: $input) ${postItems0001}
    }
`;

export const updatePostItems = /* GraphQL */ `
    mutation UpdatePostItems($input: UpdatePostItemsInput!) {
        updatePostItems(input: $input) ${postItems0001}
    }
`;

export const deletePostItems = /* GraphQL */ `
    mutation DeletePostItems($input: DeletePostItemsInput!) {
        deletePostItems(input: $input) ${postItems0001}
    }
`;
