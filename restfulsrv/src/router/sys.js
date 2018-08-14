const config = require('../config.js');
const debug  = require('debug')('srvapp:index');
const mongoose     = require('mongoose');
const _ = require("lodash");
const moment = require('moment');
const schedule = require('node-schedule');
const async  = require('async');
const winston = require('../log/log.js');
//设备
const Schema       = mongoose.Schema;
//系统设置
const SystemConfigSchema = new Schema({
}, { strict: false });
const SystemConfigModel =mongoose.model('systemconfig',  SystemConfigSchema);

//数据字典
const DataDictSchema = new Schema({
  name:{type:String},//字段名
  fullname:{type:String},//字段全名
  showname:{type:String},//字段显示名
  type:{type:String},//字段类型
  desc:{type:String},//字段描述
  unit:{type:String},//字段单位
});
const DataDictModel =mongoose.model('datadict',  DataDictSchema);

//设备城市映射表【每天一次】
const DeviceCitySchema = new Schema({
  deviceid:{ type: Schema.Types.ObjectId, ref: 'device'},
  updatetime: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
}, { strict: false });
const DeviceCityModel =mongoose.model('devicecity',  DeviceCitySchema);

const getDataDict = (callbackfn)=>{
  const alname = 'AL_';
  //还应该包括所有AL开头字母的信息
  const dbdictModel = DataDictModel;
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
    const config_mapdict = _.merge({},mapdict);
    debug(config_mapdict);
    callbackfn(config_mapdict);
  });
}

const getDeviceCities = (callbackfn)=>{
  const dbModel = DeviceCityModel;
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
              targetadcode:`${v.targetadcode}`,
              updatetime:v.updatetime,
              cityname
            }
          }
        });
      }
      const config_mapdevicecity = _.merge({},mapdevicecity);
      debug(config_mapdevicecity);
      debug(`devicecitylist--->${devicecitylist.length}`);
      callbackfn(config_mapdevicecity);
  });
}
//
const getSystemconfig = (callbackfn)=>{
  const systemconfigModel = SystemConfigModel;
  systemconfigModel.findOne({}).lean().exec((err, systemconfig)=> {
    callbackfn(systemconfig);
  });
};

let resultjson_getDataDict = {};
let resultjson_getDeviceCities = {};
let resultjson_getSystemconfig = {};

const loadtocache = (callbackfn)=>{
  let asyncsz = [];
  asyncsz.push((callbackfn)=>{
    getDataDict((resultjson)=>{
      resultjson_getDataDict = resultjson;
      callbackfn(null,true);
    });
  });
  asyncsz.push((callbackfn)=>{
    getDeviceCities((resultjson)=>{
      resultjson_getDeviceCities = resultjson;
      callbackfn(null,true);
    });
  });
  asyncsz.push((callbackfn)=>{
    getSystemconfig((resultjson)=>{
      resultjson_getSystemconfig = resultjson;
      callbackfn(null,true);
    });
  });

  async.parallelLimit(asyncsz,1,(err,result)=>{
    callbackfn(null,true);
  });
}

schedule.scheduleJob('0 7 * * *', ()=>{
  //每天7点更新字典
  loadtocache(()=>{
    winston.getlog().info(`每天7点更新字典`);
  });

});

const startviews = (app)=>{
  loadtocache(()=>{
    winston.getlog().info(`成功加载数据`);
    //http://localhost:3005/apisys/getDataDict
    app.get('/apisys/getDataDict', (req, res)=> {
        res.status(200)
            .json(resultjson_getDataDict);
  	});
    //http://localhost:3005/apisys/getDeviceCities
    app.get('/apisys/getDeviceCities',(req, res)=> {//middlewareauth,
      res.status(200)
          .json(resultjson_getDeviceCities);
    });
    //http://localhost:3005/apisys/getSystemconfig
    app.get('/apisys/getSystemconfig',(req, res)=> {//middlewareauth,
      res.status(200)
          .json(resultjson_getSystemconfig);
    });
  });
};

module.exports= startviews;
