/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIENDPOINTOUTPUT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { getValuesFromRecord } = require("/opt/util/Util")
const GraphqlAPI = require("./api/GraphqlAPI");
const { changedTotals } = require("./queries/mutations");

exports.handler = async (event) => {
  //eslint-disable-line
  try{
    
    for(let i=0; i < event.Records.length; i++){
  
      let record = event.Records[i]

      if(record.eventName === "MODIFY"){
        const type = record.dynamodb.NewImage["__typename"].S
        const newImg = getValuesFromRecord(record.dynamodb.NewImage)

        const data = {
          type: type,
          id: "",
          totals: JSON.stringify(newImg)
        } 

        if(type === "PostTotal"){
          data.id = newImg.post_id
        }else if(type === "PostItemsTotal"){
          data.id = newImg.post_item_id
        }else if(type === "CommentTotal"){
          data.id = newImg.comment_id
        }else if(type === "UserTotal"){
          data.id = newImg.user_id
        }else if(type === "GroupTotal"){
          data.id = newImg.group_id
        }

        const resp = await GraphqlAPI.call({
          query: changedTotals,
          variables: data,
          operation: "ChangedTotals"
        })
      }
  
    } 

    return Promise.resolve('Successfully processed DynamoDB record');
  }catch(ex){
    return Promise.resolve('Error processed DynamoDB record %j', ex);
  }
};
