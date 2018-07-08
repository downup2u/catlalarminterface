const startsrv = require('./src/kafka/kc.js');
const config = require('./src/config');
const winston = require('./src/log/log.js');
const DBModels = require('./src/handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');
const alarmplugin = require('./src/plugins/alarmfilter/index');
const moment = require('moment');
const debug = require('debug')('srv:start');
const schedule = require('node-schedule');
const everydayjob = require('./src/everydayjob');


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


everydayjob(()=>{
  startsrv(config);
});





// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)


schedule.scheduleJob('0 * * * *', ()=>{
  //每小时更新一次
  winston.getlog().info(`每小时更新一次`);
  // config.gloabaldevicealarmstat_realtime = {};
});


schedule.scheduleJob('0 8 * * *', ()=>{
  //每天8点更新字典
  everydayjob(()=>{
    winston.getlog().info(`每天8点更新字典`);
  });

});

curtime = moment().format('YYYY-MM-DD HH:mm:ss');
winston.getlog().error(`====>执行到末尾${curtime}-->${config.NodeID}`);

/*
root@ecs-7063-0001:~# docker run -it confluentinc/cp-kafka:4.0.0 bash
kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group catlpushgroup --describe


kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group catlpushgroup  --topic pbmsindex --reset-offsets --to-latest --execute

*/
