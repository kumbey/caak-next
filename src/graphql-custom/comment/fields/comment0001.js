const comment0001 = /* GraphQL */ `
  {
    id
    post_item_id
    comment
    createdAt
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

export default comment0001