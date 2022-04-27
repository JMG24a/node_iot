const res = require('../response')



const handleNotFount = (error, request, response, next) => {
    if(error.message.match(/Not fount/)){
        res.error(request, response, 'Not fount', 404)
    }
    next(handelError)
}

const handelError = (error, request, response, next) => {
    res.error(request, response, 'Bad Request', 500)
}

function handleFatalError (error) {
  console.error(`${chalk.red('[fatal error]')} ${error.message}`)
  console.error(error.stack)
  process.exit(1)
}

module.exports = {
    handleNotFount,
    handelError,
    handleFatalError
}
