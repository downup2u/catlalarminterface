const config = require('../config');
const getCATLPushedAlarams = require('./getCATLPushedAlarams');
const setCATLAlaramPushed = require('./setCATLAlaramPushed');
const debug = require('debug')('appsrv:everyhourjob')
const moment = require('moment');
const _ = require('lodash');

const everyhourjob = (callbackfn)=>{
  const CurDayHour = moment().subtract(1, 'hours').format('YYYYMMDDHH');
  getCATLPushedAlarams(CurDayHour,(retlist)=>{
    debug(`retlist--->${JSON.stringify(retlist)}`);
    _.map(retlist,(info)=>{
      const dbModel = DBModels.RealtimeAlarmHourKafkaModel;
      info.create_at = moment().format('YYYY-MM-DD HH:mm:ss');
      const entity = new dbModel(info);
      entity.save(info,(err,result)=>{
        setCATLAlaramPushed(info.id,(err,result)=>{

        });
      });
    });
    callbackfn(null,true);
  });
}

module.exports = everyhourjob;
