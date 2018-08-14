const config = require('../config');
const _ = require('lodash');
const DBModels = require('../handler/models.js');
const debug = require('debug')('srv:everydayjob');
const async = require('async');
const moment = require('moment');
const winston = require('../log/log.js');

require('es6-promise').polyfill();
require('isomorphic-fetch');

const getDataDict = (callbackfn)=>{
  const url = `${config.dbsysurl}/getDataDict`;
  return fetch(url).then((res)=>{
    return res.json();
  }).then((mapdict)=> {
    config.mapdict = _.merge(config.mapdict,mapdict);
    debug(config.mapdict);
    callbackfn(null,true);
  }).catch((e)=>{
    callbackfn(null,true);
  });
}

const getDeviceCities = (callbackfn)=>{
  const url = `${config.dbsysurl}/getDeviceCities`;
  return fetch(url).then((res)=>{
    return res.json();
  }).then((mapdevicecity)=> {
    config.mapdevicecity = _.merge(config.mapdevicecity,mapdevicecity);
    // debug(config.mapdevicecity['1635100276']);
    // debug(config.mapdevicecity['1632100614']);
    // debug(config.mapdevicecity['1727102116']);
    // debug(config.mapdevicecity['1635101552']);
    const info = _.get(config,`mapdevicecity.1635101552`,{});
    winston.getlog().error(`1635101552-->cityinfo:${JSON.stringify(info)}`);
    callbackfn(null,true);
  }).catch((e)=>{
    callbackfn(null,true);
  });

}

const getSystemconfig  = (callbackfn)=>{
  const url = `${config.dbsysurl}/getSystemconfig`;
  return fetch(url).then((res)=>{
    return res.json();
  }).then((systemconfig)=> {
    config.systemconfig = systemconfig;
    debug(config.systemconfig);
    callbackfn(null,true);
  }).catch((e)=>{
    callbackfn(null,true);
  });
};
//
const clearSenderRealtimeAlarmHour = (callbackfn)=>{
  //DataTime
  const oneWeekago = moment().subtract(3, 'days').format('YYYYMMDDHH');
  const dbModel = DBModels.RealtimeAlarmHourModel;
  dbModel.remove({
    CurDayHour:{
      '$lte':oneWeekago,
    }
  },(err,result)=>{
    debug(`RealtimeAlarmHour->${config.NodeID}删除小于${oneWeekago}的数据`);
    callbackfn(null,true);
  });
}

const clearSenderRealtimeAlarmHourKafka = (callbackfn)=>{
  //DataTime
  const oneWeekago = moment().subtract(3, 'days').format('YYYYMMDDHH');
  const dbModel = DBModels.RealtimeAlarmHourKafkaModel;
  dbModel.remove({
    CurDayHour:{
      '$lte':oneWeekago,
    }
  },(err,result)=>{
    debug(`RealtimeAlarmHourKafka->${config.NodeID}删除小于${oneWeekago}的数据`);
    callbackfn(null,true);
  });
}

/*
db.realtimealarmhours.count({
'CurDayHour':{
    '$lte':'2018063100',
  }});
*/



const everydayjob = (callbackfn)=>{
  let asyncsz = [getDataDict,getDeviceCities,getSystemconfig];
  if(config.isdelflag){
    asyncsz.push(clearSenderRealtimeAlarmHour);
    asyncsz.push(clearSenderRealtimeAlarmHourKafka);
  }
  async.parallelLimit(asyncsz,1,(err,result)=>{
    callbackfn(null,true);
  });
};

module.exports = everydayjob;
