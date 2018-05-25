const config = require('../config');
const DBModels = require('../handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');
const debug = require('debug')('appsrv:everydayjob');
const async = require('async');

const getDataDict = (callbackfn)=>{
  const alname = 'AL_';
  //还应该包括所有AL开头字母的信息
  const dbdictModel = DBModels.DataDictModel;
  dbdictModel.find({
      name:{'$regex':alname, $options: "i"}
    }).lean().exec((err,dictlist)=>{

    // console.log(err)
    // console.log(`dictlist==>${JSON.stringify(dictlist)}`)
    let mapdict = {};
    if(!err && dictlist.length > 0){
      _.map(dictlist,(v)=>{
        mapdict[v.name] = {
          name:v.name,
          showname:v.showname,
          unit:v.unit
        }
      });
    }
    config.mapdict = _.merge(config.mapdict,mapdict);
    debug(config.mapdict);
    callbackfn(null,true);
  });
}

const getDeviceCities = (callbackfn)=>{
  const dbModel = DBModels.DeviceCityModel;
  dbModel.find({
    }).populate([
        {
          path:'deviceid',
          model: 'device',
          select:'DeviceId',
      }]).lean().exec((err,devicecitylist)=>{

      let mapdevicecity = {};
      if(!err && devicecitylist.length > 0){
        _.map(devicecitylist,(v)=>{
          const DeviceId = _.get(v,'deviceid.DeviceId');
          if(!!DeviceId){
            let cityname = `${v.province}`;
            if(!!v.city){
              if(v.city.length > 0){
                cityname = `${cityname}${v.city}`;
              }
              else{
                const district = _.get(v,'district');
                if(!!district){
                  cityname = `${cityname}${district}`;
                }
              }
            }
            mapdevicecity[DeviceId] = {
              citycode:v.citycode,
              targetadcode:v.targetadcode,
              updatetime:v.updatetime,
              cityname
            }
          }
        });
      }
      config.mapdevicecity = _.merge(config.mapdevicecity,mapdevicecity);
      debug(config.mapdevicecity);
      callbackfn(null,true);
  });
}
//

const everydayjob = (callbackfn)=>{
  const asyncsz = [getDataDict,getDeviceCities];
  async.parallel(asyncsz,(err,result)=>{
    callbackfn(null,true);
  });
};

module.exports = everydayjob;
