const pino = require('pino');
const moment = require('moment');
const config = require('config');

const logger = pino({
    useLevelLabels: true,
    app: config.name,
    serializers: {
        err: pino.stdSerializers.err,
        error: pino.stdSerializers.err,
        exception: pino.stdSerializers.err,
        user: function(u){
            if(!u || !u.email){
                return 'N/A';
            }
            return u.email;
        }
    },
    timestamp: function(){
        let d = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
        let data = new Date(d);
        let finalDate = moment(data).format('DD-MM-YYYY,hh:mm:ss');
        return `,"timestamp": "${Date.now()}","timeIST": ${finalDate}`;
    },
    name: config.get('appName'),
    level: config.get('logLevel'),
    enabled: config.get('logEnabled')
});

logger.info({description: 'Logger initialized'});
module.exports = logger;