import userTotal0001 from "./fields/userTotal0001";


export const getUserTotal = /* GraphQL */ `
  query GetUserTotal($user_id: ID!) {
    getUserTotal(user_id: $user_id) ${userTotal0001}
  }
`;
