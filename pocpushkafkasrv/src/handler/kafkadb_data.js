const mongoose  = require('mongoose');
const async = require('async');
const _ = require('lodash');
const config = require('../config.js');
const moment = require('moment');
const alarmplugin = require('../plugins/alarmfilter/index');
const deviceplugin = require('../plugins/devicefilter/index');
const debug = require('debug')('dbdata');

const warninglevelmap = {
  '高':3,
  '中':2,
  '低':1
};

const getdbdata_alarm = (devicedata,callbackfn)=>{
  const LastRealtimeAlarm = _.get(devicedata,'LastRealtimeAlarm');
  const LastHistoryTrack = _.get(devicedata,'LastHistoryTrack');
  if(!!LastRealtimeAlarm){//含有历史设备数据
    LastRealtimeAlarm.DeviceId = devicedata.DeviceId;
    alarmplugin.dofilter(devicedata.DeviceId,LastRealtimeAlarm,(err,result_alarm)=>{
      // console.log(`result_alarm==>${JSON.stringify(result_alarm)}`);
      if(!err && !!result_alarm){
        //含有报警信息
        let updatedset = {
          id:`${result_alarm.CurDayHour}${result_alarm.DeviceId}`,
          CurDayHour:result_alarm.CurDayHour,
          DeviceId:result_alarm.DeviceId,
          DataTime:LastRealtimeAlarm.DataTime,
          warninglevel:_.get(warninglevelmap,`${devicedata.warninglevel}`, 0),//<---------注意！！！
          NodeID:config.NodeID,
          SN64:devicedata.SN64,
          UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
        };

        if(!!LastHistoryTrack){
          updatedset.Longitude = LastHistoryTrack.Longitude;
          updatedset.Latitude = LastHistoryTrack.Latitude;
          updatedset.GPSTime = LastHistoryTrack.GPSTime;
        }
        let updated_data = {"$set":updatedset};
        if(!!result_alarm.inc_data){
          updated_data["$inc"] = result_alarm.inc_data;
        }
        //{ $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } }
        const TROUBLE_CODE_LIST = _.get(LastRealtimeAlarm,'Alarm.TROUBLE_CODE_LIST',[]);
        const AlarmWarning = devicedata.resultalarmmatch || [];
        let mapFieldName = {};

        let Details = [];
        _.map(AlarmWarning,(v)=>{
          /*
           "alarmtxt" : "均衡电路故障",
           "warninglevel" : "中",
           "fieldname" : "AL_ERR_BAL_CIRCUIT"
          */
          mapFieldName[v.fieldname] = {
            id:v.fieldname,
            description:config.mapdict[v.fieldname] ||  _.get(v,'alarmtxt',''),
            warninglevel:_.get(warninglevelmap,`${v.warninglevel}`, 0),
          }
        });

        _.map(TROUBLE_CODE_LIST,(v)=>{
          const value = mapFieldName[v.fieldname];
          if(!!value){
            const {id,description,warninglevel} = value;
            if(warninglevel > 0){
              Details.push({
                id,
                description,
                errorcode:`${v.errorcode}`,
                warninglevel,
              });
            }
          }
        });

        updated_data["$addToSet"] = {
          Details: { $each: Details},
         };
        callbackfn(updated_data);
        return;
      }
      callbackfn();
    });
    return;
  }
  callbackfn();
}

const getindexmsgs = (data,callbackfn)=>{
  // const getpoint = (v)=>{
  //   if(!v){
  //     return [0,0];
  //   }
  //   return [v.Longitude,v.Latitude];
  // }

  const LastRealtimeAlarm = _.clone(data.BMSData);
  const LastHistoryTrack = _.clone(data.Position);

  const devicedata = _.omit(data,['BMSData','Position']);
  devicedata.GUID = data.GUID;
  if(!!LastRealtimeAlarm){
    devicedata.LastRealtimeAlarm = LastRealtimeAlarm;
  }
  if(!!LastHistoryTrack){
    if(!!LastHistoryTrack.GPSTime){
      LastHistoryTrack.GPSTime = moment(LastHistoryTrack.GPSTime).add(8,'hours').format('YYYY-MM-DD HH:mm:ss');
    }
    devicedata.LastHistoryTrack = LastHistoryTrack;

  }
  devicedata.UpdateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  alarmplugin.matchalarm(_.get(devicedata,'LastRealtimeAlarm.Alarm'),(resultalarmmatch)=>{
    devicedata.warninglevel = '';//empty
    if(resultalarmmatch.length > 0){
      devicedata.warninglevel = resultalarmmatch[0].warninglevel;
    }
    devicedata.resultalarmmatch = resultalarmmatch;

    //------取最大的warninglevel
    let level = {
      '高':3,
      '中':2,
      '低':1,
    }
    const config_warninglevel = _.get(config,`gloabaldevicealarmstat_realtime.${devicedata.DeviceId}.warninglevel`,'');
    if(_.get(level,`${config_warninglevel}`,0) > _.get(level,`${devicedata.warninglevel}`,0)){
      devicedata.warninglevel = config_warninglevel;
    }
    //------取最大的warninglevel

    // utilposition.getpostion_frompos(getpoint(LastHistoryTrack),(retobj)=>{
    //   let newdevicedata = _.merge(devicedata,retobj);
    let newdevicedata = _.clone(devicedata);
    newdevicedata.indexrecvpartition = data.recvpartition;
    newdevicedata.indexrecvoffset = data.recvoffset;

    callbackfn(newdevicedata);
    // });
  });

}

const getkafkamsg = (msg)=>{
  let payload = msg.value.toString();
  if(typeof payload === 'string'){
    try{
      payload = JSON.parse(payload);
    }
    catch(e){
      //console.log(`parse json eror ${JSON.stringify(e)}`);
    }
  }
  payload.recvpartition = msg.partition;
  payload.recvoffset = msg.offset;
  return payload;
}


const parseKafkaMsgs = (kafkamsgs,callbackfn)=>{
  const msgs = [];
  _.map(kafkamsgs,(msg)=>{
    let newmsg = getkafkamsg(msg);
    newmsg = deviceplugin(newmsg);
    msgs.push(newmsg);
  });
  const resultmsglist = {
    'alarm':[],
  };
  const fnsz = [];
  _.map(msgs,(msg)=>{
    fnsz.push((callbackfn)=>{
      debug(`msg--->${JSON.stringify(msg)}`)
      getindexmsgs(msg,(newdevicedata)=>{//获得warninglevel
        debug(`newdevicedata--->${JSON.stringify(newdevicedata)}`)
          getdbdata_alarm(newdevicedata,(data_alarm)=>{//准备数据updatedset
             if(!!data_alarm){
               resultmsglist['alarm'].push(data_alarm);
             }
             callbackfn();
        });//准备数据updatedset
      });//获得warninglevel
    });//push
  });
  debug(`start parseKafkaMsgs->${fnsz.length}`);
  async.parallel(fnsz,(err,result)=>{
    debug(`stop parseKafkaMsgs-->`);
    callbackfn(resultmsglist);//会导致乱序
  });
}
//
//
// const test = ()=>{
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
// }
//
module.exports = parseKafkaMsgs;
