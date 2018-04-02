const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CrtSchema = new Schema({
    name: { type: String },
    name_cn: { type: String },
    images: {
        large: { type: String },
        medium: { type: String },
        small: { type: String },
        grid: { type: String },
    },
    info: {type: Schema.Types.Mixed},
    cv: [{type: Schema.Types.ObjectId, ref: 'Actor'}]
});

CrtSchema.index({ name: 1 });
CrtSchema.index({ name_cn: 1 });

mongoose.model('Crt', CrtSchema);