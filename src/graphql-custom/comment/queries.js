import comment0001 from "./fields/comment0001";
import comment0002 from "./fields/comment0002";
import file0001 from "../file/fields/file0001";
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

export const listCommentByType = /* GraphQL */ `
  query listCommentsByDateAndType(
    $post_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentsByDateAndType(
      post_id: $post_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        comment
        parent_id
        sub {
          items {
            comment
            id
            parent_id
          }
        }
      }
      nextToken
    }
  }
`;

export const listCommentByParent = /* GraphQL */ `
  query listCommentByParent(
    $parent_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentByParent(
      parent_id: $parent_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        comment
          createdAt
          totals {
              reactions
          }
        parent_id
          user {
              nickname
              pic ${file0001}
              id
          }
      }
      nextToken
    }
  }
`;
export const listCommentByUser = /* GraphQL */ `
    query ListCommentByUser(
        $user_id: ID!
        $createdAt: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelCommentFilterInput
        $limit: Int
        $nextToken: String
    ) 
    {
        listCommentByUser
    (     
              user_id: $user_id
              createdAt: $createdAt
              sortDirection: $sortDirection
              filter: $filter
              limit: $limit
              nextToken: $nextToken
    )   {
        items ${comment0003}
        nextToken
    }
    }
`;
