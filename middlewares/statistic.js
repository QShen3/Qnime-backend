const { Statis } = require('../models');
const dtime = require('time-formater');

const apiRecord = async (req, res, next) => {
    let statis = new Statis({
        date: dtime().format('YYYY-MM-DD'),
        origin: req.originalUrl,
    });

    try {
        statis = await statis.save();
    }
    catch (err) {
        return next(err);
    }
    next();
}

module.exports = {
    apiRecord
}