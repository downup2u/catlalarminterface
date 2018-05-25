const config = require('../src/config');
const DBModels = require('../src/handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');

const getDataDict = ()=>{
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
    console.log(config.mapdict);
  });
}

const getDeviceCities = ()=>{
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
            if(v.city.length > 0){
              cityname = `${cityname}${v.city}`;
            }
            else{
              const district = _.get(v,'district');
              if(!!district){
                cityname = `${cityname}${district}`;
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
      console.log(config.mapdevicecity);
  });
}
//

const everydayjob = ()=>{
  getDataDict();
  getDeviceCities();
};

module.exports = everydayjob;
