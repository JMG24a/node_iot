require('dotenv').config();

const init = (conf) =>{
    const config = {
        env: 'dev',
        bd_url: conf.url
    }
    return config
}


module.exports = {init}

// require('dotenv').config();

// const config = {
//     env: process.env.NODE_ENV || 'dev',
//     bd_url: process.env.DB_URL || 'postgres://iot:secret@localhost:5432/node-iot'
// }

// module.exports = {config}




// 'postgres://iot:secret@localhost:5432/node-iot'
