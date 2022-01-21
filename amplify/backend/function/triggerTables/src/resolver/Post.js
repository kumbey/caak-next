const { getValuesFromRecord } = require("/opt/util/Util")
const PostTotal = require("../db/PostTotal")
const GroupTotal = require("../db/GroupTotal")
const UserTotal = require("../db/UserTotal")
const NoficationDB = require("../db/Notification")
const PostItems = require("../db/PostItems")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        //CREATE NEW POST TOTAL
        await PostTotal.insert(newImg)

        //UPDATE USER TOTAL
        await UserTotal.modify(newImg.user_id, [
            {
                field: newImg.status.toLowerCase(),
                increase: true,
                count: 1
            }
        ])

        //UPDATE GROUP TOTAL
        await GroupTotal.modify(newImg.group_id, [
            {
                field: newImg.status.toLowerCase(),
                increase: true,
                count: 1
            }
        ])

        return true

    }catch(ex){
        return ex
    }
}

async function modify(record){
    try{
        const { NewImage, OldImage } = record
        const newImg = getValuesFromRecord(NewImage)
        const oldImg = getValuesFromRecord(OldImage)
        
        await PostTotal.update({
            post_id: newImg.id,
            group_id: newImg.group_id,
            status: newImg.status,
            category_id: newImg.category_id,
            groupAndStatus: `${newImg.group_id}#${newImg.status}`,
            categoryAndStatus: `${newImg.category_id}#${newImg.status}`,
            userAndStatus: `${newImg.user_id}#${newImg.status}`
        },["post_id"], "post_id")


        if(newImg.status !== oldImg.status){
             
            //UPDATE USER TOTAL
            await UserTotal.modify(newImg.user_id, [
                {
                    field: newImg.status.toLowerCase(),
                    increase: true,
                    count: 1
                },
                {
                    field: oldImg.status.toLowerCase(),
                    increase: false,
                    count: 1
                }
            ])

            //UPDATE GROUP TOTAL
            await GroupTotal.modify(newImg.group_id, [
                {
                    field: newImg.status.toLowerCase(),
                    increase: true,
                    count: 1
                },
                {
                    field: oldImg.status.toLowerCase(),
                    increase: false,
                    count: 1
                }
            ])

            // CREATE NOFICATION

            if(newImg.status !== "POSTING" && newImg.ignoreNotification === "TRUE"){
                const react = {
                    section: "USER",
                    type: "POST",
                    item_id: newImg.id,
                    action: `POST_${newImg.status}`,
                    from: newImg.user_id,
                    to: newImg.user_id,
                    seen: "FALSE",
                    version: 1
                }

                await NoficationDB.insert(react)
            }
        
        }

        return true

    }catch(ex){
        return ex
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)

    await PostTotal.remove(oldImg.id)
    await PostItems.removeByPostId(oldImg.id)

    //UPDATE USER TOTAL
    await UserTotal.modify(oldImg.user_id, [
        {
            field: oldImg.status.toLowerCase(),
            increase: false,
            count: 1
        }
    ])

    //UPDATE GROUP TOTAL
    await GroupTotal.modify(oldImg.group_id, [
        {
            field: oldImg.status.toLowerCase(),
            increase: false,
            count: 1
        }
    ])

    return true

  }catch(ex){
      return ex
  }
}

module.exports = {
    INSERT: insert,
    MODIFY: modify,
    REMOVE: remove
}