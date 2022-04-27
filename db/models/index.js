const { Agent, AgentSchema } = require('./agent')
const { Metric, MetricSchema } = require('./metric')


const setupModels = (sequelize) => {
//starting
    Agent.init(AgentSchema, Agent.config(sequelize));
    Metric.init(MetricSchema, Metric.config(sequelize));

//Relations
    Agent.associate(sequelize.models);
    Metric.associate(sequelize.models);
}


module.exports = setupModels;