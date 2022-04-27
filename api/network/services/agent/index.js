const { sign } = require('../../../security/jwt')
const db = require('../../../store/postgres.js')

const store = db()

const list = (uuid) => {
    return new Promise (async(resolve, reject)=>{
        try{
            const success = await store.agent.list(uuid)
            resolve(success)
        }
        catch(error){
            console.error(error)
            return reject(new Error('Error of server'))
        }
    })
}

const find = async(uuid) => {
    return new Promise (async(resolve, reject)=>{
        try{
            const success = await store.agent.find(uuid)

            if(!success){
                throw new Error('Not Fount')
            }

            const payload = {
                role: 'agent',
                uuid: success.uuid            
            }

            const token = sign(payload)

            resolve({
                success,
                token
            })
        }
        catch(error){
            console.error(error)
            return reject(new Error('Not fount'))
        }
    })
}

module.exports = {
    list,
    find
}