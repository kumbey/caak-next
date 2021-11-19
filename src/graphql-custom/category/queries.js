import categoryGetField from "./fields/categoryGetField";

export const getCategoryList = /* GraphQL */ `
    query GetCategoryList {
        listCategories ${categoryGetField}
    }
`;
