/* Amplify Params - DO NOT EDIT
	API_CAAKMN_COMMENTTABLE_ARN
	API_CAAKMN_COMMENTTABLE_NAME
	API_CAAKMN_COMMENTTOTALTABLE_ARN
	API_CAAKMN_COMMENTTOTALTABLE_NAME
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_GROUPTOTALTABLE_ARN
	API_CAAKMN_GROUPTOTALTABLE_NAME
	API_CAAKMN_GROUPUSERNAMETABLE_ARN
	API_CAAKMN_GROUPUSERNAMETABLE_NAME
	API_CAAKMN_NOTIFICATIONTABLE_ARN
	API_CAAKMN_NOTIFICATIONTABLE_NAME
	API_CAAKMN_POSTITEMSTABLE_ARN
	API_CAAKMN_POSTITEMSTABLE_NAME
	API_CAAKMN_POSTITEMSTOTALTABLE_ARN
	API_CAAKMN_POSTITEMSTOTALTABLE_NAME
	API_CAAKMN_POSTTABLE_ARN
	API_CAAKMN_POSTTABLE_NAME
	API_CAAKMN_POSTTOTALTABLE_ARN
	API_CAAKMN_POSTTOTALTABLE_NAME
	API_CAAKMN_USERNAMETABLE_ARN
	API_CAAKMN_USERNAMETABLE_NAME
	API_CAAKMN_USERTOTALTABLE_ARN
	API_CAAKMN_USERTOTALTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const User = require("./resolver/User")
const Post = require("./resolver/Post")
const Group = require("./resolver/Group")
const PostItems = require("./resolver/PostItems")
const Comment = require("./resolver/Comment")
const Reactions = require("./resolver/Reactions")
const PostViews = require("./resolver/PostViews")
const PostShares = require("./resolver/PostShares")
const GroupUsers = require("./resolver/GroupUsers")
const FollowedUsers = require("./resolver/FollowerUsers")

const Types = {
	User: User,
	Group: Group,
	GroupUsers: GroupUsers,
	Post: Post,
	PostItems: PostItems,
	Comment: Comment,
	Reactions: Reactions,
	PostViews: PostViews,
	PostShares: PostShares,
	FollowedUsers: FollowedUsers
}

exports.handler = async (event) => {
    //eslint-disable-line
    try{
      
      for(let i=0; i < event.Records.length; i++){
		
        let record = event.Records[i]

		let db_name = ""
		const result = []

		if(record.eventName === "INSERT" || record.eventName === "MODIFY"){
			db_name = record.dynamodb.NewImage["__typename"].S
		}else if(record.eventName === "REMOVE"){
			db_name = record.dynamodb.OldImage["__typename"].S
		}
		
		const typeHandler = Types[db_name]
		if(typeHandler){
			const resolver = typeHandler[record.eventName]

			if(resolver){
				let resp = await resolver(record.dynamodb)
				result.push(resp)
			}else{
				result.push("RESOLVER NOT FOUND")
			}
		}else{
			result.push("TYPE HANDLER NOT FOUND:")
		}
	}
  
      return Promise.resolve('Successfully processed DynamoDB record');
    }catch(ex){
      return Promise.resolve('Error processed DynamoDB record %j', ex);
    }
  };
