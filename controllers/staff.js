const { Staff } = require('../models');

class StaffController {
    constructor(){
        this.list = this.list.bind(this);
        this.detail = this.detail.bind(this);
        this.bangumi = this.bangumi.bind(this);
    }

    async list(req, res, next) {
        let pager, query;
        try {
            ({ query, pager } = this._makeListQuery(req.query, next));
        }
        catch (err) {
            err.info = 'Make staff list query error';
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
            info: {
                code: 200,
                desc: 'OK',
            },
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
            err.info = 'Make staff detail query error';
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
            info: {
                code: 200,
                desc: 'OK'
            },
            staff
        }
        res.status(200).json(result);
    }

    async bangumi(req, res, next) {

    }

    async _makeListQuery({
        sort = 'update_time',
        page = 1,
        pagesize = 30,
        gender,
        job
    }, next) {
        let query = Staff.find();

        if (validator.isIn(gender, ['男', '女'])) {
            query = query.elemMatch('info', { gender: gender });
        }

        if (!validator.isEmpty(job)) {
            query = query.all('jobs', [job]);
        }

        let count = await query.count().exec();
        let pager = {
            page,
            pagesize,
            count,
            lastpage: Math.ceil(parseInt(count) / parseInt(pagesize)),
        }

        query = query.skip((parseInt(page) - 1) * parseInt(pagesize)).limit(parseInt(pagesize));

        return {
            query,
            pager,
        }
    }

    _makeDetailQuery({ id }, next) {
        if (!validator.isMongoId(id)) {
            let error = new Error();
            error.statusCode = 400;
            return next(error);
        }

        let query = Staff.findById(id);

        return query;
    }
}

module.exports = new StaffController();