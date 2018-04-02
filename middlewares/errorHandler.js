const logger = require('../utility/logger');

module.exports = async (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
        info: {
            code: 500,
            desc: 'Internal Server Error'
        }
    });
}