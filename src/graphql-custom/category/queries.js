import categoryGetField from "./fields/categoryGetField";

export const listCategorys = /* GraphQL */ `
    query ListCategorys {
        listCategorys ${categoryGetField}
    }
`;
