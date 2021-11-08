import postView0001 from "./fields/postView0001";

export const createPostViews = /* GraphQL */ `
    mutation createPostViews($input: CreatePostViewsInput!) {
        createPostViews(input: $input)${postView0001}
    }
`;
