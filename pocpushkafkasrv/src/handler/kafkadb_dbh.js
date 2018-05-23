const async = require('async');
const _ = require('lodash');
const debug = require('debug')('dbh:handler');
const dbh_alarm = require('./dbh/dbh_alarm');

const config = require('../config');
const winston = require('../log/log.js');
const alarmutil = require('./getalarmtxt');

const getrealtime_devicealarmstat = (DeviceId,DataTime,devicealarmstat)=>{
  const devicekey = `${DeviceId}_${DataTime}`;
  let alarmtxtstat;
  if(!!devicealarmstat[devicekey]){
    alarmtxtstat = devicealarmstat[devicekey];
  }
  else{
    alarmtxtstat = _.get(config,`gloabaldevicealarmstat_realtime.${DeviceId}.devicealarmstat`,'');
  }
  return alarmtxtstat;
}

const onHandleToDB_alarm = (allresult,callbackfn)=>{
  debug(`获取allresult个数:${allresult['alarm'].length}`);

  dbh_alarm(allresult['alarm'],(err,result)=>{
    debug(`获取result个数:${result.length}`);
    if(!err && !!result){
      //result为报警信息返回结果,不确定result是否排序
      let devicealarmstat = {};
      let iordermap = {};

      const listalarm = result;
      _.map(listalarm,(alarm)=>{
        //alarm数据库中返回的记录
        config.gloabaldevicealarmstat_realtime[alarm.DeviceId] = {
          warninglevel:alarm.warninglevel,
          devicealarmstat:alarmutil.getalarmtxt(alarm)
        };

        devicealarmstat[`${alarm.DeviceId}_${alarm.DataTime}`] = alarmutil.getalarmtxt(alarm);
        iordermap[`${alarm.DeviceId}_${alarm.DataTime}`] = alarm.iorder;
      });
    }
    else{
      debug(err);
    }
    // debug(`所有设备最终结果:${JSON.stringify(allresult['device'])}`);
    callbackfn(null,allresult);
  });
};

const onHandleToDB = (allresultin,callbackfn)=>{
  onHandleToDB_alarm(allresultin,(err,allresult)=>{
    callbackfn(err,allresult);
  });

};

module.exports = onHandleToDB;
