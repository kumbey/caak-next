const { getValuesFromRecord } = require("/opt/util/Util")
const GroupTotal = require("../db/GroupTotal")
const GroupUsername = require("../db/GroupUsername")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        await GroupTotal.insert(newImg.id)
        await GroupUsername.insert(newImg.id)

        return true

    }catch(ex){
        return "NOT_MEMBER"
    }
}


async function remove(record){
  try{

      const { OldImage } = record
      const oldImg = getValuesFromRecord(OldImage)
      
      await GroupTotal.remove(oldImg.id)
      await GroupUsername.remove(oldImg.id)

      return true

  }catch(ex){
      return "NOT_MEMBER"
  }
}

module.exports = {
    INSERT: insert,
    MODIFY: null,
    REMOVE: remove
}