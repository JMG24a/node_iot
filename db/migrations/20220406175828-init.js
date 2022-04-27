'use strict';
const { AGENT_TABLE, AgentSchema } = require('../models/agent')
const { METRIC_TABLE, MetricSchema } = require('../models/metric')

module.exports = {
  async up (queryInterface) {
 
    await queryInterface.createTable(AGENT_TABLE, AgentSchema);
    await queryInterface.createTable(METRIC_TABLE, MetricSchema);
  
  },

  async down (queryInterface) {

    await queryInterface.dropTable(AGENT_TABLE);
    await queryInterface.dropTable(METRIC_TABLE);
     
  }
};
