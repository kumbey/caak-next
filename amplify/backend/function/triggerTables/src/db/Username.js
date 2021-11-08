const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const DBClient = DB(process.env.API_CAAKMN_USERNAMETABLE_NAME, docClient)
const { customAlphabet } =  require('nanoid')

async function insert(id){
    try{    

        const nanoid = customAlphabet(id , 8)
        const now = new Date().toISOString()

        data = {
            disableGenId: true,
            __typename: "Username",
            id: id,
            id_name: nanoid(),
            updatedAt: now,
            createdAt: now
        }

        let resp = await DBClient.create(data)

        return resp
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

        // let resp = await DBClient.remove(id, "comment_id")
        
        return true
    }catch(ex){
        return ex
    }
}

module.exports = {
    insert: insert,
    modify: modify,
    remove: remove
}