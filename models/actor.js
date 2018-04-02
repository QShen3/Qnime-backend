const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
    name: { type: String },
    name_cn: { type: String },
    images: {
        large: { type: String },
        medium: { type: String },
        small: { type: String },
        grid: { type: String },
    },
    info: { type: Schema.Types.Mixed },
});

ActorSchema.index({ name: 1 });
ActorSchema.index({ name_cn: 1 });

mongoose.model('Actor', ActorSchema);