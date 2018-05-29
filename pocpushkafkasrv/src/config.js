const nodeid = process.env.NodeID || 1;
let config =  {
  dbsysurl:process.env.DBSYS_URL ||'http://localhost:3005',
  mongodburl:process.env.MONGO_URL || 'mongodb://localhost/bmskafka',
  mongos:process.env.mongos==='true'?true:false,
  kafka_cconfig1:{
      'group.id': process.env.GroupId ||'catlpushgroup',
      'metadata.broker.list': process.env.KAFKA_HOST_C || '192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092',
      'client.id':`c${process.pid}_${nodeid}`,
      'partition.assignment.strategy':'roundrobin',
      'enable.auto.commit': false
  },
  kafka_cconfig2:{
    'auto.offset.reset':'smallest'
  },
  kafka_pconfig1:{
    'metadata.broker.list': process.env.KAFKA_HOST_P || '192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092',
  },
  kafka_pconfig2:{
  },
  systemconfig:{},
  mapdict:{},
  mapdevicecity:{},
  NodeID:nodeid,
  logdir:process.env.logdir ||'/root/catlalarminterface/log',
  kcmsg:!!process.env.kcmsg?parseInt(process.env.kcmsg):200,
  kafka_dbtopic_c:process.env.TopicC ||'pbmsindex',
  kafka_dbtopic_p1:process.env.TopicP1 ||'CRM_ALARM_INFO_L1_TEST',
  kafka_dbtopic_p2:process.env.TopicP2 ||'CRM_ALARM_INFO_L2_TEST',
  kafka_dbtopic_p3:process.env.TopicP3 ||'CRM_ALARM_INFO_L3_TEST',
  version:'1.0.0',
  globalalarmdevicetable:{},
  gloabaldevicealarmstat_realtime:{},

};



module.exports = config;
