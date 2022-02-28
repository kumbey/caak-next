import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createPost, updatePost } from "../graphql-custom/post/mutation";
import { getPost } from "../graphql-custom/post/queries";
import { createPostHistory } from "../graphql-custom/postHistory/mutation";
import {
  createPostItems,
  deletePostItems,
  updatePostItems,
} from "../graphql-custom/postItems/mutation";
import { ApiFileUpload } from "../utility/ApiHelper";
import { _objectWithoutKeys, getReturnData } from "../utility/Util";

const postStatusHandler = (status, role) => {
  if (status === "DRAFT") return "DRAFT";
  if (status === "CAAK_DRAFT") return "CAAK_DRAFT";
  if (role === "ADMIN" || role === "MODERATOR") return "CONFIRMED";
  return "PENDING";
};

export const crtPost = async (newPost, userId, role) => {
  try {
    let { items, status, ...post } = { ...newPost };
    post = _objectWithoutKeys(post, ["id"]);
    post.status = "POSTING";
    post.updated_user_id = userId;
    // post.commentType = true;
    post.user_id = userId;
    post.ignoreNotification =
      role === "ADMIN" || role === "MODERATOR" ? "TRUE" : "FALSE";

    const savedPost = getReturnData(
      await API.graphql(graphqlOperation(createPost, { input: post }))
    );
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const resp = await ApiFileUpload(item.file);
      const postItem = _objectWithoutKeys(item, [
        "file",
        "thumbnail",
        "chosen",
        "id",
        "url",
      ]);
      if (item.file.type.startsWith("video")) {
        const thumbnailResp = await ApiFileUpload(item.thumbnail);
        postItem.thumbnail_id = thumbnailResp.id;
      }
      postItem.file_id = resp.id;
      postItem.order = i;
      postItem.post_id = savedPost.id;
      postItem.user_id = userId;

      await API.graphql(graphqlOperation(createPostItems, { input: postItem }));
    }

    post = await API.graphql(
      graphqlOperation(updatePost, {
        input: {
          id: savedPost.id,
          expectedVersion: savedPost.version,
          ignoreNotification:
            role === "ADMIN" || role === "MODERATOR" ? "TRUE" : "FALSE",
          status: postStatusHandler(status, role),
        },
      })
    );

    return post;
  } catch (ex) {
    throw ex;
  }
};

export const pdtPost = async (oldPost, userId, role) => {
  try {
    let { items, status, ...post } = { ...oldPost };

    const currentPost = getReturnData(
      await API.graphql(graphqlOperation(getPost, { id: post.id }))
    );

    if (currentPost.version === post.version) {
      //CREATE POST HISTORY
      await API.graphql(
        graphqlOperation(createPostHistory, {
          input: {
            post_id: post.id,
            post: JSON.stringify(currentPost),
          },
        })
      );

      //UPDATE POST
      const postData = _objectWithoutKeys(post, ["user", "version"]);

      post = getReturnData(
        await API.graphql(
          graphqlOperation(updatePost, {
            input: {
              ...postData,
              expectedVersion: post.version,
              ignoreNotification:
                role === "ADMIN" || role === "MODERATOR" ? "TRUE" : "FALSE",
              status: "POSTING",
            },
          })
        )
      );

      // UPDATE POST ITEM
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const postItem = _objectWithoutKeys(item, [
          "file",
          "thumbnail",
          "url",
          "chosen",
          "id",
        ]);
        if (typeof item.id === "number") {
          if (item.file.type.startsWith("video")) {
            const thumbnailResp = await ApiFileUpload(item.thumbnail);
            postItem.thumbnail_id = thumbnailResp.id;
          }
          const resp = await ApiFileUpload(item.file);
          postItem.file_id = resp.id;
          postItem.order = i;
          postItem.post_id = post.id;
          postItem.user_id = userId;
          await API.graphql(
            graphqlOperation(createPostItems, { input: postItem })
          );
        } else {
          postItem.id = item.id;
          postItem.order = i;
          postItem.user_id = userId;
          await API.graphql(
            graphqlOperation(updatePostItems, { input: postItem })
          );
        }
      }

      //DELETE OLD ITEMS
      for (let i = 0; i < currentPost.items.items.length; i++) {
        const currentItem = currentPost.items.items[i];
        if (!items.find((item) => item.id === currentItem.id)) {
          await API.graphql(
            graphqlOperation(deletePostItems, { input: { id: currentItem.id } })
          );
        }
      }

      post = getReturnData(
        await API.graphql(
          graphqlOperation(updatePost, {
            input: {
              id: post.id,
              expectedVersion: post.version,
              ignoreNotification:
                role === "ADMIN" || role === "MODERATOR" ? "TRUE" : "FALSE",
              status: postStatusHandler(status, role),
            },
          })
        )
      );

      return post;
    } else {
      return { __type: "VersionDoNotMatch" };
    }
  } catch (ex) {
    throw ex;
  }
};
