import categoryGetField from "./fields/categoryGetField";
import listUserCategoryField from "./fields/listUserCategoryField";

export const listCategorys = /* GraphQL */ `
    query ListCategorys {
        listCategorys ${categoryGetField}
    }
`;

export const listUserCategoryByUser = /* GraphQL */ `
    query ListUserCategoryByUser(
    $user_id: ID,
    $sortDirection: ModelSortDirection,
    $filter: ModelUserCategoryFilterInput,
    $limit: Int,
    $nextToken: String
    ) {
        listUserCategoryByUser(
        user_id: $user_id,
        sortDirection: $sortDirection,
        filter: $filter,
        limit: $limit,
        nextToken: $nextToken
        ) ${listUserCategoryField}
    }
`;
