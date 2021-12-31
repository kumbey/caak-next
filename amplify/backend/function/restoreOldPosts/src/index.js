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
const cliProgress = require('cli-progress');
const Posts1 = require("../../../../../src/restoreData/posts1.json")


const getFileExt = (fileName) => {
    return fileName.substring(fileName.lastIndexOf(".") + 1);
}
  
const getFileName = (fileName) => {
    return fileName.replace("." + getFileExt(fileName), "");
}

exports.handler = async (event) => {
    
    try{

        let jsonFile = []
        const maxLegth = 1
        const startIndex = 0
        let activeIndex = 0

        const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        switch (event.key) {
            case 'posts1':
                jsonFile = Posts1
                break
            default:
                jsonFile = []

        }

        const nowDate = new Date().toISOString()

        bar1.start(startIndex + maxLegth, startIndex);

        for(let i= startIndex; i < startIndex + maxLegth; i++){

            activeIndex = i

            bar1.update(i);

            const post = jsonFile[i]
            const postItems = post.items

            post.id = uuidv4()
            post.status = "CONFIRMED"
            post.user_id = "017af4db-0209-4b89-ae19-ad2f29904dc7"
            post.updated_user_id = "017af4db-0209-4b89-ae19-ad2f29904dc7"
            post.group_id = "4def44e3-9961-4502-b60f-61b28743103f"
            post.category_id = "9717e8da-6b54-4d3b-8055-fa9000366b4e"
            post.owned = "CAAK"
            post.ignoreNotification = "TRUE"
            post.__typename = "Post"
            post.commentType = true
            post.version = 1


            const params = {
                TableName: process.env.API_CAAK_POSTTABLE_NAME,
                Item: post,
                ConditionExpression: `attribute_not_exists(id)`,
                ReturnValues : "NONE"
            }
            await docClient.put(params).promise();


            for(let itemIndex = 0; itemIndex < postItems.length; itemIndex++){

                const item = postItems[itemIndex]
                const file = item.block_img
                const provider = item.video_provider !== "NULL" ? item.video_provider : ""
                const provider_item = item.video_id !== "NULL" ? item.video_id : ""
                const itemType = item.block_type

                delete item["block_img"]
                delete item["provider"]
                delete item["provider_item"]
                delete item["itemType"]

                if(file){

                    const itemfile = {
                        id: uuidv4(),
                        key: file,
                        name: getFileName(file),
                        ext: getFileExt(file),
                        type: getFileExt(file),
                        isExternal: "TRUE",
                        external_url: file,
                        createdAt: nowDate,
                        updatedAt: nowDate,
                        __typename: "File",
                        provider: provider,
                        provided_item: provider_item
                    }
    
                    const fileParams = {
                        TableName: process.env.API_CAAK_FILETABLE_NAME,
                        Item: itemfile,
                        ConditionExpression: `attribute_not_exists(id)`,
                        ReturnValues : "NONE"
                    }
                    await docClient.put(fileParams).promise();
    
                    item.id = uuidv4()
                    item.post_id = post.id
                    item.user_id = post.user_id
                    item.file_id = itemfile.id
                    item.order = itemIndex
                    item.createdAt = post.createdAtx
                    item.updatedAt = post.updatedAt
                    item.__typename = "PostItems"

                    if(itemType === "video"){
                        item.isEmbed = "TRUE"
                    }
    
                    const itemParams = {
                        TableName: process.env.API_CAAK_POSTITEMSTABLE_NAME,
                        Item: item,
                        ConditionExpression: `attribute_not_exists(id)`,
                        ReturnValues : "NONE"
                    }
    
                    await docClient.put(itemParams).promise();
                }

            }

        }

        bar1.stop()
        console.log(`${activeIndex}/${jsonFile.length}`)

    }catch(err){
        console.log(err)
    }
};

/* JSONS DESCRIPTOION
	posts1 = sonin hachin
JSONS DESCRIPTOION */
