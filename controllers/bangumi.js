const dtime = require('time-formater');
const validator = require('validator');

const { Bangumi } = require('../models');

class BangumiController {
    list = async (req, res, next) => {
        let pager, query;
        try {
            ({ query, pager } = this._makeListQuery(req.query, next));
        }
        catch (err) {
            err.info = 'Make bangumi list query error';
            return next(err);
        }

        let bangumis;
        try {
            bangumis = await query.select('id name name_cn air_date status type country quarter images views').exec();
        }
        catch (err) {
            err.info = 'Get bangumi documents error';
            return next(err);
        }

        let result = {
            info: {
                code: 200,
                desc: 'OK',
            },
            bangumis,
            pager,
        };
        res.status(200).json(result);
    }

    detail = async (req, res, next) => {
        let query;
        try{
            query = this._makeDetailQuery(req.params, next);
        }
        catch(err){
            err.info = 'Make bangumi detail query error';
            return next(err);
        }

        try{
            let bangumi = await query.select('-_id -__v').populate('crt', '-_id -__v').exec();
        }
        catch(err){
            err.info = 'Get bangumi document error';
            return next(err);
        }      
    }

    _makeListQuery = async ({
        sort = 'update_time',
        page = 1,
        pagesize = 30,
        before,
        after,
        type,
        country,
        quarter,
        weekday,
    }, next) => {
        let query = Bangumi.find();

        if (validator.isInt(before, {
            min: 1900,
            max: parseInt(dtime().format('YYYY')),
        })) {
            query = query.where('air_year').lte(before);
        }

        if (validator.isInt(after, {
            min: 1900,
            max: parseInt(dtime().format('YYYY')),
        })) {
            query = query.where('air_year').gte(after);
        }

        if (validator.isIn(type, ['tv', 'ova', 'movie', 'web', 'special_tv', 'other'])) {
            query = query.find({ type: type });
        }

        if (!validator.isEmpty(country)) {
            query = query.find({ country: country });
        }

        if (validator.isIn(quarter, ['winter', 'spring', 'summer', 'autumn'])) {
            query = query.find({ quarter: quarter });
        }

        if (validator.isIn(weekday, ['0', '1', '2', '3', '4', '5', '6'])) {
            query = query.find({ air_weekday: weekday });
        }

        if (!validator.isIn(sort, ['create_time', 'update_time', 'views'])) {
            let error = new Error();
            error.info = 'Invalid params sort'
            error.statusCode = 400;
            return next(error);
        }

        let count = await query.count().exec();
        let pager = {
            page,
            pagesize,
            count,
            lastpage: Math.ceil(parseInt(count) / parseInt(pagesize))
        }

        query = query.skip((parseInt(page) - 1) * parseInt(pagesize)).limit(parseInt(pagesize));

        return {
            query,
            pager,
        };
    }

    _makeDetailQuery = ({ id }, next) => {
        if(!validator.isMongoId(id)){
            let error = new Error();
            error.statusCode = 400;
            return next(error);
        }

        let query = Bangumi.findById(id);

        return query;
    }
}

module.exports = new BangumiController();
