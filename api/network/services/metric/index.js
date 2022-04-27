const db = require('../../../store/postgres.js');
const store = db()

const list = async(uuid, type = null) => {

    return new Promise (async(resolve, reject)=>{
        try{
            const success = await store.metric.list(uuid,type)
            resolve(success)
        }catch(error){
            return reject(new Error('Not Fount'))
        }
    })
}

module.exports = {
    list
}