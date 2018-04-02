const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StatisSchema = new Schema({
    date: String,
    origin: String
});

StatisSchema.index({origin: 1});

mongoose.model('Statis', StatisSchema);

