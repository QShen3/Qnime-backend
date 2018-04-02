const mongoose = require('mongoose');
const dtime = require('time-formater');

const Schema = mongoose.Schema;

const BangumiSchema = new Schema({
    name: { type: String },
    name_cn: { type: String },
    summary: { type: String },
    air_date: { type: String },
    air_time: { type: String },
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
        status: { type: Number, default: 0 }, //0: not air, 1: air
        id: { type: Schema.Types.ObjectId }
    }],
    sp: [{
        title: { type: String },
        name: { type: String },
        name_cn: { type: String },
        status: { type: Number, default: 0 }, //0: not air, 1: air
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
        name: {type: String},
        url: {type: String},
        id: {type: String}
    }],
    create_time: { type: Date, default: Date.now },
    update_time: { type: Date, default: Date.now },
    views: { type: Number, default: 0 }
}, { toJSON: { virtuals: true } });

BangumiSchema.index({ name: 1 });
BangumiSchema.index({ name_cn: 1 });

BangumiSchema.virtual('air_year').get(() => {
    let year = this.air_date.split('-')[0];
    return year;
});

BangumiSchema.virtual('air_month').get(() => {
    let month = this.air_date.split('-')[1];
    return month;
});

BangumiSchema.virtual('ep_count').get(() => {
    let count = this.ep.length();
    return count;
});

BangumiSchema.virtual('air_weekday').get(() => {
    if (this.type === 'tv' && this.country === 'Japan') {
        let date = dtime(this.air_date);
        return date.format('dd');
    }
    else {
        return '';
    }
});

// BangumiSchema.virtual('quarter').get(() => {
//     if (this.type === 'tv' && this.country === 'Japan') {
//         let month = parseInt(this.month);
//         if(month )
//     }
//     else {
//         return ''
//     }
// })

BangumiSchema.pre('save', function (next) {
    let now = new Date();
    this.update_time = now;
    next();
});

mongoose.model('Bangumi', BangumiSchema);