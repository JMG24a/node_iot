const {init} = require('./config')
const sequelizeInit = require('./libs')
const agentInit = require('./methods/agent/index.js')
const metricInit = require('./methods/metric/index.js')

module.exports = (conf) =>{
  
    const config = init(conf)
    const sequelize = sequelizeInit(config)

    const agent = agentInit(sequelize)
    const metric = metricInit(sequelize)

    return{
        agent,
        metric
    }
}