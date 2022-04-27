module.exports = (sequelize) => {

    const { models } = sequelize

    const list = () => {
        return new Promise (async(resolve, reject)=>{
            try{
                const data = await models.Agent.findAll()
                resolve(data)
            }catch(err){
                console.error('[DB LIST ERROR]: ',err)
                reject(new Error('No Result'))
            }
        })
    }

    const find = async(uuid) => {
        const agent = await models.Agent.findOne({
            where: {
                uuid: uuid
            }
        })

        if(!agent){
           return false
        }
        return agent
    }

    const createOrUpdate = (agent) => {
        return new Promise (async(resolve, reject)=>{
            try{
                const result = await find(agent.uuid)
                if(result){
                    await result.update(agent)
                    return resolve(result.dataValues)
                }
                const created = await models.Agent.create(agent)
                return resolve(created.dataValues)
            }catch(err){
                console.error('[DB CoU]: ', err )
                reject(new Error('No Result'))
            }
        })
    }
    
    return  {
        list, 
        find,
        createOrUpdate
    }
}
