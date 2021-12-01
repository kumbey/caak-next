const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Counter = require("/opt/tables/Counter")
const DBClient = DB(process.env.API_CAAKMN_POSTITEMSTOTALTABLE_NAME, docClient)
const CountClient = Counter(process.env.API_CAAKMN_POSTITEMSTOTALTABLE_NAME, docClient)

async function insert(id){
    try{

        let data = {
            disableGenId: true,
            pkey: "post_item_id",
            __typename: "PostItemsTotal",
            post_item_id: id,
            reactions: 0,
            comments: 0,
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
        key: "post_item_id",
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

        // let resp = await DBClient.remove(id, "post_item_id")
        
        return true
    }catch(ex){
        return ex
    }
}

async function get(id){
    try{

        let resp = await DBClient.get({post_id: id})
        
        return resp
    }catch(ex){
        return ex
    }
}

module.exports = {
    insert: insert,
    modify: modify,
    remove: remove,
    get: get
}