const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Counter = require("/opt/tables/Counter")
const DBClient = DB(process.env.API_CAAK_POSTTOTALTABLE_NAME, docClient)
const CountClient = Counter(process.env.API_CAAK_POSTTOTALTABLE_NAME, docClient)

async function insert(newImg){
    try{

        let data = {
            disableGenId: true,
            pkey: "post_id",
            __typename: "PostTotal",
            post_id: newImg.id,
            status: newImg.status,
            search_id: newImg.id,
            group_id: newImg.group_id,
            category_id: newImg.category_id,
            groupAndStatus: `${newImg.group_id}#${newImg.status}`,
            search_key: "P",
            reactions: 0,
            total_reactions: 0,
            comments: 0,
            views: 0,
            shares: 0
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
        key: "post_id",
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

        let resp = await DBClient.remove(id, "post_id")
        
        return resp
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

async function update(data, pass, idField){
    try{

        let resp = await DBClient.update(data, pass, idField)
        
        return resp
    }catch(ex){
        return ex
    }
}

module.exports = {
    insert: insert,
    modify: modify,
    remove: remove,
    get: get,
    update: update
}