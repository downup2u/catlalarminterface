const startsrv = require('./src/kafka/kc.js');
const config = require('./src/config');
const winston = require('./src/log/log.js');
const DBModels = require('./src/handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');
const alarmplugin = require('./src/plugins/alarmfilter/index');
const moment = require('moment');
const debug = require('debug')('start');
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


everydayjob();

debug(`connected success!${moment().format('YYYY-MM-DD HH:mm:ss')}`);
winston.getlog().info(`start pushsrv ok-->${config.NodeID}`);

// const getInitAlarm = (callback)=>{
//   const deviceModel = DBModels.DeviceModel;
//   const fields = {'DeviceId':1,'warninglevel':1,'alarmtxtstat':1,'CurDay':1};
//   const queryexec = deviceModel.find({CurDay:alarmplugin.getCurDay()}).select(fields).lean();
//   debug(`device start exec`);
//   queryexec.exec((err,list)=>{
//     if(!err && !!list){
//       _.map(list,(deviceinfo)=>{
//         config.gloabaldevicealarmstat_realtime[`${deviceinfo.DeviceId}`] = {
//           CurDay:_.get(deviceinfo,'CurDay',alarmplugin.getCurDay()),
//           warninglevel:deviceinfo.warninglevel,
//           devicealarmstat:deviceinfo.alarmtxtstat
//         };
//       });
//     }
//     callback();
//   });
// }
//


const everyhourjob = (callback)=>{
  // const deviceModel = DBModels.DeviceModel;
  // deviceModel.update({
  //   CurDay:{
  //     $ne:alarmplugin.getCurDay()
  //   }
  // },{
  //   warninglevel:'',
  //   devicealarmstat:'',
  //   CurDay: alarmplugin.getCurDay(),
  // }, { multi: true },(err,result)=>{
  //   getInitAlarm(callback);
  // });
  callback();
}

everyhourjob(()=>{
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
  //每天0点更新优惠券过期信息
  everyhourjob(()=>{
    winston.getlog().info(`定时执行完毕`);
  });
});


schedule.scheduleJob('0 8 * * *', ()=>{
  //每天8点更新字典
  everydayjob();
});
