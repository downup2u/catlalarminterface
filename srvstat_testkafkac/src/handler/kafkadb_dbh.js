const async = require('async');
const _ = require('lodash');
const debug = require('debug')('srvstat_testkafkac:handler');
const config = require('../config');
const winston = require('../log/log.js');

const onHandleToDB_alarm = (oneRecord,callbackfn)=>{
  debug(`oneRecord--------->${JSON.stringify(oneRecord)}`);
  callbackfn(null,true);
};

const onHandleToDB = (oneRecord,callbackfn)=>{
  onHandleToDB_alarm(oneRecord,(err,allresult)=>{
    callbackfn(err,allresult);
  });

};

module.exports = onHandleToDB;
