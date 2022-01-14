const post0005 = /* GraphQL */ `
  {
    createdAt
    id
    post {
      id
      createdAt
      title
      items {
        items {
          file {
            bucket
            createdAt
            ext
            external_url
            id
            isExternal
            key
            level
            name
            owner
            provided_item
            provider
            region
            type
            updatedAt
          }
        }
      }
      group {
        id
        name
      }
    }
    post_id
    reason
    status
    updatedAt
  }
`;

export default post0005;
