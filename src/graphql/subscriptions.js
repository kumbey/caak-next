/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onChangedTotalsBy = /* GraphQL */ `
  subscription OnChangedTotalsBy($type: String!, $id: ID!) {
    onChangedTotalsBy(type: $type, id: $id) {
      type
      id
      totals
    }
  }
`;
export const onNoficationAdded = /* GraphQL */ `
  subscription OnNoficationAdded($section: String!, $to: ID!) {
    onNoficationAdded(section: $section, to: $to) {
      section
      to
      id
    }
  }
`;
export const onCommentByPostItem = /* GraphQL */ `
  subscription OnCommentByPostItem($post_item_id: ID!, $type: String!) {
    onCommentByPostItem(post_item_id: $post_item_id, type: $type) {
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          updatedAt
          createdAt
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
export const onCommentByPost = /* GraphQL */ `
  subscription OnCommentByPost($post_id: ID!, $type: String!) {
    onCommentByPost(post_id: $post_id, type: $type) {
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          updatedAt
          createdAt
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
export const onCommentByParent = /* GraphQL */ `
  subscription OnCommentByParent($parent_id: ID!, $type: String!) {
    onCommentByParent(parent_id: $parent_id, type: $type) {
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          updatedAt
          createdAt
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
export const onPostByGroup = /* GraphQL */ `
  subscription OnPostByGroup($group_id: ID!, $status: String!) {
    onPostByGroup(group_id: $group_id, status: $status) {
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
      updatedAt
      createdAt
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
        icon
        createdAt
        updatedAt
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
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        post_id
        search_id
        reactions
        comments
        views
        shares
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
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
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
export const onPostByUser = /* GraphQL */ `
  subscription OnPostByUser($user_id: ID!, $status: String!) {
    onPostByUser(user_id: $user_id, status: $status) {
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
      updatedAt
      createdAt
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
        icon
        createdAt
        updatedAt
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
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        post_id
        search_id
        reactions
        comments
        views
        shares
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
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
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
export const onUserUpdateByUser = /* GraphQL */ `
  subscription OnUserUpdateByUser($id: ID!) {
    onUserUpdateByUser(id: $id) {
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
export const onPostUpdateByStatus = /* GraphQL */ `
  subscription OnPostUpdateByStatus($status: String!) {
    onPostUpdateByStatus(status: $status) {
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
      updatedAt
      createdAt
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
        icon
        createdAt
        updatedAt
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
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        post_id
        search_id
        reactions
        comments
        views
        shares
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
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
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
export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile {
    onCreateFile {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile {
    onUpdateFile {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile {
    onDeleteFile {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateFollowedUsers = /* GraphQL */ `
  subscription OnCreateFollowedUsers {
    onCreateFollowedUsers {
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
export const onUpdateFollowedUsers = /* GraphQL */ `
  subscription OnUpdateFollowedUsers {
    onUpdateFollowedUsers {
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
export const onDeleteFollowedUsers = /* GraphQL */ `
  subscription OnDeleteFollowedUsers {
    onDeleteFollowedUsers {
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
export const onCreateUserCategory = /* GraphQL */ `
  subscription OnCreateUserCategory {
    onCreateUserCategory {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateUserCategory = /* GraphQL */ `
  subscription OnUpdateUserCategory {
    onUpdateUserCategory {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteUserCategory = /* GraphQL */ `
  subscription OnDeleteUserCategory {
    onDeleteUserCategory {
      id
      user_id
      category_id
      createdAt
      updatedAt
      category {
        id
        name
        icon
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      name
      icon
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
      updatedAt
      createdAt
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
        icon
        createdAt
        updatedAt
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
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        post_id
        search_id
        reactions
        comments
        views
        shares
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
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
      updatedAt
      createdAt
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
        icon
        createdAt
        updatedAt
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
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        post_id
        search_id
        reactions
        comments
        views
        shares
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
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
      updatedAt
      createdAt
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
        icon
        createdAt
        updatedAt
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
          reacted
          createdAt
          updatedAt
        }
        nextToken
      }
      totals {
        post_id
        search_id
        reactions
        comments
        views
        shares
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
      group {
        id
        name
        category_id
        about
        founder_id
        rating
        followed
        role_on_group
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
export const onCreatePostItems = /* GraphQL */ `
  subscription OnCreatePostItems {
    onCreatePostItems {
      id
      post_id
      user_id
      file_id
      title
      description
      f_text
      order
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
export const onUpdatePostItems = /* GraphQL */ `
  subscription OnUpdatePostItems {
    onUpdatePostItems {
      id
      post_id
      user_id
      file_id
      title
      description
      f_text
      order
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
export const onDeletePostItems = /* GraphQL */ `
  subscription OnDeletePostItems {
    onDeletePostItems {
      id
      post_id
      user_id
      file_id
      title
      description
      f_text
      order
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
export const onCreatePostHistory = /* GraphQL */ `
  subscription OnCreatePostHistory {
    onCreatePostHistory {
      id
      post_id
      post
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePostHistory = /* GraphQL */ `
  subscription OnUpdatePostHistory {
    onUpdatePostHistory {
      id
      post_id
      post
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePostHistory = /* GraphQL */ `
  subscription OnDeletePostHistory {
    onDeletePostHistory {
      id
      post_id
      post
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePostViews = /* GraphQL */ `
  subscription OnCreatePostViews {
    onCreatePostViews {
      id
      post_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePostViews = /* GraphQL */ `
  subscription OnUpdatePostViews {
    onUpdatePostViews {
      id
      post_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePostViews = /* GraphQL */ `
  subscription OnDeletePostViews {
    onDeletePostViews {
      id
      post_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePostShares = /* GraphQL */ `
  subscription OnCreatePostShares {
    onCreatePostShares {
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
export const onUpdatePostShares = /* GraphQL */ `
  subscription OnUpdatePostShares {
    onUpdatePostShares {
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
export const onDeletePostShares = /* GraphQL */ `
  subscription OnDeletePostShares {
    onDeletePostShares {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          updatedAt
          createdAt
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          updatedAt
          createdAt
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          updatedAt
          createdAt
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
export const onCreateCommentTotal = /* GraphQL */ `
  subscription OnCreateCommentTotal {
    onCreateCommentTotal {
      comment_id
      reactions
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCommentTotal = /* GraphQL */ `
  subscription OnUpdateCommentTotal {
    onUpdateCommentTotal {
      comment_id
      reactions
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCommentTotal = /* GraphQL */ `
  subscription OnDeleteCommentTotal {
    onDeleteCommentTotal {
      comment_id
      reactions
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReactions = /* GraphQL */ `
  subscription OnCreateReactions {
    onCreateReactions {
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
export const onUpdateReactions = /* GraphQL */ `
  subscription OnUpdateReactions {
    onUpdateReactions {
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
export const onDeleteReactions = /* GraphQL */ `
  subscription OnDeleteReactions {
    onDeleteReactions {
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
export const onCreateReportedPost = /* GraphQL */ `
  subscription OnCreateReportedPost {
    onCreateReportedPost {
      id
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          createdAt
          updatedAt
        }
      }
      type {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateReportedPost = /* GraphQL */ `
  subscription OnUpdateReportedPost {
    onUpdateReportedPost {
      id
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          createdAt
          updatedAt
        }
      }
      type {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteReportedPost = /* GraphQL */ `
  subscription OnDeleteReportedPost {
    onDeleteReportedPost {
      id
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
        updatedAt
        createdAt
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
          createdAt
          updatedAt
        }
        category {
          id
          name
          icon
          createdAt
          updatedAt
        }
        items {
          nextToken
        }
        totals {
          post_id
          search_id
          reactions
          comments
          views
          shares
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
          createdAt
          updatedAt
        }
      }
      type {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateReportType = /* GraphQL */ `
  subscription OnCreateReportType {
    onCreateReportType {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReportType = /* GraphQL */ `
  subscription OnUpdateReportType {
    onUpdateReportType {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReportType = /* GraphQL */ `
  subscription OnDeleteReportType {
    onDeleteReportType {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGroupUsers = /* GraphQL */ `
  subscription OnCreateGroupUsers {
    onCreateGroupUsers {
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
export const onUpdateGroupUsers = /* GraphQL */ `
  subscription OnUpdateGroupUsers {
    onUpdateGroupUsers {
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
export const onDeleteGroupUsers = /* GraphQL */ `
  subscription OnDeleteGroupUsers {
    onDeleteGroupUsers {
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
      id
      name
      category_id
      about
      founder_id
      rating
      followed
      role_on_group
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
        icon
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
      id
      name
      category_id
      about
      founder_id
      rating
      followed
      role_on_group
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
        icon
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
      id
      name
      category_id
      about
      founder_id
      rating
      followed
      role_on_group
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
        icon
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
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
