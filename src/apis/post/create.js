import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { createPost, updatePost } from "../../graphql-custom/post/mutation";
import { createPostItems } from "../../graphql-custom/postItems/mutation";
import { ApiFileUpload } from "../../utility/ApiHelper";
import { getReturnData, _objectWithoutKeys } from "../../utility/Util";

export const create = async (newPost, userId) => {
    try{

        let {items , ...post} = {...newPost}
        post = _objectWithoutKeys(post, ["id"])
        post.status = "POSTING"
        post.updated_user_id = userId

        post = getReturnData(await API.graphql(graphqlOperation(createPost, {input: post})))

        for (let i = 0; i < post.items.length; i++) {
            const item = post.items[i];
            const resp = await ApiFileUpload(item.file);
            const postItem = _objectWithoutKeys(item, ["file"])
            postItem.file_id = resp.id;
            postItem.order = i;
            postItem.post_id = post.id;
            postItem.user_id = userId

            await API.graphql(graphqlOperation(createPostItems, { input: postItem }));
        }

        post = await API.graphql(graphqlOperation(updatePost, {input: {
            id: post.id,
            expectedVersion: post.version,
            status: "PENDING"
        }}))

        return post

    }catch(ex){
        throw ex
    }
    
}