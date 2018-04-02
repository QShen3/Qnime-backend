const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
    name: { type: String },
    name_cn: { type: String },
    duration: { type: Number },
    air_date: { type: String },
    air_time: {type: String},
    desc: { type: String },
    status: { type: Number, default: 0 }, //0: not air, 1: air
    staff: [{
        name: { type: String },
        name_cn: { type: String },
        jobs: [{type: String}],
        id: { type: Schema.Types.ObjectId }
    }],
    network_src: [{
        from: {type: String},
        from_cn: {type: String},
        url: {type: String}
    }]
});

EpisodeSchema.index({ name: 1 });
EpisodeSchema.index({ name_cn: 1 });

mongoose.model('Episode', EpisodeSchema);