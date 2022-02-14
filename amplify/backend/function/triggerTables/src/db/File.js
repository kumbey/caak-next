const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const DBClient = DB(process.env.API_CAAK_FILETABLE_NAME, docClient)

async function insert(id){
    try{

        return true
    }catch(ex){
        return ex
    }
}

async function modify(id, items){
  try{

    return true

  }catch(ex){
      return ex
  }
}

async function remove(id){
    try{

        let resp = await DBClient.remove(id, "id")

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