export const createFeedBack = /* GraphQL */ `
  mutation CreateFeedBack($input: CreateFeedBackInput!) {
    createFeedBack(input: $input) {
      id
      star
      status
      description
      title
    }
  }
`;
