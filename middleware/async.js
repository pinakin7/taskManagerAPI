// creating a middleware to wrap the controller in order to get rid of identical code lines

const asyncWrapper = (func)=>{
    return async (req, res, next) => {
        try {
            await func(req,res,next);
        } 
        catch (error) {
            next(error);
        }
    }
};

module.exports = asyncWrapper;