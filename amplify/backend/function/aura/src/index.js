/* Amplify Params - DO NOT EDIT
	API_CAAK_GRAPHQLAPIIDOUTPUT
	API_CAAK_GROUPTOTALTABLE_ARN
	API_CAAK_GROUPTOTALTABLE_NAME
	API_CAAK_USERTOTALTABLE_ARN
	API_CAAK_USERTOTALTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { calcAura, calcGroupAura } = require('./resolvers/Resolver')

const Resolver = {
    User: {
        aura: calcAura,
    },
    Group: {
        aura: calcGroupAura
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