const mongoose = require('mongoose');
const validator = require('validator');

const { Staff, Bangumi } = require('../models');
const BaseController = require('./base');

class StaffController extends BaseController {
    constructor() {
        super();
        this.list = this.list.bind(this);
        this.detail = this.detail.bind(this);
        this.bangumi = this.bangumi.bind(this);
    }

    async list(req, res, next) {
        let pager, query;
        try {
            ({ query, pager } = await this._makeListQuery(req.query, next));
        }
        catch (err) {
            if (!err.info) {
                err.info = 'Make staff list query error';
            }
            return next(err);
        }

        let staffs;
        try {
            staffs = await query.select('id name name_cn images jobs views').exec();
        }
        catch (err) {
            err.info = 'Get staff documents error';
            return next(err);
        }

        let result = {
            info: this.info200,
            staffs,
            pager,
        };
        res.status(200).json(result);
    }

    async detail(req, res, next) {
        let query;
        try {
            query = this._makeDetailQuery(req.params, next);
        }
        catch (err) {
            if (!err.info) {
                err.info = 'Make staff detail query error';
            }
            return next(err);
        }

        let staff;
        try {
            staff = await query.select('-_id -__v').exec();
        }
        catch (err) {
            err.info = 'Get bangumi document error';
            return next(err);
        }

        let result = {
            info: this.info200,
            staff
        }
        res.status(200).json(result);
    }

    async bangumi(req, res, next) {
        let query, pager;
        try {
            ({ query, pager } = await this._makeBangumiQuery(req.query, next));
        }
        catch (err) {
            if (!err.info) {
                err.info = 'Make staff bangumi query error';
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

    async _makeListQuery({
        sort = 'update_time',
        page = 1,
        pagesize = 30,
        gender,
        job
    }, next) {
        let query = Staff.find();

        if (validator.isIn(gender || "", ['男', '女'])) {
            query = query.find({ 'info.gender': gender });
        }

        if (!validator.isEmpty(job || "")) {
            query = query.all('jobs', [job]);
        }

        if (!validator.isIn(sort || '', ['create_time', 'update_time', 'views', '-create_time', '-update_time', '-views'])) {
            let error = this.error400('Invalid params sort');
            throw (error);
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
        }
    }

    _makeDetailQuery({ id }, next) {
        if (!validator.isMongoId(id)) {
            let error = this.error400('Invalid params id');
            throw (error);
        }

        let query = Staff.findById(id);

        return query;
    }

    async _makeBangumiQuery({
        sort = 'update_time',
        page = 1,
        pagesize = 30,
        id,
    }, next) {
        if (!validator.isMongoId(id)) {
            let error = this.error400('Invalid params id');
            throw (error);
        }

        if (!validator.isIn(sort || '', ['create_time', 'update_time', 'views', '-create_time', '-update_time', '-views'])) {
            let error = this.error400('Invalid params sort');
            throw (error);
        }

        let query = Bangumi.find().elemMatch('staff', { id: mongoose.Types.ObjectId(id) });

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
}

module.exports = new StaffController();