const config = require('../config');
const DBModels = require('../handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');

const setCATLAlaramPushed = (id,callbackfn)=>{
  const dbModel = DBModels.RealtimeAlarmHourModel;
  dbModel.findOneAndUpdate({id},{isPushed:true},{upsert:true,new:true}).lean().exec((err,result)=>{
     callbackfn(err,result);
  });
}

module.exports = setCATLAlaramPushed;
