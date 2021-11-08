import postItems0001 from "./fields/fileItems0001";

export const getPostItems = /* GraphQL */ `
  query GetPostItems($id: ID!) {
    getPostItems(id: $id) ${postItems0001}
  }
`;