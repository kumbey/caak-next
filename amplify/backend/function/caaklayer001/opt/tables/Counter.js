const { countUpdateAttributes } = require('../util/Generate')


const counter = (table , client) => {

    const tableName = table
    const docClient = client
    
    async function update(data){
        try {
            let retData = []

            for(let i=0; i < data.items.length; i++){
                const item = data.items[i]
                const { expression, values, names , condition} = countUpdateAttributes(item)

                const params = {
                    TableName: tableName,
                    Key: {
                        [data.key]: data.keyVal,
                    },
                    UpdateExpression: expression,
                    ExpressionAttributeNames: names,
                    ExpressionAttributeValues: values,
                    ReturnValues : "ALL_NEW"
                };
                
                if(condition !== `null`){
                    params.ConditionExpression = condition
                }
        
                let result = await docClient.update(params).promise();
                if(result.statusCode){
                    retData.push(result)
                }else{
                    retData.push(result.Attributes)
                }
            }

            return retData
 
        } catch (err) {
            return err
        }
    }
    
    return {
        update: update,
    }
}

module.exports = counter