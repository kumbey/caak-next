const { getValuesFromRecord } = require("/opt/util/Util")
const CommentTotal = require("../db/CommentTotal")
const PostItemsTotal = require("../db/PostItemsTotal")
const PostTotal = require("../db/PostTotal")
const UserTotal = require("../db/UserTotal")
const NotificationDB = require("../db/Notification")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)
        let notifi_action = ""

        //CREATE NEW COMMENT TOTAL
        await CommentTotal.insert(newImg.id)

        //UPDATE USER TOTAL
        await UserTotal.modify(newImg.user_id, [
            {
                field: "comments",
                increase: true,
                count: 1
            }
        ])

        if(newImg.on_to === "POST_ITEM"){
            notifi_action = "POST_ITEM_COMMENT_WRITED"
            await PostItemsTotal.modify(newImg.post_item_id, [
                {
                    field: "comments",
                    increase: true,
                    count: 1
                }
            ])
        }else{
            notifi_action = "POST_COMMENT_WRITED"
            await PostTotal.modify(newImg.post_id, [
                {
                    field: "comments",
                    increase: true,
                    count: 1
                }
            ])
        }
        

        const react = {
            section: "USER",
            type: "COMMENT",
            item_id: newImg.id,
            action: notifi_action,
            from: newImg.user_id,
            to: newImg.replyUserID,
            seen: "FALSE",
            version: 1
        }

        await NotificationDB.insert(react)

        return true

    }catch(ex){
        return ex
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)

    let commentTotal = await CommentTotal.get(oldImg.id)

    //UPDATE USER TOTAL
    await UserTotal.modify(oldImg.user_id, [
        {
            field: "comment_reactions",
            increase: false,
            count: commentTotal.reactions
        },
        {
            field: "comments",
            increase: false,
            count: 1
        }
    ])

    if(oldImg.on_to === "POST_ITEM"){
        await PostItemsTotal.modify(oldImg.post_item_id, [
            {
                field: "comments",
                increase: false,
                count: 1
            }
        ])
    }else{
        await PostITotal.modify(oldImg.post_id, [
            {
                field: "comments",
                increase: false,
                count: 1
            }
        ])
    }

    await CommentTotal.remove(oldImg.id)

    return true

  }catch(ex){
      return ex
  }
}

module.exports = {
    INSERT: insert,
    MODIFY: null,
    REMOVE: remove
}