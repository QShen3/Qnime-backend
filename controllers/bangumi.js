const dtime = require('time-formater');
const validator = require('validator');

const { Bangumi } = require('../models');
const BaseController = require('./base');

class BangumiController extends BaseController{

    constructor() {
        super();
        this.list = this.list.bind(this);
        this.detail = this.detail.bind(this);
    }

    async list(req, res, next) {
        let pager, query;
        try {
            ({ query, pager } = await this._makeListQuery(req.query, next));
        }
        catch (err) {
            if(!err.info){
                err.info = 'Make bangumi list query error';
            }           
            return next(err);
        }

        let bangumis;
        try {
            bangumis = await query.select('name name_cn air_date status type country quarter images views ep_count').exec();
        }
        catch (err) {
            err.info = 'Get bangumi documents error';
            return next(err);
        }

        let result = {
            info: this.info200,
            bangumis,
            pager,
        };
        res.status(200).json(result);
    }

    async detail(req, res, next) {
        let query;
        try {
            query = this._makeDetailQuery(req.query, next);
        }
        catch (err) {
            if(!err.info){
                err.info = 'Make bangumi detail query error';
            }
            return next(err);
        }

        let bangumi;
        try {
            bangumi = await query.select('-update_time -create_time -__v').populate('crt', '-_id -__v').exec();
        }
        catch (err) {
            err.info = 'Get bangumi document error';
            return next(err);
        }

        let result = {
            info: this.info200,
            bangumi
        }
        res.status(200).json(result);

        bangumi.increaseView();
    }

    async _makeListQuery({
        sort = 'update_time',
        page = 1,
        pagesize = 30,
        before,
        after,
        type,
        country,
        quarter,
        weekday,
    }, next) {
        let query = Bangumi.find();

        if (before && validator.isInt(before, {
            min: 1900,
            max: parseInt(dtime().format('YYYY')),
        })) {
            query = query.where('air_year').lte(before);
        }

        if (after && validator.isInt(after, {
            min: 1900,
            max: parseInt(dtime().format('YYYY')),
        })) {
            query = query.where('air_year').gte(after);
        }

        if (type && validator.isIn(type, ['tv', 'ova', 'movie', 'web', 'special_tv', 'other'])) {
            query = query.find({ type: type });
        }

        if (country && !validator.isEmpty(country)) {
            query = query.find({ country: country });
        }

        if (quarter && validator.isIn(quarter, ['winter', 'spring', 'summer', 'autumn'])) {
            query = query.find({ quarter: quarter });
        }

        if (weekday && validator.isIn(weekday, ['0', '1', '2', '3', '4', '5', '6'])) {
            query = query.find({ air_weekday: weekday });
        }

        if (!validator.isIn(sort, ['create_time', 'update_time', 'views', '-create_time', '-update_time', '-views'])) {
            let error = this.error400('Invalid params sort');
            throw(error);
        }

        let count = await query.count().exec();
        let pager = {
            page,
            pagesize,
            count,
            lastpage: Math.ceil(parseInt(count) / parseInt(pagesize)),
        }

        query = query.find().sort(sort).skip((parseInt(page) - 1) * parseInt(pagesize)).limit(parseInt(pagesize));

        return {
            query,
            pager,
        };
    }

    _makeDetailQuery({ id }, next) {
        if (!validator.isMongoId(id)) {
            let error = this.error400('Invalid params id');
            throw(error);
        }

        let query = Bangumi.findById(id);

        return query;
    }
}

module.exports = new BangumiController();
