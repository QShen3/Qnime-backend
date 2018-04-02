const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.mongoDB.user ? config.mongoDB.user + ':' + config.mongoDB.password + '@' : ''}${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.db}`, {
    poolSize: 10
}, (err) => {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

require('./bangumi');
require('./crt');
require('./actor');
require('./staff');
require('./episode');
require('./broadcaster');
require('./network');
require('./statis');

module.exports = {
    Bangumi: mongoose.model('Bangumi'),
    Crt: mongoose.model('Crt'),
    Actor: mongoose.model('Actor'),
    Staff: mongoose.model('Staff'),
    Episode: mongoose.model('Episode'),
    BroadCaster: mongoose.model('Broadcaster'),
    Network: mongoose.model('Network'),
    Statis: mongoose.model('Statis')
}


