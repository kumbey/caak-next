const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const GroupUsers = DB(process.env.API_CAAK_GROUPUSERSTABLE_NAME, docClient)

async function roleOnGroup(ctx){
    try{

        const { identity, source } = ctx

        let user_id = "unlogged"
        if(identity.claims){
            user_id = identity.claims.sub
        }

        const ids = {
            id: `${source.id}#${user_id}`
        }

        let resp = await GroupUsers.get(ids)
        if(resp && Object.keys(resp).length > 0){
            return resp.role
        }else{
            return "NOT_MEMBER"
        }

    }catch(ex){
        return "NOT_MEMBER"
    }
}

module.exports = {
    roleOnGroup: roleOnGroup,
}