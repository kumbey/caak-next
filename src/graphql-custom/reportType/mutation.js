import report0001 from "./fields/report0001";

export const createReportedPost = /* GraphQL */ `
    mutation CreateReportedPost($input: CreateReportedPostInput!) {
        createReportedPost(input: $input) ${report0001}
    }
`;
