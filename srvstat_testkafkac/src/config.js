const moment = require('moment');
const config =  {
  mongodburl:process.env.MONGO_URL || 'mongodb://localhost/bmskafka',
  mongos:process.env.mongos==='true'?true:false,
  kafka_cconfig1:{
      'group.id': process.env.GroupId ||'catlpushalarmgrouptest',
      'metadata.broker.list': process.env.KAFKA_HOST_C || '192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092',
      'client.id':`c${process.pid}_${nodeid}`,
      'partition.assignment.strategy':'roundrobin',
      'enable.auto.commit': false
  },
  kafka_cconfig2:{
    'auto.offset.reset':'smallest'
  },
  NodeID:nodeid,
  logdir:process.env.logdir ||'/root/catlalarminterface/log',
  kcmsg:!!process.env.kcmsg?parseInt(process.env.kcmsg):200,
  kafka_dbtopic_c1:process.env.TopicP1 ||'CRM_ALARM_INFO_L1_TEST',
  kafka_dbtopic_c2:process.env.TopicP2 ||'CRM_ALARM_INFO_L2_TEST',
  kafka_dbtopic_c3:process.env.TopicP3 ||'CRM_ALARM_INFO_L3_TEST',
  version:'1.0.1(0705)',
};



module.exports = config;
