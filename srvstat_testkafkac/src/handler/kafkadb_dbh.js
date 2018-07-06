const async = require('async');
const _ = require('lodash');
const debug = require('debug')('srvstat_testkafkac:handler');
const config = require('../config');
const winston = require('../log/log.js');
const DBModels = require('./models.js');
const moment = require('moment');

const onHandleToDB_alarm = (oneRecord,callbackfn)=>{
  debug(`oneRecord--------->${JSON.stringify(oneRecord)}`);

  const dbModel = DBModels.KafkaModel;
  const payload = _.clone(oneRecord);
  payload.NodeID = `${config.NodeID}`;
  payload.create_at = moment().format('YYYY-MM-DD HH:mm:ss');
  const entity = new dbModel(payload);
  entity.save(payload,(err,result)=>{
    debug(`save data--->${JSON.stringify(result)}`);
    // callbackfn(null,true);
    const idsend = oneRecord.key;
    const setdata = {
      topic: payload.topic,
      partition: payload.recvpartition,
      offset: payload.recvoffset
    }
    const dbModelKafka = DBModels.RealtimeAlarmHourKafkaModel;
    dbModelKafka.findOneAndUpdate({idsend},{$set:setdata},{upsert:true,new:true}).lean().exec((err,result)=>{
       callbackfn(null,true);
    });
  });
//   {
// 	"id": "20180628191727206011",
// 	"DeviceId": "1727206011",
// 	"CurDayHour": "2018062819",
// 	"Latitude": 44.616021,
// 	"Longitude": 129.659541,
// 	"citycode": "0453",
// 	"adcode": "231000",
// 	"FirstAlarmTime": "2018-06-28 19:00:04",
// 	"DataTime": "2018-06-28 19:42:34",
// 	"Alarm": {
// 		"Details": [{
// 			"warninglevel": 1,
// 			"errorcode": "236",
// 			"description": "CSC火灾报警故障",
// 			"id": "AL_TROUBLE_CODE_60_236",
// 			"count": 19
// 		}]
// 	},
// 	"recvpartition": 2,
// 	"recvoffset": 788534
// }
};

const onHandleToDB = (oneRecord,callbackfn)=>{
  onHandleToDB_alarm(oneRecord,(err,allresult)=>{
    callbackfn(err,allresult);
  });

};

module.exports = onHandleToDB;
