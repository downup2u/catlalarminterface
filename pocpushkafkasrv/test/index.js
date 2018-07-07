const config = require('../src/config');
const winston = require('../src/log/log.js');
const DBModels = require('../src/handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');
const moment = require('moment');
const debug = require('debug')('testp:start');
const schedule = require('node-schedule');
const getProducer  = require('../src/kafka/rkafka/p.js');

let maptestdata = {};
let sendp = [];
let recvp = [];

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

const convertItem = (item)=>{
  const {id,DeviceId,CurDayHour,Details,Latitude,Longitude,citycode,adcode,FirstAlarmTime,warninglevel,DataTime} = item;
  let DetailsResult = [];
  _.map(Details,(info)=>{
    info.count = item[info.id];
    DetailsResult.push(info);
  });
  if(!!citycode){
    return {
      id,
      DeviceId,
      CurDayHour,
      Latitude,
      Longitude,
      citycode,
      adcode,
      FirstAlarmTime,
      DataTime,
      warninglevel,
      Alarm:{Details:DetailsResult}
    }
  }

  return {
    id,
    DeviceId,
    CurDayHour,
    Latitude,
    Longitude,
    FirstAlarmTime,
    DataTime,
    warninglevel,
    Alarm:{Details:DetailsResult}
  }
}

//{$where:'this.Alaram.Details.length>0'}

const getCATLPushedAlarams = (callbackfn)=>{
  const dbModel = DBModels.RealtimeAlarmHourModel;
  dbModel.find({
    warninglevel:{$gt:0},
    'Details':{$exists:true},
    $where:'this.Details.length>0'
  }).sort({DataTime:-1}).limit(config.limit).lean().exec((err,list)=>{
    let retlist = [];
    if(!err && !!list){
      _.map(list,(item)=>{
        maptestdata[item.id] = false;
        sendp.push(item.id);
        retlist.push(convertItem(item));
      });
    }
    callbackfn(retlist);
  });
}

getProducer(config.kafka_pconfig1,config.kafka_pconfig2,(err)=> {
  debug(`---uncaughtException err`);
  debug(err);
  debug(err.stack);
  debug(`uncaughtException err---`);
},(key)=>{
   maptestdata[key] = true;
   recvp.push(key);
   debug(`发送${sendp.length},成功返回:${recvp.length}`)
}).then((producer)=>{
  getCATLPushedAlarams((list)=>{
    debug(`测试数据:${list.length}`)
    for(let i = 0 ;i < list.length ;i ++){
      let payload = list[i];
      const senddata = _.omit(payload,['warninglevel']);
      const stringdata = JSON.stringify(senddata);
      producer.produce(config.kafka_dbtopic_topicname, -1, new Buffer(stringdata),payload.id);
    }
  });
});
