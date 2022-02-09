import file0001 from "../../file/fields/file0001";

const listUserCategoryField = /* GraphQL */ `
  {
    items {
      category {
        id
        name
        icon
        createdAt
        updatedAt
        picture ${file0001}        
      }
    }
  }
`;

export default listUserCategoryField;
