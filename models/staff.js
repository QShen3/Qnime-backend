const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name: { type: String },
    name_cn: { type: String },
    images: {
        large: { type: String },
        medium: { type: String },
        small: { type: String },
        grid: { type: String },
    },
    info: { type: Schema.Types.Mixed },
    jobs: [{type: String}]
});

StaffSchema.index({ name: 1 });
StaffSchema.index({ name_cn: 1 });

mongoose.model('Staff', StaffSchema);