const mongoose = require('mongoose');
const validator = require('validator');

const { Episode } = require('../models');
const BaseController = require('./base');

class EpisodeController extends BaseController {
    constructor() {
        super();
        this.detail = this.detail.bind(this);
    }

    async detail(req, res, next) {
        let query;
        try{
            query = this._makeDetailQuery(req.params);
        }
        catch(err){
            if(!err.info){
                err.info = 'Make episode detail query error';
            }
            return next(err);
        }

        let episode;
        try{
            episode = await query.select('-_id -__v').exec();
        }
        catch(err){
            err.info = 'Get episode document error';
            return next(err);
        }

        let result = {
            info: this.info200,
            episode,
        }

        res.status(200).json(result);
    }

    _makeDetailQuery({ id }) {
        if(!validator.isMongoId(id)){
            let error = this.error400('Invalid params id');
            throw(error);
        }

        let query = Episode.findById(id);

        return query;
    }
}

module.exports = new EpisodeController();