const post0003 = /* GraphQL */ `
  {
    createdAt
    id
    post_id
    updatedAt
    user_id
    post {
      category_id
      commentType
      createdAt
      description
      ignoreNotification
      isSaved
      id
      oldCaakId
      owned
      reacted
      status
      title
      totals {
        category_id
        comments
        createdAt
        groupAndStatus
        group_id
        post_id
        reactions
        search_id
        search_key
        shares
        status
        total_reactions
        views
        updatedAt
      }
      updated_user {
        aura
        firstname
        lastname
        nickname
      }
      user {
        firstname
        lastname
        nickname
      }
      user_id
    }
  }
`;

export default post0003;
