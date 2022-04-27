const { Model, DataTypes, Sequelize } = require('sequelize');

const AGENT_TABLE = 'agents'

const AgentSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    uuid:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING
    },
    username:{
        allowNull: false,
        type: DataTypes.STRING
    },
    hostname:{
        allowNull: false,
        type: DataTypes.STRING
    },
    pid:{
        allowNull: false,
        type: DataTypes.STRING
    },
    connected:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt:{
        allowNull: false,
        field: 'updated_at',
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

class Agent extends Model{
    static associate(models){
        this.hasMany(models.Metric, {
            as: 'metrics',
            foreignKey: 'agentId'
        });
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: AGENT_TABLE,
            modelsName: 'Agent',
            timestamp: false
        }
    }
}

module.exports = { AGENT_TABLE, AgentSchema, Agent }