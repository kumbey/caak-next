const { getValuesFromRecord } = require("/opt/util/Util")
const PostTotal = require("../db/PostTotal")
const PostItemsTotal = require("../db/PostItemsTotal")
const UserTotal = require("../db/UserTotal")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        //CREATE NEW POST TOTAL
        await PostItemsTotal.insert(newImg.id)

        return true

    }catch(ex){
        return ex
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)

    let postItemsTotal = await PostItemsTotal.get(oldImg.id)

    //UPDATE USER TOTAL
    await PostTotal.modify(oldImg.post_id, [
        {
            field: "reactioins",
            increase: false,
            count: postItemsTotal.reactions
        }
    ])

    //UPDATE GROUP TOTAL
    await UserTotal.modify(oldImg.user_id, [
        {
            field: "post_items_reactions",
            increase: false,
            count: postItemsTotal.reactions
        }
    ])

    await PostItemsTotal.remove(oldImg.id)

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