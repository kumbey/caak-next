import post0001 from "./fields/post0001";
import post0004 from "./fields/post0004";
import post0003 from "./fields/post0003";
import reaction0001 from "../reaction/fields/reaction0001";

export const createPost = /* GraphQL */ `
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) ${post0004}
    }
`;
export const createSavedPost = /* GraphQL */ `
    mutation createSavedPost($input: CreateSavedPostInput!) {
        createSavedPost(input: $input) ${post0003}
    }
`;

export const updatePost = /* GraphQL */ `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) ${post0004}
    }
`;

export const createReaction = /* GraphQL */ `
    mutation createReactions($input: CreateReactionsInput!) {
        createReactions(input: $input) ${reaction0001}
    }
`;

export const deleteReaction = /* GraphQL */ `
    mutation deleteReactions($input: DeleteReactionsInput!) {
        deleteReactions(input: $input) ${reaction0001}
    }
`;

export const deleteSavedPost = /* GraphQL */ `
    mutation deleteSavedPost($input: DeleteSavedPostInput!) {
        deleteSavedPost(input: $input) ${post0001}
    }
`;
