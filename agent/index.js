const EventEmitter = require('events');
const { parseJson } = require('tools');
const mqtt = require('mqtt')
const os = require('os')
const debug = require('debug')('iot:agent')
const util = require('util') 
const uuid  = require('uuid')
const defaults = require('defaults');

const options = {
    name: 'untitled',
    username: 'Undefined User',
    interval: 5000,
    mqtt: {
      host: 'mqtt://localhost'
    }
}

class ClientAgent extends EventEmitter{
    constructor(opt){
        super()

        this._option = defaults(opt, options);
        this._started = false;
        this._client = null;
        this._agentId = null;
        this._timer = null;
        this._metrics = new Map()
    }


    addMetric (type, fn){
        this._metrics.set(type, fn)
    }

    removeMetric (type){
        this._metrics.delete(type)
    }

    connect(){
        if(!this._started){
            this._client = mqtt.connect(this._option.mqtt.host)
            this._started = true

            this._client.subscribe('agent/message');
            this._client.subscribe('agent/connected');
            this._client.subscribe('agent/disconnected')

            this._client.on('connect',()=>{
                this._agentId = uuid.v4();

                this.emit('connected', this._agentId)

                this._timer = setInterval(async()=>{
                    if(this._metrics.size > 0){
                        let message = {
                            agent:{
                                uuid: this._agentId,
                                username: this._option.username,
                                name: this._option.name,
                                hostname: os.hostname() || 'localhost',
                                pid: process.pid,
                            },
                            metrics: [],
                            timestamp: new Date().getTime()
                        }
                        for (let [metric, fn] of this._metrics){
                            if(fn.length === 1){
                                fn = util.promisify(fn)
                            }

                            message.metrics.push({
                                type: metric,
                                value: await Promise.resolve(fn())
                            })
                        }
                        debug('Sending', message)
                        this._client.publish('agent/message', JSON.stringify(message))
                        this.emit('message', message)
                    }                  
                },this._option.interval)
            })
    
            this._client.on('message', (topic, payload) => {
                payload = parseJson(payload)

                let broadcast = false
                switch (topic) {
                case 'agent/connected':
                case 'agent/disconnected':
                case 'agent/message':
                    broadcast = payload && payload.agent && payload.agent.uuid !== this._agentId
                    break
                }

                if (broadcast) {
                this.emit(topic, payload)
                }
            })

            this._client.on('error', () => this.disconnect())
        }
    }

    disconnect () {
        if(this._started) {
            clearInterval(this._timer)
            this._started = false
            this.emit('disconnected', this._agentId)
            this._client.end()
        }
    }
}

module.exports = ClientAgent
