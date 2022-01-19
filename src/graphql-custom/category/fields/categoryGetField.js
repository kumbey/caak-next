const categoriesGetField = /* GraphQL */ `
  {
    items {
      id
      name
      icon
      createdAt
      updatedAt
      pic_id
      picture {
        id
        name
        bucket
        createdAt
        ext
        external_url
        isExternal
        key
        level
        owner
        provided_item
        provider
        region
        type
        updatedAt
      }
    }
  }
`;

export default categoriesGetField;
