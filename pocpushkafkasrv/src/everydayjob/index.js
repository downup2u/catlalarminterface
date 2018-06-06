const config = require('../config');
const _ = require('lodash');
const debug = require('debug')('srv:everydayjob');
const async = require('async');

require('es6-promise').polyfill();
require('isomorphic-fetch');

const getDataDict = (callbackfn)=>{
  const url = `${config.dbsysurl}/getDataDict`;
  return fetch(url).then((res)=>{
    return res.json();
  }).then((mapdict)=> {
    config.mapdict = _.merge(config.mapdict,mapdict);
    debug(config.mapdict);
    callbackfn(null,true);
  }).catch((e)=>{
    callbackfn(null,true);
  });
}

const getDeviceCities = (callbackfn)=>{
  const url = `${config.dbsysurl}/getDeviceCities`;
  return fetch(url).then((res)=>{
    return res.json();
  }).then((mapdevicecity)=> {
    config.mapdevicecity = _.merge(config.mapdevicecity,mapdevicecity);
    debug(config.mapdevicecity);
    callbackfn(null,true);
  }).catch((e)=>{
    callbackfn(null,true);
  });

}

const getSystemconfig  = (callbackfn)=>{
  const url = `${config.dbsysurl}/getSystemconfig`;
  return fetch(url).then((res)=>{
    return res.json();
  }).then((systemconfig)=> {
    config.systemconfig = systemconfig;
    debug(config.systemconfig);
    callbackfn(null,true);
  }).catch((e)=>{
    callbackfn(null,true);
  });
};
//

const everydayjob = (callbackfn)=>{
  const asyncsz = [getDataDict,getDeviceCities,getSystemconfig];
  async.parallel(asyncsz,(err,result)=>{
    callbackfn(null,true);
  });
};

module.exports = everydayjob;
