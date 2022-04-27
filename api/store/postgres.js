const db = require('db')
let store 

module.exports = () => {
    if(!store){
        store = db({url: 'postgres://iot:secret@localhost:5432/node-iot'})
    }
    return store
}