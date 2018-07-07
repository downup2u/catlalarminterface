const winston = require('./src/log/log.js');
const config = require('./src/config');
const DBModels = require('./src/handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');
const moment = require('moment');
const debug = require('debug')('srv:start');
const schedule = require('node-schedule');
const everyhourjob = require('./src/everyhourjob');
const kafkasender = require('./src/kafkasender');


debug(`start=====>version:${JSON.stringify(config)}`);

debug(`==========`);

winston.initLog();
process.setMaxListeners(0);

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

let curtime = moment().format('YYYY-MM-DD HH:mm:ss');
debug(`connected success!${curtime}`);
winston.getlog().error(`====>第一次启动${curtime}-->${config.NodeID}`);

schedule.scheduleJob('*/5 * * * *', ()=>{
  //5分钟更新一次
  everyhourjob(()=>{
    winston.getlog().info(`5分钟更新一次`);
  });
});

kafkasender(()=>{
  everyhourjob(()=>{
    winston.getlog().info(`第一次启动${config.version}`);
  });
});
