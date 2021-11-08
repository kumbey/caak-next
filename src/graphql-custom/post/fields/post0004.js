import file0001 from "../../file/fields/file0001";

const post0004 = /* GraphQL */ `
  {
    id
    title
    commentType
    status
    user_id
    group_id
    category_id
    updatedAt
    version
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
    }

    totals {
      reactions
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
