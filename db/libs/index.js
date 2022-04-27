const { Sequelize } = require('sequelize');
const setupModels = require('../models');

const sequelizeInit = (config) => {
    const url = config.bd_url
  
    const sequelize = new Sequelize(url,{
        dialect: 'postgres',
        logging: true
    })

    setupModels(sequelize)
    // sequelize.sync()
    return sequelize
}
module.exports = sequelizeInit

//const uri = "postgres://jmg24a:secret@localhost:5432/node-iot"

// module.exports = sequelize
