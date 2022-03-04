export const doTransaction = /* GraphQL */ `
  mutation doTransaction(
    $user_id: ID!
    $status: String!
    $amount: Int!
    $desc: String!
  ) {
    doTransaction(
      user_id: $user_id
      status: $status
      amount: $amount
      desc: $desc
    )
  }
`;
