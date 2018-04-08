const logger = require('../utility/logger');

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
    switch(err.statusCode){
        case(400):
            info.desc = 'Bad Request';
            break;
        case(500): 
            info.desc = 'Internal Server Error';
            break;
    }
    res.status(500).json({
        info
    });
}