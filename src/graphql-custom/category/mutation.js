import categoriesGetField from "./fields/categoryGetField";
import categorySetField from "./fields/categorySetField";
import category0001 from "./fields/category0001";

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
export const deleteUserCategory = /* GraphQL */ `
    mutation deleteUserCategory($input: DeleteUserCategoryInput!) {
        deleteUserCategory(input: $input) ${category0001}
    }
`;
