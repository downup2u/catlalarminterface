const moment = require('moment');
const getProducer  = require('./src/rkafka/p.js');
const _ = require('lodash');
const topicname = process.env.IndexTopic ||'CRM_ALARM_INFO_L1_TEST';

console.log(`topicname:${topicname}`);

const kafka_pconfig1 = {
  'metadata.broker.list': process.env.KAFKA_HOST || '192.168.1.20:9092,192.168.1.114:9092,192.168.1.136:9092',
};
const kafka_pconfig2 = {
};

let jsondata =
{
	"_id": "5ad7219e1c52e8c471efb676",
	"CurDayHour": "2018041916",
	"DeviceId": "1724102895",
	"Latitude": "27.877929",
	"Longitude": "112.905888",
	"FirstAlarmTime": "2018-04-19 16:34:45",
	"DataTime": "2018-04-19 16:29:43",
	"Alarm": {
    "Details": [
      {
      "id": "AL_DV_UCELL_51",
      "description": " 单体压差过大三级",
      "errorcode": "863",
      "warninglevel": 3,
      "count": 7
      },
      {
      	"id": "AL_TROUBLE_CODE_60_92",
      	"description": "均衡回路开路",
      	"errorcode": "92",
      	"warninglevel": 3,
      	"count": 3
      }]
    }
};



getProducer(kafka_pconfig1,kafka_pconfig2,(err)=> {
  console.error(`---uncaughtException err`);
  console.error(err);
  console.error(err.stack);
  console.error(`uncaughtException err---`);
}).then((producer)=>{
  let icount = 0;

  setInterval(()=>{
    try {
        let senddata = _.clone(jsondata);
        const stringdata = JSON.stringify(senddata);

        producer.produce(topicname, -1, new Buffer(stringdata),icount);
        console.log(`send message,sn:${senddata.SN64}`);
      } catch (err) {
        console.error('A problem occurred when sending our message')
        console.error(err)
      }
  },0);

});
