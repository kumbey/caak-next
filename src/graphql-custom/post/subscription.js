import post0002 from "./fields/post0002";
import post0004 from "./fields/post0004";

export const onPostCreate = /* GraphQL */ `
    subscription OnPostCreate {
        onPostCreate ${post0002}
    }
`;

export const onPostUpdate = /* GraphQL */ `
    subscription OnPostUpdate {
        onPostUpdate ${post0002}
    }
`;

export const onPostStatusUpdate = /* GraphQL */ `
    subscription OnPostStatusUpdate {
        onPostStatusUpdate ${post0002}
    }
`;

export const onPostByGroup = /* GraphQL */ `
    subscription OnPostByGroup($group_id: ID!, $status: String!) {
        onPostByGroup(group_id: $group_id, status: $status) ${post0004}
    }
`;

export const onPostByUser = /* GraphQL */ `
    subscription OnPostByUser($user_id: ID!, $status: String!) {
        onPostByUser(user_id: $user_id, status: $status) ${post0004}
    }
`;

export const onUpdatePost = /* GraphQL */ `
    subscription OnUpdatePost {
        onUpdatePost ${post0002}
    }
`;

export const onPostUpdateByStatus = /* GraphQL */ `
    subscription OnPostUpdateByStatus($status: String!) {
        onPostUpdateByStatus(status: $status) ${post0004}
    }
`;
