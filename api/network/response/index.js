exports.success = function(req,res,message,status) {
    res.status(status || 200).json({
        "error": "",
        "body": message
    })
}

exports.error = function(req,res,error,status) {
    res.status(status || 500).json({
        "error": error,
        "success": ""
    })

}