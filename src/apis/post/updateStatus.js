import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import { getPost } from "../../graphql-custom/post/queries";
import { getReturnData } from "../../utility/Util";

export const updateStatus = async (oldPost, userId, status) => {
  try {
    let { ...post } = { ...oldPost };

    let currentPost = getReturnData(
      await API.graphql(graphqlOperation(getPost, { id: post.id })),
      false
    );

    if (currentPost.version === post.version) {
      //UPDATE POST
      post = getReturnData(
        await API.graphql(
          graphqlOperation(updatePost, {
            input: {
              id: post.id,
              expectedVersion: post.version,
              status: status,
            },
          })
        )
      );
      return post;
    } else {
      if(currentPost.status !== post.status){
        post = getReturnData(
            await API.graphql(
                graphqlOperation(updatePost, {
                  input: {
                    id: post.id,
                    expectedVersion: currentPost.version,
                    status: status,
                  },
                })
            )
        );
        return post;
      }
      return { __type: "Already confirmed" };
    }
  } catch (ex) {
    throw ex;
  }
};
