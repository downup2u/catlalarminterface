const srvhttp = require('./src/srvhttp.js');
const config = require('./src/config');
const mongoose     = require('mongoose');
const winston = require('./src/log/log.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    mongos:config.mongos,

    useMongoClient: true,
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  });
winston.initLog();
winston.getlog().info(`====>第一次启动version:${config.version}`);

srvhttp.startsrv();
