const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Reactions = DB(process.env.API_CAAK_REACTIONSTABLE_NAME, docClient)
const FollowedUsers = DB(process.env.API_CAAK_FOLLOWEDUSERSTABLE_NAME, docClient)
const GroupUsers = DB(process.env.API_CAAK_GROUPUSERSTABLE_NAME, docClient)

async function isReacted(ctx){
    try{

        const { identity, source } = ctx

        let user_id = "unlogged"
        if(identity.claims){
            user_id = identity.claims.sub
        }

        const ids = {
            id: `${source.id}#${user_id}`
        }

        let resp = await Reactions.get(ids)

        if(resp && Object.keys(resp).length > 0){
            return true
        }else{
            return false
        }

    }catch(ex){
        return false
    }
}

async function isFollowed(ctx){
    try{

        const { identity, source } = ctx

        let user_id = "unlogged"
        if(identity.claims){
            user_id = identity.claims.sub
        }

        const ids = {
            id: `${source.id}#${user_id}`
        }

        let resp = await FollowedUsers.get(ids)

        if(resp && Object.keys(resp).length > 0){
            return true
        }else{
            return false
        }

    }catch(ex){
        return false
    }
}

async function isFollowedGroup(ctx){
    try{

        const { identity, source } = ctx

        let user_id = "unlogged"
        if(identity.claims){
            user_id = identity.claims.sub
        }

        const ids = {
            id: `${source.id}#${user_id}`
        }

        let resp = await GroupUsers.get(ids)
        if(resp && Object.keys(resp).length > 0){
            return true
        }else{
            return false
        }

    }catch(ex){
        return false
    }
}


module.exports = {
    isReacted: isReacted,
    isFollowed: isFollowed,
    isFollowedGroup: isFollowedGroup
}