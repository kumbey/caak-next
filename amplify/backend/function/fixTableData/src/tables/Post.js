const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function fixVersion(event, context) {
    let tableContents;
    try{
        
        //get items from dynamo
        const params = {
            TableName: process.env.API_CAAKMN_POSTTABLE_NAME,
        };
        tableContents = await scanDB(params);
        
    }catch(err){
        return err;
    }
    
    let calls = [];
    tableContents.forEach(function(value){
        let params = {
            ExpressionAttributeValues: {
                ":version": 1,
            },
            Key: {
                "id": value.id
            },
            TableName: process.env.API_CAAKMN_POSTTABLE_NAME,
            UpdateExpression: "SET version = :version",
            };
        calls.push(docClient.update(params).promise());
    });
    let response;
    try{
        response = await Promise.all(calls);
    }catch(err){
        return err
    }
    return response;
}
async function scanDB(params) {
    let dynamoContents = [];
    let items;
    do{
        items =  await docClient.scan(params).promise();
        items.Items.forEach((item) => dynamoContents.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");
    return dynamoContents;
};

module.exports = {
    fixVersion: fixVersion
}