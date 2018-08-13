const kafka = require('node-rdkafka');
const winston = require('../../log/log.js');
const debug = require('debug')('pushsrv:kafka');

const getProducer = (globalconfig,pconfig,onErr,onAck)=> {
  return new Promise((resolve, reject) => {
    const producer = new kafka.Producer(globalconfig,pconfig);
    producer.on('ready', () => {
      //console.log('producer ready.');
      producer.setPollInterval(500)
      resolve(producer);
    })
    producer.on('event.error', (err)=>{
       if(!!err){
         debug(err);
         winston.getlog().warn(`event.error-->${JSON.stringify(err)}`);
       }
       onErr(err);
        // reject(err);
    });
    producer.on('delivery-report', (err, report)=> {
      if(!!err){
        debug(err);
      }
      if(!!report){
//         { topic: 'CRM_ALARM_INFO_L1_TEST',
// 84|catlpus |   pushsrv:kafka   partition: 0,
// 84|catlpus |   pushsrv:kafka   offset: 838958,
// 84|catlpus |   pushsrv:kafka   key: <Buffer 32 30 31 38 30 37 30 37 31 31 31 37 32 35 31 30 33 36 34 31>,
// 84|catlpus |   pushsrv:kafka   size: 326 }
        debug(report);
        const key = report.key.toString();
        onAck({
          key,
          notify_partition:report.partition,
          notify_offset:report.offset,
          notify_topic:report.topic
        });
        // winston.getlog().warn(`delivery-report-->${JSON.stringify(report)}`);
      }
    });

    producer.on('disconnected', () => {
      debug(`producer disconnected.`);
      winston.getlog().error(`=====生产者断开连接=====`);
      //console.log('producer disconnected.');
      // process.exit(0)
    });
    // producer.on('event.log', function(event) {
    //   //console.log(event)
    // })
    producer.connect();
  });
}


module.exports = getProducer;
