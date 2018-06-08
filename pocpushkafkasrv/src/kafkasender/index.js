const moment = require('moment');
const getProducer  = require('../kafka/rkafka/p.js');
const DBModels = require('../handler/models.js');
const _ = require('lodash');
const debug = require('debug')('srv:index');
const PubSub = require('pubsub-js');
const config = require('../config');
const setCATLAlaramPushed = require('../everyhourjob/setCATLAlaramPushed');

const pushtokafkasrv = (topicname,payload,producer)=>{
  try {
      const senddata = _.omit(payload,['warninglevel']);
      const stringdata = JSON.stringify(senddata);
      producer.produce(topicname, -1, new Buffer(stringdata),payload.id);
      debug(`send message===>${stringdata},topicname:${topicname}`);

      const dbModel = DBModels.RealtimeAlarmHourKafkaModel;
      payload.idsend = payload.id;
      payload.NodeID = `${config.NodeID}`;
      payload.create_at = moment().format('YYYY-MM-DD HH:mm:ss');
      const entity = new dbModel(payload);
      entity.save(payload,(err,result)=>{
        setCATLAlaramPushed(payload.id,(err,result)=>{
          debug(`setCATLAlaramPushed===>${payload.id}`);
        });
      });

    } catch (err) {
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
