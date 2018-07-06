const mongoose  = require('mongoose');
const async = require('async');
const _ = require('lodash');
const config = require('../config.js');
const moment = require('moment');
const debug = require('debug')('srvstat_testkafkac:dbdata');
const kafkadbh = require('./kafkadb_dbh.js');
const winston = require('../log/log.js');


const getkafkamsg = (msg)=>{
  let payload = msg.value.toString();
  if(typeof payload === 'string'){
    try{
      payload = JSON.parse(payload);
    }
    catch(e){
      //console.log(`parse json eror ${JSON.stringify(e)}`);
    }
  }
  payload.recvpartition = msg.partition;
  payload.recvoffset = msg.offset;
  return payload;
}


const parseKafkaMsgs = (kafkamsgs,callbackfn)=>{
  const msgs = [];
  _.map(kafkamsgs,(msg)=>{
    let newmsg = getkafkamsg(msg);
    msgs.push(newmsg);
  });

  const fnsz = [];
  _.map(msgs,(msg)=>{
    fnsz.push((callbackfn)=>{
      debug(`msg--->${JSON.stringify(msg)}`)
      kafkadbh(msg,callbackfn);
    });//push
  });
  debug(`start parseKafkaMsgs->${fnsz.length}`);
  async.parallel(fnsz,(err,result)=>{
    debug(`stop parseKafkaMsgs-->`);
    callbackfn(null,true);//会导致乱序
  });
}
//
//
// const test = ()=>{
// {
//  "id": "20180419161724102895",
//  "CurDayHour": "2018041916",
//  "DeviceId": "1724102895",
//  "Latitude": "27.877929",
//  "Longitude": "112.905888",
//  "citycode": "010",
//  "adcode": "110100",
//  "FirstAlarmTime": "2018-04-19 16:34:45",
//  "DataTime": "2018-04-19 16:29:43",
//  "Alarm": {
//   "Details": [{
//     "id": "AL_DV_UCELL_51",
//     "description": " 单体压差过大三级",
//     "errorcode": "863",
//     "warninglevel": 3,
//     "count": 7
//    },
//    {
//     "id": "AL_TROUBLE_CODE_60_92",
//     "description": "均衡回路开路",
//     "errorcode": "92",
//     "warninglevel": 3,
//     "count": 3
//    }
//   ]
//  }
// }
// }
//
module.exports = parseKafkaMsgs;
