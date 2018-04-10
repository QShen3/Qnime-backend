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
    jobs: [{type: String}],
    update_time: { type: Date, default: Date.now },
    views: { type: Number, default: 0 }
});

StaffSchema.index({ name: 1 });
StaffSchema.index({ name_cn: 1 });

StaffSchema.pre('save', (next) => {
    let now = new Date();
    this.update_time = now;
    next();
});

mongoose.model('Staff', StaffSchema);