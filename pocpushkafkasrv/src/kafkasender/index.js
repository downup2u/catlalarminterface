const moment = require('moment');
const getProducer  = require('../src/rkafka/p.js');
const DBModels = require('../handler/models.js');
const _ = require('lodash');
const debug = require('debug')('srv:index');
const PubSub = require('pubsub-js');
const setCATLAlaramPushed = require('./setCATLAlaramPushed');

const pushtokafkasrv = (topicname,payload,producer)=>{
  try {
      const stringdata = JSON.stringify(payload);
      producer.produce(topicname, -1, new Buffer(stringdata),payload.id);
      debug(`send message===>${stringdata}`);

      const dbModel = DBModels.RealtimeAlarmHourKafkaModel;
      info.create_at = moment().format('YYYY-MM-DD HH:mm:ss');
      const entity = new dbModel(payload);
      entity.save(info,(err,result)=>{
        setCATLAlaramPushed(info.id,(err,result)=>{

        });
      });

    } catch (err) {
      debug('A problem occurred when sending our message')
      debug(err)
    }

}

const startsrv = ()=>{
  getProducer(config.kafka_pconfig1,config.kafka_pconfig2,(err)=> {
    debug(`---uncaughtException err`);
    debug(err);
    debug(err.stack);
    debug(`uncaughtException err---`);
  }).then((producer)=>{

    const userDeviceSubscriber = ( msg, data )=>{
        debug('r-->用户订阅请求,用户信息:'+JSON.stringify(ctx));
        debug('r-->用户订阅消息:'+msg);
        debug('r-->用户订阅数据:'+data);

        pushtokafkasrv(data.topic,data.payload,producer);

    };//for eachuser

    PubSub.subscribe(`kafkamsgpush`,userDeviceSubscriber);

  });
}


module.exports = startsrv;
