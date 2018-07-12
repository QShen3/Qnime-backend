const mongoose = require('mongoose');
const validator = require('validator');

const { BroadCaster, Bangumi } = require('../models');
const BaseController = require('./base');

class BroadCasterController extends BaseController {
    constructor() {
        super();
    }

    async list(req, res, next) {
        let pager, query;
        try{
            ({query, pager} = await this._makeListQuery(req.query, next));
        }
        catch(err) {
            if(!err.info){
                err.info = 'Make broadcaster list query error';
            }
            return next(err);
        }

        let broadcasters;
        try{
            broadcasters = await query.select('id name name_cn logo').exec();
        }
        catch(err){
            err.info = 'Get broadcaster documents error';
            return next(err);
        }

        let result = {
            info: this.info200,
            broadcasters,
            pager,
        }
        res.status(200).json(result);
    }

    async _makeListQuery({
        page = 1,
        pagesize = 30,
    }, next) {
        let query = BroadCaster.find();

        let count = await query.count().exec();
        let pager = {
            page,
            pagesize,
            count,
            lastpage: Math.ceil(parseInt(count) / parseInt(pagesize)),
        }

        query = query.find().skip((validator.toInt(page) - 1) * validator.toInt(pagesize)).limit(validator.toInt(pagesize));

        return {
            query,
            pager,
        }
    }
}