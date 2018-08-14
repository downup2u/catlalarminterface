const config =  {
  listenport:process.env.listenport||3005,
  issmsdebug:process.env.issmsdebug || false,
  secretkey:'catltestrestful',
  logdir:process.env.logdir ||'/root/catlalarminterface/log',
  mongodburl:process.env.MONGO_URL || 'mongodb://bms.com28.cn:27018/bmscatl',
  version:'1.0.0(0814)',
};


module.exports = config;
