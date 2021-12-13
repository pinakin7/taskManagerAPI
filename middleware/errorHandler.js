const { CustomAPIError } = require("../Errors/custom-error");


const errorHandlerMiddleware = (err,req,res,next) => {
    if(err instanceof CustomAPIError){
        
        return res.status(err.statusCode).send(err.message);
    }
    return res.status(500).json({err});
};

module.exports = errorHandlerMiddleware;