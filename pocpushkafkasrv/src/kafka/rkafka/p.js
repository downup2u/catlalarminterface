const kafka = require('node-rdkafka');
const winston = require('../../log/log.js');
const debug = require('debug')('pushsrv:kafka');

const getProducer = (globalconfig,pconfig,onErr)=> {
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
         winston.getlog().error(`event.error-->${JSON.stringify(err)}`);
       }
       onErr(err);
        // reject(err);
    });
    producer.on('delivery-report', (err, report)=> {
      if(!!err){
        debug(err);
      }
      if(!!report){
        debug(report);
        winston.getlog().error(`delivery-report-->${JSON.stringify(report)}`);
      }
    });

    // producer.on('disconnected', () => {
    //   //console.log('producer disconnected.');
    //   process.exit(0)
    // });
    // producer.on('event.log', function(event) {
    //   //console.log(event)
    // })
    producer.connect();
  });
}


module.exports = getProducer;
