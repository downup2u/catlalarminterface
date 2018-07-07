const config = require('../config');
const DBModels = require('../handler/models.js');
const _ = require('lodash');
const mongoose     = require('mongoose');


// {
//  "id": "20180419161724102895",
//  "CurDayHour": "2018041916",
//  "DeviceId": "1724102895",
//  "Latitude": "27.877929",
//  "Longitude": "112.905888",
//  "citycode": "010",
//  "adcode": "110100",
//  "FirstAlarmTime": "2018-04-19 16:34:45",
//  "DataTime": "2018-04-19 16:29:43",
//  "Alarm": {
//   "Details": [{
//     "id": "AL_DV_UCELL_51",
//     "description": " 单体压差过大三级",
//     "errorcode": "863",
//     "warninglevel": 3,
//     "count": 7
//    },
//    {
//     "id": "AL_TROUBLE_CODE_60_92",
//     "description": "均衡回路开路",
//     "errorcode": "92",
//     "warninglevel": 3,
//     "count": 3
//    }
//   ]
//  }
// }

const convertItem = (item)=>{
  const {id,DeviceId,CurDayHour,Details,Latitude,Longitude,citycode,adcode,FirstAlarmTime,warninglevel,DataTime} = item;
  let DetailsResult = [];
  _.map(Details,(info)=>{
    info.count = item[info.id];
    DetailsResult.push(info);
  });
  if(!!citycode){
    return {
      id,
      DeviceId,
      CurDayHour,
      Latitude,
      Longitude,
      citycode,
      adcode,
      FirstAlarmTime,
      DataTime,
      warninglevel,
      Alarm:{Details:DetailsResult}
    }
  }

  return {
    id,
    DeviceId,
    CurDayHour,
    Latitude,
    Longitude,
    FirstAlarmTime,
    DataTime,
    warninglevel,
    Alarm:{Details:DetailsResult}
  }
}

//{$where:'this.Alaram.Details.length>0'}

const getCATLPushedAlarams = (CurDayHour,callbackfn)=>{
  const dbModel = DBModels.RealtimeAlarmHourModel;
  dbModel.find({
    CurDayHour,
    isPushed:false,
    warninglevel:{$gt:0},
    'Details':{$exists:true},
    $where:'this.Details.length>0'
  }).lean().exec((err,list)=>{
    let retlist = [];
    if(!err && !!list){
      _.map(list,(item)=>{
        retlist.push(convertItem(item));
      });
    }
    callbackfn(retlist);
  });
}



module.exports = getCATLPushedAlarams;
