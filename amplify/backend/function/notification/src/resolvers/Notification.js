const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function seenALL(event) {

    let tableContents;
    try{
        
        const { user_id } = event.arguments

        //get items from dynamo
        const params = {
            TableName: process.env.API_CAAKMN_NOTIFICATIONTABLE_NAME,
            IndexName: "byUserAndSeen",
            KeyConditionExpression: "#to = :to AND seen = :seen",
            ExpressionAttributeValues: {
                ":to": user_id,
                ":seen": "FALSE"
            },
            ExpressionAttributeNames: {
                "#to": "to"
            }
        };
        tableContents = await queryDB(params);
        
    }catch(err){
        return false
    }
    
    let calls = [];
    tableContents.forEach(function(value){
        let params = {
            ExpressionAttributeValues: {
                ":seen": "TRUE",
            },
            Key: {
                "id": value.id
            },
            TableName: process.env.API_CAAKMN_NOTIFICATIONTABLE_NAME,
            UpdateExpression: "SET seen = :seen",
            };
        calls.push(docClient.update(params).promise());
    });

    try{
        await Promise.all(calls);
    }catch(err){
        return false
    }
    return true;
}
async function queryDB(params) {
    let dynamoContents = [];
    let items;
    do{
        items =  await docClient.query(params).promise();
        items.Items.forEach((item) => dynamoContents.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");
    return dynamoContents;
};

module.exports = {
    seenAll: seenALL
}