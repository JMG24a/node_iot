const Agent = require('../agent')


module.exports = (sequelize) => {

    const { models } = sequelize;
    const agentMethod = Agent(sequelize)

    const list = (uuid,type) => {
        return new Promise (async(resolve, reject)=>{
            try{
                const agent = await agentMethod.find(uuid)

                let options = {
                    where:{
                        agentId: agent.id
                    }
                }
                if(type){
                    options.where.type = type
                }

                const success = await models.Metric.findAll(options)
                resolve(success)
            }
            catch(error){
                console.error('[ERROR SEQUELIZE GET]: ',error)
                return reject(new Error('Not Fount')) 
            }
        })
    }

    const create = (uuid,metric) =>{
        return new Promise (async(resolve, reject)=>{
            try{
                agent = await agentMethod.find(uuid)
                metric.agentId = agent.id
                const result = await models.Metric.create(metric)
                return resolve(result)
            }
            catch(error){
                console.error(error)
                reject(new Error('No Result'))
            }
        })
    }
    
    return  {
        list,
        create
    }
}
