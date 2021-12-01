/* Amplify Params - DO NOT EDIT
	API_CAAK_GRAPHQLAPIENDPOINTOUTPUT
	API_CAAK_GRAPHQLAPIIDOUTPUT
	API_CAAK_NOTIFICATIONTABLE_ARN
	API_CAAK_NOTIFICATIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { seenAll } = require("./resolvers/Notification")

const Resolver = {
    Mutation: {
        SeenALL: seenAll
    }
}

exports.handler = async (event) => {
    // TODO implement
    
    const type = Resolver[event.typeName]
    if(type){
        const resolver = type[event.arguments.method]
        if(resolver){   
            return await resolver(event)
        }else{
            return ("RESOLVER NOT FOUND")
        }
    }else{
        return ("TYPE NOT FOUND")
    }
};
