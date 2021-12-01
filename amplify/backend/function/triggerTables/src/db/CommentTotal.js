const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Counter = require("/opt/tables/Counter")
const DBClient = DB(process.env.API_CAAKMN_COMMENTTOTALTABLE_NAME, docClient)
const CountClient = Counter(process.env.API_CAAKMN_COMMENTTOTALTABLE_NAME, docClient)

async function insert(id){
    try{

        data = {
            disableGenId: true,
            pkey: "comment_id",
            __typename: "CommentTotal",
            comment_id: id,
            reactions: 0
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
        key: "comment_id",
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

        let resp = await DBClient.remove(id, "comment_id")
        
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