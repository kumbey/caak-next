/* Amplify Params - DO NOT EDIT
	API_CAAKMN_GRAPHQLAPIIDOUTPUT
	API_CAAKMN_USERTOTALTABLE_ARN
	API_CAAKMN_USERTOTALTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { calcAura } = require('./resolvers/Resolver')

const Resolver = {
    User: {
        aura: calcAura,
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

