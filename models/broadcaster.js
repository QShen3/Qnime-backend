const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BroadcasterSchema = new Schema({
    name: { type: String },
    name_cn: { type: String },
    logo: {type: String},
    url: {type: String},
    intro: {type: String},
    views: {type: Number, default: 0},
    update_time: { type: Date, default: Date.now },
});

BroadcasterSchema.index({ name: 1 });
BroadcasterSchema.index({ name_cn: 1 });

mongoose.model('Broadcaster', BroadcasterSchema);