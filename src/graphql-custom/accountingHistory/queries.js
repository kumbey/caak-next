import { accountingHistory0001 } from "./fields/accountingHistory0001";
export const listAccountHistoryByUser = /* GraphQL */ `
    query listAccountHistoryByUser ($user_id: ID,
        $createdAt: ModelStringKeyConditionInput,
        $sortDirection: ModelSortDirection,
        $filter: ModelAccouningtHistoryFilterInput,
        $limit: Int,
        $nextToken: String) {
        listAccountHistoryByUser (user_id: $user_id,
            createdAt: $createdAt,
            sortDirection: $sortDirection,
            filter: $filter,
            limit:$limit,
            nextToken: $nextToken

        ) ${accountingHistory0001}
    }
`;
