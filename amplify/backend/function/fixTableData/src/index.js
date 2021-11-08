/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_NOTIFICATIONTABLE_ARN
	API_CAAKMN_NOTIFICATIONTABLE_NAME
	API_CAAKMN_POSTTABLE_ARN
	API_CAAKMN_POSTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const Post = require('./tables/Post')
const Notification = require('./tables/Notification')

const Resolver = {
	Post: Post,
	Notification: Notification
}

exports.handler = async (event) => {
	try{

		const resolver = Resolver[event.resolver]
		if(resolver){
			const method = resolver[event.method]
			if(method){
				const resp = await method(event)
				return resp
			}else{
				return "Resolver not found"
			}
		}else{
			return "Resolver not found"
		}

	}catch(ex){
		return false
	}
};
