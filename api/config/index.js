require('dotenv').config()

const config = {
    JWT: process.env.SECRET_JWT || 'Node-iot'
}


module.exports = {config}