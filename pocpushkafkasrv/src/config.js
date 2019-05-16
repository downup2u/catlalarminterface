const nodeid = process.env.NodeID || 1;
let config =  {
  dbsysurl:process.env.DBSYS_URL ||'http://localhost:3005/apisys',
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
    'dr_cb': true
  },
  kafka_pconfig2:{
  },
  systemconfig:{},
  mapdict:{},
  mapdevicecity:{},
  NodeID:nodeid,
  isdelflag:process.env.isdelflag==='true'?true:false,
  logdir:process.env.logdir ||'/root/catlalarminterface/log',
  kcmsg:!!process.env.kcmsg?parseInt(process.env.kcmsg):200,
  kafka_dbtopic_c:process.env.TopicC ||'pbmsindex',
  kafka_dbtopic_p1:process.env.TopicP1 ||'CRM_ALARM_INFO_L1',
  kafka_dbtopic_p2:process.env.TopicP2 ||'CRM_ALARM_INFO_L2',
  kafka_dbtopic_p3:process.env.TopicP3 ||'CRM_ALARM_INFO_L3',
  version:'1.1.2(20190516)',
  globalalarmdevicetable:{},
  // gloabaldevicealarmstat_realtime:{},

};



module.exports = config;
