/* Amplify Params - DO NOT EDIT
	API_CAAK_FEEDBACKTABLE_ARN
	API_CAAK_FEEDBACKTABLE_NAME
	API_CAAK_GRAPHQLAPIIDOUTPUT
	API_CAAK_REPORTEDPOSTTABLE_ARN
	API_CAAK_REPORTEDPOSTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const Post = require('./tables/Post')
const Notification = require('./tables/Notification')
const Feedback = require('./tables/Feedback')
const ReportedPost = require('./tables/ReportedPost')

const Resolver = {
	Post: Post,
	Notification: Notification,
    Feedback: Feedback,
    ReportedPost: ReportedPost
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