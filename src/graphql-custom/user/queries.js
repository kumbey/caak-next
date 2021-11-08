import user0001 from "./fields/user0001";
import user0004 from "./fields/user0004";

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) ${user0001}
  }
`;

export const getUserAura = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) ${user0004}
  }
`;