const { auth, allow } = require('../../middleware/auth') 
const { Router } = require('express');
const router = Router();
const response = require('../../response');
const service = require('../../services/metric');

const list = async(req,res,next)=>{
    try{
        const payload = req.myPayload 
        const { type } = req.query
        const success = await service.list(payload.uuid, type)
        response.success(req,res,success,200)
    }catch(error){
        next(error)
    }
}

router.get('/', auth(), allow(), list)

module.exports = router