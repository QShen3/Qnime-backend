const logger = require('../utility/logger');

let errDesc = new Map([
    [400, 'Bad Request'],
    [500, 'Internal Server Error']
]);

module.exports = async (err, req, res, next) => {
    if(err.info){
        logger.error(err.info);
    }
    logger.error(err.stack);
    if(!err.statusCode) {
        err.statusCode = 500;
    }
    let info = {
        code: err.statusCode
    }
    info.desc = errDesc.get(err.statusCode) || '';
    
    res.status(500).json({
        info
    });
}