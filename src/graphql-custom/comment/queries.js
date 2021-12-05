import comment0001 from "./fields/comment0001";
import comment0002 from "./fields/comment0002";
import comment0003 from "./fields/comment0003";

export const getCommentsByPostItem = /* GraphQL */ `
    query GetCommentsByPostItem(
        $post_item_id: ID
        $sortDirection: ModelSortDirection
        $filter: ModelCommentFilterInput
        $limit: Int
        $nextToken: String
    ) {
        getCommentsByPostItem(
            post_item_id: $post_item_id
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items ${comment0002}
            nextToken
        }
    }
`;

export const getComment = /* GraphQL */ `
    query GetComment($id: ID!) 
    {
        getComment(id: $id) ${comment0001}
    }
`;

export const listCommentByUser = /* GraphQL */ `
    query ListCommentByUser(
        $user_id: ID!
        $sortDirection: ModelSortDirection
        $nextToken: String
    ) 
    {
        listCommentByUser
    (     
            user_id: $user_id
            sortDirection: $sortDirection
            nextToken: $nextToken
    )   {
        items ${comment0003}
        nextToken
    }
    }
`;
