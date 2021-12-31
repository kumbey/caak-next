const comment0001 = /* GraphQL */ `
  {
    id
    post_item_id
    parent_id
    post_id
    comment
    createdAt
    reacted
    type
    totals {
      reactions
    }
    user {
      firstname
      gender
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
