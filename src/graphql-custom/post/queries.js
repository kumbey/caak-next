import post0002 from "./fields/post0002";
import post0004 from "./fields/post0004";
import post0005 from "./fields/post0005";
import file0001 from "../file/fields/file0001";

export const getPost = /* GraphQL */ `
    query GetPost($id: ID!) {
        getPost(id: $id) ${post0002}
    }
`;

export const getPostView = /* GraphQL */ `
    query GetPost($id: ID!) {
        getPost(id: $id) ${post0004}
    }
`;

export const getPostByStatus = /* GraphQL */ `
    query getPostByStatus($status: String,
        $updatedAt: ModelStringKeyConditionInput,
        $sortDirection: ModelSortDirection,
        $filter: ModelPostFilterInput,
        $limit: Int,
        $nextToken: String)
    {
        getPostByStatus(
            status: $status,
            updatedAt: $updatedAt,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken) {
            items ${post0004}
            nextToken
        }
    }
`;

export const getPostByUser = /* GraphQL */ `
    query GetPostByUser(
        $user_id: ID!,
        $sortDirection: ModelSortDirection,
        $filter: ModelPostFilterInput,
        $limit: Int,
        $nextToken: String) {
        getPostByUser(
            user_id: $user_id,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        )
        {
            items ${post0004}
            nextToken
        }

    }
`;

export const getPostByGroup = /* GraphQL */ `
    query GetPostByGroup(
        $group_id: ID!,
        $sortDirection: ModelSortDirection,
        $filter: ModelPostFilterInput,
        $limit: Int,
        $nextToken: String) {
        getPostByGroup(
            group_id: $group_id,
            sortDirection: $sortDirection,
            filter: $filter,
            limit: $limit,
            nextToken: $nextToken
        )
        {
            items ${post0004}
            nextToken
        }

    }
`;

export const listPostOrderByReactions = /* GraphQL */ `
  query ListPostOrderByReactions(
    $status: String
#    $total_reactions: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostTotalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostOrderByReactions(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        post 
        ${post0004}
        
      }
      nextToken
    }
  }
`;

export const getPostSearchItem = /* GraphQL */ `
    query GetPost($id: ID!) {
        getPost(id: $id) {
            id
            title
            items {
                items {
                    file ${file0001}
                }
            }
        }
    }
`;

export const searchPosts = /* GraphQL */ `
    query SearchPosts($filter: SearchablePostFilterInput,
    $sort: SearchablePostSortInput,
    $limit: Int,
    $nextToken: String,
    $from: Int) {
        searchPosts(filter: $filter,
        sort: $sort,
        limit: $limit,
        nextToken: $nextToken,
        from: $from) {
            items ${post0004}
            nextToken
        }
    }
`;

export const listSavedPostByUser = /* GraphQL */ `
    query ListSavedPostByUser(
        $user_id: ID,
		$sortDirection: ModelSortDirection,
		$limit: Int,
		$nextToken: String
    ) {
        listSavedPostByUser(
            user_id: $user_id,
            sortDirection: $sortDirection,
            limit: $limit,
            nextToken: $nextToken
        ){
            items {
                createdAt
                id
                post_id
                updatedAt
                user_id
                post ${post0004}
            }
            nextToken
        }     
    }
`;

export const listPostByCategoryOrderByReactions = /* GraphQL */ `
    query ListPostByCategoryOrderByReactions(
        $categoryAndStatus: String!
        $sortDirection: ModelSortDirection
        $filter: ModelPostTotalFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listPostByCategoryOrderByReactions(
          categoryAndStatus: $categoryAndStatus
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                post
                ${post0004}
            }
            nextToken
        }
    }
`;

export const listPostByOwned = /* GraphQL */ `
  query ListPostByOwned(
    $owned: String
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostByOwned(
      owned: $owned
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items 
       ${post0004}
        nextToken
    }
  }
`;
export const ListReportedPostByUser = /* GraphQL */ `
  query ListReportedPostByUser(
    $user_id: ID,
    $createdAt: ModelStringKeyConditionInput,
    $sortDirection: ModelSortDirection,
    $filter: ModelReportedPostFilterInput,
    $limit: Int,
    $nextToken: String
  ) {
    ListReportedPostByUser(
		user_id: $user_id,
		createdAt: $createdAt,
		sortDirection: $sortDirection,
		filter: $filter,
		limit: $limit,
		nextToken: $nextToken
    ) {
      items 
       ${post0005}
        nextToken
    }
  }
`;
