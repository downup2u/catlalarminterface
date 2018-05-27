const config = require('../config');
const getCATLPushedAlarams = require('./getCATLPushedAlarams');

const debug = require('debug')('srv:everyhourjob')
const moment = require('moment');
const _ = require('lodash');
const PubSub = require('pubsub-js');

const getProductTopic = (warninglevel)=>{
  if(warninglevel === 1){
    return config.kafka_dbtopic_p1;
  }
  if(warninglevel === 2){
    return config.kafka_dbtopic_p2;
  }
  if(warninglevel === 3){
    return config.kafka_dbtopic_p3;
  }
}

const everyhourjob = (callbackfn)=>{
  const CurDayHour = moment().subtract(1, 'hours').format('YYYYMMDDHH');
  getCATLPushedAlarams(CurDayHour,(retlist)=>{
    debug(`retlist--->${JSON.stringify(retlist)}`);
    _.map(retlist,(info)=>{
      const Details = _.get(info,'Alarm.Details',[]);
      if(Details.length > 0){
        const topic = getProductTopic(info.warninglevel);
        if(!!topic){
          PubSub.publish(`kafkamsgpush`,{
            topic,
            payload:info
          });
        }
      }
    });
    callbackfn(null,true);
  });
}

module.exports = everyhourjob;
