const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Counter = require("/opt/tables/Counter")
const DBClient = DB(process.env.API_CAAKMN_GROUPTOTALTABLE_NAME, docClient)
const CountClient = Counter(process.env.API_CAAKMN_GROUPTOTALTABLE_NAME, docClient)

async function insert(id){
    try{

        let data = {
            disableGenId: true,
            pkey: "group_id",
            __typename: "GroupTotal",
            group_id: id,
            pending: 0,
            confirmed: 0,
            member: 0,
            admin: 0,
            moderator: 0,
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
        key: "group_id",
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

        let resp = await DBClient.remove(id, "group_id")
        
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