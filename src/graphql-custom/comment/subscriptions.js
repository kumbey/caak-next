import comment0001 from "./fields/comment0001";

export const onCommentByPostItem = /* GraphQL */ `
    subscription OnCommentByPostItem($post_item_id: ID!) {
        onCommentByPostItem(post_item_id: $post_item_id) ${comment0001}
    }
`;

export const onCommentByPost = /* GraphQL */ `
    subscription OnCommentByPost($post_id: ID!) {
        onCommentByPostItem(post_item_id: $post_id) ${comment0001}
    }
`;

export const onCommentByParent = /* GraphQL */ `
    subscription OnCommentByParent($parent_id: ID!) {
        onCommentByParent(parent_id: $parent_id) ${comment0001}
    }
`;
