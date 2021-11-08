import notification0001 from "./fields/notification0001";

export const listNotificationByUser = /* GraphQL */ `
    query ListNotificationByUser($to: ID!,
        $createdAt: ModelStringKeyConditionInput,
        $sortDirection: ModelSortDirection,
        $filter: ModelNotificationFilterInput,
        $limit: Int,
        $nextToken: String) 
    {
        listNotificationByUser(
            to: $to,
            createdAt: $createdAt,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        ) {
            items ${notification0001}
            nextToken
        }
    }
`;

export const getNotification = /* GraphQL */ `
    query GetNotification($id: ID!) 
    {
        getNotification(id: $id) ${notification0001}
    }
`;
