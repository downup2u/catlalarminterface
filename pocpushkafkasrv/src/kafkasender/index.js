const moment = require('moment');
const getProducer  = require('../kafka/rkafka/p.js');
const DBModels = require('../handler/models.js');
const _ = require('lodash');
const debug = require('debug')('srv:index');
const PubSub = require('pubsub-js');
const config = require('../config');
const winston = require('../log/log.js');
const setCATLAlaramPushed = require('../everyhourjob/setCATLAlaramPushed');

const pushtokafkasrv = (topicname,payload,producer)=>{
  try {
      const curtime = moment().format('YYYY-MM-DD HH:mm:ss');
      const dbModel = DBModels.RealtimeAlarmHourKafkaModel;
      payload.idsend = payload.id;
      payload.NodeID = `${config.NodeID}`;
      payload.create_at = curtime;
      const dbModelKafka = DBModels.RealtimeAlarmHourKafkaModel;
      let updated_data = {};
      updated_data["$set"] = payload;
      updated_data["$setOnInsert"] = {
        first_create_at:curtime
      };
      dbModelKafka.findOneAndUpdate({idsend:payload.id},updated_data,{new:true,upsert:true}).lean().exec((err,result)=>{
        const senddata = _.omit(payload,['warninglevel']);
        const stringdata = JSON.stringify(senddata);
        producer.produce(topicname, -1, new Buffer(stringdata),payload.id);
        debug(`send message===>${stringdata},topicname:${topicname}`);
      });


    } catch (err) {
      winston.getlog().error(`pushtokafkasrv error-->${JSON.stringify(payload)}`);
      debug('A problem occurred when sending our message')
      debug(err)
    }

}

const startsrv = (callbackfn)=>{
  getProducer(config.kafka_pconfig1,config.kafka_pconfig2,(err)=> {
    debug(`---uncaughtException err`);
    debug(err);
    debug(err.stack);
    debug(`uncaughtException err---`);
  },({key,notify_partition,notify_offset,notify_topic})=>{
    if(notify_offset > 0){//注意：如果为0，则表示下次需要继续发送一次
      setCATLAlaramPushed(key,(err,result)=>{
        debug(`setCATLAlaramPushed===>${key}`);
      });
      const notify_time = moment().format('YYYY-MM-DD HH:mm:ss');
      const dbModelKafka = DBModels.RealtimeAlarmHourKafkaModel;
      dbModelKafka.findOneAndUpdate({idsend:key},{
          $set:{
            notify_time,
            notify_partition,
            notify_offset,
            notify_topic
          }
        },{new:true}).lean().exec((err,result)=>{

        });
    }
  }).then((producer)=>{
    const userDeviceSubscriber = ( msg, data )=>{
        pushtokafkasrv(data.topic,data.payload,producer);
    };
    debug('kafkaproducer is ready!');
    PubSub.subscribe(`kafkamsgpush`,userDeviceSubscriber);
    callbackfn();
  });
}


module.exports = startsrv;
