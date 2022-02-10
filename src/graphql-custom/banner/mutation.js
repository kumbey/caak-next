export const addViewToItem = /* GraphQL */ `
  mutation addViewToItem($type: String!, $on_to: String!, $item_id: ID!) {
    addViewToItem(type: $type, on_to: $on_to, item_id: $item_id)
  }
`;