const nodeid = process.env.NodeID || 1000;
let config =  {
  mongodburl:process.env.MONGO_URL || 'mongodb://localhost/bmskafka',
  mongos:process.env.mongos==='true'?true:false,
  kafka_pconfig1:{
    'metadata.broker.list': process.env.KAFKA_HOST_P || '192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092',
    'dr_cb': true
  },
  kafka_pconfig2:{
  },
  NodeID:nodeid,
  logdir:process.env.logdir ||'/root/catlalarminterface/logtest',
  kafka_dbtopic_topicname:process.env.TopicPTestName ||'CRM_ALARM_INFO_LX',
  version:'1.0.1(0707)',
  limit:10000,
};



module.exports = config;
