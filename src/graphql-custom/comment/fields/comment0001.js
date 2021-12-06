const comment0001 = /* GraphQL */ `
  {
    id
    post_item_id
    parent_id
    comment
    createdAt
    reacted
    type
    totals {
      reactions
    }
    user {
      firstname
      id
      followed
      aura
      about
      totals {
        followers
      }
      nickname
      pic {
        bucket
        createdAt
        ext
        id
        key
        level
        name
        owner
        region
        type
      }
    }
  }
`;

export default comment0001;
