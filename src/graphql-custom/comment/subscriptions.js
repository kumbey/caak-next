import comment0001 from "./fields/comment0001";

export const onCommentByPostItem = /* GraphQL */ `
    subscription OnCommentByPostItem($post_item_id: ID!, $type: String!) {
        onCommentByPostItem(post_item_id: $post_item_id, type: $type) ${comment0001}
    }
`;

export const onCommentByPost = /* GraphQL */ `
    subscription OnCommentByPost($post_id: ID!, $type: String!) {
        onCommentByPost(post_id: $post_id, type: $type) ${comment0001}
    }
`;

export const onCommentByParent = /* GraphQL */ `
    subscription OnCommentByParent($parent_id: ID!, $type: String!) {
        onCommentByParent(parent_id: $parent_id, type: $type) ${comment0001}
    }
`;
