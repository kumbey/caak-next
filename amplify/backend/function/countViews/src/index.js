/* Amplify Params - DO NOT EDIT
	API_CAAK_BANNERTABLE_ARN
	API_CAAK_BANNERTABLE_NAME
	API_CAAK_GRAPHQLAPIIDOUTPUT
	API_CAAK_POSTTOTALTABLE_ARN
	API_CAAK_POSTTOTALTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const Counter = require("/opt/tables/Counter")
const PostTotalClient = Counter(process.env.API_CAAK_POSTTOTALTABLE_NAME, docClient)
const BannerClient = Counter(process.env.API_CAAK_BANNERTABLE_NAME, docClient)


exports.handler = async (event) => {
   
   try{

    const {on_to, item_id, type} = event.arguments

    if(type === "VIEWS"){
        if(on_to === "POST"){
            await PostTotalClient.update({
                key: "post_id",
                keyVal: item_id,
                items: [{
                    field: "views",
                    increase: true,
                    count: 1
                }]
            })
        }else{
            await BannerClient.update({
                key: "id",
                keyVal: item_id,
                items: [{
                    field: "views",
                    increase: true,
                    count: 1
                }]
            })
        }
    }else{
        await PostTotalClient.update({
            key: "post_id",
            keyVal: item_id,
            items: [{
                field: "reach",
                increase: true,
                count: 1
            }]
        })
    }

    return true
    

   }catch(ex){
        return ex
   }
};
