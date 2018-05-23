const nodeid = process.env.NodeID || 1;
let config =  {
  mongodburl:process.env.MONGO_URL || 'mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred',
  mongos:process.env.mongos==='true'?true:false,
  kafka_cconfig1:{
      'group.id': process.env.GroupId ||'pocpushgroup',
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
  mapdict:{},
  SpecialCurHourTime:process.env.SpecialCurHourTime || '18:00:00',//默认是23:59:59
  NodeID:nodeid,
  logdir:process.env.logdir ||'../../dist/log',
  kcmsg:!!process.env.kcmsg?parseInt(process.env.kcmsg):10,
  partitionnumber:!!process.env.partitionnumber?parseInt(process.env.partitionnumber):48,
  kafka_dbtopic_c:process.env.TopicC ||'pbmsindex',
  kafka_dbtopic_p:process.env.TopicP ||'CRM_ALARM_INFO_L1_TEST',
  version:'1.0.0',
  globalalarmdevicetable:{},

};



module.exports = config;
