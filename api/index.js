const express = require('express');
const app = express()
const appRouter = require('./network/routes/index.js')
const { handleFatalError, handleNotFount, handelError } = require('./network/middleware/errors.js')

app.use(express.json())

appRouter(app)

app.use(handleNotFount)
app.use(handelError)


process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
app.on('error', handleFatalError)

app.listen(3004,()=>{
    console.log('listen on port 3004')
})
    
  
