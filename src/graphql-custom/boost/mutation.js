import boost0001 from "./fields/boost0001";

export const createBoostedPost = /* GraphQL */ `
    mutation CreateBoostedPost($input: CreateBoostedPostInput!) {
        createBoostedPost(input: $input) ${boost0001}
    }
`;

export const updateBoostedPost = /* GraphQL */ `
    mutation UpdateBoostedPost($input: UpdateBoostedPostInput!) {
        updateBoostedPost(input: $input) ${boost0001}
    }
`;

export const deleteBoostedPost = /* GraphQL */ `
    mutation DeleteBoostedPost($input: DeleteBoostedPostInput!) {
        deleteBoostedPost(input: $input) ${boost0001}
    }
`;
