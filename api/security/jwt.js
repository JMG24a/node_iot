const jwt = require('jsonwebtoken')
const  { config } = require('../config')

const secret = config.JWT

const sign = (payload) => {
    const token = jwt.sign(payload, secret)
    return token;
}

const verify = (token) => {
    const payload = jwt.verify(token, secret)
    return payload;
}

module.exports = {
    sign,
    verify
}