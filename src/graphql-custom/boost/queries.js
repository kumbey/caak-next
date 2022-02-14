import boost0001 from "./fields/boost0001";

export const getBoostedPost = /* GraphQL */ `
    query getBoostedPost ($id: ID!) {
        getBoostedPost (id: $id) ${boost0001}
    }
`;

export const listBoostedPosts = /* GraphQL */ `
    query ListBoostedPosts {
        listBoostedPosts  {items ${boost0001}}
    }
`;

export const listBoostedPostByStatus = /* GraphQL */ ` 
    query ListBoostedPostByStatus(
        $status: String,
		$start_date: ModelStringKeyConditionInput,
		$sortDirection: ModelSortDirection,
        $filter: ModelBoostedPostFilterInput,
		$limit: Int,
		$nextToken: String,
    ) {
        listBoostedPostByStatus(
            status: $status,
            start_date: $start_date,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken,
        ) {items ${boost0001}}
    }
`;

export const listBoostedPostByStatusOrderByEndDate = /* GraphQL */ `
    query ListBoostedPostByStatusOrderByEndDate(
    $status: String,
    $end_date: ModelStringKeyConditionInput,
    $sortDirection: ModelSortDirection,
    $filter: ModelBoostedPostFilterInput,
    $limit: Int,
    $nextToken: String
    ) {
        listBoostedPostByStatusOrderByEndDate(
        status: $status,
        end_date: $end_date,
        sortDirection: $sortDirection,
        filter: $filter,
        limit: $limit,
        nextToken: $nextToken
        ) {items ${boost0001}}
    }
`;
