const { getValuesFromRecord } = require("/opt/util/Util")
const UserTotal = require("../db/UserTotal")
const NoficationDB = require("../db/Notification")

async function insert(record){
    try{

        const { NewImage } = record
        const newImg = getValuesFromRecord(NewImage)

        await UserTotal.modify(newImg.user_id,[{
                field: "followers",
                increase: true,
                count: 1
            }
        ])

        await UserTotal.modify(newImg.followed_user_id,[{
                field: "following",
                increase: true,
                count: 1
            }
        ])

        const react = {
            section: "USER",
            type: "FOLLOWED",
            item_id: newImg.followed_user_id,
            action: `USER_FOLLOWED`,
            from: newImg.followed_user_id,
            to: newImg.user_id,
            seen: "FALSE",
            version: 1
        }

        await NoficationDB.insert(react)

        return true

    }catch(ex){
        return ex
    }
}


async function remove(record){
  try{

    const { OldImage } = record
    const oldImg = getValuesFromRecord(OldImage)
      
    await UserTotal.modify(oldImg.user_id,[{
            field: "followers",
            increase: false,
            count: 1
            }
        ])

    await UserTotal.modify(oldImg.followed_user_id,[{
            field: "following",
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
    MODIFY: null,
    REMOVE: remove
}