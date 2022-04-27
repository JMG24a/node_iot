const { Router } = require('express')
const routerAgent = require('./agent')
const routerMetric = require('./metric')


const appRouter = (app) => {
    const routerV1 = Router();
    app.use('/api/v1', routerV1)
    routerV1.use('/agents', routerAgent),
    routerV1.use('/metrics', routerMetric)
} 

module.exports = appRouter