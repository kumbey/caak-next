import categoriesGetField from "./fields/categoryGetField";
import categorySetField from "./fields/categorySetField";

export const createCategory = /* GraphQL */ `
    mutation createCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) ${categoriesGetField}
    }
`;

export const createUserCategory = /* GraphQL */ `
    mutation createUserCategory($input: CreateUserCategoryInput!) {
        createUserCategory(input: $input) ${categorySetField}
    }
`;
