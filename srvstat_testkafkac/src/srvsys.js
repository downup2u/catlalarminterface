const _ = require('lodash');
const DBModels = require('./handler/models.js');
const debug = require('debug')('srvstat_testkafkac:test');
const winston = require('./log/log.js');
const async = require('async');
const config = require('./config');
const moment = require('moment');
const startsrv = require('./kafka/kc.js');


const start_cron0 = ()=>{
  startsrv(config);
};


exports.start_cron0 = start_cron0;
