'use strict'
const debug = require('debug')('iot:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const db = require('db')
const {parseJson} = require('tools')


let agentMethods, metricMethods;

const clients = new Map()
const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const server = new mosca.Server(settings)

server.on('clientConnected', (client)=>{
  debug(`Connected ${client.id}`)
  clients.set(client.id, null)
})

server.on('clientDisconnected', (client)=>{
  debug(`Disconnected ${client.id}`)
})

server.on('clientDisconnected', async (client) => {
  debug(`Client Disconnected: ${client.id}`)
  const agent = clients.get(client.id)

  if (agent) {
    // Mark Agent as Disconnected
    agent.connected = false

    try {
      await agentMethods.createOrUpdate(agent)
    } catch (e) {
      return handleError(e)
    }

    // Delete Agent from Clients List
    clients.delete(client.id)

    server.publish({
      topic: 'agent/disconnected',
      payload: JSON.stringify({
        agent: {
          uuid: agent.uuid
        }
      })
    })
    debug(`Client (${client.id}) associated to Agent (${agent.uuid}) marked as disconnected`)
  }
})


const handleFatalError = (err)=>{
  console.error(`[FATAL ERROR]: ${err}`)
  console.error(err.stack)
  process.exit(1)
}

const handleError = (err) => {
  console.error(`[ERROR]: ${err}`)
  console.error(err.stack)
}

server.on('error', handleFatalError)
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.on('published', async(packet, client)=>{
  switch(packet.topic){
    case 'agent/disconnected':
    case 'agent/connected':{
      debug(`[Dis|Con] payload: ${packet.payload}`)
      break
    }
    case 'agent/message':{
      const payload = parseJson(packet.payload)
      console.log('MESSAGE: ',payload)
      if(payload){
        payload.agent.connected = true

        let agent

        try{
          agent = await agentMethods.createOrUpdate(payload.agent)
        }catch(err){
          handleError(err)
        }

        debug(`Agent ${agent.uuid} save`)

        if(!clients.get(client.id)){

          clients.set(client.id, agent)
          server.publish({
            topic: 'agent/connected',
            payload: JSON.stringify({
              agent: {
                uuid: agent.uuid,
                name: agent.name,
                hostname: agent.hostname,
                pid: agent.pid,
                connected: agent.connected
              }
            })
          })
        }

        const saveM = payload.metrics.map(async(item)=>{
    
          try{
            await metricMethods.create(agent.uuid,item)

            debug(`Metrics saved on agent ${agent.uuid}`)
          }catch(error){
            return handleError(error)
          }
        })

        try{
          console.log(await Promise.all(saveM))

        }catch(error){
          return handleError(error)
        }
        
      }
      break
    }
  }
})

server.on('ready', async() => {
  try{
    const store = await db({url: 'postgres://iot:secret@localhost:5432/node-iot'})
    agentMethods = store.agent;
    metricMethods = store.metric
    console.log(`server is running`)
  }catch(err){
    handleFatalError(err)
  }
})