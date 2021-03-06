const getConsumer = require('./rkafka/c.js');
const config = require('../config');
const winston = require('../log/log.js');
const debug = require('debug')('srv:kc');
const topicindex = require('../handler/pkafkamsg/topicindex');

const numMessages = config.kcmsg;

const handlermap = {};
handlermap[config.kafka_dbtopic_c] = topicindex;

const processbatchmsgs = (data,callbackfn)=>{
  const handlemsg = handlermap[config.kafka_dbtopic_c];
  if(!!handlemsg){
    handlemsg(data,callbackfn);
  }
  else{
    debug(`未找到当前订阅消息处理函数-->${config.kafka_dbtopic_current}`)
    callbackfn();
  }

}

const startsrv = (config)=>{
    const globalconfig = config.kafka_cconfig1;
    const cconfig =  config.kafka_cconfig2;

    const topics = [];
    topics.push(config.kafka_dbtopic_c);

    // globalconfig['offset_commit_cb'] = (err, topicPartitions)=> {
    //   if (!!err) {
    //     console.error(err);
    //   } else {
    //     // Commit went through. Let's log the topic partitions
    //     console.log(topicPartitions);
    //   }
    // };

    getConsumer(globalconfig,cconfig,topics,
    (err,consumer)=> {
      if(debug.enabled){
        winston.getlog().warn(`getConsumer err`);
        winston.getlog().warn(err);
      }
      // consumer.disconnect();
      // throw err;
    }).then((consumer)=>{
      const processRecords =(data, cb)=> {
        debug(`processRecords--->${data.length}`);
        if (data.length === 0) {
           setImmediate(cb);
        }
        else{
          // do work
          processbatchmsgs(data,(err,result)=>{
            debug(`processRecords--->${data.length}-->finished!`);
            consumer.commit();
            setImmediate(cb);
          });
        }
      }

      const consumeNum =(numMsg)=>{
        debug(`consumeNum--->${numMsg}----->`);
        consumer.consume(numMsg, (err, data) => {
          if (!!err) {
            if(debug.enabled){
              console.error(err);
            }
            winston.getlog().warn(`consume err`);
            winston.getlog().warn(err);
            return;
          }

          processRecords(data, () => {
            consumeNum(numMsg);
          });
        });
      };

      consumeNum(numMessages);

      //  process.on('SIGINT', () => {
      //     consumer.disconnect();
      // });
    });
};

module.exports = startsrv;
