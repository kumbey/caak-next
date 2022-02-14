const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const UserTotalsDB = DB(process.env.API_CAAK_USERTOTALTABLE_NAME, docClient)
const GroupTotalsDB = DB(process.env.API_CAAK_GROUPTOTALTABLE_NAME, docClient)

async function calcAura(ctx){
    try{

        let point = 0

        const { source } = ctx

        const ids = {
            user_id: source.id
        }

        let resp = await UserTotalsDB.get(ids)

        point += resp.confirmed * 20
        point += resp.followers * 15
        point += resp.post_reactions * 15
        point += resp.post_items_reactions * 10
        point += resp.comment_reactions * 5

        // report += 30 HERE1

        return point

    }catch(ex){
        return 0
    }
}

async function calcGroupAura(ctx){
    try{

        let point = 0

        const { source } = ctx

        const ids = {
            group_id: source.id
        }

        let resp = await GroupTotalsDB.get(ids)

        point += resp.confirmed * 10
        point += resp.member * 35
        point += resp.admin * 35
        point += resp.moderator * 35

        // report += 30 HERE1

        return point

    }catch(ex){
        return 0
    }
}

module.exports = {
    calcAura: calcAura,
    calcGroupAura: calcGroupAura
}