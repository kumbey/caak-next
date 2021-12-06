const { v4: uuidv4 } = require('uuid');
const { updateAttributes } = require('../util/Generate')


const db = (table , client) => {

    const tableName = table
    const docClient = client

    async function get(id){

        let keyData = {}

        if((typeof id) === "object"){
            Object.keys(id).map((k) => {
                keyData[k] = id[k]
            })
        }else{
            keyData.id = id
        }

        const params = {
            TableName: tableName,
            Key: keyData
        }
    
        try {
            const result = await docClient.get(params).promise()
            if(result.statusCode){
                throw result
            }
            return result.Item
        } catch (err) {
            return err
        }
    }

    async function list(name, value, key){

        const params = {
            TableName: tableName,
            IndexName: key,
            KeyConditionExpression: '#name = :value',
            ExpressionAttributeValues: { ':value': value },
            ExpressionAttributeNames: { '#name': name }
        }
    
        try {
            const result = await docClient.query(params).promise()
            if(result.statusCode){
                throw result
            }

            return result.Items
        } catch (err) {
            throw err
        }
    }

    async function create(data){
        try {

            const now = new Date().toISOString()
            
            if(data.disableGenId){
                delete data.disableGenId
            }else{
                data.id = uuidv4()
                delete data.disableGenId
            }

            let pkey = "id"

            if(data.pkey){
                pkey = data.pkey
                delete data.pkey
            }
    
            data.createdAt = now
            data.updatedAt = now
    
            const params = {
                TableName: tableName,
                Item: data,
                ConditionExpression: `attribute_not_exists(${pkey})`,
                ReturnValues : "NONE"
            }
    
            let result = await docClient.put(params).promise();
            if(result.statusCode){
                throw result
            }
            return data
        } catch (err) {
            throw err;
        }
    }
    
    async function update(data, pass){
        try {

            if(!pass){
                pass = ["id"]
            }

            const now = new Date().toISOString()
            
            data.updatedAt = now
            
            const { expression, values, names } = updateAttributes(data, pass)
            const params = {
                TableName: tableName,
                Key:{
                    id: data.id,
                },
                ConditionExpression: "attribute_exists(id)",
                UpdateExpression: expression,
                ExpressionAttributeValues: values,
                ExpressionAttributeNames: names,
                ReturnValues : "ALL_NEW"
            }
    
            let result = await docClient.update(params).promise();
            if(result.statusCode){
                throw result
            }
            return result.Attributes
        } catch (err) {
            throw err;
        }
    }

    async function remove(id, key){
        try {
            const params = {
                TableName: tableName,
                Key:{
                    [key]: id,
                },
                ConditionExpression: `attribute_exists(${key})`
            }
    
            let result = await docClient.delete(params).promise();
            if(result.statusCode){
                throw result
            }
            return id
        } catch (err) {
            throw err;
        }
    }
    
    return {
        get: get,
        list: list,
        create: create,
        update: update,
        remove: remove
    }
}

module.exports = db