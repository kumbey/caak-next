import categorySetField from "./fields/categorySetField";
import categoryIDField from "./fields/categoryIDField";

export const createCategory = /* GraphQL */ `
    mutation createCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) ${categorySetField}
    }
`;

export const updateCategory = /* GraphQL */ `
    mutation updateCategory($input: UpdateCategoryInput!) {
        updateCategory(input: $input) ${categorySetField}
    }
`;

export const deleteCategory = /* GraphQL */ `
    mutation deleteCategory($input: DeleteCategoryInput!) {
        deleteCategory(input: $input) ${categoryIDField}
    }
`;
