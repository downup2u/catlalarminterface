const config = require('../config');
const getCATLPushedAlarams = require('./getCATLPushedAlarams');
const setCATLAlaramPushed = require('./setCATLAlaramPushed');

const moment = require('moment');
const _ = require('lodash');

const everyhourjob = ()=>{
  const CurDayHour = moment().subtract(1, 'hours').format('YYYYMMDDHH');
  getCATLPushedAlarams(CurDayHour,(retlist)=>{
    console.log(`retlist--->${JSON.stringify(retlist)}`);
    _.map(retlist,(info)=>{
      setCATLAlaramPushed(info.id,(err,result)=>{

      });
    });
  });
}

module.exports = everyhourjob;
