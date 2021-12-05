const { getValuesFromRecord } = require("/opt/util/Util")
const PostTotal = require("../db/PostTotal")
const UserTotal = require("../db/UserTotal")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        await PostTotal.modify(newImg.post_id, [
            {
                field: "shares",
                increase: true,
                count: 1
            }
        ])

        await UserTotal.modify(newImg.user_id, [
            {
                field: "post_shares",
                increase: true,
                count: 1
            }
        ])

        return true

    }catch(ex){
        return ex
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)
    
    await PostTotal.modify(oldImg.post_id, [
        {
            field: views,
            increase: false,
            count: 1
        }
    ])

    await UserTotal.modify(newImg.user_id, [
        {
            field: "post_shares",
            increase: true,
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
    MODIFY: null,
    REMOVE: remove
}