const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const DBClient = DB(process.env.API_CAAK_POSTITEMSTABLE_NAME, docClient)
const TABLE_NAME = process.env.API_CAAK_POSTITEMSTABLE_NAME

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

        // let resp = await DBClient.remove(id, "comment_id")
        
        return true
    }catch(ex){
        return ex
    }
}

async function removeByPostId(post_id){
    try{

        const params = {
            TableName : TABLE_NAME,
            IndexName: 'byPost',
            KeyConditionExpression: "#post_id = :post_id",
            ExpressionAttributeNames:{
                "#post_id": "post_id"
            },
            ExpressionAttributeValues: {
                ":post_id": post_id
            }
        };

        const data = await docClient.query(params).promise()

        for(let i=0; i < data.Items.length; i++){
            const item = data.Items[i]
            await DBClient.remove(item.id, "id")
        }
        
        return true
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    insert: insert,
    modify: modify,
    remove: remove,
    removeByPostId: removeByPostId
}