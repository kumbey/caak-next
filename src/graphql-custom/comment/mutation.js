import comment0001 from "./fields/comment0001";

export const createComment = /* GraphQL */ `
    mutation createComment($input: CreateCommentInput!) {
        createComment(input: $input) ${comment0001}
    }
`;

export const deleteComment = /* GraphQL */ `
    mutation deleteComment($input: DeleteCommentInput!) {
        deleteComment(input: $input) ${comment0001}
    }
`;
