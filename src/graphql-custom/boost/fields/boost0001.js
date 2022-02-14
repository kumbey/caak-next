import file0001 from "./file0001";

const boost0001 = /* GraphQL */ `
  {
    createdAt
    end_date
    id
    meta
    post_id
    start_date
    status
    updatedAt
    post {
      totals {
        categoryAndStatus
        category_id
        comments
        createdAt
        groupAndStatus
        group_id
        post_id
        reach
        reactions
        search_id
        search_key
        shares
        status
        total_reactions
        updatedAt
        userAndStatus
        views
      }
      title
      items{
        items{
          file ${file0001}
        }
      }
    }
  }
`;

export default boost0001;
