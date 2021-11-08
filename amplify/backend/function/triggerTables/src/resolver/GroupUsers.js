const { getValuesFromRecord } = require("/opt/util/Util")
const GroupTotal = require("../db/GroupTotal")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        //UPDATE GROUP TOTAL
        await GroupTotal.modify(newImg.group_id, [
            {
                field: newImg.role.toLowerCase(),
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


        if(newImg.role !== oldImg.role){

            //UPDATE GROUP TOTAL
            await GroupTotal.modify(newImg.group_id, [
                {
                    field: newImg.role.toLowerCase(),
                    increase: true,
                    count: 1
                },
                {
                    field: oldImg.role.toLowerCase(),
                    increase: false,
                    count: 1
                }
            ])

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

    //UPDATE GROUP TOTAL
    await GroupTotal.modify(oldImg.group_id, [
        {
            field: oldImg.role.toLowerCase(),
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