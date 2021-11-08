import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updatePost } from "../../graphql-custom/post/mutation";
import { getPost } from "../../graphql-custom/post/queries";
import { createPostHistory } from "../../graphql-custom/postHistory/mutation";
import { createPostItems, deletePostItems, updatePostItems } from "../../graphql-custom/postItems/mutation";
import { ApiFileUpload } from "../../utility/ApiHelper";
import { getReturnData, _objectWithoutKeys } from "../../utility/Util";

export const update = async (oldPost, userId) => {
 
    try{

        let {items , ...post} = {...oldPost}

        let currentPost = getReturnData(await API.graphql(graphqlOperation(getPost, {id: post.id})))

        if(currentPost.version === post.version){

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
            let postData = _objectWithoutKeys(post, ["user"])

            post = getReturnData(
                await API.graphql(graphqlOperation(updatePost, {input: {
                    ...postData,
                    expectedVersion: post.version,
                    status: "POSTING"
                }}))
            )

            // UPDATE POST ITEM
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const postItem = _objectWithoutKeys(item, ["file"])
                if (!item.id) {
                    const resp = await ApiFileUpload(item.file);
                    postItem.file_id = resp.id;
                    postItem.order = i;
                    postItem.post_id = post.id;
                    postItem.user_id = userId
                    await API.graphql(graphqlOperation(createPostItems, { input: postItem }));
                }else{
                    postItem.order = i;
                    postItem.user_id = userId
                    await API.graphql(graphqlOperation(updatePostItems, { input: postItem }));
                }
            }

            //DELETE OLD ITEMS
            for (let i = 0; i < currentPost.items.length; i++) {
                let currentItem = currentPost.item[i];
                if (!items.find((item) => item.id === currentItem.id)) {
                    await API.graphql(
                        graphqlOperation(deletePostItems, { input: { id: currentItem.id } })
                    );
                }
            }
            
            post = getReturnData(
                await API.graphql(graphqlOperation(updatePost, {input: {
                    id: post.id,
                    expectedVersion: post.version,
                    status: "PENDING"
                }}))
            )
    
            return post
        }else{
            return {__type: "VersionDoNotMatch"}
        }

    }catch(ex){
        throw ex
    }
    
}