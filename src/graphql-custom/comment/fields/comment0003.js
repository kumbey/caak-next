const comment0003 = /* GraphQL */ `
  {
    comment
    id
    parent_id
    post_id
    createdAt
    sub {
      items {
        comment
        parent_id
        id
        post_id
      }
    }
    post {
      id
      title
      items {
        items {
          file {
            updatedAt
            type
            region
            owner
            name
            level
            key
            isExternal
            id
            external_url
            ext
            createdAt
            bucket
          }
        }
      }
    }
  }
`;

export default comment0003;
