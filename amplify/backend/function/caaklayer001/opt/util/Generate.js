function genUpdateAttributes(data, pass){

    if(!pass){
        pass = []
    }

    let expression = "set"
    let values = {}
    let names = {}
    let keys = Object.keys(data)
    keys.map((key, index) => {
        if(!pass.includes(key)){
            expression += ` #${index} = :${key}`
            if(index !== (keys.length - 1)){
                expression += `,`
            }
            names[`#${index}`] = key
            values[`:${key}`] = data[key]
        }
    })

    return {expression, values, names}
}

function genCountUpdateAttributes(data){

    let expression = "set"
    let values = {}
    let names = {}
    let condition = null

    expression += ` #${data.field} = if_not_exists(#${data.field}, :defaultCount) ${
        data.increase ? "+" : "-"
    } :${data.field}`
    condition = `${data.increase ? null : `(#${data.field} > :defaultCount)`}`
    names[`#${data.field}`] = data.field
    values[`:${data.field}`] = data.count

    values[":defaultCount"] = data.defaultCount ? data.defaultCount : 0

    return {expression, values, names, condition}
}

module.exports = {
    updateAttributes: genUpdateAttributes,
    countUpdateAttributes: genCountUpdateAttributes
}