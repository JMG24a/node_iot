const { Model, Sequelize, DataTypes } = require('sequelize');
const { AGENT_TABLE } = require('../agent')

const METRIC_TABLE = 'metrics'

const MetricSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    agentId:{
        field: 'agent_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references:{
            model: AGENT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    type:{
        allowNull: false,
        type: DataTypes.STRING
    },
    value:{
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt:{
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },  
    updatedAt:{ 
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}

class Metric extends Model{
    static associate(models){
        this.belongsTo(models.Agent, {as: 'agent'})
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: METRIC_TABLE,
            modelsName: 'Metric',
            timestamp: false
        }
    }
}

module.exports = { Metric, MetricSchema, METRIC_TABLE }