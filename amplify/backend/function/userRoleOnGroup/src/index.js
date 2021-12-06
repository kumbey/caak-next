/* Amplify Params - DO NOT EDIT
	API_CAAK_GRAPHQLAPIENDPOINTOUTPUT
	API_CAAK_GRAPHQLAPIIDOUTPUT
	API_CAAK_GROUPUSERSTABLE_ARN
	API_CAAK_GROUPUSERSTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { roleOnGroup } = require('./resolvers/Resolver')

const Resolver = {
    Group: {
        role_on_group: roleOnGroup,
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
