const _ = require('lodash');
const async = require('async');
const DBModels = require('../handler/models.js');

const getdevicecitycode = (callbackfn)=>{
  let mapdevicecitycode = {};
  const devicecityModel = DBModels.DeviceCityModel;
  devicecityModel.find({}).populate([
    {
      path: 'deviceid',
      model: 'device',
      select:'DeviceId',
    }]).lean().exec((err,list)=>{
      if(!err && !!list){
        _.map(list,(info)=>{
          const DeviceId = _.get(info,'deviceid.DeviceId');
          if(!!DeviceId){
            mapdevicecitycode[DeviceId] = {
              "citycode" : info.citycode,
              "adcode" : info.adcode,
              "targetadcode" :`${info.targetadcode}`,
              "updatetime" :info.updatetime,
            }
          }
        });
      }
      callbackfn(mapdevicecitycode);
    });
}

const get
