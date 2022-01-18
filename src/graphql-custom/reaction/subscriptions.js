import reaction0001 from "./fields/reaction0001";

export const onReactionCreateByUserItem = /* GraphQL */ `
  subscription OnReactionCreateByUserItem(
    $user_id: ID!
    $on_to: String!
    $item_id: ID!
  ) {
      onReactionCreateByUserItem(
      user_id: $user_id
      on_to: $on_to
      item_id: $item_id
    ) ${reaction0001}
  }
`;
export const onReactionDeleteByUserItem = /* GraphQL */ `
    subscription OnReactionDeleteByUserItem(
        $user_id: ID!
        $on_to: String!
        $item_id: ID!
    ) {
        onReactionDeleteByUserItem(
            user_id: $user_id
            on_to: $on_to
            item_id: $item_id
        ) ${reaction0001}
    }
`;
