const { getValuesFromRecord } = require("/opt/util/Util")
const UserTotal = require("../db/UserTotal")
const Username = require("../db/Username")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        await UserTotal.insert(newImg.id)
        await Username.insert(newImg.id)

        return true

    }catch(ex){
        return ex
    }
}


async function remove(record){
  try{

      const { OldImage } = record
      const oldImg = getValuesFromRecord(OldImage)
      
      await Username.remove(oldImg.id)
      await UserTotal.remove(oldImg.id)

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