import comment0001 from "./fields/comment0001";

export const onCommentByPostItem = /* GraphQL */ `
    subscription OnCommentByPostItem($post_item_id: ID!) {
        onCommentByPostItem(post_item_id: $post_item_id) ${comment0001}
    }
`;
