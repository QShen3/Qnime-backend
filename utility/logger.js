const log4js = require('log4js');

log4js.configure({
    appenders: {
        stdout: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: 'error.log'
        }
    },
    categories: {
        default: {
            appenders: ['stdout'],
            level: 'debug'
        },
        error: {
            appenders: ['stdout', 'file'],
            level: 'error'
        }
    },
    pm2: true,
});

if(process.env.NODE_ENV === 'development'){
    module.exports = log4js.getLogger();
}
else{
    module.exports = log4js.getLogger('error');
}