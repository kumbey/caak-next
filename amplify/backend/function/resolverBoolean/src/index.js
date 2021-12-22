/* Amplify Params - DO NOT EDIT
	API_CAAK_FOLLOWEDUSERSTABLE_ARN
	API_CAAK_FOLLOWEDUSERSTABLE_NAME
	API_CAAK_GRAPHQLAPIENDPOINTOUTPUT
	API_CAAK_GRAPHQLAPIIDOUTPUT
	API_CAAK_GROUPUSERSTABLE_ARN
	API_CAAK_GROUPUSERSTABLE_NAME
	API_CAAK_REACTIONSTABLE_ARN
	API_CAAK_REACTIONSTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { isReacted, isFollowed, isFollowedGroup } = require('./resolvers/Resolver')

const Resolver = {
    Post: {
        reacted: isReacted,
    },
    PostItems: {
        reacted: isReacted,
    },
    Comment: {
        reacted: isReacted,
    },
    User: {
        followed: isFollowed
    },
    Group: {
        followed: isFollowedGroup
    }
}

exports.handler = async (event) => {
    try {
        const typeHandler = Resolver[event.typeName]
        if(typeHandler){
            const resolver = typeHandler[event.fieldName]
            if(resolver){
                let result = await resolver(event)
                return result
            }
        }

        throw new Error("Resolver not found")
    } catch (ex) {
        throw new Error("Error on Post lambda function", ex)
    } 
};
