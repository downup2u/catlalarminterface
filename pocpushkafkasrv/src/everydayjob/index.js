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
    // const info = _.get(config,`mapdevicecity.1635101552`,{});
    // winston.getlog().error(`1635101552-->cityinfo:${JSON.stringify(info)}`);
    callbackfn(null,true);
  }).catch((e)=>{
    callbackfn(null,true);
  });

}

const getSystemConfigIT = (systemconfig)=>{
  //处理systemconfig
  //输入原始的systemconfig的值
  //过滤warningrulelevelit
  const warningrulelevelit = systemconfig.warningrulelevelit || [];
  let mapwarningrulelevelit = {};
  _.map(warningrulelevelit,(v)=>{
    mapwarningrulelevelit[v.id] = v;
  });
  const warningrulelevel0 = systemconfig.warningrulelevel0 || [];
  let warningrulelevel0_new = [];
  const warningrulelevel1 = systemconfig.warningrulelevel1 || [];
  let warningrulelevel1_new = [];
  const warningrulelevel2 = systemconfig.warningrulelevel2 || [];
  let warningrulelevel2_new = [];
  _.map(warningrulelevel0,(v)=>{
    if(!!mapwarningrulelevelit[v.name]){
      warningrulelevel0_new.push(v);
    }
  });
  _.map(warningrulelevel1,(v)=>{
    if(!!mapwarningrulelevelit[v.name]){
      warningrulelevel1_new.push(v);
    }
  });
  _.map(warningrulelevel2,(v)=>{
    if(!!mapwarningrulelevelit[v.name]){
      warningrulelevel2_new.push(v);
    }
  });

  return {
    warningrulelevel0:warningrulelevel0_new,
    warningrulelevel1:warningrulelevel1_new,
    warningrulelevel2:warningrulelevel2_new,
    mapwarningrulelevelit
  }
}

const getSystemconfig  = (callbackfn)=>{
  const url = `${config.dbsysurl}/getSystemconfig`;
  return fetch(url).then((res)=>{
    return res.json();
  }).then((systemconfig)=> {
    config.systemconfig = getSystemConfigIT(systemconfig);
    debug(config.systemconfig);
    winston.getlog().log(`获取实际配置:`);
    winston.getlog().log(config.systemconfig);
    callbackfn(null,true);
  }).catch((e)=>{
    winston.getlog().error(`发生异常:`);
    winston.getlog().error(e);
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
