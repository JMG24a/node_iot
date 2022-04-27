const { sign } = require('../../../security/jwt')
const { Router } = require('express')
const router = Router();
const response = require('../../response')
const service = require('../../services/agent')

const list = async(req, res, next) =>{
    try{
        const success = await service.list()
        response.success(req, res, success, 200)
    }catch(error){
        next(error)
    }
}

const find = async(req,res,next) =>{
    try{
        const { uuid } = req.params
        const success = await service.find(uuid)
        response.success(req, res, success, 200)
    }catch(error){
        next(error)
    }
}

router.get('/', list)
router.get('/:uuid', find)

module.exports = router

