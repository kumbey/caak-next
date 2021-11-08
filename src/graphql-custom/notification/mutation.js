import notification0001 from "./fields/notification0001";

export const updateNotification = /* GraphQL */ `
    mutation UpdateNotification($input: UpdateNotificationInput!) {
        updateNotification(input: $input)${notification0001}
    }
`;

export const methodNoitification = /* GraphQL */ `
    mutation Notification($method: String!, $user_id: ID!) {
        notification(method: $method, user_id: $user_id)
    }
`;
