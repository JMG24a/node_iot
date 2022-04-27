const parseJson = (payload) => {
    if(payload instanceof Buffer){
        payload = payload.toString()
    }

    try{
        payload = JSON.parse(payload)
    }catch{
        payload = null
    }

    return payload
}

module.exports = {
    parseJson
}