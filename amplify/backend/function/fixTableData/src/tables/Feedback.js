const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function addTypeName(event, context) {
    let tableContents;
    try{
        
        //get items from dynamo

        const params = {
            TableName: process.env.API_CAAK_FEEDBACKTABLE_NAME,
        };
        tableContents = await scanDB(params);
        
    }catch(err){
        return err;
    }
    
    let calls = [];
    tableContents.forEach(function(value){
        let params = {
            ExpressionAttributeValues: {
                ":typeName": "FEEDBACK",
            },
            Key: {
                "id": value.id
            },
            TableName: process.env.API_CAAK_FEEDBACKTABLE_NAME,
            UpdateExpression: "SET typeName = :typeName",
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
    addTypeName: addTypeName
}