const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NetworkSchema = new Schema({
    name: { type: String },
    name_cn: { type: String },
    logo: {type: String},
    url: {type: String},
    intro: {type: String}
});

NetworkSchema.index({ name: 1 });
NetworkSchema.index({ name_cn: 1 });

mongoose.model('Network', NetworkSchema);