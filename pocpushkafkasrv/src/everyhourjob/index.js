const config = require('../config');
const getCATLPushedAlarams = require('./getCATLPushedAlarams');
const moment = require('moment');

const everyhourjob = ()=>{
  const CurDayHour = moment().subtract(1, 'hours').format('YYYYMMDDHH');
  getCATLPushedAlarams(CurDayHour,(retlist)=>{
    console.log(`retlist--->${JSON.stringify(retlist)}`)
  });
}

module.exports = everyhourjob;
