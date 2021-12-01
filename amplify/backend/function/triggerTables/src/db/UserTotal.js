const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Counter = require("/opt/tables/Counter")
const DBClient = DB(process.env.API_CAAKMN_USERTOTALTABLE_NAME, docClient)
const CountClient = Counter(process.env.API_CAAKMN_USERTOTALTABLE_NAME, docClient)

async function insert(id){
    try{

        let data = {
            disableGenId: true,
            pkey: "user_id",
            __typename: "UserTotal",
            user_id: id,
            pending: 0,
            confirmed: 0,
            archived: 0,
            reported: 0,
            drafted: 0,
            following: 0,
            followers: 0,
            post_reactions: 0,
            post_items_reactions: 0,
            comment_reactions: 0,
            unseen: 0
        }

        let resp = await DBClient.create(data)

        return resp
    }catch(ex){
        return ex
    }
}

async function modify(id, items){
  try{

    const resp = userTotal = await CountClient.update({
        key: "user_id",
        keyVal: id,
        items: items
    })

    return resp

  }catch(ex){
      return ex
  }
}

async function remove(id){
    try{

        let resp = await DBClient.remove(id, "user_id")

        return resp
    }catch(ex){
        return ex
    }
}

module.exports = {
    insert: insert,
    modify: modify,
    remove: remove
}