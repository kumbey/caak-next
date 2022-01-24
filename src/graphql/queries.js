/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
      id
      key
      name
      owner
      bucket
      region
      level
      ext
      type
      isExternal
      external_url
      provider
      provided_item
      createdAt
      updatedAt
    }
  }
`;
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      nickname
      birthdate
      age
      gender
      pic_id
      cover_pic_id
      about
      aura
      is_public
      status
      followed
      verified
      employed
      meta
      createdAt
      updatedAt
      pic {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
      cover_pic {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
      totals {
        user_id
        search_id
        pending
        confirmed
        archived
        reported
        drafted
        following
        followers
        comments
        post_reactions
        post_items_reactions
        comment_reactions
        post_views
        post_shares
        unseen
        createdAt
        updatedAt
      }
      username {
        id
        id_name
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      category {
        items {
          id
          user_id
          category_id
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listUsersByStatus = /* GraphQL */ `
  query ListUsersByStatus(
    $status: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUserTotal = /* GraphQL */ `
  query GetUserTotal($user_id: ID!) {
    getUserTotal(user_id: $user_id) {
      user_id
      search_id
      pending
      confirmed
      archived
      reported
      drafted
      following
      followers
      comments
      post_reactions
      post_items_reactions
      comment_reactions
      post_views
      post_shares
      unseen
      createdAt
      updatedAt
    }
  }
`;
export const listUserTotals = /* GraphQL */ `
  query ListUserTotals(
    $user_id: ID
    $filter: ModelUserTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserTotals(
      user_id: $user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        search_id
        pending
        confirmed
        archived
        reported
        drafted
        following
        followers
        comments
        post_reactions
        post_items_reactions
        comment_reactions
        post_views
        post_shares
        unseen
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroupTotal = /* GraphQL */ `
  query GetGroupTotal($group_id: ID!) {
    getGroupTotal(group_id: $group_id) {
      group_id
      search_id
      pending
      confirmed
      member
      admin
      moderator
      unseen
      createdAt
      updatedAt
    }
  }
`;
export const listGroupTotals = /* GraphQL */ `
  query ListGroupTotals(
    $group_id: ID
    $filter: ModelGroupTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGroupTotals(
      group_id: $group_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        group_id
        search_id
        pending
        confirmed
        member
        admin
        moderator
        unseen
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsername = /* GraphQL */ `
  query GetUsername($id: ID!) {
    getUsername(id: $id) {
      id
      id_name
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
    }
  }
`;
export const listUsernames = /* GraphQL */ `
  query ListUsernames(
    $filter: ModelUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsernames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        id_name
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const userByIdName = /* GraphQL */ `
  query UserByIdName(
    $id_name: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByIdName(
      id_name: $id_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        id_name
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getAura = /* GraphQL */ `
  query GetAura($user_id: ID!) {
    getAura(user_id: $user_id) {
      user_id
      point
      createdAt
      updatedAt
    }
  }
`;
export const listAuras = /* GraphQL */ `
  query ListAuras(
    $user_id: ID
    $filter: ModelAuraFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAuras(
      user_id: $user_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        point
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFollowedUsers = /* GraphQL */ `
  query GetFollowedUsers($id: ID!) {
    getFollowedUsers(id: $id) {
      id
      user_id
      followed_user_id
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      follower_user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
    }
  }
`;
export const listFollowedUserss = /* GraphQL */ `
  query ListFollowedUserss(
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowedUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        followed_user_id
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        follower_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listUsersbyFollowed = /* GraphQL */ `
  query ListUsersbyFollowed(
    $user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersbyFollowed(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        followed_user_id
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        follower_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listUsersbyFollowing = /* GraphQL */ `
  query ListUsersbyFollowing(
    $followed_user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFollowedUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersbyFollowing(
      followed_user_id: $followed_user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        followed_user_id
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        follower_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getUserCategory = /* GraphQL */ `
  query GetUserCategory($id: ID!) {
    getUserCategory(id: $id) {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        pic_id
        icon
        createdAt
        updatedAt
        picture {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listUserCategorys = /* GraphQL */ `
  query ListUserCategorys(
    $filter: ModelUserCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        category_id
        createdAt
        updatedAt
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listUserCategoryByUser = /* GraphQL */ `
  query ListUserCategoryByUser(
    $user_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUserCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCategoryByUser(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        category_id
        createdAt
        updatedAt
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listUserCategoryByCategory = /* GraphQL */ `
  query ListUserCategoryByCategory(
    $category_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUserCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCategoryByCategory(
      category_id: $category_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        category_id
        createdAt
        updatedAt
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      pic_id
      icon
      createdAt
      updatedAt
      picture {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        pic_id
        icon
        createdAt
        updatedAt
        picture {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      description
      f_text
      commentType
      status
      user_id
      updated_user_id
      group_id
      category_id
      reacted
      isSaved
      updatedAt
      createdAt
      owned
      ignoreNotification
      oldCaakId
      onlyBlogView
      version
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      updated_user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      category {
        id
        name
        pic_id
        icon
        createdAt
        updatedAt
        picture {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
      }
      status_history {
        items {
          id
          post_id
          status
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      items {
        items {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        post_id
        status
        search_id
        group_id
        category_id
        search_key
        reactions
        total_reactions
        comments
        views
        shares
        groupAndStatus
        categoryAndStatus
        userAndStatus
        createdAt
        updatedAt
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      comments {
        items {
          id
          user_id
          post_id
          post_item_id
          comment
          status
          type
          on_to
          parent_id
          replyUserID
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        featured
        g_rules
        g_attentions
        aura
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        totals {
          group_id
          search_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPostByStatus = /* GraphQL */ `
  query GetPostByStatus(
    $status: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPostByGroup = /* GraphQL */ `
  query GetPostByGroup(
    $group_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByGroup(
      group_id: $group_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPostByUser = /* GraphQL */ `
  query GetPostByUser(
    $user_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPostByUser(
      user_id: $user_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listPostByOwned = /* GraphQL */ `
  query ListPostByOwned(
    $owned: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostByOwned(
      owned: $owned
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listPostByTitle = /* GraphQL */ `
  query ListPostByTitle(
    $status: String
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostByTitle(
      status: $status
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listPostByOldId = /* GraphQL */ `
  query ListPostByOldId(
    $oldCaakId: String
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostByOldId(
      oldCaakId: $oldCaakId
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const searchPosts = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostFilterInput
    $sort: SearchablePostSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
      total
    }
  }
`;
export const getSavedPost = /* GraphQL */ `
  query GetSavedPost($id: ID!) {
    getSavedPost(id: $id) {
      id
      user_id
      post_id
      createdAt
      updatedAt
      post {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listSavedPosts = /* GraphQL */ `
  query ListSavedPosts(
    $filter: ModelSavedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        post_id
        createdAt
        updatedAt
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const listSavedPostByUser = /* GraphQL */ `
  query ListSavedPostByUser(
    $user_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSavedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedPostByUser(
      user_id: $user_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        createdAt
        updatedAt
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const getPostStatusHistory = /* GraphQL */ `
  query GetPostStatusHistory($id: ID!) {
    getPostStatusHistory(id: $id) {
      id
      post_id
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const listPostStatusHistorys = /* GraphQL */ `
  query ListPostStatusHistorys(
    $filter: ModelPostStatusHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostStatusHistorys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        post_id
        status
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listPostStatusHistoryByPost = /* GraphQL */ `
  query ListPostStatusHistoryByPost(
    $post_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostStatusHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostStatusHistoryByPost(
      post_id: $post_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        post_id
        status
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostItems = /* GraphQL */ `
  query GetPostItems($id: ID!) {
    getPostItems(id: $id) {
      id
      post_id
      user_id
      file_id
      title
      description
      f_text
      order
      isEmbed
      reacted
      createdAt
      updatedAt
      file {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
      post {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      totals {
        post_item_id
        search_id
        reactions
        comments
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          user_id
          post_id
          post_item_id
          comment
          status
          type
          on_to
          parent_id
          replyUserID
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPostItemss = /* GraphQL */ `
  query ListPostItemss(
    $filter: ModelPostItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post_id
        user_id
        file_id
        title
        description
        f_text
        order
        isEmbed
        reacted
        createdAt
        updatedAt
        file {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        totals {
          post_item_id
          search_id
          reactions
          comments
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPostTotal = /* GraphQL */ `
  query GetPostTotal($post_id: ID!) {
    getPostTotal(post_id: $post_id) {
      post_id
      status
      search_id
      group_id
      category_id
      search_key
      reactions
      total_reactions
      comments
      views
      shares
      groupAndStatus
      categoryAndStatus
      userAndStatus
      createdAt
      updatedAt
      post {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listPostTotals = /* GraphQL */ `
  query ListPostTotals(
    $post_id: ID
    $filter: ModelPostTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPostTotals(
      post_id: $post_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        post_id
        status
        search_id
        group_id
        category_id
        search_key
        reactions
        total_reactions
        comments
        views
        shares
        groupAndStatus
        categoryAndStatus
        userAndStatus
        createdAt
        updatedAt
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const listPostOrderByReactions = /* GraphQL */ `
  query ListPostOrderByReactions(
    $status: String
    $total_reactions: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostTotalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostOrderByReactions(
      status: $status
      total_reactions: $total_reactions
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        post_id
        status
        search_id
        group_id
        category_id
        search_key
        reactions
        total_reactions
        comments
        views
        shares
        groupAndStatus
        categoryAndStatus
        userAndStatus
        createdAt
        updatedAt
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const listPostByGroupOrderByReactions = /* GraphQL */ `
  query ListPostByGroupOrderByReactions(
    $groupAndStatus: String
    $total_reactions: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostTotalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostByGroupOrderByReactions(
      groupAndStatus: $groupAndStatus
      total_reactions: $total_reactions
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        post_id
        status
        search_id
        group_id
        category_id
        search_key
        reactions
        total_reactions
        comments
        views
        shares
        groupAndStatus
        categoryAndStatus
        userAndStatus
        createdAt
        updatedAt
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const listPostByCategoryOrderByReactions = /* GraphQL */ `
  query ListPostByCategoryOrderByReactions(
    $categoryAndStatus: String
    $total_reactions: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostTotalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostByCategoryOrderByReactions(
      categoryAndStatus: $categoryAndStatus
      total_reactions: $total_reactions
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        post_id
        status
        search_id
        group_id
        category_id
        search_key
        reactions
        total_reactions
        comments
        views
        shares
        groupAndStatus
        categoryAndStatus
        userAndStatus
        createdAt
        updatedAt
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const getPostItemsTotal = /* GraphQL */ `
  query GetPostItemsTotal($post_item_id: ID!) {
    getPostItemsTotal(post_item_id: $post_item_id) {
      post_item_id
      search_id
      reactions
      comments
      createdAt
      updatedAt
    }
  }
`;
export const listPostItemsTotals = /* GraphQL */ `
  query ListPostItemsTotals(
    $post_item_id: ID
    $filter: ModelPostItemsTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPostItemsTotals(
      post_item_id: $post_item_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        post_item_id
        search_id
        reactions
        comments
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostHistory = /* GraphQL */ `
  query GetPostHistory($id: ID!) {
    getPostHistory(id: $id) {
      id
      post_id
      post
      description
      createdAt
      updatedAt
    }
  }
`;
export const listPostHistorys = /* GraphQL */ `
  query ListPostHistorys(
    $filter: ModelPostHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostHistorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post_id
        post
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostViews = /* GraphQL */ `
  query GetPostViews($id: ID!) {
    getPostViews(id: $id) {
      id
      post_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const listPostViewss = /* GraphQL */ `
  query ListPostViewss(
    $filter: ModelPostViewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostViewss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostShares = /* GraphQL */ `
  query GetPostShares($id: ID!) {
    getPostShares(id: $id) {
      id
      post_id
      user_id
      description
      source
      link
      createdAt
      updatedAt
    }
  }
`;
export const listPostSharess = /* GraphQL */ `
  query ListPostSharess(
    $filter: ModelPostSharesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostSharess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post_id
        user_id
        description
        source
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      user_id
      post_id
      post_item_id
      comment
      status
      type
      on_to
      parent_id
      replyUserID
      reacted
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      replyTo {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      post {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      post_item {
        id
        post_id
        user_id
        file_id
        title
        description
        f_text
        order
        isEmbed
        reacted
        createdAt
        updatedAt
        file {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        totals {
          post_item_id
          search_id
          reactions
          comments
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
      }
      sub {
        items {
          id
          user_id
          post_id
          post_item_id
          comment
          status
          type
          on_to
          parent_id
          replyUserID
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        comment_id
        reactions
        createdAt
        updatedAt
      }
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        post_id
        post_item_id
        comment
        status
        type
        on_to
        parent_id
        replyUserID
        reacted
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCommentByPostItem = /* GraphQL */ `
  query ListCommentByPostItem(
    $post_item_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentByPostItem(
      post_item_id: $post_item_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        post_item_id
        comment
        status
        type
        on_to
        parent_id
        replyUserID
        reacted
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getCommentsByPost = /* GraphQL */ `
  query GetCommentsByPost(
    $post_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCommentsByPost(
      post_id: $post_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        post_item_id
        comment
        status
        type
        on_to
        parent_id
        replyUserID
        reacted
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCommentsByDateAndType = /* GraphQL */ `
  query ListCommentsByDateAndType(
    $post_id: ID
    $typeCreatedAt: ModelCommentByTypeOrderByDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentsByDateAndType(
      post_id: $post_id
      typeCreatedAt: $typeCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        post_item_id
        comment
        status
        type
        on_to
        parent_id
        replyUserID
        reacted
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCommentsByDateAndTypeForItem = /* GraphQL */ `
  query ListCommentsByDateAndTypeForItem(
    $post_item_id: ID
    $typeCreatedAt: ModelCommentByTypeOrderByDateForItemCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentsByDateAndTypeForItem(
      post_item_id: $post_item_id
      typeCreatedAt: $typeCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        post_item_id
        comment
        status
        type
        on_to
        parent_id
        replyUserID
        reacted
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCommentByParent = /* GraphQL */ `
  query ListCommentByParent(
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
        id
        user_id
        post_id
        post_item_id
        comment
        status
        type
        on_to
        parent_id
        replyUserID
        reacted
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCommentByUser = /* GraphQL */ `
  query ListCommentByUser(
    $user_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentByUser(
      user_id: $user_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        post_item_id
        comment
        status
        type
        on_to
        parent_id
        replyUserID
        reacted
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCommentsByStatus = /* GraphQL */ `
  query ListCommentsByStatus(
    $status: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentsByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        post_id
        post_item_id
        comment
        status
        type
        on_to
        parent_id
        replyUserID
        reacted
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        replyTo {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
        post_item {
          id
          post_id
          user_id
          file_id
          title
          description
          f_text
          order
          isEmbed
          reacted
          createdAt
          updatedAt
        }
        sub {
          nextToken
        }
        totals {
          comment_id
          reactions
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getCommentTotal = /* GraphQL */ `
  query GetCommentTotal($comment_id: ID!) {
    getCommentTotal(comment_id: $comment_id) {
      comment_id
      reactions
      createdAt
      updatedAt
    }
  }
`;
export const listCommentTotals = /* GraphQL */ `
  query ListCommentTotals(
    $comment_id: ID
    $filter: ModelCommentTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommentTotals(
      comment_id: $comment_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        comment_id
        reactions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReactions = /* GraphQL */ `
  query GetReactions($id: ID!) {
    getReactions(id: $id) {
      id
      item_id
      user_id
      type
      on_to
      createdAt
      updatedAt
    }
  }
`;
export const listReactionss = /* GraphQL */ `
  query ListReactionss(
    $filter: ModelReactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReactionss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        item_id
        user_id
        type
        on_to
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReportedPost = /* GraphQL */ `
  query GetReportedPost($id: ID!) {
    getReportedPost(id: $id) {
      id
      typeName
      post_id
      user_id
      reason
      status
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      post {
        id
        title
        description
        f_text
        commentType
        status
        user_id
        updated_user_id
        group_id
        category_id
        reacted
        isSaved
        updatedAt
        createdAt
        owned
        ignoreNotification
        oldCaakId
        onlyBlogView
        version
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        updated_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        status_history {
          nextToken
        }
        items {
          nextToken
        }
        totals {
          post_id
          status
          search_id
          group_id
          category_id
          search_key
          reactions
          total_reactions
          comments
          views
          shares
          groupAndStatus
          categoryAndStatus
          userAndStatus
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listReportedPosts = /* GraphQL */ `
  query ListReportedPosts(
    $filter: ModelReportedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        typeName
        post_id
        user_id
        reason
        status
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const listReportedPostByUser = /* GraphQL */ `
  query ListReportedPostByUser(
    $user_id: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ListReportedPostByUser(
      user_id: $user_id
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        typeName
        post_id
        user_id
        reason
        status
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const listReportedPostByStatus = /* GraphQL */ `
  query ListReportedPostByStatus(
    $status: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ListReportedPostByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        typeName
        post_id
        user_id
        reason
        status
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const listReportedPostOrderByCreatedAt = /* GraphQL */ `
  query ListReportedPostOrderByCreatedAt(
    $typeName: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportedPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ListReportedPostOrderByCreatedAt(
      typeName: $typeName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        typeName
        post_id
        user_id
        reason
        status
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        post {
          id
          title
          description
          f_text
          commentType
          status
          user_id
          updated_user_id
          group_id
          category_id
          reacted
          isSaved
          updatedAt
          createdAt
          owned
          ignoreNotification
          oldCaakId
          onlyBlogView
          version
        }
      }
      nextToken
    }
  }
`;
export const getReportType = /* GraphQL */ `
  query GetReportType($id: ID!) {
    getReportType(id: $id) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const listReportTypes = /* GraphQL */ `
  query ListReportTypes(
    $filter: ModelReportTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroupUsers = /* GraphQL */ `
  query GetGroupUsers($id: ID!) {
    getGroupUsers(id: $id) {
      id
      user_id
      group_id
      role
      createdAt
      updatedAt
      user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        featured
        g_rules
        g_attentions
        aura
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        totals {
          group_id
          search_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listGroupUserss = /* GraphQL */ `
  query ListGroupUserss(
    $filter: ModelGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        group_id
        role
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listGroupByUserAndRole = /* GraphQL */ `
  query ListGroupByUserAndRole(
    $user_id: ID
    $role: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupByUserAndRole(
      user_id: $user_id
      role: $role
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        group_id
        role
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getGroupUsersByGroup = /* GraphQL */ `
  query GetGroupUsersByGroup(
    $group_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getGroupUsersByGroup(
      group_id: $group_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        group_id
        role
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listGroupUsersByGroup = /* GraphQL */ `
  query ListGroupUsersByGroup(
    $group_id: ID
    $role: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupUsersByGroup(
      group_id: $group_id
      role: $role
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        group_id
        role
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      category_id
      about
      founder_id
      rating
      followed
      role_on_group
      featured
      g_rules
      g_attentions
      aura
      createdAt
      updatedAt
      profile {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
      cover {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
      founder {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
      totals {
        group_id
        search_id
        pending
        confirmed
        member
        admin
        moderator
        unseen
        createdAt
        updatedAt
      }
      category {
        id
        name
        pic_id
        icon
        createdAt
        updatedAt
        picture {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
      }
      members {
        items {
          id
          user_id
          group_id
          role
          createdAt
          updatedAt
        }
        nextToken
      }
      username {
        id
        id_name
        createdAt
        updatedAt
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        featured
        g_rules
        g_attentions
        aura
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        totals {
          group_id
          search_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listGroupByFeatured = /* GraphQL */ `
  query ListGroupByFeatured(
    $featured: String
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupByFeatured(
      featured: $featured
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        featured
        g_rules
        g_attentions
        aura
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        totals {
          group_id
          search_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listGroupByCategory = /* GraphQL */ `
  query ListGroupByCategory(
    $category_id: ID
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupByCategory(
      category_id: $category_id
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        featured
        g_rules
        g_attentions
        aura
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        totals {
          group_id
          search_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getGroupUsername = /* GraphQL */ `
  query GetGroupUsername($id: ID!) {
    getGroupUsername(id: $id) {
      id
      id_name
      createdAt
      updatedAt
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
        featured
        g_rules
        g_attentions
        aura
        createdAt
        updatedAt
        profile {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        founder {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
        totals {
          group_id
          search_id
          pending
          confirmed
          member
          admin
          moderator
          unseen
          createdAt
          updatedAt
        }
        category {
          id
          name
          pic_id
          icon
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const listGroupUsernames = /* GraphQL */ `
  query ListGroupUsernames(
    $filter: ModelGroupUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupUsernames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        id_name
        createdAt
        updatedAt
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const groupByIdName = /* GraphQL */ `
  query GroupByIdName(
    $id_name: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGroupUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    groupByIdName(
      id_name: $id_name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        id_name
        createdAt
        updatedAt
        group {
          id
          name
          category_id
          about
          founder_id
          rating
          followed
          role_on_group
          featured
          g_rules
          g_attentions
          aura
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      section
      type
      item_id
      action
      from
      to
      seen
      updatedAt
      createdAt
      version
      from_user {
        id
        firstname
        lastname
        nickname
        birthdate
        age
        gender
        pic_id
        cover_pic_id
        about
        aura
        is_public
        status
        followed
        verified
        employed
        meta
        createdAt
        updatedAt
        pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        cover_pic {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        totals {
          user_id
          search_id
          pending
          confirmed
          archived
          reported
          drafted
          following
          followers
          comments
          post_reactions
          post_items_reactions
          comment_reactions
          post_views
          post_shares
          unseen
          createdAt
          updatedAt
        }
        username {
          id
          id_name
          createdAt
          updatedAt
        }
        category {
          nextToken
        }
      }
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        section
        type
        item_id
        action
        from
        to
        seen
        updatedAt
        createdAt
        version
        from_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listNotificationByUser = /* GraphQL */ `
  query ListNotificationByUser(
    $to: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationByUser(
      to: $to
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        section
        type
        item_id
        action
        from
        to
        seen
        updatedAt
        createdAt
        version
        from_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listNotificationByUserAndSeen = /* GraphQL */ `
  query ListNotificationByUserAndSeen(
    $to: ID
    $seen: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationByUserAndSeen(
      to: $to
      seen: $seen
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        section
        type
        item_id
        action
        from
        to
        seen
        updatedAt
        createdAt
        version
        from_user {
          id
          firstname
          lastname
          nickname
          birthdate
          age
          gender
          pic_id
          cover_pic_id
          about
          aura
          is_public
          status
          followed
          verified
          employed
          meta
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getFeedBack = /* GraphQL */ `
  query GetFeedBack($id: ID!) {
    getFeedBack(id: $id) {
      id
      typeName
      star
      title
      type
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const listFeedBacks = /* GraphQL */ `
  query ListFeedBacks(
    $filter: ModelFeedBackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedBacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        typeName
        star
        title
        type
        description
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listFeedBackOrderByCreatedAt = /* GraphQL */ `
  query ListFeedBackOrderByCreatedAt(
    $typeName: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFeedBackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedBackOrderByCreatedAt(
      typeName: $typeName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        typeName
        star
        title
        type
        description
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBanner = /* GraphQL */ `
  query GetBanner($id: ID!) {
    getBanner(id: $id) {
      id
      type
      typeName
      title
      pic1_id
      pic2_id
      start_date
      end_date
      meta
      createdAt
      updatedAt
      pic1 {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
      pic2 {
        id
        key
        name
        owner
        bucket
        region
        level
        ext
        type
        isExternal
        external_url
        provider
        provided_item
        createdAt
        updatedAt
      }
    }
  }
`;
export const listBanners = /* GraphQL */ `
  query ListBanners(
    $filter: ModelBannerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBanners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        typeName
        title
        pic1_id
        pic2_id
        start_date
        end_date
        meta
        createdAt
        updatedAt
        pic1 {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        pic2 {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listBannersByType = /* GraphQL */ `
  query ListBannersByType(
    $type: String
    $start_date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBannerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBannersByType(
      type: $type
      start_date: $start_date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        typeName
        title
        pic1_id
        pic2_id
        start_date
        end_date
        meta
        createdAt
        updatedAt
        pic1 {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        pic2 {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const listBannersByTypeOrderByEndDate = /* GraphQL */ `
  query ListBannersByTypeOrderByEndDate(
    $type: String
    $sortDirection: ModelSortDirection
    $filter: ModelBannerFilterInput
    $limit: Int
    $nextToken: String
    $end_date: ModelStringKeyConditionInput
  ) {
    listBannersByTypeOrderByEndDate(
      type: $type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      end_date: $end_date
    ) {
      items {
        id
        type
        typeName
        title
        pic1_id
        pic2_id
        start_date
        end_date
        meta
        createdAt
        updatedAt
        pic1 {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
        pic2 {
          id
          key
          name
          owner
          bucket
          region
          level
          ext
          type
          isExternal
          external_url
          provider
          provided_item
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

