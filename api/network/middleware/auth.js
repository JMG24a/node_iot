const { verify } = require('../../security/jwt')

const auth = () => {
    return (req, res, next) => {
        const token = req.headers.authorization || ' ';
        if(token === ' '){
            throw new Error('Restricted access')
        }
        if(token.indexOf('Bearer ') === -1){
            throw new Error('Restricted access')
        }
        const jwt = token.replace('Bearer ', '')
        const payload = verify(jwt)
        req.myPayload = payload
        next()  
    }

}

const allow = () => {
    return (req,res,next) => {
        const payload = req.myPayload
        if(payload.role !== 'agent'){
            throw new Error('Not Allow')
        }
        next()
    }
}

module.exports = {
    auth,
    allow
}