import file0001 from "../../file/fields/file0001";

const post0004 = /* GraphQL */ `
  {
    id
    title
    description
    commentType
    owned
    status
    user_id
    group_id
    category_id
    updatedAt
    createdAt
    version
    comments {
      items {
        comment
        parent_id
        post_item_id
        post_id
        createdAt
        reacted
        id
        totals {
          reactions
        }
        user {
          nickname
          pic ${file0001}
          id
        }
        sub {
          items {
            comment
            id
            createdAt
            parent_id
            totals {
              reactions
            }
            user {
              nickname
              pic ${file0001}
              id
            }
          }
        }
      }
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
      pic ${file0001}
    }
    group {
      id
      name
      profile ${file0001}
      followed
    }

    totals {
      comments
      createdAt
      post_id
      reactions
      search_id
      shares
      updatedAt
      views
    }
    reacted
    items {
      items {
        user_id
        post_id
        id
        title
        reacted
        file_id
        file ${file0001}
        comments {
          items {
            comment
            id
            parent_id
            reacted
            createdAt
            totals {
              reactions
            }
            user {
              id
              nickname
              pic ${file0001}
              cover_pic ${file0001}
            }
          }
        }
        file ${file0001}
        totals {
          reactions
          comments
        }
      }
    }
  }
`;

export default post0004;
