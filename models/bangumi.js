const mongoose = require('mongoose');
const dtime = require('time-formater');

const Schema = mongoose.Schema;

const BangumiSchema = new Schema({
    name: { type: String },
    name_cn: { type: String },
    summary: { type: String },
    air_date: { type: String },
    air_time: { type: String },
    air_year: {type: Number},
    air_month: {type: Number},
    air_weekday: {type: Number},
    ep_count: {type: Number, min: 0},
    sp_count: {type: Number, min: 0},
    status: { type: Number, default: 0 }, // 0: not air, 1: air, 2: finished
    type: { type: String, enum: ['tv', 'ova', 'movie', 'web', 'special_tv', 'other'] },
    country: { type: String },
    quarter: { type: String, enum: ['', 'winter', 'spring', 'summer', 'autumn'] },
    website: { type: String },
    twitter: { type: String },
    images: {
        large: { type: String },
        common: { type: String },
        medium: { type: String },
        small: { type: String },
        grid: { type: String },
    },
    staff: [{
        name: { type: String },
        name_cn: { type: String },
        jobs: [{ type: String }],
        id: { type: Schema.Types.ObjectId }
    }],
    crt: [{ type: Schema.Types.ObjectId, ref: 'Crt' }],
    ep: [{
        title: { type: String },
        name: { type: String },
        name_cn: { type: String },
        status: { type: Number, default: 0 }, // 0: not air, 1: air
        id: { type: Schema.Types.ObjectId }
    }],
    sp: [{
        title: { type: String },
        name: { type: String },
        name_cn: { type: String },
        status: { type: Number, default: 0 }, // 0: not air, 1: air
        id: { type: Schema.Types.ObjectId }
    }],
    broadcaster: [{
        name: { type: String },
        name_cn: { type: String },
        id: { type: Schema.Types.ObjectId },
        air_date: { type: String },
        air_time: { type: String },
    }],
    network: [{
        name: { type: String },
        name_cn: { type: String },
        id: { type: Schema.Types.ObjectId },
        url: { type: String },
        air_date: { type: String },
        air_time: { type: String },
    }],
    other_website: [{
        name: { type: String },
        url: { type: String },
        id: { type: String }
    }],
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
    views: { type: Number, default: 0 }
}, { toJSON: { virtuals: true }, toObject: {virtuals: true} });

BangumiSchema.index({ name: 1 });
BangumiSchema.index({ name_cn: 1 });

BangumiSchema.pre('save', function (next) {
    let now = new Date();
    this.update_time = now;

    if(this.isModified('air_date')){
        this.air_year = this.air_date ? parseInt(this.air_date.split('-')[0]) : undefined;
        this.air_month = this.air_date ? parseInt(this.air_date.split('-')[1]) : undefined;
        this.air_weekday = this.air_date ? parseInt(dtime(this.air_date).format('d')) : undefined;
    }

    if(this.isModified('ep')){
        this.ep_count = this.ep ? this.ep.length : 0;
    }

    if(this.isModified('sp')){
        this.sp_count = this.sp ? this.sp.length : 0;
    }

    next();
});

mongoose.model('Bangumi', BangumiSchema);