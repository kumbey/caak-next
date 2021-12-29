/* Amplify Params - DO NOT EDIT
	API_CAAK_FILETABLE_ARN
	API_CAAK_FILETABLE_NAME
	API_CAAK_GRAPHQLAPIIDOUTPUT
	API_CAAK_POSTITEMSTABLE_ARN
	API_CAAK_POSTITEMSTABLE_NAME
	API_CAAK_POSTTABLE_ARN
	API_CAAK_POSTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');
const Posts1 = require("../../../../../src/restoreData/posts1.json")


const getFileExt = (fileName) => {
    return fileName.substring(fileName.lastIndexOf(".") + 1);
}
  
const getFileName = (fileName) => {
    return fileName.replace("." + getFileExt(fileName), "");
}

exports.handler = async (event) => {
    
    try{

        jsonFile = null

        switch (event.key) {
            case 'posts1':
                jsonFile = Posts1
                break
            default:
                jsonFile = null

        }

        for(let i=0; i < 20; i++){
            
            const post = jsonFile[i]
            const postItems = post.items

            post.id = uuidv4()
            post.status = "CONFIRMED"
            post.user_id = "59ac8093-7848-4f0d-89fd-2c30c9195034"
            post.updated_user_id = "59ac8093-7848-4f0d-89fd-2c30c9195034"
            post.group_id = "4def44e3-9961-4502-b60f-61b28743103f"
            post.category_id = "9717e8da-6b54-4d3b-8055-fa9000366b4e"
            post.owned = "CAAK"
            post.ignoreNotification = "TRUE"


            const params = {
                TableName: "API_CAAK_POSTTABLE_NAME",
                Item: post,
                ConditionExpression: `attribute_not_exists(id)`,
                ReturnValues : "NONE"
            }
            await docClient.put(params).promise();
            console.log(jsonFile.length)


            for(let itemIndex = 0; itemIndex < postItems.length; i++){

                const item = postItems[itemIndex]
                const file = item.block_img.slice("/")
                delete item["block_img"]

                let fileName = null

                if(file.length > 0){
                    fileName = file[file.length - 1]
                }

                const itemfile = {
                    id: uuidv4(),
                    key: fileName,
                    name: getFileName(fileName),
                    ext: getFileExt(fileName),
                    type: getFileExt(fileName),
                    isExternal: "TRUE",
                    external_url: file
                }

                const fileParams = {
                    TableName: "API_CAAK_FILETABLE_NAME",
                    Item: itemfile,
                    ConditionExpression: `attribute_not_exists(id)`,
                    ReturnValues : "NONE"
                }
                await docClient.put(fileParams).promise();

                item.id = uuidv4()
                item.post_id = post.id
                item.user_id = post.user_id
                item.file_id = file.id
                item.order = itemIndex

                const itemParams = {
                    TableName: "API_CAAK_POSTITEMSTABLE_NAME",
                    Item: file,
                    ConditionExpression: `attribute_not_exists(id)`,
                    ReturnValues : "NONE"
                }

                await docClient.put(itemParams).promise();

            }
        }

    }catch(err){
        console.log(err)
    }
};

/* JSONS DESCRIPTOION
	posts1 = sonin hachin
JSONS DESCRIPTOION */
