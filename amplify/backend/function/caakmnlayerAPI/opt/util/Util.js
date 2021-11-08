function getValuesFromRecord(data){

    const keys = Object.keys(data)
    const retData = {}
    
    for(let i=0; i < keys.length; i++){
        let key = keys[i]
        let value = data[key]
        retData[key] = value[Object.keys(value)[0]]
    }

    return retData
}

module.exports = {
    getValuesFromRecord: getValuesFromRecord
}